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

    [Fact]
    public async Task Plan_returns_summed_counts_and_all_skipped_items()
    {
        var (engine, key) = TwoPlanEngine();

        var result = await Controller(engine).PlanMediaCuration(key, CancellationToken.None);

        var model = Assert.IsType<MediaCurationPlanModel>(Assert.IsType<OkObjectResult>(result).Value);
        Assert.Equal(key, model.MediaKey);
        Assert.Equal(2, model.MoveCount);
        Assert.Equal(1, model.AlreadyInPlaceCount);
        Assert.Equal(2, model.Plans.Count);
        Assert.Equal(3, model.SkippedItems.Count);
    }

    [Fact]
    public async Task Execute_runs_each_plan_manually_and_sums_the_results()
    {
        var (engine, key) = TwoPlanEngine();

        var result = await Controller(engine).ExecuteMediaCuration(key, permanentlyDeleteEmptyFolders: false, CancellationToken.None);

        var model = Assert.IsType<MediaCurationSummaryModel>(Assert.IsType<OkObjectResult>(result).Value);
        Assert.Equal(2, model.Moved);
        Assert.Equal(1, model.AlreadyInPlace);
        Assert.Equal(0, model.Failed);
        Assert.Equal(2, model.RunKeys.Count);
        Assert.All(engine.Executed, e => Assert.Equal("manual", e.Trigger));
    }

    [Fact]
    public async Task Unknown_media_returns_404_with_a_problem_title()
    {
        var engine = new StubEngine();

        var plan = await Controller(engine).PlanMediaCuration(Guid.NewGuid(), CancellationToken.None);
        var execute = await Controller(engine).ExecuteMediaCuration(Guid.NewGuid(), permanentlyDeleteEmptyFolders: false, CancellationToken.None);

        foreach (var result in new[] { plan, execute })
        {
            var problem = Assert.IsType<ProblemDetails>(Assert.IsType<NotFoundObjectResult>(result).Value);
            Assert.Equal("Error", problem.Type);
            Assert.False(string.IsNullOrEmpty(problem.Title));
        }

        Assert.Empty(engine.Executed);
    }

    [Fact]
    public async Task Execute_media_cleans_up_once_after_all_plans_and_returns_the_count()
    {
        var (engine, key) = TwoPlanEngine();
        engine.MediaFoldersRemoved = 4;

        var result = await Controller(engine).ExecuteMediaCuration(key, permanentlyDeleteEmptyFolders: false, CancellationToken.None);

        var model = Assert.IsType<MediaCurationSummaryModel>(Assert.IsType<OkObjectResult>(result).Value);
        Assert.Equal(4, model.FoldersRemoved);
        var cleanup = engine.MediaCleanup!.Value;
        Assert.Equal(key, cleanup.MediaKey);
        Assert.Equal(EmptyFolderRemoval.RecycleBin, cleanup.Removal);
        Assert.Equal(2, cleanup.Executed.Count);
        // Plans themselves run without cleanup; it happens once afterwards.
        Assert.All(engine.Executed, e => Assert.Equal(EmptyFolderRemoval.None, e.Removal));
    }

    [Fact]
    public async Task Execute_media_sorts_once_after_cleanup_with_every_executed_plan()
    {
        var (engine, key) = TwoPlanEngine();

        await Controller(engine).ExecuteMediaCuration(key, permanentlyDeleteEmptyFolders: false, CancellationToken.None);

        // Plans run without sorting; the clicked tree is sorted once, after the cleanup.
        Assert.All(engine.Executed, e => Assert.Equal(FolderSorting.None, e.Sorting));
        Assert.Equal(["execute", "execute", "cleanup", "sort"], engine.Calls);
        var sort = engine.MediaSort!.Value;
        Assert.Equal(key, sort.MediaKey);
        Assert.Equal(2, sort.Executed.Count);
    }

    [Fact]
    public async Task Execute_media_honours_the_permanent_delete_flag()
    {
        var (engine, key) = TwoPlanEngine();

        await Controller(engine).ExecuteMediaCuration(key, permanentlyDeleteEmptyFolders: true, CancellationToken.None);

        Assert.Equal(EmptyFolderRemoval.Delete, engine.MediaCleanup!.Value.Removal);
    }

    [Theory]
    [InlineData(false, EmptyFolderRemoval.RecycleBin)]
    [InlineData(true, EmptyFolderRemoval.Delete)]
    public async Task Execute_scope_passes_the_removal_mode_and_returns_folders_removed(bool permanent, EmptyFolderRemoval expected)
    {
        var engine = new StubEngine { ScopePlan = PlanOf("A"), FoldersRemovedPerRun = 3 };
        var request = new CurationRequestModel { ScopeFolderKey = Guid.NewGuid(), PermanentlyDeleteEmptyFolders = permanent };

        var result = await Controller(engine).ExecuteCuration(request, CancellationToken.None);

        var model = Assert.IsType<CurationRunSummaryModel>(Assert.IsType<OkObjectResult>(result).Value);
        Assert.Equal(3, model.FoldersRemoved);
        var executed = Assert.Single(engine.Executed);
        Assert.Equal(expected, executed.Removal);
        Assert.Equal(FolderSorting.Subtree, executed.Sorting);
    }

    [Fact]
    public async Task Plan_scope_never_executes_or_cleans_up()
    {
        var engine = new StubEngine { ScopePlan = PlanOf("A") };
        var request = new CurationRequestModel { ScopeFolderKey = Guid.NewGuid(), PermanentlyDeleteEmptyFolders = true };

        await Controller(engine).PlanCuration(request, CancellationToken.None);

        Assert.Empty(engine.Executed);
        Assert.Null(engine.MediaCleanup);
        Assert.Null(engine.MediaSort);
    }

    [Fact]
    public async Task Media_plan_reports_empty_folders_below_the_clicked_folder()
    {
        var (engine, key) = TwoPlanEngine();
        engine.EmptyFolders = 4;

        var model = Assert.IsType<MediaCurationPlanModel>(
            Assert.IsType<OkObjectResult>(await Controller(engine).PlanMediaCuration(key, CancellationToken.None)).Value);

        Assert.Equal(4, model.EmptyFolderCount);
        Assert.Equal([key], engine.CountedFolders);
    }

    [Fact]
    public async Task Scope_plan_reports_empty_folders_below_the_scope()
    {
        var scope = Guid.NewGuid();
        var engine = new StubEngine { ScopePlan = new CurationPlan(scope, Guid.NewGuid(), "A", [], []), EmptyFolders = 2 };

        var model = Assert.IsType<CurationPlanModel>(Assert.IsType<OkObjectResult>(
            await Controller(engine).PlanCuration(new CurationRequestModel { ScopeFolderKey = scope }, CancellationToken.None)).Value);

        Assert.Equal(2, model.EmptyFolderCount);
        Assert.Equal([scope], engine.CountedFolders);
    }
}
