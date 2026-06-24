using System.Collections.Concurrent;

namespace Umbricians.MediaCurator.Engine;

public sealed record BulkCurationRequest(Guid ScopeFolderKey, bool Recursive, DateTime Queued);

public enum BulkRunState
{
    Queued,
    Running,
    Completed,
    Failed,
}

public sealed record BulkRunStatus(
    Guid ScopeFolderKey,
    BulkRunState State,
    int Processed,
    int Total,
    string? Error,
    Guid? RunKey);

/// <summary>
/// In-memory queue for background bulk runs (§11.2 health view shows queue length).
/// Processing happens on a single elected worker (main-dom / scheduling-server aware, §13).
/// </summary>
public interface IBulkCurationQueue
{
    /// <summary>Enqueues a scope for background curation. Returns false when the scope is
    /// already queued or running (no double-processing).</summary>
    bool TryEnqueue(Guid scopeFolderKey, bool recursive);

    bool TryDequeue(out BulkCurationRequest? request);

    void Report(Guid scopeFolderKey, BulkRunStatus status);

    IReadOnlyList<BulkRunStatus> GetStatuses();

    int QueueLength { get; }
}

public sealed class BulkCurationQueue : IBulkCurationQueue
{
    private readonly ConcurrentQueue<BulkCurationRequest> _queue = new();
    private readonly ConcurrentDictionary<Guid, BulkRunStatus> _statuses = new();

    public int QueueLength => _queue.Count;

    public bool TryEnqueue(Guid scopeFolderKey, bool recursive)
    {
        if (_statuses.TryGetValue(scopeFolderKey, out var existing)
            && existing.State is BulkRunState.Queued or BulkRunState.Running)
        {
            return false;
        }

        _statuses[scopeFolderKey] = new BulkRunStatus(scopeFolderKey, BulkRunState.Queued, 0, 0, null, null);
        _queue.Enqueue(new BulkCurationRequest(scopeFolderKey, recursive, DateTime.UtcNow));
        return true;
    }

    public bool TryDequeue(out BulkCurationRequest? request)
    {
        var ok = _queue.TryDequeue(out var item);
        request = item;
        return ok;
    }

    public void Report(Guid scopeFolderKey, BulkRunStatus status) => _statuses[scopeFolderKey] = status;

    public IReadOnlyList<BulkRunStatus> GetStatuses() => _statuses.Values.ToList();
}
