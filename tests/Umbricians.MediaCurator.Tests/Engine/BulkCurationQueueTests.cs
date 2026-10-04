using Umbricians.MediaCurator.Engine;

namespace Umbricians.MediaCurator.Tests.Engine;

public class BulkCurationQueueTests
{
    [Fact]
    public void Enqueue_dequeue_round_trip()
    {
        var queue = new BulkCurationQueue();
        var scope = Guid.NewGuid();

        Assert.True(queue.TryEnqueue(scope, recursive: true));
        Assert.Equal(1, queue.QueueLength);
        Assert.True(queue.TryDequeue(out var request));
        Assert.Equal(scope, request!.ScopeFolderKey);
        Assert.True(request.Recursive);
        Assert.Equal(0, queue.QueueLength);
    }

    [Fact]
    public void Same_scope_cannot_be_double_queued_while_pending_or_running()
    {
        var queue = new BulkCurationQueue();
        var scope = Guid.NewGuid();

        Assert.True(queue.TryEnqueue(scope, true));
        Assert.False(queue.TryEnqueue(scope, true)); // queued

        queue.TryDequeue(out _);
        queue.Report(scope, new BulkRunStatus(scope, BulkRunState.Running, 0, 10, null, null));
        Assert.False(queue.TryEnqueue(scope, true)); // running

        queue.Report(scope, new BulkRunStatus(scope, BulkRunState.Completed, 10, 10, null, Guid.NewGuid()));
        Assert.True(queue.TryEnqueue(scope, true)); // done → requeue allowed
    }

    [Fact]
    public void Statuses_reflect_reports()
    {
        var queue = new BulkCurationQueue();
        var scope = Guid.NewGuid();
        queue.TryEnqueue(scope, true);

        queue.Report(scope, new BulkRunStatus(scope, BulkRunState.Failed, 0, 0, "boom", null));

        var status = Assert.Single(queue.GetStatuses());
        Assert.Equal(BulkRunState.Failed, status.State);
        Assert.Equal("boom", status.Error);
    }

    [Fact]
    public void Media_runs_refuse_a_folder_above_or_below_one_already_queued()
    {
        var queue = new BulkCurationQueue();
        var demo = Guid.NewGuid();

        Assert.Equal(BulkEnqueueResult.Queued, queue.TryEnqueueMedia(demo, "Demo", "-1,10", 500, EmptyFolderRemoval.RecycleBin));
        Assert.Equal(BulkEnqueueResult.Overlapping, queue.TryEnqueueMedia(Guid.NewGuid(), "2026", "-1,10,12", 200, EmptyFolderRemoval.RecycleBin));
        Assert.Equal(BulkEnqueueResult.Overlapping, queue.TryEnqueueMedia(Guid.NewGuid(), "Root", "-1", 900, EmptyFolderRemoval.RecycleBin));
        Assert.Equal(BulkEnqueueResult.Queued, queue.TryEnqueueMedia(Guid.NewGuid(), "Other", "-1,105", 300, EmptyFolderRemoval.RecycleBin));

        Assert.True(queue.TryDequeue(out var request));
        Assert.True(request!.MediaRun);
        Assert.Equal(demo, request.ScopeFolderKey);
        Assert.Equal(500, queue.GetStatus(demo)!.ImageCount);
    }

    [Fact]
    public void A_finished_media_run_no_longer_blocks_its_folder()
    {
        var queue = new BulkCurationQueue();
        var demo = Guid.NewGuid();
        queue.TryEnqueueMedia(demo, "Demo", "-1,10", 500, EmptyFolderRemoval.RecycleBin);

        queue.Report(demo, queue.GetStatus(demo)! with { State = BulkRunState.Completed });

        Assert.Equal(BulkEnqueueResult.Queued, queue.TryEnqueueMedia(Guid.NewGuid(), "2026", "-1,10,12", 200, EmptyFolderRemoval.RecycleBin));
    }
}
