using System.Collections.Concurrent;
using System.Diagnostics;
using System.Globalization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Exif;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Engine;

/// <summary>One item's planned (or executed) move. <paramref name="TargetOrigins"/> parallels
/// <paramref name="TargetSegments"/>: which rule produced each folder level, used to order the
/// folders after the run (null when unknown, e.g. a plan built outside the engine).</summary>
public sealed record PlannedMove(
    Guid MediaKey,
    string MediaName,
    Guid FromParentKey,
    IReadOnlyList<string> TargetSegments,
    bool AlreadyInPlace,
    string? Note,
    IReadOnlyList<FolderSegmentOrigin>? TargetOrigins = null)
{
    public string TargetPath => string.Join("/", TargetSegments);
}

/// <summary>The result of planning a curation run. The plan IS the dry-run: nothing moves
/// until it is executed (§11.2).</summary>
public sealed record CurationPlan(
    Guid ScopeFolderKey,
    Guid RulesetKey,
    string RulesetName,
    IReadOnlyList<PlannedMove> Moves,
    IReadOnlyList<string> SkippedItems)
{
    public int MoveCount => Moves.Count(m => !m.AlreadyInPlace);
}

/// <summary>The result of planning a curation of one media item or folder tree: one plan per
/// governing ruleset (only the items under the media), plus items no ruleset governs.</summary>
public sealed record MediaCurationPlan(
    Guid MediaKey,
    IReadOnlyList<CurationPlan> Plans,
    IReadOnlyList<string> Skipped);

/// <summary>Thrown when planning for a media key that does not exist.</summary>
public sealed class MediaNotFoundException : Exception
{
    public MediaNotFoundException(Guid mediaKey)
        : base($"Media item '{mediaKey}' was not found.")
    {
        MediaKey = mediaKey;
    }

    public Guid MediaKey { get; }
}

public interface ICurationEngine
{
    /// <summary>Pure: computes what would move where. Shared by dry-run preview and execute.</summary>
    Task<CurationPlan> PlanAsync(Guid scopeFolderKey, bool recursive, CancellationToken cancellationToken = default);

    /// <summary>Plans a single image, or every image under a folder (recursively). Each image is
    /// curated by its nearest enabled ruleset, relative to that ruleset's scope root, so the
    /// result holds one plan per ruleset. Execute each plan separately (one run log entry each).
    /// Throws <see cref="MediaNotFoundException"/> when the media does not exist.</summary>
    Task<MediaCurationPlan> PlanForMediaAsync(Guid mediaKey, CancellationToken cancellationToken = default);

    /// <summary>Executes a plan: idempotent folder creation + moves via the media service,
    /// recording every move in the activity log. Moves only: removes and sorts no folders.</summary>
    Task<CurationRunSummary> ExecuteAsync(CurationPlan plan, string trigger, CancellationToken cancellationToken = default)
        => ExecuteAsync(plan, trigger, CurationExecutionOptions.MovesOnly, cancellationToken);

    /// <summary>A whole-scope run: executes a plan, then (unless <paramref name="emptyFolders"/> is None)
    /// removes every empty sub-folder below the plan's scope folder, recording each in the same run,
    /// and finally sorts the scope folder and every folder below it (<see cref="FolderSorting.Subtree"/>).</summary>
    Task<CurationRunSummary> ExecuteAsync(CurationPlan plan, string trigger, EmptyFolderRemoval emptyFolders, CancellationToken cancellationToken = default)
        => ExecuteAsync(plan, trigger, new CurationExecutionOptions { EmptyFolders = emptyFolders, Sorting = FolderSorting.Subtree }, cancellationToken);

    /// <summary>Executes a plan (moves), then the end-of-run steps <paramref name="options"/> asks for:
    /// empty sub-folder removal below the scope folder, then folder sorting. Sorting is not recorded
    /// in the run log and undo does not restore the previous order; a sorting failure is logged and
    /// never fails the run.</summary>
    Task<CurationRunSummary> ExecuteAsync(CurationPlan plan, string trigger, CurationExecutionOptions options, CancellationToken cancellationToken = default);

    /// <summary>Cleanup after a media-action run (<see cref="PlanForMediaAsync"/> + one
    /// <see cref="ExecuteAsync(CurationPlan, string, CancellationToken)"/> per plan): removes the empty sub-folders
    /// below the clicked folder, once, after every plan has executed. Does nothing when the
    /// media is not a folder or nothing executed. Returns the number of folders removed.</summary>
    Task<int> RemoveEmptyFoldersForMediaAsync(
        Guid mediaKey,
        IReadOnlyList<ExecutedPlan> executed,
        EmptyFolderRemoval emptyFolders,
        CancellationToken cancellationToken = default);

