using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Sync;
using Umbraco.Cms.Infrastructure.BackgroundJobs;

namespace Umbricians.MediaCurator.Engine;

/// <summary>
/// Drains the bulk curation queue on a short interval. Runs only on the elected scheduler
/// (ServerRoles filter) so load-balanced setups have a single worker (§13). Editors never
/// wait on curation: the queue is fire-and-forget from the UI.
/// </summary>
public sealed class BulkCurationJob : IRecurringBackgroundJob
{
    private readonly IBulkCurationQueue _queue;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly IRuntimeState _runtimeState;
    private readonly ILogger<BulkCurationJob> _logger;

    public BulkCurationJob(
        IBulkCurationQueue queue,
        IServiceScopeFactory scopeFactory,
        IRuntimeState runtimeState,
        ILogger<BulkCurationJob> logger)
    {
        _queue = queue;
        _scopeFactory = scopeFactory;
        _runtimeState = runtimeState;
        _logger = logger;
    }

    public TimeSpan Period => TimeSpan.FromSeconds(15);

    public TimeSpan Delay => TimeSpan.FromSeconds(30);

    public ServerRole[] ServerRoles => [ServerRole.Single, ServerRole.SchedulingPublisher];

    public event EventHandler? PeriodChanged
    {
        add { }
        remove { }
    }

    public async Task RunJobAsync()
    {
        if (_runtimeState.Level != global::Umbraco.Cms.Core.RuntimeLevel.Run)
        {
            return;
        }

        while (_queue.TryDequeue(out var request) && request is not null)
        {
            var scope = request.ScopeFolderKey;
            try
            {
                _queue.Report(scope, new BulkRunStatus(scope, BulkRunState.Running, 0, 0, null, null));

                using var serviceScope = _scopeFactory.CreateScope();
                var engine = serviceScope.ServiceProvider.GetRequiredService<ICurationEngine>();

                var plan = await engine.PlanAsync(scope, request.Recursive);
                _queue.Report(scope, new BulkRunStatus(scope, BulkRunState.Running, 0, plan.MoveCount, null, null));

                var summary = await engine.ExecuteAsync(plan, trigger: "background");
                _queue.Report(scope, new BulkRunStatus(scope, BulkRunState.Completed, summary.Moved, plan.MoveCount, null, summary.RunKey));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "MediaCurator: background curation failed for {Scope}.", scope);
                _queue.Report(scope, new BulkRunStatus(scope, BulkRunState.Failed, 0, 0, ex.Message, null));
            }
        }
    }
}
