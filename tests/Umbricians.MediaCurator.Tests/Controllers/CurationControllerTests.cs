using Microsoft.AspNetCore.Mvc;
using Umbricians.MediaCurator.Controllers;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Engine;

namespace Umbricians.MediaCurator.Tests.Controllers;

public class CurationControllerTests
{
    private sealed class StubEngine : ICurationEngine
    {
        public MediaCurationPlan? Plan;
        public readonly List<(CurationPlan Plan, string Trigger, EmptyFolderRemoval Removal, FolderSorting Sorting)> Executed = [];
        public readonly List<string> Calls = [];
        public (Guid MediaKey, IReadOnlyList<ExecutedPlan> Executed)? MediaSort;
        public CurationPlan? ScopePlan;
        public int FoldersRemovedPerRun;
        public int MediaFoldersRemoved;
        public (Guid MediaKey, IReadOnlyList<ExecutedPlan> Executed, EmptyFolderRemoval Removal)? MediaCleanup;

        public Task<CurationPlan> PlanAsync(Guid scopeFolderKey, bool recursive, CancellationToken ct = default)
            => ScopePlan is { } p ? Task.FromResult(p) : throw new NotSupportedException();

        public Task<MediaCurationPlan> PlanForMediaAsync(Guid mediaKey, CancellationToken ct = default)
            => Plan is { } p && p.MediaKey == mediaKey
                ? Task.FromResult(p)
                : throw new MediaNotFoundException(mediaKey);

        public Task<CurationRunSummary> ExecuteAsync(CurationPlan plan, string trigger, CurationExecutionOptions options, CancellationToken ct = default)
        {
            Executed.Add((plan, trigger, options.EmptyFolders, options.Sorting));
            Calls.Add("execute");
            return Task.FromResult(new CurationRunSummary(Guid.NewGuid(), plan.MoveCount, plan.Moves.Count - plan.MoveCount, 0, FoldersRemovedPerRun));
        }

        public Task<int> RemoveEmptyFoldersForMediaAsync(Guid mediaKey, IReadOnlyList<ExecutedPlan> executed, EmptyFolderRemoval emptyFolders, CancellationToken ct = default)
        {
            MediaCleanup = (mediaKey, executed, emptyFolders);
            Calls.Add("cleanup");
            return Task.FromResult(MediaFoldersRemoved);
        }

        public Task<int> SortFoldersForMediaAsync(Guid mediaKey, IReadOnlyList<ExecutedPlan> executed, CancellationToken ct = default)
        {
            MediaSort = (mediaKey, executed);
            Calls.Add("sort");
            return Task.FromResult(0);
        }

        public int EmptyFolders;
        public readonly List<Guid> CountedFolders = [];
        public int Images;

        public int CountImages(Guid mediaKey) => Images;

        public Task<int> CountEmptyFoldersAsync(Guid folderKey, CancellationToken ct = default)
        {
            CountedFolders.Add(folderKey);
            return Task.FromResult(EmptyFolders);
        }
    }

    private static CurationController Controller(StubEngine engine)
        => new(engine, null!, null!, null!, null!, null!);

    private static PlannedMove Move(string name, bool inPlace)
        => new(Guid.NewGuid(), name, Guid.NewGuid(), ["2026"], inPlace, null);

    private static CurationPlan PlanOf(string name, params PlannedMove[] moves)
        => new(Guid.NewGuid(), Guid.NewGuid(), name, moves, [$"{name}: left in place"]);

    private static (StubEngine Engine, Guid Key) TwoPlanEngine()
    {
        var key = Guid.NewGuid();
        var engine = new StubEngine
        {
            Plan = new MediaCurationPlan(
                key,
                [PlanOf("A", Move("a1", false), Move("a2", true)), PlanOf("B", Move("b1", false))],
                ["x.jpg: no ruleset applies"]),
        };
        return (engine, key);
    }

