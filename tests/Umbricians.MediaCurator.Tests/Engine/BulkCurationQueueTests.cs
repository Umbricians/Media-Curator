using Umbricians.MediaCurator.Engine;

namespace Umbricians.MediaCurator.Tests.Engine;

public class BulkCurationQueueTests
{
    [Test]
    public void Enqueue_dequeue_round_trip()
    {
        var queue = new BulkCurationQueue(TimeProvider.System);
        var scope = Guid.NewGuid();

        Assert.That(queue.TryEnqueue(scope, recursive: true), Is.True);
        Assert.That(queue.QueueLength, Is.EqualTo(1));
        Assert.That(queue.TryDequeue(out var request), Is.True);
        Assert.That(request!.ScopeFolderKey, Is.EqualTo(scope));
        Assert.That(request.Recursive, Is.True);
        Assert.That(queue.QueueLength, Is.EqualTo(0));
    }

    [Test]
    public void Same_scope_cannot_be_double_queued_while_pending_or_running()
    {
        var queue = new BulkCurationQueue(TimeProvider.System);
        var scope = Guid.NewGuid();

        Assert.That(queue.TryEnqueue(scope, true), Is.True);
        Assert.That(queue.TryEnqueue(scope, true), Is.False); // queued

        queue.TryDequeue(out _);
        queue.Report(scope, new BulkRunStatus(scope, BulkRunState.Running, 0, 10, null, null));
        Assert.That(queue.TryEnqueue(scope, true), Is.False); // running

        queue.Report(scope, new BulkRunStatus(scope, BulkRunState.Completed, 10, 10, null, Guid.NewGuid()));
        Assert.That(queue.TryEnqueue(scope, true), Is.True); // done → requeue allowed
    }

    [Test]
    public void Statuses_reflect_reports()
    {
        var queue = new BulkCurationQueue(TimeProvider.System);
        var scope = Guid.NewGuid();
        queue.TryEnqueue(scope, true);

        queue.Report(scope, new BulkRunStatus(scope, BulkRunState.Failed, 0, 0, "boom", null));

        var status = TestAssert.Single(queue.GetStatuses());
        Assert.That(status.State, Is.EqualTo(BulkRunState.Failed));
        Assert.That(status.Error, Is.EqualTo("boom"));
    }

    [Test]
    public void Media_runs_refuse_a_folder_above_or_below_one_already_queued()
    {
        var queue = new BulkCurationQueue(TimeProvider.System);
        var demo = Guid.NewGuid();

        Assert.That(queue.TryEnqueueMedia(demo, "Demo", "-1,10", 500, EmptyFolderRemoval.RecycleBin), Is.EqualTo(BulkEnqueueResult.Queued));
        Assert.That(queue.TryEnqueueMedia(Guid.NewGuid(), "2026", "-1,10,12", 200, EmptyFolderRemoval.RecycleBin), Is.EqualTo(BulkEnqueueResult.Overlapping));
        Assert.That(queue.TryEnqueueMedia(Guid.NewGuid(), "Root", "-1", 900, EmptyFolderRemoval.RecycleBin), Is.EqualTo(BulkEnqueueResult.Overlapping));
        Assert.That(queue.TryEnqueueMedia(Guid.NewGuid(), "Other", "-1,105", 300, EmptyFolderRemoval.RecycleBin), Is.EqualTo(BulkEnqueueResult.Queued));

        Assert.That(queue.TryDequeue(out var request), Is.True);
        Assert.That(request!.MediaRun, Is.True);
        Assert.That(request.ScopeFolderKey, Is.EqualTo(demo));
        Assert.That(queue.GetStatus(demo)!.ImageCount, Is.EqualTo(500));
    }

    [Test]
    public void A_finished_media_run_no_longer_blocks_its_folder()
    {
        var queue = new BulkCurationQueue(TimeProvider.System);
        var demo = Guid.NewGuid();
        queue.TryEnqueueMedia(demo, "Demo", "-1,10", 500, EmptyFolderRemoval.RecycleBin);

        queue.Report(demo, queue.GetStatus(demo)! with { State = BulkRunState.Completed });

        Assert.That(queue.TryEnqueueMedia(Guid.NewGuid(), "2026", "-1,10,12", 200, EmptyFolderRemoval.RecycleBin), Is.EqualTo(BulkEnqueueResult.Queued));
    }
}
