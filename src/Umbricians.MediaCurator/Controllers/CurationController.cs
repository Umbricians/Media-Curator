using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

    public CurationController(
        ICurationEngine engine,
        ICurationRunLog runLog,
        IBulkCurationQueue bulkQueue,
        ICurationUndoService undoService,
        IExclusionRepository exclusions,
        Rules.IRulesetTransferService transfer)
    {
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

    /// <summary>Plans and executes curation for one media item or folder tree. Each governing
    /// ruleset runs (and is logged) separately. Afterwards the empty sub-folders below the clicked
    /// folder are removed (to the Recycle Bin, or permanently when asked), and the folders are sorted.</summary>
    [HttpPost("curation/media/{mediaKey:guid}/execute")]
    [ProducesResponseType<MediaCurationSummaryModel>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ExecuteMediaCuration(Guid mediaKey, [FromQuery] bool permanentlyDeleteEmptyFolders, CancellationToken ct)
    {
        try
        {
            var plan = await _engine.PlanForMediaAsync(mediaKey, ct);
            int moved = 0, inPlace = 0, failed = 0;
            var runKeys = new List<Guid>();
            var executed = new List<ExecutedPlan>();
            foreach (var p in plan.Plans)
            {
                var summary = await _engine.ExecuteAsync(p, trigger: "manual", ct);
                executed.Add(new ExecutedPlan(p, summary.RunKey));
                moved += summary.Moved;
                inPlace += summary.AlreadyInPlace;
                failed += summary.Failed;
                // A vetoed run (cancelled by a notification handler) has no run entry.
                if (summary.RunKey != Guid.Empty)
                {
                    runKeys.Add(summary.RunKey);
                }
            }

            // Once, after every plan has run, rooted at the clicked folder (never for a single image).
            var foldersRemoved = await _engine.RemoveEmptyFoldersForMediaAsync(
                mediaKey, executed, Removal(permanentlyDeleteEmptyFolders), ct);

            // Then, once, put the clicked folder's tree (or a single image's new path) in order.
            await _engine.SortFoldersForMediaAsync(mediaKey, executed, ct);

            return Ok(new MediaCurationSummaryModel { Moved = moved, AlreadyInPlace = inPlace, Failed = failed, FoldersRemoved = foldersRemoved, RunKeys = runKeys });
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