    [Test]
    public async Task Plan_returns_summed_counts_and_all_skipped_items()
    {
        var (engine, key) = TwoPlanEngine();

        var result = await Controller(engine).PlanMediaCuration(key, CancellationToken.None);

        var model = TestAssert.IsType<MediaCurationPlanModel>(TestAssert.IsType<OkObjectResult>(result).Value);
        Assert.That(model.MediaKey, Is.EqualTo(key));
        Assert.That(model.MoveCount, Is.EqualTo(2));
        Assert.That(model.AlreadyInPlaceCount, Is.EqualTo(1));
        Assert.That(model.Plans.Count, Is.EqualTo(2));
        Assert.That(model.SkippedItems.Count, Is.EqualTo(3));
    }

    [Test]
    public async Task Execute_reports_the_folders_the_run_changed_so_the_tree_can_reload_them()
    {
        var (engine, key) = TwoPlanEngine();
        var changes = new MediaChangeTracker();
        var moved = Guid.NewGuid();
        changes.FolderChanged(moved);
        changes.FolderChanged(Guid.Empty);
        changes.FolderChanged(moved);

        var result = await new CurationController(engine, null!, null!, null!, null!, null!, changes)
            .ExecuteMediaCuration(key, permanentlyDeleteEmptyFolders: false, CancellationToken.None);

        var model = TestAssert.IsType<MediaCurationSummaryModel>(TestAssert.IsType<OkObjectResult>(result).Value);
        Assert.That(model.ChangedFolderKeys.Order(), Is.EqualTo(new[] { moved, Guid.Empty }.Order()));
    }

    [Test]
    public async Task Execute_runs_each_plan_manually_and_sums_the_results()
    {
        var (engine, key) = TwoPlanEngine();

        var result = await Controller(engine).ExecuteMediaCuration(key, permanentlyDeleteEmptyFolders: false, CancellationToken.None);

        var model = TestAssert.IsType<MediaCurationSummaryModel>(TestAssert.IsType<OkObjectResult>(result).Value);
        Assert.That(model.Moved, Is.EqualTo(2));
        Assert.That(model.AlreadyInPlace, Is.EqualTo(1));
        Assert.That(model.Failed, Is.EqualTo(0));
        Assert.That(model.RunKeys.Count, Is.EqualTo(2));
        foreach (var e in engine.Executed)
        {
            Assert.That(e.Trigger, Is.EqualTo("manual"));
        }
    }

    [Test]
    public async Task More_images_than_the_threshold_are_queued_not_curated()
    {
        var (engine, key) = TwoPlanEngine();
        engine.Images = MediaCuratorDefaults.BackgroundCurationThreshold + 1;
        var queue = new BulkCurationQueue(TimeProvider.System);

        var result = await new CurationController(engine, null!, queue, null!, null!, null!)
            .ExecuteMediaCuration(key, permanentlyDeleteEmptyFolders: true, CancellationToken.None);

        var model = TestAssert.IsType<MediaCurationSummaryModel>(TestAssert.IsType<OkObjectResult>(result).Value);
        Assert.That(model.Queued, Is.True);
        Assert.That(model.ImageCount, Is.EqualTo(engine.Images));
        Assert.That(engine.Executed, Is.Empty);
        Assert.That(queue.TryDequeue(out var request), Is.True);
        Assert.That(request!.EmptyFolders, Is.EqualTo(EmptyFolderRemoval.Delete));
    }

    [Test]
    public async Task A_folder_already_curating_in_the_background_is_refused()
    {
        var (engine, key) = TwoPlanEngine();
        engine.Images = MediaCuratorDefaults.BackgroundCurationThreshold + 1;
        var controller = new CurationController(engine, null!, new BulkCurationQueue(TimeProvider.System), null!, null!, null!);
        await controller.ExecuteMediaCuration(key, permanentlyDeleteEmptyFolders: false, CancellationToken.None);

        var second = await controller.ExecuteMediaCuration(key, permanentlyDeleteEmptyFolders: false, CancellationToken.None);

        Assert.That(second, Is.TypeOf<ConflictObjectResult>());
    }

