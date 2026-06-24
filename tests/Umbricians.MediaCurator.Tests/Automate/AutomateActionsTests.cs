using System.Runtime.CompilerServices;
using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Umbraco.Automate.Core.Actions;
using Umbraco.Automate.Core.Settings;
using Umbricians.MediaCurator;
using Umbricians.MediaCurator.Automate.Actions;
using Umbricians.MediaCurator.Engine;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Tests.Automate;

public class AutomateActionsTests
{
    private static ActionInfrastructure Infrastructure()
        => (ActionInfrastructure)RuntimeHelpers.GetUninitializedObject(typeof(ActionInfrastructure));

    private static ActionContext Context(object settings) => new()
    {
        AutomationId = Guid.NewGuid(),
        RunId = Guid.NewGuid(),
        StepId = Guid.NewGuid(),
        ActionAlias = "test",
        Settings = settings,
    };

    private static IServiceScopeFactory ScopeFactory(params object[] services)
        => new FakeScopeFactory(services);

    private sealed class FakeScopeFactory : IServiceScopeFactory
    {
        private readonly IServiceProvider _provider;

        public FakeScopeFactory(IEnumerable<object> services)
            => _provider = new FakeServiceProvider(services);

        public IServiceScope CreateScope()
            => new FakeServiceScope(_provider);
    }

    private sealed class FakeServiceScope : IServiceScope
    {
        public FakeServiceScope(IServiceProvider provider)
            => ServiceProvider = provider;

        public IServiceProvider ServiceProvider { get; }

        public void Dispose()
        {
        }
    }

    private sealed class FakeServiceProvider : IServiceProvider
    {
        private readonly Dictionary<Type, object> _services = [];

        public FakeServiceProvider(IEnumerable<object> services)
        {
            foreach (var service in services)
            {
                Register(service);
            }
        }

        public object? GetService(Type serviceType)
            => _services.TryGetValue(serviceType, out var service) ? service : null;

        private void Register(object service)
        {
            switch (service)
            {
                case ICurationEngine engine:
                    _services[typeof(ICurationEngine)] = engine;
                    break;

                case IRulesetResolver resolver:
                    _services[typeof(IRulesetResolver)] = resolver;
                    break;

                case IRecognitionService recognition:
                    _services[typeof(IRecognitionService)] = recognition;
                    break;

                default:
                    throw new InvalidOperationException($"Unsupported test service type '{service.GetType()}'.");
            }
        }
    }

    private sealed class FakeEngine : ICurationEngine
    {
        public CurationPlan? Plan;
        public CurationPlan? ExecutedPlan;
        public string? ExecutedTrigger;

        public Task<CurationPlan> PlanAsync(Guid scope, bool recursive, CancellationToken ct = default)
            => Plan is null
                ? throw new InvalidOperationException("No enabled ruleset.")
                : Task.FromResult(Plan);

        public Task<CurationRunSummary> ExecuteAsync(CurationPlan plan, string trigger, CancellationToken ct = default)
        {
            ExecutedPlan = plan;
            ExecutedTrigger = trigger;
            return Task.FromResult(new CurationRunSummary(Guid.NewGuid(), plan.Moves.Count(m => !m.AlreadyInPlace), 0, 0));
        }
    }

    private sealed class FakeResolver : IRulesetResolver
    {
        public Ruleset? Ruleset;

        public Task<Ruleset?> ResolveForItemAsync(Guid mediaKey, CancellationToken ct = default)
            => Task.FromResult(Ruleset);
    }

    private sealed class FakeRecognition : IRecognitionService
    {
        public RecognitionResult? Result;
        public bool? ForceSeen;
        public string? SchemeSeen;

        public Task<RecognitionResult?> AnalyzeAsync(
            Guid mediaKey,
            bool force = false,
            string? classificationSchemeAlias = null,
            CancellationToken ct = default)
        {
            ForceSeen = force;
            SchemeSeen = classificationSchemeAlias;
            return Task.FromResult(Result);
        }
    }

