using System.Globalization;
using Microsoft.Extensions.Logging;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Exif;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Engine;

/// <summary>One item's planned (or executed) move.</summary>
public sealed record PlannedMove(
    Guid MediaKey,
    string MediaName,
    Guid FromParentKey,
    IReadOnlyList<string> TargetSegments,
    bool AlreadyInPlace,
    string? Note)
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
    /// recording every move in the activity log.</summary>
    Task<CurationRunSummary> ExecuteAsync(CurationPlan plan, string trigger, CancellationToken cancellationToken = default);
}

public sealed record CurationRunSummary(Guid RunKey, int Moved, int AlreadyInPlace, int Failed);

public sealed class CurationEngine : ICurationEngine
{
    /// <summary>v1 image filter: items participate only when their media type is in this list (§13).</summary>
    public static readonly string[] ImageMediaTypes = ["Image"];

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
        ILogger<CurationEngine> logger)
    {
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

        foreach (var item in _media.GetItems(scopeFolderKey, recursive))
        {
            cancellationToken.ThrowIfCancellationRequested();

            var outcome = await EvaluateItemAsync(item, excluded, ruleset, culture, cancellationToken);
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
        var clicked = _media.GetItem(mediaKey)
            ?? throw new MediaNotFoundException(mediaKey);

        var items = clicked.IsFolder ? _media.GetItems(mediaKey, recursive: true) : [clicked];
        var excluded = await _exclusions.GetAllAsync(cancellationToken);

        // One plan per governing ruleset, in order of first appearance; each item is
        // curated by its nearest enabled ruleset and targets are relative to that scope root.
        var groups = new List<(Ruleset Ruleset, CultureInfo Culture, List<PlannedMove> Moves, List<string> Skipped)>();
        var unattributed = new List<string>();

        foreach (var item in items)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var outcome = await EvaluateItemAsync(item, excluded, expected: null, culture: null, cancellationToken);
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

        var plans = groups
            .Select(g => new CurationPlan(g.Ruleset.ScopeRootKey, g.Ruleset.Key, g.Ruleset.Name, g.Moves, g.Skipped))
            .ToList();
        return new MediaCurationPlan(mediaKey, plans, unattributed);
    }

    /// <summary>The verdict for one item: a move, or the reason it is left alone.
    /// <paramref name="Governing"/> is null when the item was ruled out before a ruleset was resolved.</summary>
    private sealed record ItemOutcome(Ruleset? Governing, PlannedMove? Move, string? Skipped);

    /// <summary>Shared per-item planning. With <paramref name="expected"/> set (scope runs) the item
    /// must be governed by exactly that ruleset; without it (media runs) the nearest enabled
    /// ruleset is used. Targets are always relative to the governing ruleset's scope root.</summary>
    private async Task<ItemOutcome> EvaluateItemAsync(
        MediaItemInfo item,
        IReadOnlySet<Guid> excluded,
        Ruleset? expected,
        CultureInfo? culture,
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
        var context = BuildContext(item, scopeFolderKey, culture ?? ResolveCulture(ruleset.CultureName));
        var result = await _executor.ExecuteAsync(ruleset.Rules, context, cancellationToken);

        if (result.Stopped || !result.HasTarget)
        {
            var reason = result.Stopped ? "rule chain stopped" : "no folder levels resolved";
            return new ItemOutcome(ruleset, null, $"{item.Name}: left in place ({reason})");
        }

        var segments = result.Segments.Select(s => SanitizeFolderName(s.Name)).ToArray();
        var alreadyInPlace = IsAlreadyInPlace(item, scopeFolderKey, segments);
        return new ItemOutcome(ruleset, new PlannedMove(item.Key, item.Name, item.ParentKey, segments, alreadyInPlace, null), null);
    }

    public async Task<CurationRunSummary> ExecuteAsync(CurationPlan plan, string trigger, CancellationToken cancellationToken = default)
    {
        // Developers can veto a run before anything moves (§12).
        var curating = new MediaCuratingNotification(plan, trigger);
        await _events.PublishAsync(curating, cancellationToken);
        if (curating.Cancel)
        {
            return new CurationRunSummary(Guid.Empty, 0, 0, 0);
        }

        var runKey = await _runLog.StartRunAsync(plan.ScopeFolderKey, plan.RulesetKey, trigger, cancellationToken);
        int moved = 0, inPlace = 0, failed = 0;

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
        }

        await _runLog.CompleteRunAsync(runKey, moved, inPlace, failed, cancellationToken);

        var summary = new CurationRunSummary(runKey, moved, inPlace, failed);
        await _events.PublishAsync(new MediaCuratedNotification(plan.ScopeFolderKey, plan.RulesetKey, summary, trigger), cancellationToken);
        if (failed > 0)
        {
            await _events.PublishAsync(new MediaCurationFailedNotification(plan.ScopeFolderKey, plan.RulesetKey, summary, trigger), cancellationToken);
        }

        return summary;
    }

    private CurationContext BuildContext(MediaItemInfo item, Guid scopeFolderKey, CultureInfo culture)
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
            RecognizeAsync = (scheme, ct) => _recognition.AnalyzeAsync(item.Key, force: false, scheme, ct),
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
            var child = _media.GetItems(current, recursive: false)
                .FirstOrDefault(i => i.IsFolder && i.Name.Equals(segment, StringComparison.OrdinalIgnoreCase));
            if (child is null)
            {
                return false;
            }

            current = child.Key;
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

    public MediaPropertyAccessor(IMediaOperations media, Guid mediaKey)
    {
        _media = media;
        _mediaKey = mediaKey;
    }

    public string? GetString(string alias) => _media.GetPropertyValue(_mediaKey, alias);
}