    [Test]
    public async Task A_ruleset_scope_with_more_images_than_the_threshold_is_queued()
    {
        var engine = new StubEngine { Images = MediaCuratorDefaults.BackgroundCurationThreshold + 1 };
        var queue = new BulkCurationQueue(TimeProvider.System);
        var scope = Guid.NewGuid();

        var result = await new CurationController(engine, null!, queue, null!, null!, null!)
            .ExecuteCuration(new CurationRequestModel { ScopeFolderKey = scope, PermanentlyDeleteEmptyFolders = true }, CancellationToken.None);

        var model = TestAssert.IsType<CurationRunSummaryModel>(TestAssert.IsType<OkObjectResult>(result).Value);
        Assert.That(model.Queued, Is.True);
        Assert.That(engine.Executed, Is.Empty);
        Assert.That(queue.TryDequeue(out var request), Is.True);
        Assert.That(request!.MediaRun, Is.False);
        Assert.That(request.ScopeFolderKey, Is.EqualTo(scope));
        Assert.That(request.EmptyFolders, Is.EqualTo(EmptyFolderRemoval.Delete));
    }

    [Test]
    public async Task Up_to_the_threshold_curates_in_the_request()
    {
        var (engine, key) = TwoPlanEngine();
        engine.Images = MediaCuratorDefaults.BackgroundCurationThreshold;

        var result = await Controller(engine).ExecuteMediaCuration(key, permanentlyDeleteEmptyFolders: false, CancellationToken.None);

        var model = TestAssert.IsType<MediaCurationSummaryModel>(TestAssert.IsType<OkObjectResult>(result).Value);
        Assert.That(model.Queued, Is.False);
        Assert.That(engine.Executed.Count, Is.EqualTo(2));
    }

    [Test]
    public async Task Unknown_media_returns_404_with_a_problem_title()
    {
        var engine = new StubEngine();

        var plan = await Controller(engine).PlanMediaCuration(Guid.NewGuid(), CancellationToken.None);
        var execute = await Controller(engine).ExecuteMediaCuration(Guid.NewGuid(), permanentlyDeleteEmptyFolders: false, CancellationToken.None);

        foreach (var result in new[] { plan, execute })
        {
            var problem = TestAssert.IsType<ProblemDetails>(TestAssert.IsType<NotFoundObjectResult>(result).Value);
            Assert.That(problem.Type, Is.EqualTo("Error"));
            Assert.That(string.IsNullOrEmpty(problem.Title), Is.False);
        }

        Assert.That(engine.Executed, Is.Empty);
    }

    [Test]
    public async Task Execute_media_cleans_up_once_after_all_plans_and_returns_the_count()
    {
        var (engine, key) = TwoPlanEngine();
        engine.MediaFoldersRemoved = 4;

        var result = await Controller(engine).ExecuteMediaCuration(key, permanentlyDeleteEmptyFolders: false, CancellationToken.None);

        var model = TestAssert.IsType<MediaCurationSummaryModel>(TestAssert.IsType<OkObjectResult>(result).Value);
        Assert.That(model.FoldersRemoved, Is.EqualTo(4));
        var cleanup = engine.MediaCleanup!.Value;
        Assert.That(cleanup.MediaKey, Is.EqualTo(key));
        Assert.That(cleanup.Removal, Is.EqualTo(EmptyFolderRemoval.RecycleBin));
        Assert.That(cleanup.Executed.Count, Is.EqualTo(2));
        // Plans themselves run without cleanup; it happens once afterwards.
        foreach (var e in engine.Executed)
        {
            Assert.That(e.Removal, Is.EqualTo(EmptyFolderRemoval.None));
        }
    }

