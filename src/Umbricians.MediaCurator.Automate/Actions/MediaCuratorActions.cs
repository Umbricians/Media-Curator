using Microsoft.Extensions.DependencyInjection;
using Umbraco.Automate.Core.Actions;
using Umbraco.Automate.Core.Execution;
using Umbraco.Automate.Core.Settings;
using Umbricians.MediaCurator.Engine;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Automate.Actions;

file static class AutomateGuidParsing
{
    internal static Guid ParseOrEmpty(string? value)
        => Guid.TryParse(value, out var guid) ? guid : Guid.Empty;
}

file static class AutomateActionConcurrency
{
    // Actions that move media or create folders run one at a time, so simultaneous runs never race
    // to create the same folder.
    private static readonly SemaphoreSlim _gate = new(1, 1);

    // Analysis only writes to the analysed item, so several images can be analysed at once. The gate
    // follows the "parallel analyses" setting; a change takes effect for analyses that start after it.
    private static (int Size, SemaphoreSlim Gate) _analysis = (0, new SemaphoreSlim(1, 1));
    private static readonly object _analysisLock = new();

    internal static Task<ActionResult> RunSeriallyAsync(
        IAutomationOriginAccessor originAccessor,
        Func<Task<ActionResult>> action,
        CancellationToken cancellationToken)
        => RunGatedAsync(_gate, originAccessor, action, cancellationToken);

    /// <summary>Runs analysis alongside other analyses, up to the configured number at a time.</summary>
    internal static async Task<ActionResult> RunAnalysisAsync(
        IParallelMediaWork parallel,
        IAutomationOriginAccessor originAccessor,
        Func<Task<ActionResult>> action,
        CancellationToken cancellationToken)
    {
        var size = await parallel.GetMaxParallelismAsync(cancellationToken);
        SemaphoreSlim gate;
        lock (_analysisLock)
        {
            if (_analysis.Size != size)
            {
                _analysis = (size, new SemaphoreSlim(size, size));
            }

            gate = _analysis.Gate;
        }

        return await RunGatedAsync(gate, originAccessor, action, cancellationToken);
    }

    private static async Task<ActionResult> RunGatedAsync(
        SemaphoreSlim gate,
        IAutomationOriginAccessor originAccessor,
        Func<Task<ActionResult>> action,
        CancellationToken cancellationToken)
    {
        // The ambient context is dropped below, which also drops Automate's record of which
        // automation is running. Carry it across so media saves made by this action count as
        // automation-originated, letting "Media Saved" triggers skip their own cycle.
        var origin = originAccessor.Current;
        await gate.WaitAsync(cancellationToken);
        try
        {
            return await RunWithoutAmbientExecutionContextAsync(
                async () =>
                {
                    using var _ = origin is null ? null : originAccessor.Push(origin);
                    return await action();
                },
                cancellationToken);
        }
        finally
        {
            gate.Release();
        }
    }

    private static async Task<ActionResult> RunWithoutAmbientExecutionContextAsync(
        Func<Task<ActionResult>> action,
        CancellationToken cancellationToken)
    {
        Task<ActionResult> actionTask;
        var restoreFlow = false;
        AsyncFlowControl flowControl = default;

        if (!ExecutionContext.IsFlowSuppressed())
        {
            flowControl = ExecutionContext.SuppressFlow();
            restoreFlow = true;
        }

        try
        {
            actionTask = Task.Run(action, cancellationToken);
        }
        finally
        {
            if (restoreFlow)
            {
                flowControl.Undo();
            }
        }

        return await actionTask;
    }
}

public class AnalyzeImageSettings
{
    [Field(SupportsBindings = true, SortOrder = 0)]
    public string? MediaKey { get; set; }

    [Field(SortOrder = 1)]
    public bool Force { get; set; }

    /// <summary>Optional override. Empty (recommended) uses the classification scheme of the ruleset that
    /// curates the image, as set up in Media Curator.</summary>
    [Field(SortOrder = 2, Label = "Classification scheme override", Description = "Leave empty to use the scheme of the ruleset that curates the image (e.g. dewey-pd or lcc).")]
    public string? Scheme { get; set; }
}

public class AnalyzeImageOutput
{
    public bool Analyzed { get; set; }
    public string? Description { get; set; }
    public List<string> Tags { get; set; } = [];
    public string? ClassificationCode { get; set; }
}

/// <summary>Runs the recognition pipeline on a media item; outputs tags/description for
/// binding into subsequent steps (§9.2).</summary>
[Action("mediaCurator.analyzeImage", "Analyze image (MediaCurator)")]
public class AnalyzeImageAction : ActionBase<AnalyzeImageSettings, AnalyzeImageOutput>
{
    private readonly IAutomationOriginAccessor _originAccessor;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly IParallelMediaWork _parallel;

