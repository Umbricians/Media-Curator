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
        public readonly List<(CurationPlan Plan, string Trigger)> Executed = [];

        public Task<CurationPlan> PlanAsync(Guid scopeFolderKey, bool recursive, CancellationToken ct = default)
            => throw new NotSupportedException();

        public Task<MediaCurationPlan> PlanForMediaAsync(Guid mediaKey, CancellationToken ct = default)
            => Plan is { } p && p.MediaKey == mediaKey
                ? Task.FromResult(p)
                : throw new MediaNotFoundException(mediaKey);

        public Task<CurationRunSummary> ExecuteAsync(CurationPlan plan, string trigger, CancellationToken ct = default)
        {
            Executed.Add((plan, trigger));
            return Task.FromResult(new CurationRunSummary(Guid.NewGuid(), plan.MoveCount, plan.Moves.Count - plan.MoveCount, 0));
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

        var result = await Controller(engine).ExecuteMediaCuration(key, CancellationToken.None);

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
        var execute = await Controller(engine).ExecuteMediaCuration(Guid.NewGuid(), CancellationToken.None);

        foreach (var result in new[] { plan, execute })
        {
            var problem = Assert.IsType<ProblemDetails>(Assert.IsType<NotFoundObjectResult>(result).Value);
            Assert.Equal("Error", problem.Type);
            Assert.False(string.IsNullOrEmpty(problem.Title));
        }

        Assert.Empty(engine.Executed);
    }
}