    private sealed class OptionsMonitorStub : IOptionsMonitor<MediaCuratorOptions>
    {
        public OptionsMonitorStub(MediaCuratorOptions value) => CurrentValue = value;
        public MediaCuratorOptions CurrentValue { get; }
        public MediaCuratorOptions Get(string? name) => CurrentValue;
        public IDisposable? OnChange(Action<MediaCuratorOptions, string?> listener) => null;
    }

    private static CurationPlan PlanWith(params PlannedMove[] moves)
        => new(Guid.NewGuid(), Guid.NewGuid(), "rs", moves, []);

    [Fact]
    public async Task CurateFolder_dry_run_plans_without_executing()
    {
        var engine = new FakeEngine
        {
            Plan = PlanWith(new PlannedMove(Guid.NewGuid(), "a.jpg", Guid.NewGuid(), ["2026"], false, null)),
        };
        var action = new CurateFolderAction(Infrastructure(), ScopeFactory(engine));

        var result = await action.ExecuteAsync(
            Context(new CurateFolderSettings { ScopeFolderKey = Guid.NewGuid().ToString(), DryRun = true }),
            CancellationToken.None);

        Assert.Equal(ActionResultStatus.Success, result.Status);
        Assert.Null(engine.ExecutedPlan);
        Assert.Equal(1, ((CurateFolderOutput)result.OutputData!).Planned);
    }

    [Fact]
    public async Task CurateFolder_executes_with_automate_trigger()
    {
        var engine = new FakeEngine
        {
            Plan = PlanWith(new PlannedMove(Guid.NewGuid(), "a.jpg", Guid.NewGuid(), ["2026"], false, null)),
        };
        var action = new CurateFolderAction(Infrastructure(), ScopeFactory(engine));

        var result = await action.ExecuteAsync(
            Context(new CurateFolderSettings { ScopeFolderKey = Guid.NewGuid().ToString() }),
            CancellationToken.None);

        Assert.Equal(ActionResultStatus.Success, result.Status);
        Assert.NotNull(engine.ExecutedPlan);
        Assert.Equal("automate", engine.ExecutedTrigger);
        Assert.Equal(1, ((CurateFolderOutput)result.OutputData!).Moved);
    }

    [Fact]
    public async Task CurateFolder_without_ruleset_fails_with_validation_category()
    {
        var action = new CurateFolderAction(Infrastructure(), ScopeFactory(new FakeEngine()));

        var result = await action.ExecuteAsync(
            Context(new CurateFolderSettings { ScopeFolderKey = Guid.NewGuid().ToString() }),
            CancellationToken.None);

        Assert.Equal(ActionResultStatus.Failed, result.Status);
    }

    [Fact]
    public async Task CategorizeMedia_moves_only_the_requested_item()
    {
        var mediaKey = Guid.NewGuid();
        var other = Guid.NewGuid();
        var scope = Guid.NewGuid();
        var engine = new FakeEngine
        {
            Plan = PlanWith(
                new PlannedMove(mediaKey, "a.jpg", scope, ["2026"], false, null),
                new PlannedMove(other, "b.jpg", scope, ["2025"], false, null)),
        };
        var resolver = new FakeResolver { Ruleset = new Ruleset { ScopeRootKey = scope, Name = "rs" } };
        var action = new CategorizeMediaAction(Infrastructure(), ScopeFactory(resolver, engine));

        var result = await action.ExecuteAsync(
            Context(new CategorizeMediaSettings { MediaKey = mediaKey.ToString() }),
            CancellationToken.None);

        Assert.Equal(ActionResultStatus.Success, result.Status);
        var output = (CategorizeMediaOutput)result.OutputData!;
        Assert.True(output.Moved);
        Assert.Equal("2026", output.TargetPath);
        Assert.Equal(mediaKey, Assert.Single(engine.ExecutedPlan!.Moves).MediaKey);
    }