    public AnalyzeImageAction(
        ActionInfrastructure infrastructure,
        IAutomationOriginAccessor originAccessor,
        IServiceScopeFactory scopeFactory,
        IParallelMediaWork parallel)
        : base(infrastructure)
    {
        _parallel = parallel;
        _originAccessor = originAccessor;
        _scopeFactory = scopeFactory;
    }

    public override async Task<ActionResult> ExecuteAsync(ActionContext context, CancellationToken cancellationToken)
        => await AutomateActionConcurrency.RunAnalysisAsync(
            _parallel,
            _originAccessor,
            () => ExecuteCoreAsync(context, cancellationToken),
            cancellationToken);

    private async Task<ActionResult> ExecuteCoreAsync(ActionContext context, CancellationToken cancellationToken)
    {
        var settings = context.GetSettings<AnalyzeImageSettings>();
        var mediaKey = AutomateGuidParsing.ParseOrEmpty(settings.MediaKey);
        if (mediaKey == Guid.Empty)
        {
            return ActionResult.Skipped("No media key provided.");
        }

        using var serviceScope = _scopeFactory.CreateScope();
        var recognition = serviceScope.ServiceProvider.GetRequiredService<IRecognitionService>();
        var scheme = string.IsNullOrWhiteSpace(settings.Scheme)
            ? await serviceScope.ServiceProvider.GetRequiredService<IClassificationSchemeLocator>()
                .GetSchemeForMediaAsync(mediaKey, cancellationToken)
            : settings.Scheme.Trim();

        var result = await recognition.AnalyzeAsync(
            mediaKey,
            settings.Force,
            string.IsNullOrWhiteSpace(scheme) ? null : scheme,
            cancellationToken);
        return Success(new AnalyzeImageOutput
        {
            Analyzed = result is not null,
            Description = result?.Description,
            Tags = result?.Tags.Select(t => t.Name).ToList() ?? [],
            ClassificationCode = result?.ClassificationCode,
        });
    }
}

public class CategorizeMediaSettings
{
    [Field(SupportsBindings = true, SortOrder = 0)]
    public string? MediaKey { get; set; }

    [Field(SortOrder = 1)]
    public bool DryRun { get; set; }
}

public class CategorizeMediaOutput
{
    public bool Moved { get; set; }
    public string? TargetPath { get; set; }
    public string? Reason { get; set; }
}

/// <summary>Resolves the target folder for an item using the ruleset for its scope and
/// moves it; supports a dry-run flag (§9.2).</summary>
[Action("mediaCurator.categorizeMedia", "Categorize media (MediaCurator)")]
public class CategorizeMediaAction : ActionBase<CategorizeMediaSettings, CategorizeMediaOutput>
{
    private readonly IAutomationOriginAccessor _originAccessor;
    private readonly IServiceScopeFactory _scopeFactory;

    public CategorizeMediaAction(
        ActionInfrastructure infrastructure,
        IAutomationOriginAccessor originAccessor,
        IServiceScopeFactory scopeFactory)
        : base(infrastructure)
    {
        _originAccessor = originAccessor;
        _scopeFactory = scopeFactory;
    }

    public override async Task<ActionResult> ExecuteAsync(ActionContext context, CancellationToken cancellationToken)
        => await AutomateActionConcurrency.RunSeriallyAsync(
            _originAccessor,
            () => ExecuteCoreAsync(context, cancellationToken),
            cancellationToken);

