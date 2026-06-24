using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Engine;
using Umbricians.MediaCurator.Exif;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Tests.Engine;

public class CurationEngineTests
{
    internal sealed class FakeMedia : IMediaOperations
    {
        public readonly Dictionary<Guid, MediaItemInfo> Items = [];
        public readonly Dictionary<Guid, List<Guid>> Children = [];
        public readonly List<(Guid Media, Guid Target)> Moves = [];

        public Guid AddFolder(string name, Guid parent)
        {
            var key = Guid.NewGuid();
            Items[key] = new MediaItemInfo(key, name, "Folder", parent, DateTime.UtcNow, DateTime.UtcNow, IsFolder: true);
            (Children.TryGetValue(parent, out var list) ? list : Children[parent] = []).Add(key);
            return key;
        }

        public Guid AddImage(string name, Guid parent, DateTime? created = null, string contentType = "Image")
        {
            var key = Guid.NewGuid();
            Items[key] = new MediaItemInfo(key, name, contentType, parent, created ?? new DateTime(2026, 6, 10), DateTime.UtcNow, IsFolder: false);
            (Children.TryGetValue(parent, out var list) ? list : Children[parent] = []).Add(key);
            return key;
        }

        public IReadOnlyList<MediaItemInfo> GetItems(Guid scopeFolderKey, bool recursive)
        {
            var result = new List<MediaItemInfo>();
            void Collect(Guid parent)
            {
                foreach (var childKey in Children.GetValueOrDefault(parent, []))
                {
                    var child = Items[childKey];
                    result.Add(child);
                    if (recursive && child.IsFolder)
                    {
                        Collect(childKey);
                    }
                }
            }

            Collect(scopeFolderKey);
            return result;
        }

        public MediaItemInfo? GetItem(Guid mediaKey) => Items.GetValueOrDefault(mediaKey);

        public string? GetPropertyValue(Guid mediaKey, string propertyAlias) => null;

        public void SetPropertyValue(Guid mediaKey, string propertyAlias, string value) { }

        public Stream? OpenFile(Guid mediaKey) => null;

        public Guid EnsureFolderPath(Guid parentFolderKey, IReadOnlyList<string> segments)
        {
            var current = parentFolderKey;
            foreach (var segment in segments)
            {
                var existing = Children.GetValueOrDefault(current, [])
                    .Select(k => Items[k])
                    .FirstOrDefault(i => i.IsFolder && i.Name.Equals(segment, StringComparison.OrdinalIgnoreCase));
                current = existing?.Key ?? AddFolder(segment, current);
            }

            return current;
        }

        public void Move(Guid mediaKey, Guid targetFolderKey)
        {
            var item = Items[mediaKey];
            Children[item.ParentKey].Remove(mediaKey);
            Items[mediaKey] = item with { ParentKey = targetFolderKey };
            (Children.TryGetValue(targetFolderKey, out var list) ? list : Children[targetFolderKey] = []).Add(mediaKey);
            Moves.Add((mediaKey, targetFolderKey));
        }
    }

    private sealed class FakeRunLog : ICurationRunLog
    {
        public readonly List<CurationRunItem> Items = [];
        public int Completed;

        public Task<Guid> StartRunAsync(Guid s, Guid r, string t, CancellationToken ct = default) => Task.FromResult(Guid.NewGuid());

        public Task RecordItemAsync(Guid runKey, Guid mediaKey, string mediaName, Guid from, Guid? to, string path, bool success, string? note, CancellationToken ct = default)
        {
            Items.Add(new CurationRunItem(runKey, mediaKey, mediaName, from, to, path, success, note));
            return Task.CompletedTask;
        }

        public Task CompleteRunAsync(Guid runKey, int m, int a, int f, CancellationToken ct = default)
        {
            Completed++;
            return Task.CompletedTask;
        }

        public Task<IReadOnlyList<CurationRun>> GetRunsAsync(int take = 50, CancellationToken ct = default)
            => Task.FromResult<IReadOnlyList<CurationRun>>([]);

