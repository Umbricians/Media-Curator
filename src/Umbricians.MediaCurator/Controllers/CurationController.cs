using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Engine;

namespace Umbricians.MediaCurator.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "MediaCurator")]
public class CurationController : MediaCuratorApiControllerBase
{
    private readonly ICurationEngine _engine;
    private readonly ICurationRunLog _runLog;
    private readonly IBulkCurationQueue _bulkQueue;
    private readonly ICurationUndoService _undoService;
    private readonly IExclusionRepository _exclusions;
    private readonly Rules.IRulesetTransferService _transfer;
    private readonly IMediaChangeTracker? _changes;
    private readonly IEntityService? _entities;

    public CurationController(
        ICurationEngine engine,
        ICurationRunLog runLog,
        IBulkCurationQueue bulkQueue,
        ICurationUndoService undoService,
        IExclusionRepository exclusions,
        Rules.IRulesetTransferService transfer,
        IMediaChangeTracker? changes = null,
        IEntityService? entities = null)
    {
        _changes = changes;
        _entities = entities;
        _engine = engine;
        _runLog = runLog;
        _bulkQueue = bulkQueue;
        _undoService = undoService;
        _exclusions = exclusions;
        _transfer = transfer;
    }

    /// <summary>Dry-run: computes what would move where without moving anything (§11.2).</summary>
    [HttpPost("curation/plan")]
    [ProducesResponseType<CurationPlanModel>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> PlanCuration(CurationRequestModel request, CancellationToken ct)
    {
        try
        {
            var plan = await _engine.PlanAsync(request.ScopeFolderKey, request.Recursive, ct);
            var model = CurationPlanModel.From(plan);
            model.EmptyFolderCount = await _engine.CountEmptyFoldersAsync(plan.ScopeFolderKey, ct);
            return Ok(model);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>Plans and executes a curation run for the scope folder.</summary>
    [HttpPost("curation/execute")]
    [ProducesResponseType<CurationRunSummaryModel>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ExecuteCuration(CurationRequestModel request, CancellationToken ct)
    {
        try
        {
            var plan = await _engine.PlanAsync(request.ScopeFolderKey, request.Recursive, ct);
            var summary = await _engine.ExecuteAsync(plan, trigger: "manual", Removal(request.PermanentlyDeleteEmptyFolders), ct);
            return Ok(CurationRunSummaryModel.From(summary));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>Dry-run for one media item: a single image, or every image under a folder
    /// (and its subfolders), each planned by its governing ruleset.</summary>
    [HttpPost("curation/media/{mediaKey:guid}/plan")]
    [ProducesResponseType<MediaCurationPlanModel>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> PlanMediaCuration(Guid mediaKey, CancellationToken ct)
    {
        try
        {
            var model = MediaCurationPlanModel.From(await _engine.PlanForMediaAsync(mediaKey, ct));
            model.EmptyFolderCount = await _engine.CountEmptyFoldersAsync(mediaKey, ct);
            return Ok(model);
        }
        catch (MediaNotFoundException ex)
        {
            return NotFound(Error(ex.Message));
        }
    }

    /// <summary>How many images "Curate images" would cover, counted without loading them, and whether
    /// it would run in the background. Lets the backoffice skip the slow preview for large folders.</summary>
    [HttpGet("curation/media/{mediaKey:guid}/count")]
    [ProducesResponseType<MediaCurationCountModel>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public IActionResult CountMediaCuration(Guid mediaKey)
    {
        try
        {
            var count = _engine.CountImages(mediaKey);
            return Ok(new MediaCurationCountModel
            {
                ImageCount = count,
                Threshold = MediaCuratorDefaults.BackgroundCurationThreshold,
                RunsInBackground = count > MediaCuratorDefaults.BackgroundCurationThreshold,
            });
        }
        catch (MediaNotFoundException ex)
        {
            return NotFound(Error(ex.Message));
        }
    }

    /// <summary>The background run of one folder, or 404 when it has none.</summary>
    [HttpGet("curation/queue/{mediaKey:guid}")]
    [ProducesResponseType<BulkRunStatusModel>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetQueueItemStatus(Guid mediaKey)
        => _bulkQueue.GetStatus(mediaKey) is { } status ? Ok(BulkRunStatusModel.From(status)) : NotFound();

    /// <summary>Plans and executes curation for one media item or folder tree. Each governing
    /// ruleset runs (and is logged) separately. Afterwards the empty sub-folders below the clicked
    /// folder are removed (to the Recycle Bin, or permanently when asked), and the folders are sorted.
    /// A folder with more than <see cref="MediaCuratorDefaults.BackgroundCurationThreshold"/> images is
    /// queued as a background run instead (<see cref="MediaCurationSummaryModel.Queued"/>).</summary>
    [HttpPost("curation/media/{mediaKey:guid}/execute")]
    [ProducesResponseType<MediaCurationSummaryModel>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ExecuteMediaCuration(Guid mediaKey, [FromQuery] bool permanentlyDeleteEmptyFolders, CancellationToken ct)
    {
        try
        {
            // Decided here, not in the backoffice, so no caller can start a request that outlasts
            // hosting time limits: large folders always go to the background.
            var imageCount = _engine.CountImages(mediaKey);
            if (imageCount > MediaCuratorDefaults.BackgroundCurationThreshold)
            {
                var folder = _entities?.Get(mediaKey, UmbracoObjectTypes.Media);
                var queued = _bulkQueue.TryEnqueueMedia(
                    mediaKey,
                    folder?.Name ?? string.Empty,
                    folder?.Path ?? string.Empty,
                    imageCount,
                    Removal(permanentlyDeleteEmptyFolders));
                return queued == BulkEnqueueResult.Queued
                    ? Ok(new MediaCurationSummaryModel { Moved = 0, AlreadyInPlace = 0, Failed = 0, Queued = true, ImageCount = imageCount })
                    : Conflict(Error("This folder, or a folder above or below it, is already being curated in the background."));
            }

            var summary = await _engine.CurateMediaAsync(mediaKey, "manual", Removal(permanentlyDeleteEmptyFolders), cancellationToken: ct);
            return Ok(new MediaCurationSummaryModel
            {
                Moved = summary.Moved,
                AlreadyInPlace = summary.AlreadyInPlace,
                Failed = summary.Failed,
                FoldersRemoved = summary.FoldersRemoved,
                RunKeys = summary.RunKeys.ToList(),
                ChangedFolderKeys = _changes?.ChangedFolders.ToList() ?? [],
                ImageCount = imageCount,
            });
        }
        catch (MediaNotFoundException ex)
        {
            return NotFound(Error(ex.Message));
        }
    }

    private static EmptyFolderRemoval Removal(bool permanentlyDelete)
        => permanentlyDelete ? EmptyFolderRemoval.Delete : EmptyFolderRemoval.RecycleBin;

    // The backoffice shows a problem's title in its error notification, so the reason goes there.
    // It only treats the body as problem details when "type" is present.
    private static ProblemDetails Error(string message) => new() { Title = message, Type = "Error" };

    /// <summary>Queues a background bulk run for the scope folder (processed by the
    /// elected worker; editors don't wait).</summary>
    [HttpPost("curation/queue")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public IActionResult QueueCuration(CurationRequestModel request)
        => _bulkQueue.TryEnqueue(request.ScopeFolderKey, request.Recursive)
            ? Ok()
            : Conflict("This folder is already queued or running.");

    /// <summary>Background run statuses + queue length (health view, §11.2).</summary>
    [HttpGet("curation/queue")]
    [ProducesResponseType<BulkQueueStatusModel>(StatusCodes.Status200OK)]
    public BulkQueueStatusModel GetQueueStatus()
        => BulkQueueStatusModel.From(_bulkQueue.QueueLength, _bulkQueue.GetStatuses());

    /// <summary>Activity log: recent curation runs.</summary>
    [HttpGet("curation/runs")]
    [ProducesResponseType<List<CurationRunModel>>(StatusCodes.Status200OK)]
    public async Task<List<CurationRunModel>> GetRuns(CancellationToken ct)
        => (await _runLog.GetRunsAsync(50, ct)).Select(CurationRunModel.From).ToList();

    /// <summary>Activity log: items of one run.</summary>
    [HttpGet("curation/runs/{runKey:guid}/items")]
    [ProducesResponseType<List<CurationRunItemModel>>(StatusCodes.Status200OK)]
    public async Task<List<CurationRunItemModel>> GetRunItems(Guid runKey, CancellationToken ct)
        => (await _runLog.GetRunItemsAsync(runKey, ct)).Select(CurationRunItemModel.From).ToList();

    /// <summary>Undo a curation run: moves every item back to its recorded original folder (§11.2).</summary>
    [HttpPost("curation/runs/{runKey:guid}/undo")]
    [ProducesResponseType<CurationRunSummaryModel>(StatusCodes.Status200OK)]
    public async Task<CurationRunSummaryModel> UndoRun(Guid runKey, CancellationToken ct)
        => CurationRunSummaryModel.From(await _undoService.UndoRunAsync(runKey, ct));

    /// <summary>Excludes or re-includes a media item/folder from curation (§11.2).</summary>
    [HttpPut("curation/exclusions/{mediaKey:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> SetExclusion(Guid mediaKey, [FromQuery] bool excluded, CancellationToken ct)
    {
        await _exclusions.SetAsync(mediaKey, excluded, ct);
        return Ok();
    }

    /// <summary>Lists excluded media keys.</summary>
    [HttpGet("curation/exclusions")]
    [ProducesResponseType<List<Guid>>(StatusCodes.Status200OK)]
    public async Task<List<Guid>> GetExclusions(CancellationToken ct)
        => (await _exclusions.GetAllAsync(ct)).ToList();

    /// <summary>Exports all rulesets as a portable JSON document (§13 multi-environment).</summary>
    [HttpGet("rulesets/export")]
    [ProducesResponseType<string>(StatusCodes.Status200OK)]
    public async Task<string> ExportRulesets(CancellationToken ct)
        => await _transfer.ExportAsync(ct);

    /// <summary>Imports rulesets from an export document (upsert by scope folder).
    /// Rulesets referencing unknown provider aliases are rejected.</summary>
    [HttpPost("rulesets/import")]
    [ProducesResponseType<int>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ImportRulesets([FromBody] string json, CancellationToken ct)
    {
        try
        {
            return Ok(await _transfer.ImportAsync(json, ct));
        }
        catch (System.Text.Json.JsonException)
        {
            return BadRequest("The import document is not valid JSON.");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