    private async Task<ActionResult> ExecuteCoreAsync(ActionContext context, CancellationToken cancellationToken)
    {
        var settings = context.GetSettings<CategorizeMediaSettings>();
        var mediaKey = AutomateGuidParsing.ParseOrEmpty(settings.MediaKey);
        if (mediaKey == Guid.Empty)
        {
            return ActionResult.Skipped("No media key provided.");
        }

        using var serviceScope = _scopeFactory.CreateScope();
        var resolver = serviceScope.ServiceProvider.GetRequiredService<IRulesetResolver>();
        var engine = serviceScope.ServiceProvider.GetRequiredService<ICurationEngine>();

        var ruleset = await resolver.ResolveForItemAsync(mediaKey, cancellationToken);
        if (ruleset is null)
        {
            return Success(new CategorizeMediaOutput { Moved = false, Reason = "No ruleset governs this item." });
        }

        // Plan only this item: planning the whole scope would run every rule — including AI
        // recognition for images without a stored code — on every image in it.
        MediaCurationPlan mediaPlan;
        try
        {
            mediaPlan = await engine.PlanForMediaAsync(mediaKey, cancellationToken);
        }
        catch (MediaNotFoundException)
        {
            return ActionResult.Skipped("Media item not found.");
        }

        var plan = mediaPlan.Plans.FirstOrDefault(p => p.Moves.Any(m => m.MediaKey == mediaKey));
        var move = plan?.Moves.First(m => m.MediaKey == mediaKey);
        if (plan is null || move is null || move.AlreadyInPlace)
        {
            return Success(new CategorizeMediaOutput
            {
                Moved = false,
                TargetPath = move?.TargetPath,
                Reason = move is null ? "No rule resolved a target for this item." : "Already in place.",
            });
        }

        if (settings.DryRun)
        {
            return Success(new CategorizeMediaOutput { Moved = false, TargetPath = move.TargetPath, Reason = "Dry run." });
        }

        // Execute a single-item plan so only this item moves, then put the folders along its new
        // path in order (the rest of the scope is not touched).
        var singleItemPlan = plan with { Moves = [move] };
        var summary = await engine.ExecuteAsync(
            singleItemPlan,
            trigger: "automate",
            new CurationExecutionOptions { Sorting = FolderSorting.TargetPaths },
            cancellationToken);
        return Success(new CategorizeMediaOutput { Moved = summary.Moved > 0, TargetPath = move.TargetPath });
    }
}

public class CurateFolderSettings
{
    [Field(SupportsBindings = true, SortOrder = 0)]
    public string? ScopeFolderKey { get; set; }

    [Field(SortOrder = 1)]
    public bool Recursive { get; set; } = true;

    [Field(SortOrder = 2)]
    public bool DryRun { get; set; }

    /// <summary>Empty sub-folders are removed at the end of a real run: to the Recycle Bin by
    /// default, permanently when this is set.</summary>
    [Field(SortOrder = 3)]
    public bool PermanentlyDeleteEmptyFolders { get; set; }
}

public class CurateFolderOutput
{
    public int Planned { get; set; }
    public int Moved { get; set; }
    public int Failed { get; set; }
    public int FoldersRemoved { get; set; }
    public Guid RunKey { get; set; }
}

/// <summary>Runs a full ruleset over a folder, optionally recursive, with dry-run support (§9.2).</summary>
[Action("mediaCurator.curateFolder", "Curate folder (MediaCurator)")]
public class CurateFolderAction : ActionBase<CurateFolderSettings, CurateFolderOutput>
{
    private readonly IAutomationOriginAccessor _originAccessor;
    private readonly IServiceScopeFactory _scopeFactory;

    public CurateFolderAction(
        ActionInfrastructure infrastructure,
        IAutomationOriginAccessor originAccessor,
        IServiceScopeFactory scopeFactory)
        : base(infrastructure)
    {
        _originAccessor = originAccessor;
        _scopeFactory = scopeFactory;
    }

    public override async Task<ActionResult> ExecuteAsync(ActionContext context, CancellationToken cancellationToken)
        => await AutomateActionConcurrency.RunSeriallyAsync(
            _originAccessor,
            () => ExecuteCoreAsync(context, cancellationToken),
            cancellationToken);

    private async Task<ActionResult> ExecuteCoreAsync(ActionContext context, CancellationToken cancellationToken)
    {
        var settings = context.GetSettings<CurateFolderSettings>();
        var scopeFolderKey = AutomateGuidParsing.ParseOrEmpty(settings.ScopeFolderKey);
        if (scopeFolderKey == Guid.Empty)
        {
            return ActionResult.Skipped("No scope folder provided.");
        }

        using var serviceScope = _scopeFactory.CreateScope();
        var engine = serviceScope.ServiceProvider.GetRequiredService<ICurationEngine>();

        CurationPlan plan;
        try
        {
            plan = await engine.PlanAsync(scopeFolderKey, settings.Recursive, cancellationToken);
        }
        catch (InvalidOperationException ex)
        {
            return ActionResult.Failed(ex, StepRunErrorCategory.Validation);
        }

        if (settings.DryRun)
        {
            return Success(new CurateFolderOutput { Planned = plan.MoveCount });
        }

        var summary = await engine.ExecuteAsync(
            plan,
            trigger: "automate",
            settings.PermanentlyDeleteEmptyFolders ? EmptyFolderRemoval.Delete : EmptyFolderRemoval.RecycleBin,
            cancellationToken);
        return Success(new CurateFolderOutput
        {
            Planned = plan.MoveCount,
            Moved = summary.Moved,
            Failed = summary.Failed,
            FoldersRemoved = summary.FoldersRemoved,
            RunKey = summary.RunKey,
        });
    }
}
