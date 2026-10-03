using Microsoft.Extensions.Logging.Abstractions;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Engine;
using Umbricians.MediaCurator.Exif;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Tests.Engine;

/// <summary>Undo round-trip and ruleset transfer tests, reusing the engine test fakes.</summary>
public class UndoAndTransferTests
{
    private sealed class InMemoryRunLog : ICurationRunLog
    {
        public readonly List<(Guid RunKey, CurationRunItem Item)> Records = [];
        private readonly List<CurationRun> _runs = [];

        public Task<Guid> StartRunAsync(Guid s, Guid r, string t, CancellationToken ct = default)
        {
            var key = Guid.NewGuid();
            _runs.Add(new CurationRun(key, s, r, t, DateTime.UtcNow, null, 0, 0, 0));
            return Task.FromResult(key);
        }

        public Task RecordItemAsync(Guid runKey, Guid mediaKey, string mediaName, Guid from, Guid? to, string path, bool success, string? note, CancellationToken ct = default)
        {
            Records.Add((runKey, new CurationRunItem(runKey, mediaKey, mediaName, from, to, path, success, note)));
            return Task.CompletedTask;
        }

        public Task CompleteRunAsync(Guid runKey, int m, int a, int f, CancellationToken ct = default) => Task.CompletedTask;

        public Task<IReadOnlyList<CurationRun>> GetRunsAsync(int take = 50, CancellationToken ct = default)
            => Task.FromResult<IReadOnlyList<CurationRun>>(_runs);

        public Task<IReadOnlyList<CurationRunItem>> GetRunItemsAsync(Guid runKey, CancellationToken ct = default)
            => Task.FromResult<IReadOnlyList<CurationRunItem>>(Records.Where(r => r.RunKey == runKey).Select(r => r.Item).ToList());
    }

    [Fact]
    public async Task Undo_restores_original_tree()
    {
        // Arrange a moved item via the run log shape the engine writes
        var media = new CurationEngineTests.FakeMedia();
        var scope = media.AddFolder("Products", Guid.Empty);
        var img = media.AddImage("photo.jpg", scope);
        var target = media.EnsureFolderPath(scope, ["2026", "06"]);
        var originalParent = media.GetItem(img)!.ParentKey;
        media.Move(img, target);

        var log = new InMemoryRunLog();
        var runKey = await log.StartRunAsync(scope, Guid.NewGuid(), "manual");
        await log.RecordItemAsync(runKey, img, "photo.jpg", originalParent, target, "2026/06", true, null);

        var undo = new CurationUndoService(log, media, NullLogger<CurationUndoService>.Instance);

        // Act
        var summary = await undo.UndoRunAsync(runKey);

        // Assert: item is back in its original folder
        Assert.Equal(1, summary.Moved);
        Assert.Equal(originalParent, media.GetItem(img)!.ParentKey);

        // Undoing again is a no-op
        var second = await undo.UndoRunAsync(runKey);
        Assert.Equal(0, second.Moved);
        Assert.Equal(1, second.AlreadyInPlace);
    }

    [Fact]
    public async Task Undo_restores_recycled_folders_shallowest_first_before_moving_items_back()
    {
        var media = new CurationEngineTests.FakeMedia();
        var scope = media.AddFolder("Products", Guid.Empty);
        var a = media.AddFolder("A", scope);
        var b = media.AddFolder("B", a);
        var img = media.AddImage("photo.jpg", b);
        var target = media.EnsureFolderPath(scope, ["2026"]);
        media.Move(img, target);
        // The run's cleanup then recycled B and A (deepest first); detach them as the media service would.
        media.MoveToRecycleBin(b);
        media.MoveToRecycleBin(a);

        var log = new InMemoryRunLog();
        var runKey = await log.StartRunAsync(scope, Guid.NewGuid(), "manual");
        await log.RecordItemAsync(runKey, img, "photo.jpg", b, target, "2026", true, null);
        await log.RecordItemAsync(runKey, b, "B", a, null, CurationEngine.EmptyFolderRecycledMarker, true, null);
        await log.RecordItemAsync(runKey, a, "A", scope, null, CurationEngine.EmptyFolderRecycledMarker, true, null);
        // A failed removal is not undone.
        await log.RecordItemAsync(runKey, Guid.NewGuid(), "Nope", scope, null, CurationEngine.EmptyFolderRecycledMarker, false, "boom");

        var summary = await new CurationUndoService(log, media, NullLogger<CurationUndoService>.Instance).UndoRunAsync(runKey);

        Assert.Equal([(a, scope), (b, a)], media.Restored);
        Assert.Equal(b, media.GetItem(img)!.ParentKey);
        Assert.Equal(1, summary.Moved);
        Assert.Equal(0, summary.Failed);
        Assert.Equal(0, summary.FoldersRemoved);
    }

