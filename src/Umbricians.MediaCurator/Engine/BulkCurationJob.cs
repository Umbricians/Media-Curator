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
internal sealed class BulkCurationJob : IRecurringBackgroundJob
{
    private readonly IBulkCurationQueue _queue;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly IRuntimeState _runtimeState;
    private readonly ILogger<BulkCurationJob> _logger;
    private readonly TimeProvider _time;

    public BulkCurationJob(
        IBulkCurationQueue queue,
        IServiceScopeFactory scopeFactory,
        IRuntimeState runtimeState,
        ILogger<BulkCurationJob> logger,
        TimeProvider time)
    {
        _queue = queue;
        _scopeFactory = scopeFactory;
        _runtimeState = runtimeState;
        _logger = logger;
        _time = time;
    }

    // Short: an editor who sent a large "Curate images" to the background is waiting for it to start.
    public TimeSpan Period => TimeSpan.FromSeconds(5);

    public TimeSpan Delay => TimeSpan.FromSeconds(30);

    public ServerRole[] ServerRoles => [ServerRole.Single, ServerRole.SchedulingPublisher];

    // How long to wait before checking again when Umbraco skips a run (runtime not ready, or not the scheduling
    // server): finite, because a server can be elected scheduler later.
    public TimeSpan IgnoredDelay => TimeSpan.FromMinutes(1);

    public event EventHandler? PeriodChanged
    {
        add { }
        remove { }
    }

    public event EventHandler? IgnoredDelayChanged
    {
        add { }
        remove { }
    }

#if !UMBRACO_19_OR_GREATER
    // Umbraco 19 removed the overload without a cancellation token; 17 and 18 may still call it.
    public Task RunJobAsync() => RunJobAsync(CancellationToken.None);
#endif

    public async Task RunJobAsync(CancellationToken cancellationToken)
    {
        if (_runtimeState.Level != global::Umbraco.Cms.Core.RuntimeLevel.Run)
        {
            return;
        }

        // A run already started finishes, so its moves and undo record stay consistent; shutdown stops the next one.
        while (!cancellationToken.IsCancellationRequested && _queue.TryDequeue(out var request) && request is not null)
        {
            await RunAsync(request);
        }
    }

    /// <summary>A run sent to the background: the same steps as in the foreground ("Curate images" on a
    /// folder, or a ruleset's scope run), with progress reported to the queue after each move.</summary>
    private async Task RunAsync(BulkCurationRequest request)
    {
        var key = request.ScopeFolderKey;
        var queued = _queue.GetStatus(key) ?? new BulkRunStatus(key, BulkRunState.Queued, 0, 0, null, null) { Updated = _time.GetUtcNow().UtcDateTime };
        try
        {
            _queue.Report(key, queued with { State = BulkRunState.Running, Updated = _time.GetUtcNow().UtcDateTime });

            using var serviceScope = _scopeFactory.CreateScope();
            var engine = serviceScope.ServiceProvider.GetRequiredService<ICurationEngine>();
            var changes = serviceScope.ServiceProvider.GetService<IMediaChangeTracker>();

            var running = queued with { State = BulkRunState.Running };
            var progress = new InlineProgress<CurationProgress>(p =>
            {
                running = running with { Processed = p.Processed, Total = p.Total, Updated = _time.GetUtcNow().UtcDateTime };
                _queue.Report(key, running);
            });

            MediaCurationSummary summary;
            if (request.MediaRun)
            {
                summary = await engine.CurateMediaAsync(key, trigger: "background", request.EmptyFolders, progress);
            }
            else
            {
                var plan = await engine.PlanAsync(key, request.Recursive);
                progress.Report(new CurationProgress(0, plan.MoveCount));
                var run = await engine.ExecuteAsync(plan, trigger: "background", new CurationExecutionOptions
                {
                    EmptyFolders = request.EmptyFolders,
                    Sorting = FolderSorting.Subtree,
                    MoveProgress = new InlineProgress<int>(n => progress.Report(new CurationProgress(n, plan.MoveCount))),
                });
                summary = new MediaCurationSummary(
                    run.Moved,
                    run.AlreadyInPlace,
                    run.Failed,
                    run.FoldersRemoved,
                    run.RunKey == Guid.Empty ? [] : [run.RunKey]);
            }

            _queue.Report(key, running with
            {
                State = BulkRunState.Completed,
                Moved = summary.Moved,
                AlreadyInPlace = summary.AlreadyInPlace,
                Failed = summary.Failed,
                FoldersRemoved = summary.FoldersRemoved,
                RunKeys = summary.RunKeys,
                RunKey = summary.RunKeys.Count > 0 ? summary.RunKeys[0] : null,
                ChangedFolderKeys = changes?.ChangedFolders.ToList() ?? [],
                Updated = _time.GetUtcNow().UtcDateTime,
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "MediaCurator: background curation failed for {FolderKey}.", key);
            _queue.Report(key, (_queue.GetStatus(key) ?? queued) with
            {
                State = BulkRunState.Failed,
                Error = ex.Message,
                Updated = _time.GetUtcNow().UtcDateTime,
            });
        }
    }
}