    /// <summary>Sorting after a media-action run (<see cref="PlanForMediaAsync"/> + one
    /// <see cref="ExecuteAsync(CurationPlan, string, CancellationToken)"/> per plan, then
    /// <see cref="RemoveEmptyFoldersForMediaAsync"/>): once, using what every executed plan produced.
    /// For a clicked folder, sorts it and every folder below it, plus the folders along the new paths
    /// of the images it held (which lie outside it when it is inside a scope: targets are relative to
    /// the scope root); for a single image, the folders along its new path (scope root down to its parent). Does nothing when nothing executed. Failures are
    /// logged, never thrown; not recorded in the run log and not restored by undo. Returns the number
    /// of folders re-ordered.</summary>
    Task<int> SortFoldersForMediaAsync(
        Guid mediaKey,
        IReadOnlyList<ExecutedPlan> executed,
        CancellationToken cancellationToken = default);

    /// <summary>The whole media action, as one call (the backoffice's "Curate images", in the foreground or
    /// as a background run): plans the clicked image or folder tree, executes each governing ruleset's
    /// plan (one run log entry each), then removes the empty sub-folders below the clicked folder and
    /// puts its tree in order. Throws <see cref="MediaNotFoundException"/> when the media does not exist.</summary>
    async Task<MediaCurationSummary> CurateMediaAsync(
        Guid mediaKey,
        string trigger,
        EmptyFolderRemoval emptyFolders,
        IProgress<CurationProgress>? progress = null,
        CancellationToken cancellationToken = default)
    {
        var plan = await PlanForMediaAsync(mediaKey, cancellationToken);
        var total = plan.Plans.Sum(p => p.MoveCount);
        progress?.Report(new CurationProgress(0, total));

        int moved = 0, inPlace = 0, failed = 0, done = 0;
        var runKeys = new List<Guid>();
        var executed = new List<ExecutedPlan>();
        foreach (var p in plan.Plans)
        {
            var before = done;
            var options = new CurationExecutionOptions
            {
                MoveProgress = progress is null ? null : new InlineProgress<int>(n => progress.Report(new CurationProgress(before + n, total))),
            };
            var summary = await ExecuteAsync(p, trigger, options, cancellationToken);
            executed.Add(new ExecutedPlan(p, summary.RunKey));
            moved += summary.Moved;
            inPlace += summary.AlreadyInPlace;
            failed += summary.Failed;
            done = before + summary.Moved + summary.Failed;

            // A vetoed run (cancelled by a notification handler) has no run entry.
            if (summary.RunKey != Guid.Empty)
            {
                runKeys.Add(summary.RunKey);
            }
        }

        // Once, after every plan has run, rooted at the clicked folder (never for a single image).
        var foldersRemoved = await RemoveEmptyFoldersForMediaAsync(mediaKey, executed, emptyFolders, cancellationToken);

        // Then, once, put the clicked folder's tree (or a single image's new path) in order.
        await SortFoldersForMediaAsync(mediaKey, executed, cancellationToken);

        return new MediaCurationSummary(moved, inPlace, failed, foldersRemoved, runKeys);
    }

    /// <summary>How many images are below the folder (or 1 for an image), counted without loading them:
    /// decides whether "Curate images" runs in the background.</summary>
    int CountImages(Guid mediaKey);

    /// <summary>How many empty sub-folders below <paramref name="folderKey"/> a cleanup would remove
    /// right now (same rules, nothing removed). Zero when the media is not a folder.</summary>
    Task<int> CountEmptyFoldersAsync(Guid folderKey, CancellationToken cancellationToken = default);
}

/// <summary>What happens to empty sub-folders at the end of a run.</summary>
public enum EmptyFolderRemoval
{
    /// <summary>Leave them alone (the default, and always the case for plans/dry runs).</summary>
    None,

    /// <summary>Move them to the Recycle Bin (recoverable; undo restores them).</summary>
    RecycleBin,

    /// <summary>Delete them permanently (undo recreates them by name).</summary>
    Delete,
}

/// <summary>How folders are put in order at the end of an executed run: child folders first, then
/// the other media A→Z. Each folder level is ordered by the provider that produced it in the run
/// (<see cref="ICurationFolderOrder"/>); other levels naturally. Plans/dry runs never sort.</summary>
public enum FolderSorting
{
    /// <summary>Leave the order alone.</summary>
    None,

    /// <summary>Sort the children of the plan's scope folder and of every folder below it.</summary>
    Subtree,

    /// <summary>Sort only the folders along each planned move's target path: the scope folder down to
    /// the item's new parent (e.g. a single item curated by an automation).</summary>
    TargetPaths,
}

/// <summary>What happens at the end of an executed run, after the moves.</summary>
public sealed record CurationExecutionOptions
{
    /// <summary>Moves only: no empty-folder removal, no sorting.</summary>
    public static CurationExecutionOptions MovesOnly { get; } = new();

    /// <summary>Empty sub-folder removal below the plan's scope folder (runs before sorting).</summary>
    public EmptyFolderRemoval EmptyFolders { get; init; } = EmptyFolderRemoval.None;

    /// <summary>Folder sorting, after removal.</summary>
    public FolderSorting Sorting { get; init; } = FolderSorting.None;

    /// <summary>Told how many of the plan's moves have been attempted so far, after each one.</summary>
    public IProgress<int>? MoveProgress { get; init; }
}

/// <summary>How far a media-action run has got: moves attempted so far, of the moves planned.</summary>
public sealed record CurationProgress(int Processed, int Total);

