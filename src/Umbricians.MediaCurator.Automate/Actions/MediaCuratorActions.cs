using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Umbraco.Automate.Core.Actions;
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
    private static readonly SemaphoreSlim _gate = new(1, 1);

    internal static async Task<ActionResult> RunSeriallyAsync(
        Func<Task<ActionResult>> action,
        CancellationToken cancellationToken)
    {
        await _gate.WaitAsync(cancellationToken);
        try
        {
            return await RunWithoutAmbientExecutionContextAsync(action, cancellationToken);
        }
        finally
        {
            _gate.Release();
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

    [Field(SortOrder = 2)]
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
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly IOptionsMonitor<MediaCuratorOptions> _options;

    public AnalyzeImageAction(
        ActionInfrastructure infrastructure,
        IServiceScopeFactory scopeFactory,
        IOptionsMonitor<MediaCuratorOptions> options)
        : base(infrastructure)
    {
        _scopeFactory = scopeFactory;
        _options = options;
    }

    public override async Task<ActionResult> ExecuteAsync(ActionContext context, CancellationToken cancellationToken)
        => await AutomateActionConcurrency.RunSeriallyAsync(
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

        var scheme = string.IsNullOrWhiteSpace(settings.Scheme)
            ? _options.CurrentValue.ClassificationSchemeAlias
            : settings.Scheme.Trim();

        using var serviceScope = _scopeFactory.CreateScope();
        var recognition = serviceScope.ServiceProvider.GetRequiredService<IRecognitionService>();

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
    private readonly IServiceScopeFactory _scopeFactory;

    public CategorizeMediaAction(ActionInfrastructure infrastructure, IServiceScopeFactory scopeFactory)
        : base(infrastructure)
    {
        _scopeFactory = scopeFactory;
    }

    public override async Task<ActionResult> ExecuteAsync(ActionContext context, CancellationToken cancellationToken)
        => await AutomateActionConcurrency.RunSeriallyAsync(
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

        var plan = await engine.PlanAsync(ruleset.ScopeRootKey, recursive: true, cancellationToken);
        var move = plan.Moves.FirstOrDefault(m => m.MediaKey == mediaKey);
        if (move is null || move.AlreadyInPlace)
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

        // Execute a single-item plan so only this item moves.
        var singleItemPlan = plan with { Moves = [move] };
        var summary = await engine.ExecuteAsync(singleItemPlan, trigger: "automate", cancellationToken);
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
}

public class CurateFolderOutput
{
    public int Planned { get; set; }
    public int Moved { get; set; }
    public int Failed { get; set; }
    public Guid RunKey { get; set; }
}

/// <summary>Runs a full ruleset over a folder, optionally recursive, with dry-run support (§9.2).</summary>
[Action("mediaCurator.curateFolder", "Curate folder (MediaCurator)")]
public class CurateFolderAction : ActionBase<CurateFolderSettings, CurateFolderOutput>
{
    private readonly IServiceScopeFactory _scopeFactory;

    public CurateFolderAction(ActionInfrastructure infrastructure, IServiceScopeFactory scopeFactory)
        : base(infrastructure)
    {
        _scopeFactory = scopeFactory;
    }

    public override async Task<ActionResult> ExecuteAsync(ActionContext context, CancellationToken cancellationToken)
        => await AutomateActionConcurrency.RunSeriallyAsync(
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

        var summary = await engine.ExecuteAsync(plan, trigger: "automate", cancellationToken);
        return Success(new CurateFolderOutput
        {
            Planned = plan.MoveCount,
            Moved = summary.Moved,
            Failed = summary.Failed,
            RunKey = summary.RunKey,
        });
    }
}