        public Task<IReadOnlyList<CurationRunItem>> GetRunItemsAsync(Guid runKey, CancellationToken ct = default)
            => Task.FromResult<IReadOnlyList<CurationRunItem>>(Items.Where(i => i.RunKey == runKey).ToList());
    }

    private sealed class StubExif : IExifReader
    {
        public IReadOnlyDictionary<string, string> Read(Stream imageStream) => new Dictionary<string, string>();
    }

    private sealed class StubRecognition : Umbricians.MediaCurator.Recognition.IRecognitionService
    {
        public Task<Umbricians.MediaCurator.Recognition.RecognitionResult?> AnalyzeAsync(
            Guid mediaKey,
            bool force = false,
            string? classificationSchemeAlias = null,
            CancellationToken cancellationToken = default)
            => Task.FromResult<Umbricians.MediaCurator.Recognition.RecognitionResult?>(null);
    }

    internal sealed class StubExclusions : IExclusionRepository
    {
        public readonly HashSet<Guid> Excluded = [];

        public Task<IReadOnlySet<Guid>> GetAllAsync(CancellationToken ct = default)
            => Task.FromResult<IReadOnlySet<Guid>>(Excluded);

        public Task SetAsync(Guid mediaKey, bool excluded, CancellationToken ct = default)
        {
            if (excluded) Excluded.Add(mediaKey); else Excluded.Remove(mediaKey);
            return Task.CompletedTask;
        }
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

        public Task SaveAsync(Ruleset r, CancellationToken ct = default) => Task.CompletedTask;
        public Task DeleteAsync(Guid k, CancellationToken ct = default) => Task.CompletedTask;
    }

    private sealed class FakeAncestry : IMediaAncestry
    {
        public FakeMedia? Media;

        public IReadOnlyList<Guid> GetAncestorOrSelfFolderKeys(Guid mediaKey)
        {
            var keys = new List<Guid>();
            var current = Media!.GetItem(mediaKey)?.ParentKey ?? Guid.Empty;
            while (current != Guid.Empty && Media.Items.ContainsKey(current))
            {
                keys.Add(current);
                current = Media.Items[current].ParentKey;
            }

            // Top-level scope folders have Guid.Empty parents in the fake; include them.
            return keys;
        }
    }

    private static (CurationEngine Engine, FakeMedia Media, InMemoryRulesets Rulesets, FakeRunLog Log, Guid Scope, StubExclusions Exclusions) Setup()
    {
        var media = new FakeMedia();
        var scope = media.AddFolder("Products", Guid.Empty);
        media.Items[scope] = media.Items[scope] with { ParentKey = Guid.Empty };

        var rulesets = new InMemoryRulesets();
        var ruleset = new Ruleset
        {
            ScopeRootKey = scope,
            Name = "Date rules",
            CultureName = "en-US",
            Rules = [new RuleNode { ProviderAlias = DateFolderProvider.ProviderAlias, Settings = TestContext.Settings(("format", "yyyy/MM")) }],
        };
        rulesets.ByScope[scope] = ruleset;

        var ancestry = new FakeAncestry { Media = media };
        var providers = new CurationProviderCollection(() => [new DateFolderProvider()]);
        var log = new FakeRunLog();
        var exclusions = new StubExclusions();
        var engine = new CurationEngine(
            new RulesetResolver(rulesets, ancestry),
            rulesets,
            new RuleChainExecutor(providers),
            media,
            new StubExif(),
            log,
            new StubRecognition(),
            exclusions,
            ancestry,
            new Umbraco.Cms.Core.Events.EventAggregator(type => new ServiceCollection().BuildServiceProvider().GetService(type)!),
            NullLogger<CurationEngine>.Instance);

        return (engine, media, rulesets, log, scope, exclusions);
    }

