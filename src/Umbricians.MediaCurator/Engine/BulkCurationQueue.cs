using System.Collections.Concurrent;

namespace Umbricians.MediaCurator.Engine;

public sealed record BulkCurationRequest(Guid ScopeFolderKey, bool Recursive, DateTime Queued)
{
    /// <summary>A "Curate images" run of the clicked folder (<see cref="ICurationEngine.CurateMediaAsync"/>,
    /// every governing ruleset) rather than a scope run of one ruleset.</summary>
    public bool MediaRun { get; init; }

    /// <summary>What a media run does with the empty sub-folders it leaves.</summary>
    public EmptyFolderRemoval EmptyFolders { get; init; } = EmptyFolderRemoval.RecycleBin;
}

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
    Guid? RunKey)
{
    /// <summary>The folder's name, for the backoffice to show.</summary>
    public string? Name { get; init; }

    /// <summary>The folder's tree path ("-1,1056,1783"), to refuse overlapping runs.</summary>
    public string? Path { get; init; }

    /// <summary>Images below the folder when the run was queued.</summary>
    public int ImageCount { get; init; }

    public int Moved { get; init; }

    public int AlreadyInPlace { get; init; }

    public int Failed { get; init; }

    public int FoldersRemoved { get; init; }

    /// <summary>Every run log entry the run produced (one per governing ruleset).</summary>
    public IReadOnlyList<Guid> RunKeys { get; init; } = [];

    /// <summary>Folders whose children changed, for the backoffice to reload when the run finishes.</summary>
    public IReadOnlyList<Guid> ChangedFolderKeys { get; init; } = [];

    public DateTime Updated { get; init; } = DateTime.UtcNow;
}

/// <summary>Whether <see cref="IBulkCurationQueue.TryEnqueueMedia"/> queued the run.</summary>
public enum BulkEnqueueResult
{
    Queued,

    /// <summary>The folder, or a folder above or below it, is already queued or running.</summary>
    Overlapping,
}

/// <summary>
/// In-memory queue for background bulk runs (§11.2 health view shows queue length).
/// Processing happens on a single elected worker (main-dom / scheduling-server aware, §13).
/// </summary>
public interface IBulkCurationQueue
{
    /// <summary>Enqueues a scope for background curation. Returns false when the scope is
    /// already queued or running (no double-processing).</summary>
    bool TryEnqueue(Guid scopeFolderKey, bool recursive);

    /// <summary>Enqueues a "Curate images" run of a folder. Refused while the folder, or any folder
    /// above or below it (by <paramref name="path"/>), is queued or running: two runs moving the same
    /// images at once would fight over them.</summary>
    BulkEnqueueResult TryEnqueueMedia(Guid mediaKey, string name, string path, int imageCount, EmptyFolderRemoval emptyFolders);

    /// <summary>Enqueues a scope run of one ruleset (the Settings › ruleset "Curate" tab), with the
    /// same overlap rule as <see cref="TryEnqueueMedia"/>.</summary>
    BulkEnqueueResult TryEnqueueScope(Guid scopeFolderKey, string name, string path, int imageCount, EmptyFolderRemoval emptyFolders);

    /// <summary>The status of a folder's run, or null when it has none.</summary>
    BulkRunStatus? GetStatus(Guid scopeFolderKey);

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

    public BulkEnqueueResult TryEnqueueMedia(Guid mediaKey, string name, string path, int imageCount, EmptyFolderRemoval emptyFolders)
        => Enqueue(mediaKey, name, path, imageCount, emptyFolders, mediaRun: true);

    public BulkEnqueueResult TryEnqueueScope(Guid scopeFolderKey, string name, string path, int imageCount, EmptyFolderRemoval emptyFolders)
        => Enqueue(scopeFolderKey, name, path, imageCount, emptyFolders, mediaRun: false);

    private BulkEnqueueResult Enqueue(Guid mediaKey, string name, string path, int imageCount, EmptyFolderRemoval emptyFolders, bool mediaRun)
    {
        lock (_statuses)
        {
            if (_statuses.Values.Any(s => s.State is BulkRunState.Queued or BulkRunState.Running
                && (s.ScopeFolderKey == mediaKey || (s.Path is not null && Overlaps(s.Path, path)))))
            {
                return BulkEnqueueResult.Overlapping;
            }

            // Total stays 0 until planning knows how many images actually move.
            _statuses[mediaKey] = new BulkRunStatus(mediaKey, BulkRunState.Queued, 0, 0, null, null)
            {
                Name = name,
                Path = path,
                ImageCount = imageCount,
            };
            _queue.Enqueue(new BulkCurationRequest(mediaKey, Recursive: true, DateTime.UtcNow)
            {
                MediaRun = mediaRun,
                EmptyFolders = emptyFolders,
            });
            return BulkEnqueueResult.Queued;
        }
    }

    /// <summary>One path is the other, or lies below it ("-1,10" contains "-1,10,12", not "-1,105").</summary>
    private static bool Overlaps(string a, string b)
        => a == b || b.StartsWith(a + ",", StringComparison.Ordinal) || a.StartsWith(b + ",", StringComparison.Ordinal);

    public BulkRunStatus? GetStatus(Guid scopeFolderKey) => _statuses.GetValueOrDefault(scopeFolderKey);

    public bool TryDequeue(out BulkCurationRequest? request)
    {
        var ok = _queue.TryDequeue(out var item);
        request = item;
        return ok;
    }

    public void Report(Guid scopeFolderKey, BulkRunStatus status) => _statuses[scopeFolderKey] = status;

    public IReadOnlyList<BulkRunStatus> GetStatuses() => _statuses.Values.ToList();
}