/// <summary>Reports on the calling thread, unlike <see cref="Progress{T}"/>, which posts to the
/// synchronization context or thread pool and so can report out of order.</summary>
internal sealed class InlineProgress<T>(Action<T> report) : IProgress<T>
{
    public void Report(T value) => report(value);
}

/// <summary>The result of <see cref="ICurationEngine.CurateMediaAsync"/>: totals over every governing
/// ruleset's run, and those runs' log entries.</summary>
public sealed record MediaCurationSummary(int Moved, int AlreadyInPlace, int Failed, int FoldersRemoved, IReadOnlyList<Guid> RunKeys);

/// <summary>A plan that was executed, with the run log entry it produced.</summary>
public sealed record ExecutedPlan(CurationPlan Plan, Guid RunKey);

/// <summary><see cref="FoldersRemoved"/> counts empty folders removed at the end of the run; it is
/// not part of Moved/AlreadyInPlace/Failed.</summary>
public sealed record CurationRunSummary(Guid RunKey, int Moved, int AlreadyInPlace, int Failed, int FoldersRemoved = 0);

internal sealed class CurationEngine : ICurationEngine
{
    /// <summary>v1 image filter: items participate only when their media type is in this list (§13).</summary>
    public static readonly string[] ImageMediaTypes = ["Image"];

    /// <summary>Run log <c>targetPath</c> marking an empty folder moved to the Recycle Bin.</summary>
    public const string EmptyFolderRecycledMarker = "(empty folder recycled)";

    /// <summary>Run log <c>targetPath</c> marking an empty folder deleted permanently.</summary>
    public const string EmptyFolderDeletedMarker = "(empty folder deleted)";

    private readonly IRulesetResolver _resolver;
    private readonly IRulesetRepository _rulesets;
    private readonly RuleChainExecutor _executor;
    private readonly IMediaOperations _media;
    private readonly IExifReader _exifReader;
    private readonly ICurationRunLog _runLog;
    private readonly Recognition.IRecognitionService _recognition;
    private readonly IExclusionRepository _exclusions;
    private readonly IMediaAncestry _ancestry;
    private readonly global::Umbraco.Cms.Core.Events.IEventAggregator _events;
    private readonly ILogger<CurationEngine> _logger;
    private readonly IParallelMediaWork? _parallel;

    /// <summary>Recognition results for this engine's lifetime (one request or job), keyed by item and
    /// scheme, so a parallel prefetch and the rule pass that follows share one AI call per image.</summary>
    private readonly ConcurrentDictionary<RecognitionRequest, Task<Recognition.RecognitionResult?>> _recognitionMemo = new();

    /// <summary>Discovery rounds per plan: each round can uncover recognition needed only once earlier
    /// results are known (e.g. a conditional rule on a classification code).</summary>
    private const int MaxPrefetchRounds = 3;

    public CurationEngine(
        IRulesetResolver resolver,
        IRulesetRepository rulesets,
        RuleChainExecutor executor,
        IMediaOperations media,
        IExifReader exifReader,
        ICurationRunLog runLog,
        Recognition.IRecognitionService recognition,
        IExclusionRepository exclusions,
        IMediaAncestry ancestry,
        global::Umbraco.Cms.Core.Events.IEventAggregator events,
        ILogger<CurationEngine> logger,
        IParallelMediaWork? parallel = null)
    {
        _parallel = parallel;
        _events = events;
        _resolver = resolver;
        _rulesets = rulesets;
        _executor = executor;
        _media = media;
        _exifReader = exifReader;
        _runLog = runLog;
        _recognition = recognition;
        _exclusions = exclusions;
        _ancestry = ancestry;
        _logger = logger;
    }

    public async Task<CurationPlan> PlanAsync(Guid scopeFolderKey, bool recursive, CancellationToken cancellationToken = default)
    {
        var ruleset = await _rulesets.GetByScopeKeyAsync(scopeFolderKey, cancellationToken);
        if (ruleset is not { Enabled: true })
        {
            throw new InvalidOperationException($"No enabled ruleset is attached to folder '{scopeFolderKey}'.");
        }

        var culture = ResolveCulture(ruleset.CultureName);
        var moves = new List<PlannedMove>();
        var skipped = new List<string>();
        var excluded = await _exclusions.GetAllAsync(cancellationToken);
        var outcomes = await EvaluateAllAsync(
            _media.GetItems(scopeFolderKey, recursive),
            (item, recognize) => EvaluateItemAsync(item, excluded, ruleset, culture, recognize, cancellationToken),
            cancellationToken);

        foreach (var outcome in outcomes)
        {
            if (outcome.Move is not null)
            {
                moves.Add(outcome.Move);
            }
            else if (outcome.Skipped is not null)
            {
                skipped.Add(outcome.Skipped);
            }
        }

        return new CurationPlan(scopeFolderKey, ruleset.Key, ruleset.Name, moves, skipped);
    }