    [Fact]
    public async Task CategorizeMedia_dry_run_reports_target_without_moving()
    {
        var mediaKey = Guid.NewGuid();
        var scope = Guid.NewGuid();
        var engine = new FakeEngine
        {
            Plan = PlanWith(new PlannedMove(mediaKey, "a.jpg", scope, ["2026"], false, null)),
        };
        var resolver = new FakeResolver { Ruleset = new Ruleset { ScopeRootKey = scope, Name = "rs" } };
        var action = new CategorizeMediaAction(Infrastructure(), ScopeFactory(resolver, engine));

        var result = await action.ExecuteAsync(
            Context(new CategorizeMediaSettings { MediaKey = mediaKey.ToString(), DryRun = true }),
            CancellationToken.None);

        var output = (CategorizeMediaOutput)result.OutputData!;
        Assert.False(output.Moved);
        Assert.Equal("2026", output.TargetPath);
        Assert.Null(engine.ExecutedPlan);
    }

    [Fact]
    public async Task CategorizeMedia_without_governing_ruleset_reports_reason()
    {
        var action = new CategorizeMediaAction(Infrastructure(), ScopeFactory(new FakeResolver(), new FakeEngine()));

        var result = await action.ExecuteAsync(
            Context(new CategorizeMediaSettings { MediaKey = Guid.NewGuid().ToString() }),
            CancellationToken.None);

        var output = (CategorizeMediaOutput)result.OutputData!;
        Assert.False(output.Moved);
        Assert.Contains("No ruleset", output.Reason);
    }

    [Fact]
    public void AnalyzeImageSettings_accepts_binding_expression_for_mediaKey()
    {
        var schema = EditableModelSchemaBuilder.Build(typeof(AnalyzeImageSettings));
        var mediaKeyField = Assert.Single(schema!.Fields, f => f.PropertyName == "MediaKey");
        Assert.Equal(typeof(string), mediaKeyField.PropertyType);

        var settings = JsonSerializer.Deserialize<AnalyzeImageSettings>(
            """{"mediaKey":"${trigger.mediaKey}","force":true}""",
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        Assert.Equal("${trigger.mediaKey}", settings!.MediaKey);
    }

    [Fact]
    public async Task AnalyzeImage_returns_tags_and_passes_force_flag()
    {
        var recognition = new FakeRecognition
        {
            Result = new RecognitionResult([new AiTag("people", 0.9)], "two people"),
        };
        var action = new AnalyzeImageAction(
            Infrastructure(),
            ScopeFactory(recognition),
            new OptionsMonitorStub(new MediaCuratorOptions()));

        var result = await action.ExecuteAsync(
            Context(new AnalyzeImageSettings { MediaKey = Guid.NewGuid().ToString(), Force = true }),
            CancellationToken.None);

        var output = (AnalyzeImageOutput)result.OutputData!;
        Assert.True(output.Analyzed);
        Assert.Equal(["people"], output.Tags);
        Assert.True(recognition.ForceSeen);
    }

    [Fact]
    public async Task AnalyzeImage_passes_step_scheme_and_outputs_classification_code()
    {
        var recognition = new FakeRecognition
        {
            Result = new RecognitionResult([new AiTag("photography", 0.9)], "a photo", "770"),
        };
        var action = new AnalyzeImageAction(
            Infrastructure(),
            ScopeFactory(recognition),
            new OptionsMonitorStub(new MediaCuratorOptions { ClassificationSchemeAlias = "lcc" }));

        var result = await action.ExecuteAsync(
            Context(new AnalyzeImageSettings
            {
                MediaKey = Guid.NewGuid().ToString(),
                Scheme = "dewey-pd",
            }),
            CancellationToken.None);

        var output = (AnalyzeImageOutput)result.OutputData!;
        Assert.Equal("dewey-pd", recognition.SchemeSeen);
        Assert.Equal("770", output.ClassificationCode);
    }

    [Fact]
    public async Task AnalyzeImage_uses_appsettings_scheme_when_step_scheme_unset()
    {
        var recognition = new FakeRecognition { Result = RecognitionResult.Empty };
        var action = new AnalyzeImageAction(
            Infrastructure(),
            ScopeFactory(recognition),
            new OptionsMonitorStub(new MediaCuratorOptions { ClassificationSchemeAlias = "dewey-pd" }));

        await action.ExecuteAsync(
            Context(new AnalyzeImageSettings { MediaKey = Guid.NewGuid().ToString() }),
            CancellationToken.None);

        Assert.Equal("dewey-pd", recognition.SchemeSeen);
    }
}
