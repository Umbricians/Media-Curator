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

public interface ICurationEngine
{
    /// <summary>Pure: computes what would move where. Shared by dry-run preview and execute.</summary>
    Task<CurationPlan> PlanAsync(Guid scopeFolderKey, bool recursive, CancellationToken cancellationToken = default);

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

            if (item.IsFolder)
            {
                continue;
            }

            // Pinned/excluded items — or anything under an excluded folder — are never touched (§11.2).
            if (excluded.Count > 0
                && (excluded.Contains(item.Key)
                    || _ancestry.GetAncestorOrSelfFolderKeys(item.Key).Any(excluded.Contains)))
            {
                skipped.Add($"{item.Name}: excluded");
                continue;
            }

            if (!ImageMediaTypes.Contains(item.ContentTypeAlias, StringComparer.OrdinalIgnoreCase))
            {
                // Non-image media is ignored, not failed (§3, §13).
                skipped.Add($"{item.Name}: ignored (media type '{item.ContentTypeAlias}' is not an image type)");
                continue;
            }

            // Defensive: nearest-ancestor scoping — if a deeper ruleset governs this item,
            // this run leaves it alone (the deeper scope wins, §13).
            var governing = await _resolver.ResolveForItemAsync(item.Key, cancellationToken);
            if (governing is null || governing.Key != ruleset.Key)
            {
                skipped.Add($"{item.Name}: governed by a deeper ruleset ('{governing?.Name ?? "none"}')");
                continue;
            }

            var context = BuildContext(item, scopeFolderKey, culture);
            var result = await _executor.ExecuteAsync(ruleset.Rules, context, cancellationToken);

            if (result.Stopped || !result.HasTarget)
            {
                var reason = result.Stopped ? "rule chain stopped" : "no folder levels resolved";
                skipped.Add($"{item.Name}: left in place ({reason})");
                continue;
            }

            var segments = result.Segments.Select(s => SanitizeFolderName(s.Name)).ToArray();
            var alreadyInPlace = IsAlreadyInPlace(item, scopeFolderKey, segments);
            moves.Add(new PlannedMove(item.Key, item.Name, item.ParentKey, segments, alreadyInPlace, null));
        }

        return new CurationPlan(scopeFolderKey, ruleset.Key, ruleset.Name, moves, skipped);
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