    public async Task<MediaCurationPlan> PlanForMediaAsync(Guid mediaKey, CancellationToken cancellationToken = default)
    {
        var timer = Stopwatch.StartNew();
        var clicked = _media.GetItem(mediaKey)
            ?? throw new MediaNotFoundException(mediaKey);

        var items = clicked.IsFolder ? _media.GetItems(mediaKey, recursive: true) : [clicked];
        var excluded = await _exclusions.GetAllAsync(cancellationToken);

        // One plan per governing ruleset, in order of first appearance; each item is
        // curated by its nearest enabled ruleset and targets are relative to that scope root.
        var groups = new List<(Ruleset Ruleset, CultureInfo Culture, List<PlannedMove> Moves, List<string> Skipped)>();
        var unattributed = new List<string>();
        var outcomes = await EvaluateAllAsync(
            items,
            (item, recognize) => EvaluateItemAsync(item, excluded, expected: null, culture: null, recognize, cancellationToken),
            cancellationToken);

        foreach (var outcome in outcomes)
        {
            if (outcome.Governing is null)
            {
                if (outcome.Skipped is not null)
                {
                    unattributed.Add(outcome.Skipped);
                }

                continue;
            }

            var group = groups.FirstOrDefault(g => g.Ruleset.Key == outcome.Governing.Key);
            if (group.Ruleset is null)
            {
                group = (outcome.Governing, ResolveCulture(outcome.Governing.CultureName), [], []);
                groups.Add(group);
            }

            if (outcome.Move is not null)
            {
                group.Moves.Add(outcome.Move);
            }
            else if (outcome.Skipped is not null)
            {
                group.Skipped.Add(outcome.Skipped);
            }
        }

        // A folder with no images (e.g. one an earlier run emptied) still belongs to its ruleset: an
        // empty plan gives the run its empty sub-folders are cleaned up in, and undone from.
        if (clicked.IsFolder && await _resolver.ResolveForItemAsync(mediaKey, cancellationToken) is { } folderRuleset
            && groups.All(g => g.Ruleset.Key != folderRuleset.Key))
        {
            groups.Add((folderRuleset, ResolveCulture(folderRuleset.CultureName), [], []));
        }

        var plans = groups
            .Select(g => new CurationPlan(g.Ruleset.ScopeRootKey, g.Ruleset.Key, g.Ruleset.Name, g.Moves, g.Skipped))
            .ToList();
        _logger.LogInformation(
            "MediaCurator: planned {Items} items under {MediaKey} ({Moves} to move) in {Elapsed} ms.",
            items.Count,
            mediaKey,
            plans.Sum(p => p.MoveCount),
            timer.ElapsedMilliseconds);
        return new MediaCurationPlan(mediaKey, plans, unattributed);
    }

    public int CountImages(Guid mediaKey)
    {
        var item = _media.GetItem(mediaKey) ?? throw new MediaNotFoundException(mediaKey);
        if (!item.IsFolder)
        {
            return ImageMediaTypes.Contains(item.ContentTypeAlias, StringComparer.OrdinalIgnoreCase) ? 1 : 0;
        }

        return _media.CountDescendants(mediaKey, ImageMediaTypes);
    }

    /// <summary>The verdict for one item: a move, or the reason it is left alone.
    /// <paramref name="Governing"/> is null when the item was ruled out before a ruleset was resolved.</summary>
    private sealed record ItemOutcome(Ruleset? Governing, PlannedMove? Move, string? Skipped);

    /// <summary>One recognition call: an item analysed for a scheme (null for tags only), or with
    /// <paramref name="RefreshOnly"/> its stored AI classification brought up to date.</summary>
    private readonly record struct RecognitionRequest(Guid MediaKey, string? SchemeAlias, bool RefreshOnly = false);

    private delegate Task<Recognition.RecognitionResult?> RecognizeFn(RecognitionRequest request, CancellationToken cancellationToken);

    /// <summary>
    /// Evaluates every item, analysing images in parallel first. AI recognition dominates planning time
    /// and each image's call is independent, while rule evaluation and media reads stay sequential (they
    /// share this request's services). A discovery pass runs the rules with recognition stubbed out to
    /// learn which images need which analysis, the missing results are fetched concurrently, and only the
    /// items that asked for recognition are evaluated again. Items whose rules never touched recognition
    /// keep their first-pass outcome, so date-only rulesets pay nothing extra.
    /// </summary>
    private async Task<IReadOnlyList<ItemOutcome>> EvaluateAllAsync(
        IReadOnlyList<MediaItemInfo> items,
        Func<MediaItemInfo, RecognizeFn, Task<ItemOutcome>> evaluate,
        CancellationToken cancellationToken)
    {
        var outcomes = new ItemOutcome[items.Count];
        var pending = Enumerable.Range(0, items.Count).ToList();
        var prefetch = _parallel is not null
            && items.Count(i => !i.IsFolder) > 1
            && await _parallel.GetMaxParallelismAsync(cancellationToken) > 1;

        for (var round = 0; prefetch && round < MaxPrefetchRounds && pending.Count > 0; round++)
        {
            var demands = new HashSet<RecognitionRequest>();
            var waiting = new List<int>();
            foreach (var index in pending)
            {
                cancellationToken.ThrowIfCancellationRequested();
                var missing = false;
                outcomes[index] = await evaluate(items[index], (request, _) =>
                {
                    if (_recognitionMemo.TryGetValue(request, out var known) && known.IsCompleted)
                    {
                        return known;
                    }

                    missing = true;
                    demands.Add(request);
                    return Task.FromResult<Recognition.RecognitionResult?>(null);
                });

                if (missing)
                {
                    waiting.Add(index);
                }
            }

            pending = waiting;
            if (demands.Count == 0)
            {
                break;
            }

            await PrefetchRecognitionAsync(demands, cancellationToken);
        }

        foreach (var index in pending)
        {
            cancellationToken.ThrowIfCancellationRequested();
            outcomes[index] = await evaluate(items[index], RecognizeMemoizedAsync);
        }

        return outcomes;
    }