    [Fact]
    public async Task Plan_targets_date_folders_and_execute_moves_items()
    {
        var (engine, media, _, log, scope, _) = Setup();
        var img = media.AddImage("photo.jpg", scope, new DateTime(2026, 6, 10));

        var plan = await engine.PlanAsync(scope, recursive: true);

        var move = Assert.Single(plan.Moves);
        Assert.Equal("2026/06", move.TargetPath);
        Assert.False(move.AlreadyInPlace);

        var summary = await engine.ExecuteAsync(plan, "manual");

        Assert.Equal(1, summary.Moved);
        Assert.Single(media.Moves);
        Assert.Single(log.Items);
        Assert.Equal(1, log.Completed);
        // The item now sits in Products/2026/06
        var item = media.GetItem(img)!;
        Assert.Equal("06", media.GetItem(item.ParentKey)!.Name);
    }

    [Fact]
    public async Task Rerunning_over_curated_media_is_a_noop()
    {
        var (engine, media, _, _, scope, _) = Setup();
        media.AddImage("photo.jpg", scope, new DateTime(2026, 6, 10));

        var first = await engine.PlanAsync(scope, recursive: true);
        await engine.ExecuteAsync(first, "manual");

        var second = await engine.PlanAsync(scope, recursive: true);

        var move = Assert.Single(second.Moves);
        Assert.True(move.AlreadyInPlace);
        Assert.Equal(0, second.MoveCount);

        var summary = await engine.ExecuteAsync(second, "manual");
        Assert.Equal(0, summary.Moved);
        Assert.Equal(1, summary.AlreadyInPlace);
    }

    [Fact]
    public async Task Non_image_media_is_skipped_not_failed()
    {
        var (engine, media, _, _, scope, _) = Setup();
        media.AddImage("document.pdf", scope, contentType: "File");

        var plan = await engine.PlanAsync(scope, recursive: true);

        Assert.Empty(plan.Moves);
        Assert.Contains(plan.SkippedItems, s => s.Contains("document.pdf") && s.Contains("ignored"));
    }

    [Fact]
    public async Task Items_governed_by_a_deeper_ruleset_are_left_alone()
    {
        var (engine, media, rulesets, _, scope, _) = Setup();
        var clearance = media.AddFolder("Clearance", scope);
        rulesets.ByScope[clearance] = new Ruleset
        {
            ScopeRootKey = clearance,
            Name = "Deeper rules",
            Rules = [new RuleNode { ProviderAlias = DateFolderProvider.ProviderAlias }],
        };
        media.AddImage("deep.jpg", clearance);

        var plan = await engine.PlanAsync(scope, recursive: true);

        Assert.Empty(plan.Moves);
        Assert.Contains(plan.SkippedItems, s => s.Contains("deep.jpg") && s.Contains("deeper"));
    }

    [Fact]
    public async Task Plan_throws_without_an_enabled_ruleset()
    {
        var (engine, media, rulesets, _, scope, _) = Setup();
        rulesets.ByScope[scope].Enabled = false;

        await Assert.ThrowsAsync<InvalidOperationException>(() => engine.PlanAsync(scope, true));
    }

    [Fact]
    public async Task Excluded_items_and_subtrees_are_never_touched()
    {
        var (engine, media, _, _, scope, exclusions) = Setup();
        var pinned = media.AddImage("pinned.jpg", scope);
        var sub = media.AddFolder("Sub", scope);
        var inExcludedFolder = media.AddImage("inside.jpg", sub);
        media.AddImage("normal.jpg", scope);
        exclusions.Excluded.Add(pinned);
        exclusions.Excluded.Add(sub);

        var plan = await engine.PlanAsync(scope, recursive: true);

        Assert.Single(plan.Moves); // only normal.jpg
        Assert.Equal(2, plan.SkippedItems.Count(s => s.Contains("excluded")));
        Assert.DoesNotContain(plan.Moves, m => m.MediaKey == pinned || m.MediaKey == inExcludedFolder);
    }

    [Theory]
    [InlineData("juni 2026", "juni 2026")]
    [InlineData("a/b", "ab")]
    [InlineData("  x  ", "x")]
    [InlineData("???", "_")]
    public void Folder_names_are_sanitized_preserving_localized_text(string input, string expected)
    {
        Assert.Equal(expected, CurationEngine.SanitizeFolderName(input));
    }
}
