using Microsoft.Extensions.DependencyInjection;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Engine;

/// <summary>
/// Carries ambient state that parallel workers would otherwise lose. Workers run without the caller's
/// execution context (see <see cref="ParallelMediaWork"/>), so anything kept in an <c>AsyncLocal</c> has
/// to be captured on the calling thread and re-applied inside each worker.
/// </summary>
public interface IParallelContextFlow
{
    /// <summary>Called on the calling thread; the returned function runs inside each worker and returns
    /// what undoes it (or null).</summary>
    Func<IDisposable?> Capture();
}

/// <summary>Runs independent per-item media work (AI analysis) concurrently.</summary>
public interface IParallelMediaWork
{
    /// <summary>The configured number of concurrent analyses (at least 1).</summary>
    Task<int> GetMaxParallelismAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Runs <paramref name="body"/> for every item, at most the configured number at a time, and returns
    /// the results in input order. Each item gets its own DI scope; use its services rather than ones
    /// captured from the caller.
    /// </summary>
    Task<TResult[]> RunAsync<TItem, TResult>(
        IReadOnlyList<TItem> items,
        Func<IServiceProvider, TItem, CancellationToken, Task<TResult>> body,
        CancellationToken cancellationToken = default);
}

/// <summary>
/// Umbraco keeps its ambient database scope in an <c>AsyncLocal</c> stack that child tasks share, so
/// concurrent tasks that open scopes from one request corrupt it ("not the ambient scope"). Workers are
/// therefore started with execution-context flow suppressed and a fresh DI scope each, which gives every
/// worker its own Umbraco scope stack.
/// </summary>
internal sealed class ParallelMediaWork : IParallelMediaWork
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly IMediaCuratorSettingsService _settings;
    private readonly IEnumerable<IParallelContextFlow> _contextFlows;

    public ParallelMediaWork(
        IServiceScopeFactory scopeFactory,
        IMediaCuratorSettingsService settings,
        IEnumerable<IParallelContextFlow> contextFlows)
    {
        _scopeFactory = scopeFactory;
        _settings = settings;
        _contextFlows = contextFlows;
    }

    public async Task<int> GetMaxParallelismAsync(CancellationToken cancellationToken = default)
        => MediaCuratorSettingsService.ClampParallel((await _settings.GetAsync(cancellationToken)).MaxParallelAnalyses);

    public async Task<TResult[]> RunAsync<TItem, TResult>(
        IReadOnlyList<TItem> items,
        Func<IServiceProvider, TItem, CancellationToken, Task<TResult>> body,
        CancellationToken cancellationToken = default)
    {
        var results = new TResult[items.Count];
        if (items.Count == 0)
        {
            return results;
        }

        var parallelism = await GetMaxParallelismAsync(cancellationToken);
        var restorers = _contextFlows.Select(f => f.Capture()).ToList();

        async ValueTask RunOneAsync(int index, CancellationToken ct)
        {
            var restored = restorers.Select(r => r()).ToList();
            try
            {
                await using var scope = _scopeFactory.CreateAsyncScope();
                results[index] = await body(scope.ServiceProvider, items[index], ct);
            }
            finally
            {
                for (var i = restored.Count - 1; i >= 0; i--)
                {
                    restored[i]?.Dispose();
                }
            }
        }

        Task work;
        var flow = ExecutionContext.IsFlowSuppressed() ? (AsyncFlowControl?)null : ExecutionContext.SuppressFlow();
        try
        {
            work = Task.Run(
                () => Parallel.ForEachAsync(
                    Enumerable.Range(0, items.Count),
                    new ParallelOptions { MaxDegreeOfParallelism = parallelism, CancellationToken = cancellationToken },
                    RunOneAsync),
                cancellationToken);
        }
        finally
        {
            flow?.Undo();
        }

        await work;
        return results;
    }
}