    private Task<Recognition.RecognitionResult?> RecognizeMemoizedAsync(RecognitionRequest request, CancellationToken cancellationToken)
        => _recognitionMemo.GetOrAdd(request, r => RunAsync(_recognition, r, cancellationToken));

    private static Task<Recognition.RecognitionResult?> RunAsync(
        Recognition.IRecognitionService recognition,
        RecognitionRequest request,
        CancellationToken cancellationToken)
        => request.RefreshOnly
            ? recognition.RefreshClassificationAsync(request.MediaKey, request.SchemeAlias!, cancellationToken)
            : recognition.AnalyzeAsync(request.MediaKey, force: false, request.SchemeAlias, cancellationToken);

    /// <summary>Runs the missing recognition calls concurrently. An item's calls stay sequential (and
    /// scheme-specific ones first) so one image is never analysed twice at the same time; the later
    /// call then reuses the stored description and tags.</summary>
    private async Task PrefetchRecognitionAsync(IReadOnlyCollection<RecognitionRequest> demands, CancellationToken cancellationToken)
    {
        var perItem = demands
            .GroupBy(d => d.MediaKey)
            .Select(g => g.OrderBy(d => d.SchemeAlias is null).ThenBy(d => d.RefreshOnly).ToList())
            .ToList();

        var results = await _parallel!.RunAsync<List<RecognitionRequest>, (RecognitionRequest Request, Recognition.RecognitionResult? Result)[]>(
            perItem,
            async (services, requests, ct) =>
            {
                var recognition = services.GetRequiredService<Recognition.IRecognitionService>();
                var analysed = new List<(RecognitionRequest, Recognition.RecognitionResult?)>();
                foreach (var request in requests)
                {
                    try
                    {
                        analysed.Add((request, await RunAsync(recognition, request, ct)));
                    }
                    catch (Exception ex) when (ex is not OperationCanceledException)
                    {
                        _logger.LogWarning(ex, "MediaCurator: recognition failed for {MediaKey}.", request.MediaKey);
                        analysed.Add((request, null));
                    }
                }

                return analysed.ToArray();
            },
            cancellationToken);

        foreach (var (request, result) in results.SelectMany(r => r))
        {
            _recognitionMemo[request] = Task.FromResult(result);
        }
    }

    /// <summary>Shared per-item planning. With <paramref name="expected"/> set (scope runs) the item
    /// must be governed by exactly that ruleset; without it (media runs) the nearest enabled
    /// ruleset is used. Targets are always relative to the governing ruleset's scope root.</summary>
    private async Task<ItemOutcome> EvaluateItemAsync(
        MediaItemInfo item,
        IReadOnlySet<Guid> excluded,
        Ruleset? expected,
        CultureInfo? culture,
        RecognizeFn recognize,
        CancellationToken cancellationToken)
    {
        if (item.IsFolder)
        {
            return new ItemOutcome(null, null, null);
        }

        // Pinned/excluded items — or anything under an excluded folder — are never touched (§11.2).
        if (excluded.Count > 0
            && (excluded.Contains(item.Key)
                || _ancestry.GetAncestorOrSelfFolderKeys(item.Key).Any(excluded.Contains)))
        {
            return new ItemOutcome(null, null, $"{item.Name}: excluded");
        }

        if (!ImageMediaTypes.Contains(item.ContentTypeAlias, StringComparer.OrdinalIgnoreCase))
        {
            // Non-image media is ignored, not failed (§3, §13).
            return new ItemOutcome(null, null, $"{item.Name}: ignored (media type '{item.ContentTypeAlias}' is not an image type)");
        }

        // Nearest-ancestor scoping — if a deeper ruleset governs this item,
        // a scope run leaves it alone (the deeper scope wins, §13).
        var governing = await _resolver.ResolveForItemAsync(item.Key, cancellationToken);
        if (expected is not null)
        {
            if (governing is null || governing.Key != expected.Key)
            {
                return new ItemOutcome(null, null, $"{item.Name}: governed by a deeper ruleset ('{governing?.Name ?? "none"}')");
            }
        }
        else if (governing is null)
        {
            return new ItemOutcome(null, null, $"{item.Name}: no ruleset applies");
        }

        var ruleset = governing;
        var scopeFolderKey = ruleset.ScopeRootKey;
        var context = BuildContext(item, scopeFolderKey, culture ?? ResolveCulture(ruleset.CultureName), recognize);
        var result = await _executor.ExecuteAsync(ruleset.Rules, context, cancellationToken);

        if (result.Stopped || !result.HasTarget)
        {
            var reason = result.Stopped ? "rule chain stopped" : "no folder levels resolved";
            return new ItemOutcome(ruleset, null, $"{item.Name}: left in place ({reason})");
        }

        var segments = result.Segments.Select(s => SanitizeFolderName(s.Name)).ToArray();
        var alreadyInPlace = IsAlreadyInPlace(item, scopeFolderKey, segments);
        return new ItemOutcome(ruleset, new PlannedMove(item.Key, item.Name, item.ParentKey, segments, alreadyInPlace, null, result.SegmentOrigins), null);
    }