    [Test]
    public async Task Execute_media_sorts_once_after_cleanup_with_every_executed_plan()
    {
        var (engine, key) = TwoPlanEngine();

        await Controller(engine).ExecuteMediaCuration(key, permanentlyDeleteEmptyFolders: false, CancellationToken.None);

        // Plans run without sorting; the clicked tree is sorted once, after the cleanup.
        foreach (var e in engine.Executed)
        {
            Assert.That(e.Sorting, Is.EqualTo(FolderSorting.None));
        }
        Assert.That(engine.Calls, Is.EqualTo(["execute", "execute", "cleanup", "sort"]));
        var sort = engine.MediaSort!.Value;
        Assert.That(sort.MediaKey, Is.EqualTo(key));
        Assert.That(sort.Executed.Count, Is.EqualTo(2));
    }

    [Test]
    public async Task Execute_media_honours_the_permanent_delete_flag()
    {
        var (engine, key) = TwoPlanEngine();

        await Controller(engine).ExecuteMediaCuration(key, permanentlyDeleteEmptyFolders: true, CancellationToken.None);

        Assert.That(engine.MediaCleanup!.Value.Removal, Is.EqualTo(EmptyFolderRemoval.Delete));
    }

    [TestCase(false, EmptyFolderRemoval.RecycleBin)]
    [TestCase(true, EmptyFolderRemoval.Delete)]
    public async Task Execute_scope_passes_the_removal_mode_and_returns_folders_removed(bool permanent, EmptyFolderRemoval expected)
    {
        var engine = new StubEngine { ScopePlan = PlanOf("A"), FoldersRemovedPerRun = 3 };
        var request = new CurationRequestModel { ScopeFolderKey = Guid.NewGuid(), PermanentlyDeleteEmptyFolders = permanent };

        var result = await Controller(engine).ExecuteCuration(request, CancellationToken.None);

        var model = TestAssert.IsType<CurationRunSummaryModel>(TestAssert.IsType<OkObjectResult>(result).Value);
        Assert.That(model.FoldersRemoved, Is.EqualTo(3));
        var executed = TestAssert.Single(engine.Executed);
        Assert.That(executed.Removal, Is.EqualTo(expected));
        Assert.That(executed.Sorting, Is.EqualTo(FolderSorting.Subtree));
    }

    [Test]
    public async Task Plan_scope_never_executes_or_cleans_up()
    {
        var engine = new StubEngine { ScopePlan = PlanOf("A") };
        var request = new CurationRequestModel { ScopeFolderKey = Guid.NewGuid(), PermanentlyDeleteEmptyFolders = true };

        await Controller(engine).PlanCuration(request, CancellationToken.None);

        Assert.That(engine.Executed, Is.Empty);
        Assert.That(engine.MediaCleanup, Is.Null);
        Assert.That(engine.MediaSort, Is.Null);
    }

    [Test]
    public async Task Media_plan_reports_empty_folders_below_the_clicked_folder()
    {
        var (engine, key) = TwoPlanEngine();
        engine.EmptyFolders = 4;

        var model = TestAssert.IsType<MediaCurationPlanModel>(TestAssert.IsType<OkObjectResult>(await Controller(engine).PlanMediaCuration(key, CancellationToken.None)).Value);

        Assert.That(model.EmptyFolderCount, Is.EqualTo(4));
        Assert.That(engine.CountedFolders, Is.EqualTo([key]));
    }

    [Test]
    public async Task Scope_plan_reports_empty_folders_below_the_scope()
    {
        var scope = Guid.NewGuid();
        var engine = new StubEngine { ScopePlan = new CurationPlan(scope, Guid.NewGuid(), "A", [], []), EmptyFolders = 2 };

        var model = TestAssert.IsType<CurationPlanModel>(TestAssert.IsType<OkObjectResult>(await Controller(engine).PlanCuration(new CurationRequestModel { ScopeFolderKey = scope }, CancellationToken.None)).Value);

        Assert.That(model.EmptyFolderCount, Is.EqualTo(2));
        Assert.That(engine.CountedFolders, Is.EqualTo([scope]));
    }
}
