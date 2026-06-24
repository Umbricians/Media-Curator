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
}