    public Task<CurationRunSummary> ExecuteAsync(CurationPlan plan, string trigger, CancellationToken cancellationToken = default)
        => ExecuteAsync(plan, trigger, CurationExecutionOptions.MovesOnly, cancellationToken);

    public Task<CurationRunSummary> ExecuteAsync(CurationPlan plan, string trigger, EmptyFolderRemoval emptyFolders, CancellationToken cancellationToken = default)
        => ExecuteAsync(plan, trigger, new CurationExecutionOptions { EmptyFolders = emptyFolders, Sorting = FolderSorting.Subtree }, cancellationToken);

    public async Task<CurationRunSummary> ExecuteAsync(CurationPlan plan, string trigger, CurationExecutionOptions options, CancellationToken cancellationToken = default)
    {
        var emptyFolders = options.EmptyFolders;

        // Developers can veto a run before anything moves (§12).
        var curating = new MediaCuratingNotification(plan, trigger);
        await _events.PublishAsync(curating, cancellationToken);
        if (curating.Cancel)
        {
            return new CurationRunSummary(Guid.Empty, 0, 0, 0, 0);
        }

        var runKey = await _runLog.StartRunAsync(plan.ScopeFolderKey, plan.RulesetKey, trigger, cancellationToken);
        int moved = 0, inPlace = 0, failed = 0;
        var timer = Stopwatch.StartNew();

        foreach (var move in plan.Moves)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (move.AlreadyInPlace)
            {
                inPlace++;
                continue;
            }

            try
            {
                var targetKey = _media.EnsureFolderPath(plan.ScopeFolderKey, move.TargetSegments);
                _media.Move(move.MediaKey, targetKey);
                await _runLog.RecordItemAsync(runKey, move.MediaKey, move.MediaName, move.FromParentKey, targetKey, move.TargetPath, success: true, note: null, cancellationToken);
                moved++;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "MediaCurator: failed to move {MediaKey} to {Path}", move.MediaKey, move.TargetPath);
                await _runLog.RecordItemAsync(runKey, move.MediaKey, move.MediaName, move.FromParentKey, null, move.TargetPath, success: false, note: ex.Message, cancellationToken);
                failed++;
            }