    [Fact]
    public async Task Undo_recreates_permanently_deleted_folders_and_moves_items_into_them()
    {
        var media = new CurationEngineTests.FakeMedia();
        var scope = media.AddFolder("Products", Guid.Empty);
        var a = media.AddFolder("A", scope);
        var b = media.AddFolder("B", a);
        var img = media.AddImage("photo.jpg", b);
        var target = media.EnsureFolderPath(scope, ["2026"]);
        media.Move(img, target);
        media.Delete(b);
        media.Delete(a);

        var log = new InMemoryRunLog();
        var runKey = await log.StartRunAsync(scope, Guid.NewGuid(), "manual");
        // Deepest-first removal order, as the engine logs it.
        await log.RecordItemAsync(runKey, img, "photo.jpg", b, target, "2026", true, null);
        await log.RecordItemAsync(runKey, b, "B", a, null, CurationEngine.EmptyFolderDeletedMarker, true, null);
        await log.RecordItemAsync(runKey, a, "A", scope, null, CurationEngine.EmptyFolderDeletedMarker, true, null);

        var summary = await new CurationUndoService(log, media, NullLogger<CurationUndoService>.Instance).UndoRunAsync(runKey);

        var newA = Assert.Single(media.GetChildren(scope), i => i.Name == "A").Key;
        var newB = Assert.Single(media.GetChildren(newA)).Key;
        Assert.NotEqual(a, newA);
        Assert.NotEqual(b, newB);
        Assert.Equal("B", media.GetItem(newB)!.Name);
        Assert.Equal(newB, media.GetItem(img)!.ParentKey);
        Assert.Equal(1, summary.Moved);
        Assert.Empty(media.Restored);
    }

    [Fact]
    public async Task Undo_counts_a_folder_that_cannot_be_restored_as_failed()
    {
        var media = new CurationEngineTests.FakeMedia();
        var scope = media.AddFolder("Products", Guid.Empty);
        var log = new InMemoryRunLog();
        var runKey = await log.StartRunAsync(scope, Guid.NewGuid(), "manual");
        await log.RecordItemAsync(runKey, Guid.NewGuid(), "Gone", scope, null, CurationEngine.EmptyFolderRecycledMarker, true, null);

        var summary = await new CurationUndoService(log, media, NullLogger<CurationUndoService>.Instance).UndoRunAsync(runKey);

        Assert.Equal(1, summary.Failed);
        Assert.Equal(0, summary.Moved);
    }

    private sealed class InMemoryRulesets : IRulesetRepository
    {
        public readonly Dictionary<Guid, Ruleset> ByScope = [];

        public Task<Ruleset?> GetAsync(Guid key, CancellationToken ct = default)
            => Task.FromResult(ByScope.Values.FirstOrDefault(r => r.Key == key));

        public Task<Ruleset?> GetByScopeKeyAsync(Guid scope, CancellationToken ct = default)
            => Task.FromResult(ByScope.GetValueOrDefault(scope));

        public Task<IReadOnlyList<Ruleset>> GetAllAsync(CancellationToken ct = default)
            => Task.FromResult<IReadOnlyList<Ruleset>>(ByScope.Values.ToList());

        public Task SaveAsync(Ruleset r, CancellationToken ct = default)
        {
            ByScope[r.ScopeRootKey] = r;
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid k, CancellationToken ct = default) => Task.CompletedTask;
    }

    [Fact]
    public async Task Ruleset_transfer_round_trips_between_environments()
    {
        var source = new InMemoryRulesets();
        var scope = Guid.NewGuid();
        await source.SaveAsync(new Ruleset
        {
            ScopeRootKey = scope,
            Name = "Date rules",
            CultureName = "da-DK",
            Rules =
            [
                new RuleNode
                {
                    ProviderAlias = DateFolderProvider.ProviderAlias,
                    Settings = TestContext.Settings(("format", "yyyy/MMMM")),
                    Fallback = UnresolvedBehavior.Unsorted,
                    Children = [new RuleNode { ProviderAlias = AlphabeticalProvider.ProviderAlias, Condition = "x" }],
                },
            ],
        });

        var exported = await new RulesetTransferService(source, new Umbricians.MediaCurator.Core.CurationProviderCollection(() => [new DateFolderProvider(), new AlphabeticalProvider()])).ExportAsync();

        var target = new InMemoryRulesets();
        var imported = await new RulesetTransferService(target, new Umbricians.MediaCurator.Core.CurationProviderCollection(() => [new DateFolderProvider(), new AlphabeticalProvider()])).ImportAsync(exported);

        Assert.Equal(1, imported);
        var ruleset = target.ByScope[scope];
        Assert.Equal("Date rules", ruleset.Name);
        Assert.Equal("da-DK", ruleset.CultureName);
        Assert.Equal("yyyy/MMMM", ruleset.Rules[0].Settings["format"]!.GetValue<string>());
        Assert.Equal(UnresolvedBehavior.Unsorted, ruleset.Rules[0].Fallback);
        Assert.Equal("x", ruleset.Rules[0].Children[0].Condition);

        // Re-import updates rather than duplicates
        Assert.Equal(1, await new RulesetTransferService(target, new Umbricians.MediaCurator.Core.CurationProviderCollection(() => [new DateFolderProvider(), new AlphabeticalProvider()])).ImportAsync(exported));
        Assert.Single(target.ByScope);
    }
}
