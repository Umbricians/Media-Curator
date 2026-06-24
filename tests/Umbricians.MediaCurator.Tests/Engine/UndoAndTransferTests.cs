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
