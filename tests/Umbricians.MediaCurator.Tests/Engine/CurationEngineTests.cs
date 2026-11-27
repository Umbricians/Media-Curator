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
        public readonly List<Guid> Recycled = [];
        public readonly List<Guid> Deleted = [];
        public readonly List<(Guid Media, Guid Parent)> Restored = [];
        public readonly HashSet<Guid> ThrowOnRemove = [];
        public readonly List<Guid> Sorted = [];
        public bool ThrowOnSort;

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

        /// <summary>How many times a single folder's items were listed (not recursive).</summary>
        public int FolderListings;

        public Guid? FindChildFolder(Guid parentFolderKey, string name)
            => Children.GetValueOrDefault(parentFolderKey, [])
                .Select(k => Items[k])
                .FirstOrDefault(i => i.IsFolder && i.Name.Equals(name, StringComparison.OrdinalIgnoreCase))?.Key;

        public IReadOnlyList<MediaItemInfo> GetItems(Guid scopeFolderKey, bool recursive)
        {
            if (!recursive)
            {
                FolderListings++;
            }

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

        public IReadOnlyList<MediaItemInfo> GetChildren(Guid folderKey)
            => Children.GetValueOrDefault(folderKey, []).Select(k => Items[k]).ToList();

        public MediaItemInfo? GetItem(Guid mediaKey) => Items.GetValueOrDefault(mediaKey);

        private void Detach(Guid mediaKey)
        {
            if (ThrowOnRemove.Contains(mediaKey))
            {
                throw new InvalidOperationException("cannot remove");
            }

            Children[Items[mediaKey].ParentKey].Remove(mediaKey);
        }

        public void MoveToRecycleBin(Guid mediaKey)
        {
            Detach(mediaKey);
            Recycled.Add(mediaKey);
        }

        public void Delete(Guid mediaKey)
        {
            Detach(mediaKey);
            Items.Remove(mediaKey);
            Deleted.Add(mediaKey);
        }

        public void RestoreFromRecycleBin(Guid mediaKey, Guid parentKey)
        {
            if (!Items.ContainsKey(mediaKey)) throw new InvalidOperationException("gone");
            Items[mediaKey] = Items[mediaKey] with { ParentKey = parentKey };
            (Children.TryGetValue(parentKey, out var list) ? list : Children[parentKey] = []).Add(mediaKey);
            Restored.Add((mediaKey, parentKey));
        }

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

        public void SortChildren(Guid folderKey, IReadOnlyList<Guid> orderedChildKeys)
        {
            if (ThrowOnSort)
            {
                throw new InvalidOperationException("cannot sort");
            }

            var current = Children.GetValueOrDefault(folderKey, []);
            Children[folderKey] = orderedChildKeys.Where(current.Contains).Concat(current.Where(k => !orderedChildKeys.Contains(k))).ToList();
            Sorted.Add(folderKey);
        }

        /// <summary>The names of a folder's children in their current order.</summary>
        public IReadOnlyList<string> ChildNames(Guid folderKey)
            => Children.GetValueOrDefault(folderKey, []).Select(k => Items[k].Name).ToList();

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

    /// <summary>Files an image under its name's first word as a colour ("red car.jpg" → "Red"), and
    /// orders those folders as the Color provider does (palette order).</summary>
    private sealed class NameColorProvider : ICurationProvider, ICurationFolderOrder
    {
        public const string ProviderAlias = "test.color";

        public string Alias => ProviderAlias;
        public string Name => "Name colour";
        public string Icon => "icon-box";
        public IEnumerable<PropertyRequirement> Requirements => [];
        public ProviderSettingsSchema SettingsSchema => ProviderSettingsSchema.Empty;

        public Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken cancellationToken = default)
        {
            var word = context.MediaName.Split(' ')[0];
            var known = ColorProvider.ParsePalette(ColorProvider.DefaultPalette).FirstOrDefault(e => e.Name.Equals(word, StringComparison.OrdinalIgnoreCase));
            return Task.FromResult(known is null ? CurationResult.Unresolved() : CurationResult.Resolved(known.Name, new FolderSegment(known.Name)));
        }

        public IComparer<string>? GetFolderComparer(FolderOrderContext context)
            => new ColorProvider().GetFolderComparer(context);
    }

    internal sealed class ListLogger<T> : Microsoft.Extensions.Logging.ILogger<T>
    {
        public readonly List<(Microsoft.Extensions.Logging.LogLevel Level, string Message)> Entries = [];

        public IDisposable? BeginScope<TState>(TState state) where TState : notnull => null;

        public bool IsEnabled(Microsoft.Extensions.Logging.LogLevel logLevel) => true;

        public void Log<TState>(Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
            => Entries.Add((logLevel, formatter(state, exception)));
    }

    private static (CurationEngine Engine, FakeMedia Media, InMemoryRulesets Rulesets, FakeRunLog Log, Guid Scope, StubExclusions Exclusions) Setup(
        Microsoft.Extensions.Logging.ILogger<CurationEngine>? logger = null)
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
            Rules = [new RuleNode { ProviderAlias = DateFolderProvider.ProviderAlias, Settings = CurationContexts.Settings(("format", "yyyy/MM")) }],
        };
        rulesets.ByScope[scope] = ruleset;

        var ancestry = new FakeAncestry { Media = media };
        var providers = new CurationProviderCollection(() => [new DateFolderProvider(), new NameColorProvider()]);
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
            logger ?? NullLogger<CurationEngine>.Instance);

        return (engine, media, rulesets, log, scope, exclusions);
    }

    [Test]
    public async Task Plan_targets_date_folders_and_execute_moves_items()
    {
        var (engine, media, _, log, scope, _) = Setup();
        var img = media.AddImage("photo.jpg", scope, new DateTime(2026, 6, 10));

        var plan = await engine.PlanAsync(scope, recursive: true);

        var move = TestAssert.Single(plan.Moves);
        Assert.That(move.TargetPath, Is.EqualTo("2026/06"));
        Assert.That(move.AlreadyInPlace, Is.False);

        var summary = await engine.ExecuteAsync(plan, "manual");

        Assert.That(summary.Moved, Is.EqualTo(1));
        Assert.That(media.Moves, Has.Exactly(1).Items);
        Assert.That(log.Items, Has.Exactly(1).Items);
        Assert.That(log.Completed, Is.EqualTo(1));
        // The item now sits in Products/2026/06
        var item = media.GetItem(img)!;
        Assert.That(media.GetItem(item.ParentKey)!.Name, Is.EqualTo("06"));
    }

    [Test]
    public async Task Planning_a_flat_folder_never_lists_a_folder_per_image()
    {
        // Listing the target folder for each image made planning quadratic: about a million media
        // loads for a flat folder of 1,000 images.
        var (engine, media, _, _, scope, _) = Setup();
        for (var i = 0; i < 200; i++)
        {
            media.AddImage($"photo-{i}.jpg", scope, new DateTime(2026, 6, 10));
        }

        await engine.ExecuteAsync(await engine.PlanAsync(scope, recursive: true), "manual");
        media.FolderListings = 0;

        var plan = await engine.PlanForMediaAsync(scope);

        Assert.That(plan.Plans.Single().Moves.Count(m => m.AlreadyInPlace), Is.EqualTo(200));
        Assert.That(media.FolderListings, Is.EqualTo(0));
    }

    [Test]
    public async Task Curating_media_reports_progress_up_to_every_planned_move()
    {
        var (engine, media, _, _, scope, _) = Setup();
        for (var i = 0; i < 3; i++)
        {
            media.AddImage($"photo-{i}.jpg", scope, new DateTime(2026, 6, 10));
        }

        var reports = new List<CurationProgress>();
        var summary = await ((ICurationEngine)engine).CurateMediaAsync(scope, "background", EmptyFolderRemoval.None, new InlineProgress<CurationProgress>(reports.Add));

        Assert.That(summary.Moved, Is.EqualTo(3));
        Assert.That(reports[0], Is.EqualTo(new CurationProgress(0, 3)));
        Assert.That(reports[^1], Is.EqualTo(new CurationProgress(3, 3)));
        Assert.That(summary.RunKeys, Has.Exactly(1).Items);
    }

    [Test]
    public void Images_are_counted_below_a_folder_and_one_for_an_image()
    {
        var (engine, media, _, _, scope, _) = Setup();
        var sub = media.AddFolder("Sub", scope);
        var image = media.AddImage("a.jpg", scope);
        media.AddImage("b.jpg", sub);
        media.AddImage("doc.pdf", sub, contentType: "File");

        Assert.That(engine.CountImages(scope), Is.EqualTo(2));
        Assert.That(engine.CountImages(image), Is.EqualTo(1));
    }

    [Test]
    public async Task Rerunning_over_curated_media_is_a_noop()
    {
        var (engine, media, _, _, scope, _) = Setup();
        media.AddImage("photo.jpg", scope, new DateTime(2026, 6, 10));

        var first = await engine.PlanAsync(scope, recursive: true);
        await engine.ExecuteAsync(first, "manual");

        var second = await engine.PlanAsync(scope, recursive: true);

        var move = TestAssert.Single(second.Moves);
        Assert.That(move.AlreadyInPlace, Is.True);
        Assert.That(second.MoveCount, Is.EqualTo(0));

        var summary = await engine.ExecuteAsync(second, "manual");
        Assert.That(summary.Moved, Is.EqualTo(0));
        Assert.That(summary.AlreadyInPlace, Is.EqualTo(1));
    }

    [Test]
    public async Task Non_image_media_is_skipped_not_failed()
    {
        var (engine, media, _, _, scope, _) = Setup();
        media.AddImage("document.pdf", scope, contentType: "File");

        var plan = await engine.PlanAsync(scope, recursive: true);

        Assert.That(plan.Moves, Is.Empty);
        Assert.That(plan.SkippedItems.Any(s => s.Contains("document.pdf") && s.Contains("ignored")), Is.True);
    }

    [Test]
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

        Assert.That(plan.Moves, Is.Empty);
        Assert.That(plan.SkippedItems.Any(s => s.Contains("deep.jpg") && s.Contains("deeper")), Is.True);
    }

    [Test]
    public async Task Plan_throws_without_an_enabled_ruleset()
    {
        var (engine, media, rulesets, _, scope, _) = Setup();
        rulesets.ByScope[scope].Enabled = false;

        await Assert.ThrowsAsync<InvalidOperationException>(() => engine.PlanAsync(scope, true));
    }

    [Test]
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

        Assert.That(plan.Moves, Has.Exactly(1).Items); // only normal.jpg
        Assert.That(plan.SkippedItems.Count(s => s.Contains("excluded")), Is.EqualTo(2));
        Assert.That(plan.Moves.Any(m => m.MediaKey == pinned || m.MediaKey == inExcludedFolder), Is.False);
    }

    [Test]
    public async Task Media_plan_for_a_folder_inside_a_scope_is_relative_to_the_scope_root()
    {
        var (engine, media, _, _, scope, _) = Setup();
        var inner = media.AddFolder("2026", scope);
        var clicked = media.AddFolder("10", inner);
        media.AddImage("in.jpg", clicked, new DateTime(2026, 10, 3));
        media.AddImage("out.jpg", scope, new DateTime(2026, 6, 10));

        var fromRoot = await engine.PlanAsync(scope, recursive: true);
        var plan = await engine.PlanForMediaAsync(clicked);

        var scoped = TestAssert.Single(plan.Plans);
        Assert.That(scoped.ScopeFolderKey, Is.EqualTo(scope));
        var move = TestAssert.Single(scoped.Moves);
        Assert.That(move.MediaName, Is.EqualTo("in.jpg"));
        Assert.That(move.TargetSegments, Is.EqualTo(fromRoot.Moves.Single(m => m.MediaName == "in.jpg").TargetSegments));
        Assert.That(move.TargetPath, Is.EqualTo("2026/10"));
        Assert.That(move.AlreadyInPlace, Is.True);
        Assert.That(plan.Skipped, Is.Empty);
    }

    [Test]
    public async Task Media_plan_for_a_folder_above_two_scopes_has_a_plan_per_ruleset()
    {
        var (engine, media, rulesets, _, scope, _) = Setup();
        var other = media.AddFolder("Blog", Guid.Empty);
        rulesets.ByScope[other] = new Ruleset
        {
            ScopeRootKey = other,
            Name = "Year rules",
            CultureName = "en-US",
            Rules = [new RuleNode { ProviderAlias = DateFolderProvider.ProviderAlias, Settings = CurationContexts.Settings(("format", "yyyy")) }],
        };
        var parent = media.AddFolder("Library", Guid.Empty);
        media.Items[scope] = media.Items[scope] with { ParentKey = parent };
        media.Items[other] = media.Items[other] with { ParentKey = parent };
        media.Children[parent] = [scope, other];
        media.AddImage("a.jpg", scope, new DateTime(2026, 6, 10));
        media.AddImage("b.jpg", other, new DateTime(2025, 2, 1));

        var plan = await engine.PlanForMediaAsync(parent);

        Assert.That(plan.Plans.Count, Is.EqualTo(2));
        var products = plan.Plans.Single(p => p.ScopeFolderKey == scope);
        var blog = plan.Plans.Single(p => p.ScopeFolderKey == other);
        Assert.That(TestAssert.Single(products.Moves).TargetPath, Is.EqualTo("2026/06"));
        Assert.That(TestAssert.Single(blog.Moves).TargetPath, Is.EqualTo("2025"));
        Assert.That(plan.Skipped, Is.Empty);
    }

    [Test]
    public async Task Media_plan_skips_images_no_ruleset_governs()
    {
        var (engine, media, _, _, _, _) = Setup();
        var loose = media.AddFolder("Loose", Guid.Empty);
        media.AddImage("orphan.jpg", loose);

        var plan = await engine.PlanForMediaAsync(loose);

        Assert.That(plan.Plans, Is.Empty);
        Assert.That(plan.Skipped, Does.Contain("orphan.jpg: no ruleset applies"));
    }

    [Test]
    public async Task Media_plan_for_a_single_image_plans_only_that_image()
    {
        var (engine, media, _, _, scope, _) = Setup();
        var img = media.AddImage("one.jpg", scope, new DateTime(2026, 6, 10));
        media.AddImage("two.jpg", scope, new DateTime(2026, 6, 10));

        var plan = await engine.PlanForMediaAsync(img);

        var move = TestAssert.Single(TestAssert.Single(plan.Plans).Moves);
        Assert.That(move.MediaKey, Is.EqualTo(img));
    }

    [Test]
    public async Task Media_plan_skips_excluded_items_and_folders()
    {
        var (engine, media, _, _, scope, exclusions) = Setup();
        var pinned = media.AddImage("pinned.jpg", scope);
        var sub = media.AddFolder("Sub", scope);
        media.AddImage("inside.jpg", sub);
        media.AddImage("normal.jpg", scope);
        exclusions.Excluded.Add(pinned);
        exclusions.Excluded.Add(sub);

        var plan = await engine.PlanForMediaAsync(scope);

        Assert.That(TestAssert.Single(TestAssert.Single(plan.Plans).Moves).MediaName, Is.EqualTo("normal.jpg"));
        Assert.That(plan.Skipped.Count(s => s.Contains("excluded")), Is.EqualTo(2));
    }

    [Test]
    public async Task Media_plan_ignores_disabled_rulesets()
    {
        var (engine, media, rulesets, _, scope, _) = Setup();
        rulesets.ByScope[scope].Enabled = false;
        media.AddImage("a.jpg", scope);

        var plan = await engine.PlanForMediaAsync(scope);

        Assert.That(plan.Plans, Is.Empty);
        Assert.That(plan.Skipped.Any(s => s.Contains("no ruleset applies")), Is.True);
    }

    [Test]
    public async Task Media_plan_throws_not_found_for_an_unknown_key()
    {
        var (engine, _, _, _, _, _) = Setup();

        await Assert.ThrowsAsync<MediaNotFoundException>(() => engine.PlanForMediaAsync(Guid.NewGuid()));
    }

    [TestCase("juni 2026", "juni 2026")]
    [TestCase("a/b", "ab")]
    [TestCase("  x  ", "x")]
    [TestCase("???", "_")]
    public void Folder_names_are_sanitized_preserving_localized_text(string input, string expected)
    {
        Assert.That(CurationEngine.SanitizeFolderName(input), Is.EqualTo(expected));
    }

    // ----- Empty sub-folder cleanup -----

    private static IEnumerable<CurationRunItem> FolderRecords(FakeRunLog log)
        => log.Items.Where(i => i.TargetPath is CurationEngine.EmptyFolderRecycledMarker or CurationEngine.EmptyFolderDeletedMarker);

    private static async Task<CurationRunSummary> RunAsync(CurationEngine engine, Guid scope, EmptyFolderRemoval removal)
        => await engine.ExecuteAsync(await engine.PlanAsync(scope, recursive: true), "manual", removal);

    [Test]
    public async Task Cleanup_removes_nested_empty_folders_deepest_first_but_never_the_processed_folder()
    {
        var (engine, media, _, log, scope, _) = Setup();
        var a = media.AddFolder("A", scope);
        var b = media.AddFolder("B", a);
        var c = media.AddFolder("C", b);

        var summary = await RunAsync(engine, scope, EmptyFolderRemoval.RecycleBin);

        Assert.That(media.Recycled, Is.EqualTo([c, b, a]));
        Assert.That(media.Deleted, Is.Empty);
        Assert.That(summary.FoldersRemoved, Is.EqualTo(3));
        Assert.That(summary.Moved, Is.EqualTo(0));
        Assert.That(summary.Failed, Is.EqualTo(0));
        Assert.That(media.Items.Keys, Does.Contain(scope));
        Assert.That(media.GetChildren(scope), Is.Empty);
        var records = FolderRecords(log).ToList();
        Assert.That(records.Select(r => r.MediaKey), Is.EqualTo([c, b, a]));
        foreach (var r in records)
        {
            Assert.That(r.Success, Is.True);
            Assert.That(r.ToParentKey, Is.Null);
            Assert.That(r.TargetPath, Is.EqualTo(CurationEngine.EmptyFolderRecycledMarker));
        }
        Assert.That(records.Select(r => r.FromParentKey), Is.EqualTo([b, a, scope]));
        Assert.That(records[0].MediaName, Is.EqualTo("C"));
    }

    [Test]
    public async Task Counting_empty_folders_matches_what_cleanup_removes_without_removing_anything()
    {
        var (engine, media, _, log, scope, _) = Setup();
        var a = media.AddFolder("A", scope);
        media.AddFolder("B", a);
        var docs = media.AddFolder("Docs", scope);
        media.AddImage("manual.pdf", docs, contentType: "File");
        media.AddFolder("Empty", scope);

        var count = await engine.CountEmptyFoldersAsync(scope);

        Assert.That(count, Is.EqualTo(3));
        Assert.That(media.Recycled, Is.Empty);
        Assert.That(FolderRecords(log), Is.Empty);
        var summary = await RunAsync(engine, scope, EmptyFolderRemoval.RecycleBin);
        Assert.That(summary.FoldersRemoved, Is.EqualTo(count));
    }

    // A folder an earlier run emptied has no images, so no ruleset shows up in its plan; it still
    // needs a plan (and so a run to record removals in) for its empty sub-folders to be cleaned up.
    [Test]
    public async Task Media_plan_for_a_folder_with_only_empty_subfolders_has_an_empty_plan_for_its_ruleset()
    {
        var (engine, media, _, _, scope, _) = Setup();
        var clicked = media.AddFolder("10", scope);
        media.AddFolder("Old", clicked);

        var plan = await engine.PlanForMediaAsync(clicked);

        var only = TestAssert.Single(plan.Plans);
        Assert.That(only.ScopeFolderKey, Is.EqualTo(scope));
        Assert.That(only.Moves, Is.Empty);
        Assert.That(await engine.CountEmptyFoldersAsync(clicked), Is.EqualTo(1));
    }

    [Test]
    public async Task Cleanup_removes_folders_the_run_emptied()
    {
        var (engine, media, _, _, scope, _) = Setup();
        var old = media.AddFolder("Old", scope);
        media.AddImage("photo.jpg", old, new DateTime(2026, 6, 10));

        var summary = await RunAsync(engine, scope, EmptyFolderRemoval.RecycleBin);

        Assert.That(summary.Moved, Is.EqualTo(1));
        Assert.That(summary.FoldersRemoved, Is.EqualTo(1));
        Assert.That(media.Recycled, Is.EqualTo([old]));
    }

    [Test]
    public async Task Cleanup_keeps_folders_holding_any_media_including_non_images()
    {
        var (engine, media, _, _, scope, _) = Setup();
        var docs = media.AddFolder("Docs", scope);
        var nested = media.AddFolder("Nested", docs);
        media.AddImage("manual.pdf", nested, contentType: "File");
        var empty = media.AddFolder("Empty", scope);

        var summary = await RunAsync(engine, scope, EmptyFolderRemoval.RecycleBin);

        Assert.That(media.Recycled, Is.EqualTo([empty]));
        Assert.That(summary.FoldersRemoved, Is.EqualTo(1));
    }

    [Test]
    public async Task Cleanup_leaves_excluded_folder_subtrees_alone()
    {
        var (engine, media, _, _, scope, exclusions) = Setup();
        var pinned = media.AddFolder("Pinned", scope);
        media.AddFolder("InsidePinned", pinned);
        var plain = media.AddFolder("Plain", scope);
        exclusions.Excluded.Add(pinned);

        var summary = await RunAsync(engine, scope, EmptyFolderRemoval.RecycleBin);

        Assert.That(media.Recycled, Is.EqualTo([plain]));
        Assert.That(summary.FoldersRemoved, Is.EqualTo(1));
    }

    [Test]
    public async Task Cleanup_does_nothing_when_the_processed_folder_is_under_an_excluded_folder()
    {
        var (engine, media, _, _, scope, exclusions) = Setup();
        media.AddFolder("Empty", scope);
        media.Items[scope] = media.Items[scope] with { ParentKey = Guid.Empty };
        exclusions.Excluded.Add(scope);

        var summary = await RunAsync(engine, scope, EmptyFolderRemoval.RecycleBin);

        Assert.That(media.Recycled, Is.Empty);
        Assert.That(summary.FoldersRemoved, Is.EqualTo(0));
    }

    [Test]
    public async Task Cleanup_keeps_empty_ruleset_scope_roots_and_the_folders_leading_to_them()
    {
        var (engine, media, rulesets, _, scope, _) = Setup();
        var parent = media.AddFolder("Brands", scope);
        var nestedScope = media.AddFolder("Acme", parent);
        rulesets.ByScope[nestedScope] = new Ruleset { ScopeRootKey = nestedScope, Name = "Acme rules", Rules = [] };
        var other = media.AddFolder("Other", scope);

        var summary = await RunAsync(engine, scope, EmptyFolderRemoval.RecycleBin);

        Assert.That(media.Recycled, Is.EqualTo([other]));
        Assert.That(summary.FoldersRemoved, Is.EqualTo(1));
    }

    [Test]
    public async Task Cleanup_can_delete_permanently()
    {
        var (engine, media, _, log, scope, _) = Setup();
        var a = media.AddFolder("A", scope);
        var b = media.AddFolder("B", a);

        var summary = await RunAsync(engine, scope, EmptyFolderRemoval.Delete);

        Assert.That(media.Deleted, Is.EqualTo([b, a]));
        Assert.That(media.Recycled, Is.Empty);
        Assert.That(summary.FoldersRemoved, Is.EqualTo(2));
        foreach (var r in FolderRecords(log))
        {
            Assert.That(r.TargetPath, Is.EqualTo(CurationEngine.EmptyFolderDeletedMarker));
        }
    }

    [Test]
    public async Task Cleanup_records_failures_and_carries_on()
    {
        var (engine, media, _, log, scope, _) = Setup();
        var stuck = media.AddFolder("Stuck", scope);
        var inner = media.AddFolder("Inner", stuck);
        var fine = media.AddFolder("Fine", scope);
        media.ThrowOnRemove.Add(inner);

        var summary = await RunAsync(engine, scope, EmptyFolderRemoval.RecycleBin);

        // Inner could not go, so Stuck (which would take it along) stays too; Fine is still removed.
        Assert.That(media.Recycled, Is.EqualTo([fine]));
        Assert.That(summary.FoldersRemoved, Is.EqualTo(1));
        Assert.That(summary.Failed, Is.EqualTo(0));
        var failure = TestAssert.Single(FolderRecords(log), r => !r.Success);
        Assert.That(failure.MediaKey, Is.EqualTo(inner));
        Assert.That(failure.Note, Is.EqualTo("cannot remove"));
    }

    [Test]
    public async Task Execute_without_cleanup_and_plan_never_remove_folders()
    {
        var (engine, media, _, log, scope, _) = Setup();
        media.AddFolder("Empty", scope);

        var plan = await engine.PlanAsync(scope, recursive: true);
        var summary = await engine.ExecuteAsync(plan, "manual");
        var explicitNone = await engine.ExecuteAsync(plan, "manual", EmptyFolderRemoval.None);

        Assert.That(media.Recycled, Is.Empty);
        Assert.That(media.Deleted, Is.Empty);
        Assert.That(FolderRecords(log), Is.Empty);
        Assert.That(summary.FoldersRemoved, Is.EqualTo(0));
        Assert.That(explicitNone.FoldersRemoved, Is.EqualTo(0));
    }

    [Test]
    public async Task Media_cleanup_is_rooted_at_the_clicked_folder_and_logged_in_the_run_containing_it()
    {
        var (engine, media, rulesets, log, scope, _) = Setup();
        var clicked = media.AddFolder("Clicked", scope);
        var inside = media.AddFolder("Inside", clicked);
        var outside = media.AddFolder("Outside", scope);
        var nestedScope = media.AddFolder("Nested", clicked);
        rulesets.ByScope[nestedScope] = new Ruleset { ScopeRootKey = nestedScope, Name = "Nested rules", Rules = [] };
        var deeper = media.AddFolder("Deeper", nestedScope);
        var outerRun = Guid.NewGuid();
        var nestedRun = Guid.NewGuid();
        ExecutedPlan Executed(Guid scopeKey, Guid run) => new(new CurationPlan(scopeKey, Guid.NewGuid(), "r", [], []), run);

        var removed = await engine.RemoveEmptyFoldersForMediaAsync(
            clicked, [Executed(scope, outerRun), Executed(nestedScope, nestedRun)], EmptyFolderRemoval.RecycleBin);

        Assert.That(removed, Is.EqualTo(2));
        Assert.That(media.Recycled, Is.EqualTo([inside, deeper]));
        Assert.That(media.Recycled, Does.Not.Contain(outside));
        Assert.That(media.Recycled, Does.Not.Contain(clicked));
        Assert.That(log.Items.Single(i => i.MediaKey == deeper).RunKey, Is.EqualTo(nestedRun));
        Assert.That(log.Items.Single(i => i.MediaKey == inside).RunKey, Is.EqualTo(outerRun));
    }

    [Test]
    public async Task Media_cleanup_falls_back_to_the_last_run_and_skips_images_and_no_runs()
    {
        var (engine, media, _, log, scope, _) = Setup();
        var clicked = media.AddFolder("Clicked", scope);
        var empty = media.AddFolder("Empty", clicked);
        var img = media.AddImage("photo.jpg", scope);
        var unrelated = Guid.NewGuid();
        var last = Guid.NewGuid();
        ExecutedPlan Executed(Guid scopeKey, Guid run) => new(new CurationPlan(scopeKey, Guid.NewGuid(), "r", [], []), run);

        Assert.That(await engine.RemoveEmptyFoldersForMediaAsync(img, [Executed(scope, last)], EmptyFolderRemoval.RecycleBin), Is.EqualTo(0));
        Assert.That(await engine.RemoveEmptyFoldersForMediaAsync(clicked, [], EmptyFolderRemoval.RecycleBin), Is.EqualTo(0));
        Assert.That(await engine.RemoveEmptyFoldersForMediaAsync(clicked, [Executed(scope, last)], EmptyFolderRemoval.None), Is.EqualTo(0));
        Assert.That(media.Recycled, Is.Empty);

        var removed = await engine.RemoveEmptyFoldersForMediaAsync(
            clicked, [Executed(Guid.NewGuid(), unrelated), Executed(Guid.NewGuid(), last)], EmptyFolderRemoval.RecycleBin);

        Assert.That(removed, Is.EqualTo(1));
        Assert.That(media.Recycled, Is.EqualTo([empty]));
        Assert.That(log.Items.Single(i => i.MediaKey == empty).RunKey, Is.EqualTo(last));
    }

    // ----- Sorting after a run -----

    private static void UseRules(InMemoryRulesets rulesets, Guid scope, params RuleNode[] rules)
        => rulesets.ByScope[scope].Rules = [.. rules];

    private static RuleNode DateRule(string format, params RuleNode[] children)
        => new() { ProviderAlias = DateFolderProvider.ProviderAlias, Settings = CurationContexts.Settings(("format", format)), Children = [.. children] };

    private static Guid Folder(FakeMedia media, Guid parent, params string[] path)
        => path.Aggregate(parent, (current, name) => media.GetChildren(current).Single(c => c.IsFolder && c.Name == name).Key);

    [Test]
    public async Task Execute_sorts_folders_first_then_other_media_naturally()
    {
        var (engine, media, _, _, scope, _) = Setup();
        media.AddImage("doc 10.pdf", scope, contentType: "File");
        media.AddImage("b.pdf", scope, contentType: "File");
        var archive = media.AddFolder("Archive", scope);
        media.AddImage("keep.pdf", archive, contentType: "File");
        media.AddImage("doc 2.pdf", scope, contentType: "File");
        media.AddImage("photo 10.jpg", scope, new DateTime(2026, 6, 1));
        media.AddImage("A.pdf", scope, contentType: "File");
        media.AddImage("Photo 2.jpg", scope, new DateTime(2026, 6, 2));
        media.AddImage("alpha.jpg", scope, new DateTime(2026, 6, 3));
        media.AddImage("old.jpg", scope, new DateTime(2025, 1, 3));

        await RunAsync(engine, scope, EmptyFolderRemoval.RecycleBin);

        // The year level is the Date rule's: years in order, an editor's folder that is not a year last.
        Assert.That(media.ChildNames(scope), Is.EqualTo(["2025", "2026", "Archive", "A.pdf", "b.pdf", "doc 2.pdf", "doc 10.pdf"]));
        Assert.That(media.ChildNames(Folder(media, scope, "2026", "06")), Is.EqualTo(["alpha.jpg", "Photo 2.jpg", "photo 10.jpg"]));
    }

    [Test]
    public async Task Execute_orders_month_name_folders_in_calendar_order()
    {
        var (engine, media, rulesets, _, scope, _) = Setup();
        UseRules(rulesets, scope, DateRule("yyyy/MMM"));
        foreach (var month in new[] { 12, 8, 1, 10, 2 })
        {
            media.AddImage($"m{month}.jpg", scope, new DateTime(2026, month, 5));
        }

        await RunAsync(engine, scope, EmptyFolderRemoval.None);

        // Alphabetically: Aug, Dec, Feb, Jan, Oct.
        Assert.That(media.ChildNames(Folder(media, scope, "2026")), Is.EqualTo(["Jan", "Feb", "Aug", "Oct", "Dec"]));
    }

    [Test]
    public async Task Execute_orders_each_level_of_a_nested_ruleset_by_its_own_provider()
    {
        var (engine, media, rulesets, _, scope, _) = Setup();
        UseRules(rulesets, scope, DateRule("yyyy", new RuleNode { ProviderAlias = NameColorProvider.ProviderAlias, Fallback = UnresolvedBehavior.Unsorted }));
        media.AddImage("gray a.jpg", scope, new DateTime(2026, 3, 1));
        media.AddImage("mystery b.jpg", scope, new DateTime(2026, 3, 1));
        media.AddImage("blue c.jpg", scope, new DateTime(2026, 3, 1));
        media.AddImage("red d.jpg", scope, new DateTime(2026, 3, 1));
        media.AddImage("green e.jpg", scope, new DateTime(2024, 3, 1));
        media.AddImage("cyan f.jpg", scope, new DateTime(2025, 3, 1));

        await RunAsync(engine, scope, EmptyFolderRemoval.None);

        Assert.That(media.ChildNames(scope), Is.EqualTo(["2024", "2025", "2026"]));
        // Palette order (Red … Blue … Gray), the Unsorted fallback last; alphabetically Blue, Gray, Red, Unsorted.
        Assert.That(media.ChildNames(Folder(media, scope, "2026")), Is.EqualTo(["Red", "Blue", "Gray", "Unsorted"]));
    }

    [Test]
    public async Task Levels_claimed_by_two_different_rules_and_editor_folders_are_ordered_naturally()
    {
        var (engine, media, rulesets, _, scope, _) = Setup();
        // Images with a colour name go under Red/Jan…; others skip the colour level and land in Jan… directly,
        // so the scope level holds folders from two rules.
        UseRules(rulesets, scope, new RuleNode
        {
            ProviderAlias = NameColorProvider.ProviderAlias,
            Fallback = UnresolvedBehavior.Skip,
            Children = [DateRule("MMM")],
        });
        media.AddImage("red a.jpg", scope, new DateTime(2026, 1, 1));
        media.AddImage("blue b.jpg", scope, new DateTime(2026, 1, 1));
        media.AddImage("x.jpg", scope, new DateTime(2026, 2, 1));
        media.AddImage("y.jpg", scope, new DateTime(2026, 1, 1));
        var old = media.AddFolder("Old", scope);
        foreach (var name in new[] { "Shoot 10", "shoot 2", "Alpha" })
        {
            media.AddImage("keep.pdf", media.AddFolder(name, old), contentType: "File");
        }

        await RunAsync(engine, scope, EmptyFolderRemoval.None);

        Assert.That(media.ChildNames(scope), Is.EqualTo(["Blue", "Feb", "Jan", "Old", "Red"]));
        Assert.That(media.ChildNames(old), Is.EqualTo(["Alpha", "shoot 2", "Shoot 10"]));
    }

    [Test]
    public async Task Folders_already_in_order_are_not_sorted_again()
    {
        var (engine, media, _, _, scope, _) = Setup();
        media.AddImage("b.jpg", scope, new DateTime(2026, 6, 1));
        media.AddImage("a.jpg", scope, new DateTime(2026, 6, 1));
        media.AddImage("c.jpg", scope, new DateTime(2025, 6, 1));

        await RunAsync(engine, scope, EmptyFolderRemoval.None);
        Assert.That(media.Sorted, Is.Not.Empty);
        media.Sorted.Clear();

        await RunAsync(engine, scope, EmptyFolderRemoval.None);

        Assert.That(media.Sorted, Is.Empty);
    }

    [Test]
    public async Task Plans_and_moves_only_execution_never_sort()
    {
        var (engine, media, _, _, scope, _) = Setup();
        media.AddFolder("Zeta", scope);
        media.AddFolder("Alpha", scope);
        media.AddImage("photo.jpg", scope, new DateTime(2026, 6, 10));

        var plan = await engine.PlanAsync(scope, recursive: true);
        await engine.PlanForMediaAsync(scope);
        Assert.That(media.Sorted, Is.Empty);

        await engine.ExecuteAsync(plan, "manual");

        Assert.That(media.Sorted, Is.Empty);
        Assert.That(media.ChildNames(scope), Is.EqualTo(["Zeta", "Alpha", "2026"]));
    }

    [Test]
    public async Task A_sort_failure_is_logged_and_the_run_still_succeeds()
    {
        var logger = new ListLogger<CurationEngine>();
        var (engine, media, _, log, scope, _) = Setup(logger);
        media.AddFolder("Zeta", scope);
        media.AddImage("photo.jpg", scope, new DateTime(2026, 6, 10));
        media.ThrowOnSort = true;

        var summary = await RunAsync(engine, scope, EmptyFolderRemoval.None);

        Assert.That(summary.Moved, Is.EqualTo(1));
        Assert.That(summary.Failed, Is.EqualTo(0));
        Assert.That(log.Completed, Is.EqualTo(1));
        Assert.That(logger.Entries.Any(e => e.Level == Microsoft.Extensions.Logging.LogLevel.Warning && e.Message.Contains("sort")), Is.True);
        // Sorting is not part of the run log.
        foreach (var i in log.Items)
        {
            Assert.That(i.MediaName, Is.EqualTo(media.Items[i.MediaKey].Name));
        }
    }

    [Test]
    public async Task Media_action_sorts_the_clicked_folder_tree_and_new_paths_once()
    {
        var (engine, media, _, _, scope, _) = Setup();
        var untouched = media.AddFolder("Zeta", scope);
        media.AddImage("keep.pdf", media.AddFolder("b", untouched), contentType: "File");
        media.AddImage("keep.pdf", media.AddFolder("a", untouched), contentType: "File");
        var inbox = media.AddFolder("Inbox", scope);
        media.AddImage("keep.pdf", media.AddFolder("b", inbox), contentType: "File");
        media.AddImage("keep.pdf", media.AddFolder("A", inbox), contentType: "File");
        media.AddImage("june.jpg", inbox, new DateTime(2026, 6, 1));
        media.AddImage("jan.jpg", inbox, new DateTime(2026, 1, 1));

        var mediaPlan = await engine.PlanForMediaAsync(inbox);
        var executed = new List<ExecutedPlan>();
        foreach (var plan in mediaPlan.Plans)
        {
            executed.Add(new ExecutedPlan(plan, (await engine.ExecuteAsync(plan, "manual")).RunKey));
        }

        Assert.That(media.Sorted, Is.Empty);
        var sorted = await engine.SortFoldersForMediaAsync(inbox, executed);

        Assert.That(media.ChildNames(inbox), Is.EqualTo(["A", "b"]));
        Assert.That(media.ChildNames(Folder(media, scope, "2026")), Is.EqualTo(["01", "06"]));
        Assert.That(media.ChildNames(scope), Is.EqualTo(["2026", "Inbox", "Zeta"]));
        // Not below the clicked folder nor on a new path: left alone.
        Assert.That(media.ChildNames(untouched), Is.EqualTo(["b", "a"]));
        Assert.That(media.Sorted.Distinct().Count(), Is.EqualTo(media.Sorted.Count));
        Assert.That(sorted, Is.EqualTo(media.Sorted.Count));
    }

    [Test]
    public async Task Media_action_for_a_single_image_sorts_the_folders_along_its_new_path()
    {
        var (engine, media, _, _, scope, _) = Setup();
        var year = media.AddFolder("2026", scope);
        media.AddImage("keep.pdf", media.AddFolder("06", year), contentType: "File");
        media.AddImage("keep.pdf", media.AddFolder("01", year), contentType: "File");
        var other = media.AddFolder("Other", scope);
        media.AddImage("keep.pdf", media.AddFolder("b", other), contentType: "File");
        media.AddImage("keep.pdf", media.AddFolder("a", other), contentType: "File");
        var img = media.AddImage("photo.jpg", scope, new DateTime(2026, 6, 1));

        var plan = TestAssert.Single((await engine.PlanForMediaAsync(img)).Plans);
        var run = await engine.ExecuteAsync(plan, "manual");
        await engine.SortFoldersForMediaAsync(img, [new ExecutedPlan(plan, run.RunKey)]);

        Assert.That(media.ChildNames(year), Is.EqualTo(["01", "06"]));
        Assert.That(media.ChildNames(other), Is.EqualTo(["b", "a"]));
    }

    [Test]
    public async Task Media_action_sorting_does_nothing_when_every_run_was_vetoed()
    {
        var (engine, media, _, _, scope, _) = Setup();
        media.AddFolder("Zeta", scope);
        media.AddFolder("Alpha", scope);
        var plan = new CurationPlan(scope, Guid.NewGuid(), "r", [], []);

        Assert.That(await engine.SortFoldersForMediaAsync(scope, [new ExecutedPlan(plan, Guid.Empty)]), Is.EqualTo(0));
        Assert.That(media.Sorted, Is.Empty);
    }

    [Test]
    public async Task Categorize_sorts_only_the_folders_along_the_target_path()
    {
        var (engine, media, _, _, scope, _) = Setup();
        var other = media.AddFolder("Other", scope);
        media.AddImage("keep.pdf", media.AddFolder("b", other), contentType: "File");
        media.AddImage("keep.pdf", media.AddFolder("a", other), contentType: "File");
        var year = media.AddFolder("2026", scope);
        media.AddImage("keep.pdf", media.AddFolder("06", year), contentType: "File");
        media.AddImage("keep.pdf", media.AddFolder("01", year), contentType: "File");
        var img = media.AddImage("photo.jpg", scope, new DateTime(2026, 6, 1));
        media.AddImage("z.jpg", Folder(media, scope, "2026", "06"), new DateTime(2026, 6, 1));

        var plan = TestAssert.Single((await engine.PlanForMediaAsync(img)).Plans);
        await engine.ExecuteAsync(plan, "automate", new CurationExecutionOptions { Sorting = FolderSorting.TargetPaths });

        Assert.That(media.ChildNames(scope), Is.EqualTo(["2026", "Other"]));
        Assert.That(media.ChildNames(year), Is.EqualTo(["01", "06"]));
        Assert.That(media.ChildNames(Folder(media, year, "06")), Is.EqualTo(["keep.pdf", "photo.jpg", "z.jpg"]));
        Assert.That(media.ChildNames(other), Is.EqualTo(["b", "a"]));
        Assert.That(media.Sorted.Count, Is.EqualTo(3));
    }

    [Test]
    public async Task Excluded_folders_keep_their_contents_order()
    {
        var (engine, media, _, _, scope, exclusions) = Setup();
        var pinned = media.AddFolder("Pinned", scope);
        media.AddImage("keep.pdf", media.AddFolder("b", pinned), contentType: "File");
        media.AddImage("keep.pdf", media.AddFolder("a", pinned), contentType: "File");
        exclusions.Excluded.Add(pinned);

        await RunAsync(engine, scope, EmptyFolderRemoval.None);

        Assert.That(media.ChildNames(pinned), Is.EqualTo(["b", "a"]));
    }

    /// <summary>Tags each image after its name ("cat-1.jpg" → "cat"), slowly, and records how many
    /// analyses overlapped and how often each image was analysed.</summary>
    private sealed class SlowTaggingRecognition : Umbricians.MediaCurator.Recognition.IRecognitionService
    {
        private int _running;
        public int MaxConcurrent;
        public readonly System.Collections.Concurrent.ConcurrentDictionary<Guid, int> Calls = new();
        public FakeMedia? Media;

        public async Task<Umbricians.MediaCurator.Recognition.RecognitionResult?> AnalyzeAsync(
            Guid mediaKey,
            bool force = false,
            string? classificationSchemeAlias = null,
            CancellationToken cancellationToken = default)
        {
            Calls.AddOrUpdate(mediaKey, 1, (_, n) => n + 1);
            var now = Interlocked.Increment(ref _running);
            lock (Calls)
            {
                MaxConcurrent = Math.Max(MaxConcurrent, now);
            }

            try
            {
                await Task.Delay(50, cancellationToken);
                var tag = Media!.Items[mediaKey].Name.Split('-')[0];
                return new Umbricians.MediaCurator.Recognition.RecognitionResult([new Umbricians.MediaCurator.Recognition.AiTag(tag, 0.9)], tag);
            }
            finally
            {
                Interlocked.Decrement(ref _running);
            }
        }
    }

    private static (CurationEngine Engine, FakeMedia Media, Guid Scope, SlowTaggingRecognition Recognition, TestParallelWork Parallel) SetupAiTags(
        int parallelism,
        RuleNode? rule = null)
    {
        var media = new FakeMedia();
        var scope = media.AddFolder("Library", Guid.Empty);
        var rulesets = new InMemoryRulesets();
        rulesets.ByScope[scope] = new Ruleset
        {
            ScopeRootKey = scope,
            Name = "Subjects",
            CultureName = "en-US",
            Rules = [rule ?? new RuleNode { ProviderAlias = AiTagProvider.ProviderAlias }],
        };

        var recognition = new SlowTaggingRecognition { Media = media };
        var services = new ServiceCollection()
            .AddSingleton<Umbricians.MediaCurator.Recognition.IRecognitionService>(recognition)
            .BuildServiceProvider();
        var parallel = new TestParallelWork(parallelism, services);
        var ancestry = new FakeAncestry { Media = media };
        var engine = new CurationEngine(
            new RulesetResolver(rulesets, ancestry),
            rulesets,
            new RuleChainExecutor(new CurationProviderCollection(() => [new AiTagProvider(), new DateFolderProvider()])),
            media,
            new StubExif(),
            new FakeRunLog(),
            recognition,
            new StubExclusions(),
            ancestry,
            new Umbraco.Cms.Core.Events.EventAggregator(type => new ServiceCollection().BuildServiceProvider().GetService(type)!),
            NullLogger<CurationEngine>.Instance,
            parallel);
        return (engine, media, scope, recognition, parallel);
    }

    [Test]
    public async Task Planning_analyses_images_in_parallel_once_each()
    {
        var (engine, media, scope, recognition, parallel) = SetupAiTags(parallelism: 4);
        var images = Enumerable.Range(1, 8)
            .Select(i => media.AddImage($"{(i % 2 == 0 ? "cat" : "dog")}-{i}.jpg", scope))
            .ToList();

        var plan = await engine.PlanAsync(scope, recursive: true);

        Assert.That(plan.Moves.Count, Is.EqualTo(8));
        Assert.That(plan.Moves.Count(m => m.TargetPath == "cat"), Is.EqualTo(4));
        Assert.That(plan.Moves.Count(m => m.TargetPath == "dog"), Is.EqualTo(4));
        foreach (var key in images)
        {
            Assert.That(recognition.Calls[key], Is.EqualTo(1));
        }
        Assert.That(parallel.Runs, Is.EqualTo(1));
        Assert.That(recognition.MaxConcurrent, Is.InRange(2, 4));
    }

    [Test]
    public async Task Media_action_plans_analyse_in_parallel_too()
    {
        var (engine, media, scope, recognition, _) = SetupAiTags(parallelism: 3);
        var sub = media.AddFolder("Inbox", scope);
        foreach (var i in Enumerable.Range(1, 6))
        {
            media.AddImage($"bird-{i}.jpg", sub);
        }

        var plan = await engine.PlanForMediaAsync(sub);

        Assert.That(plan.Plans.Single().Moves.Count(m => m.TargetPath == "bird"), Is.EqualTo(6));
        Assert.That(recognition.MaxConcurrent, Is.InRange(2, 3));
    }

    [Test]
    public async Task One_at_a_time_setting_analyses_sequentially()
    {
        var (engine, media, scope, recognition, parallel) = SetupAiTags(parallelism: 1);
        foreach (var i in Enumerable.Range(1, 4))
        {
            media.AddImage($"cat-{i}.jpg", scope);
        }

        var plan = await engine.PlanAsync(scope, recursive: true);

        Assert.That(plan.Moves.Count, Is.EqualTo(4));
        Assert.That(recognition.MaxConcurrent, Is.EqualTo(1));
        Assert.That(parallel.Runs, Is.EqualTo(0));
    }

    [Test]
    public async Task Rulesets_that_never_use_recognition_skip_the_parallel_pass()
    {
        var (engine, media, scope, recognition, parallel) = SetupAiTags(
            parallelism: 4,
            new RuleNode { ProviderAlias = DateFolderProvider.ProviderAlias, Settings = CurationContexts.Settings(("format", "yyyy")) });
        foreach (var i in Enumerable.Range(1, 4))
        {
            media.AddImage($"cat-{i}.jpg", scope, new DateTime(2025, 1, i));
        }

        var plan = await engine.PlanAsync(scope, recursive: true);

        foreach (var m in plan.Moves)
        {
            Assert.That(m.TargetPath, Is.EqualTo("2025"));
        }
        Assert.That(recognition.Calls, Is.Empty);
        Assert.That(parallel.Runs, Is.EqualTo(0));
    }
}