            options.MoveProgress?.Report(moved + failed);
        }

        _logger.LogInformation(
            "MediaCurator: run {RunKey} ({Ruleset}) moved {Moved}, {InPlace} already in place, {Failed} failed in {Elapsed} ms.",
            runKey,
            plan.RulesetName,
            moved,
            inPlace,
            failed,
            timer.ElapsedMilliseconds);

        var foldersRemoved = emptyFolders == EmptyFolderRemoval.None
            ? 0
            : await RemoveEmptyFoldersAsync(plan.ScopeFolderKey, emptyFolders, _ => runKey, cancellationToken);

        if (options.Sorting != FolderSorting.None)
        {
            await SortFoldersAsync(
                [plan],
                options.Sorting == FolderSorting.Subtree ? plan.ScopeFolderKey : null,
                cancellationToken);
        }

        await _runLog.CompleteRunAsync(runKey, moved, inPlace, failed, cancellationToken);

        var summary = new CurationRunSummary(runKey, moved, inPlace, failed, foldersRemoved);
        await _events.PublishAsync(new MediaCuratedNotification(plan.ScopeFolderKey, plan.RulesetKey, summary, trigger), cancellationToken);
        if (failed > 0)
        {
            await _events.PublishAsync(new MediaCurationFailedNotification(plan.ScopeFolderKey, plan.RulesetKey, summary, trigger), cancellationToken);
        }

        return summary;
    }

    public async Task<int> RemoveEmptyFoldersForMediaAsync(
        Guid mediaKey,
        IReadOnlyList<ExecutedPlan> executed,
        EmptyFolderRemoval emptyFolders,
        CancellationToken cancellationToken = default)
    {
        // Runs that were vetoed have no log entry; with no run to record in there is nothing to undo from.
        var runs = executed.Where(e => e.RunKey != Guid.Empty).ToList();
        if (emptyFolders == EmptyFolderRemoval.None || runs.Count == 0)
        {
            return 0;
        }

        var clicked = _media.GetItem(mediaKey);
        if (clicked is not { IsFolder: true })
        {
            return 0;
        }

        // A removed folder is logged in the run whose scope contains it (the nearest scope when
        // nested), else in the last executed run.
        Guid RunFor(Guid folderKey)
        {
            var chain = new[] { folderKey }.Concat(_ancestry.GetAncestorOrSelfFolderKeys(folderKey)).ToList();
            var match = runs
                .Select(r => (Run: r, Depth: chain.IndexOf(r.Plan.ScopeFolderKey)))
                .Where(x => x.Depth >= 0)
                .OrderBy(x => x.Depth)
                .Select(x => (ExecutedPlan?)x.Run)
                .FirstOrDefault();
            return (match ?? runs[^1]).RunKey;
        }

        return await RemoveEmptyFoldersAsync(mediaKey, emptyFolders, RunFor, cancellationToken);
    }

    public async Task<int> SortFoldersForMediaAsync(
        Guid mediaKey,
        IReadOnlyList<ExecutedPlan> executed,
        CancellationToken cancellationToken = default)
    {
        // Vetoed runs moved nothing.
        var plans = executed.Where(e => e.RunKey != Guid.Empty).Select(e => e.Plan).ToList();
        if (plans.Count == 0 || _media.GetItem(mediaKey) is not { } clicked)
        {
            return 0;
        }

        return await SortFoldersAsync(plans, clicked.IsFolder ? mediaKey : null, cancellationToken);
    }

    /// <summary>The folder-sorting step: sorts <paramref name="subtreeRoot"/> (when given) and everything
    /// below it, and the folders along every planned move's target path. Never throws: a failure is
    /// logged and the run carries on. Returns the number of folders re-ordered.</summary>
    private async Task<int> SortFoldersAsync(
        IReadOnlyList<CurationPlan> plans,
        Guid? subtreeRoot,
        CancellationToken cancellationToken)
    {
        try
        {
            var excluded = await _exclusions.GetAllAsync(cancellationToken);
            var sorter = new CurationFolderSorter(_media, _executor.Providers, excluded, _ancestry, _logger);
            var cultures = new List<(CurationPlan Plan, CultureInfo Culture)>();
            foreach (var plan in plans)
            {
                var ruleset = await _rulesets.GetAsync(plan.RulesetKey, cancellationToken);
                var culture = ResolveCulture(ruleset?.CultureName);
                cultures.Add((plan, culture));
                sorter.AddProvenance(plan, culture);
            }

            var sorted = 0;
            if (subtreeRoot is { } root)
            {
                // Unclaimed levels use the culture of the nearest scope containing the root.
                var chain = new[] { root }.Concat(_ancestry.GetAncestorOrSelfFolderKeys(root)).ToList();
                var culture = cultures
                    .Select(c => (c.Culture, Depth: chain.IndexOf(c.Plan.ScopeFolderKey)))
                    .Where(c => c.Depth >= 0)
                    .OrderBy(c => c.Depth)
                    .Select(c => c.Culture)
                    .FirstOrDefault() ?? cultures[0].Culture;
                sorted += sorter.SortSubtree(root, culture, cancellationToken);
            }

            // Moved items may have left the subtree (a media-action folder inside a scope files its
            // images relative to the scope root): their new paths are sorted too. Folders already
            // sorted above are not visited again.
            return sorted + cultures.Sum(c => sorter.SortTargetPaths(c.Plan, c.Culture, cancellationToken));
        }
        catch (OperationCanceledException)
        {
            // The moves are done; a cancelled sort just leaves the order as it is.
            return 0;
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "MediaCurator: sorting folders after the run failed; the run itself is unaffected.");
            return 0;
        }
    }

    /// <summary>Removes every empty sub-folder below <paramref name="processedFolderKey"/>, deepest first
    /// (never the folder itself). A folder is empty when it holds no media at all, recursively, so a
    /// folder whose only descendants are empty folders goes too. Excluded folders (and everything below
    /// them) and ruleset scope roots are never removed. Each removal is recorded in the run log; a
    /// failure is logged, recorded as failed, and the cleanup carries on.</summary>
    public Task<int> CountEmptyFoldersAsync(Guid folderKey, CancellationToken cancellationToken = default)
        => RemoveEmptyFoldersAsync(folderKey, EmptyFolderRemoval.None, _ => Guid.Empty, cancellationToken);

    /// <param name="mode">None counts what would be removed without touching anything.</param>
    private async Task<int> RemoveEmptyFoldersAsync(
        Guid processedFolderKey,
        EmptyFolderRemoval mode,
        Func<Guid, Guid> runFor,
        CancellationToken cancellationToken)
    {
        var excluded = await _exclusions.GetAllAsync(cancellationToken);
        if (excluded.Contains(processedFolderKey)
            || _ancestry.GetAncestorOrSelfFolderKeys(processedFolderKey).Any(excluded.Contains))
        {
            return 0;
        }

        var scopeRoots = (await _rulesets.GetAllAsync(cancellationToken)).Select(r => r.ScopeRootKey).ToHashSet();
        var removed = 0;

        // Returns true when the folder no longer exists in the tree (removed), i.e. its parent may still be empty.
        async Task<bool> VisitAsync(Guid folderKey, string name, Guid parentKey, bool isProcessedFolder)
        {
            var hasContent = false;
            foreach (var child in _media.GetChildren(folderKey))
            {
                cancellationToken.ThrowIfCancellationRequested();

                if (!child.IsFolder
                    || excluded.Contains(child.Key)
                    || !await VisitAsync(child.Key, child.Name, folderKey, isProcessedFolder: false))
                {
                    hasContent = true;
                }
            }

            if (hasContent || isProcessedFolder || scopeRoots.Contains(folderKey))
            {
                return false;
            }

            if (mode == EmptyFolderRemoval.None)
            {
                removed++;
                return true;
            }

            var recycle = mode == EmptyFolderRemoval.RecycleBin;
            var marker = recycle ? EmptyFolderRecycledMarker : EmptyFolderDeletedMarker;
            var runKey = runFor(folderKey);
            try
            {
                if (recycle)
                {
                    _media.MoveToRecycleBin(folderKey);
                }
                else
                {
                    _media.Delete(folderKey);
                }

                await _runLog.RecordItemAsync(runKey, folderKey, name, parentKey, toParentKey: null, marker, success: true, note: null, cancellationToken);
                removed++;
                return true;
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                _logger.LogWarning(ex, "MediaCurator: failed to remove empty folder {FolderKey} ({Name})", folderKey, name);
                await _runLog.RecordItemAsync(runKey, folderKey, name, parentKey, toParentKey: null, marker, success: false, note: ex.Message, cancellationToken);
                return false;
            }
        }

        await VisitAsync(processedFolderKey, string.Empty, Guid.Empty, isProcessedFolder: true);
        return removed;
    }

    private CurationContext BuildContext(MediaItemInfo item, Guid scopeFolderKey, CultureInfo culture, RecognizeFn recognize)
    {
        IReadOnlyDictionary<string, string>? exif = null;
        try
        {
            using var stream = _media.OpenFile(item.Key);
            if (stream is not null)
            {
                exif = _exifReader.Read(stream);
            }
        }
        catch (Exception ex)
        {
            _logger.LogDebug(ex, "MediaCurator: could not read EXIF for {MediaKey}", item.Key);
        }

        return new CurationContext
        {
            MediaKey = item.Key,
            MediaName = item.Name,
            CreateDate = item.CreateDate,
            UpdateDate = item.UpdateDate,
            Culture = culture,
            ScopeRootKey = scopeFolderKey,
            Exif = exif,
            Properties = new MediaPropertyAccessor(_media, item.Key),
            RecognizeAsync = (scheme, ct) => recognize(new RecognitionRequest(item.Key, scheme), ct),
            RefreshClassificationAsync = (scheme, ct) => recognize(new RecognitionRequest(item.Key, scheme, RefreshOnly: true), ct),
            OpenFile = () => _media.OpenFile(item.Key),
        };
    }

    private bool IsAlreadyInPlace(MediaItemInfo item, Guid scopeFolderKey, IReadOnlyList<string> segments)
    {
        // Walk the intended path without creating anything; if the deepest folder exists
        // and is the item's parent, the item is already in place (idempotent re-runs, §13).
        var current = scopeFolderKey;
        foreach (var segment in segments)
        {
            if (_media.FindChildFolder(current, segment) is not { } child)
            {
                return false;
            }

            current = child;
        }

        return current == item.ParentKey;
    }

    private static CultureInfo ResolveCulture(string? cultureName)
    {
        if (string.IsNullOrWhiteSpace(cultureName))
        {
            return CultureInfo.InvariantCulture;
        }

        try
        {
            return CultureInfo.GetCultureInfo(cultureName);
        }
        catch (CultureNotFoundException)
        {
            return CultureInfo.InvariantCulture;
        }
    }

    // OS-independent: folder names end up in URLs and on every host platform.
    private static readonly char[] _invalidFolderChars = ['/', '\\', '?', '#', '%', '*', ':', '|', '"', '<', '>', '\0'];

    /// <summary>Folder display names keep localized text but drop characters that break paths/URLs (§10).</summary>
    internal static string SanitizeFolderName(string name)
    {
        var cleaned = new string(name.Trim().Where(c => !_invalidFolderChars.Contains(c) && !char.IsControl(c)).ToArray()).Trim();
        return cleaned.Length == 0 ? "_" : cleaned;
    }
}

/// <summary>Reads property values straight from the media item via the operations facade.</summary>
internal sealed class MediaPropertyAccessor : IPropertyAccessor
{
    private readonly IMediaOperations _media;
    private readonly Guid _mediaKey;

    // Loaded on the first read and kept for this evaluation only: rules read several properties, and
    // each separate read loaded the whole item again. Never shared between evaluations, because
    // recognition writes codes between the planning passes.
    private IReadOnlyDictionary<string, string?>? _values;
    private bool _loaded;

    public MediaPropertyAccessor(IMediaOperations media, Guid mediaKey)
    {
        _media = media;
        _mediaKey = mediaKey;
    }

    public string? GetString(string alias)
    {
        if (!_loaded)
        {
            _values = _media.GetPropertyValues(_mediaKey);
            _loaded = true;
        }

        return _values is null ? _media.GetPropertyValue(_mediaKey, alias) : _values.GetValueOrDefault(alias);
    }
}
