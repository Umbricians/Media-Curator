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
            return Ok(CurationPlanModel.From(plan));
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
            var summary = await _engine.ExecuteAsync(plan, trigger: "manual", ct);
            return Ok(CurationRunSummaryModel.From(summary));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

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
