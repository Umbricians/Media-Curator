using System.Runtime.CompilerServices;
using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Automate.Core.Actions;
using Umbraco.Automate.Core.Execution;
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

    /// <summary>Mirrors Automate's accessor: the origin lives in an AsyncLocal, so it only
    /// reaches code that runs in the same async flow.</summary>
    private sealed class FakeOriginAccessor : IAutomationOriginAccessor
    {
        private static readonly AsyncLocal<AutomationOrigin?> Value = new();

        public AutomationOrigin? Current => Value.Value;

        public IDisposable Push(AutomationOrigin origin)
        {
            var previous = Value.Value;
            Value.Value = origin;
            return new Restore(() => Value.Value = previous);
        }

        private sealed class Restore(Action undo) : IDisposable
        {
            public void Dispose() => undo();
        }
    }

    private static readonly FakeOriginAccessor Origins = new();

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
                case IClassificationSchemeLocator schemes:
                    _services[typeof(IClassificationSchemeLocator)] = schemes;
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

        public int CountImages(Guid mediaKey) => 1;

        public MediaCurationPlan? MediaPlan;

        public bool PlannedWholeScope;
        public CurationPlan? ExecutedPlan;
        public string? ExecutedTrigger;
        public EmptyFolderRemoval? ExecutedRemoval;
        public FolderSorting? ExecutedSorting;
        public int FoldersRemoved;

        public Task<CurationPlan> PlanAsync(Guid scope, bool recursive, CancellationToken ct = default)
        {
            PlannedWholeScope = true;
            return Plan is null
                ? throw new InvalidOperationException("No enabled ruleset.")
                : Task.FromResult(Plan);
        }

        public Task<MediaCurationPlan> PlanForMediaAsync(Guid mediaKey, CancellationToken ct = default)
            => Task.FromResult(MediaPlan ?? new MediaCurationPlan(mediaKey, [], [$"{mediaKey}: no ruleset applies"]));

        public Task<CurationRunSummary> ExecuteAsync(CurationPlan plan, string trigger, CurationExecutionOptions options, CancellationToken ct = default)
        {
            ExecutedPlan = plan;
            ExecutedTrigger = trigger;
            ExecutedRemoval = options.EmptyFolders;
            ExecutedSorting = options.Sorting;
            return Task.FromResult(new CurationRunSummary(Guid.NewGuid(), plan.Moves.Count(m => !m.AlreadyInPlace), 0, 0, FoldersRemoved));
        }

        public Task<int> RemoveEmptyFoldersForMediaAsync(Guid mediaKey, IReadOnlyList<ExecutedPlan> executed, EmptyFolderRemoval emptyFolders, CancellationToken ct = default)
            => throw new NotSupportedException("The single-item action does no cleanup.");

        public Task<int> SortFoldersForMediaAsync(Guid mediaKey, IReadOnlyList<ExecutedPlan> executed, CancellationToken ct = default)
            => throw new NotSupportedException("Actions sort through their execution options.");

        public Task<int> CountEmptyFoldersAsync(Guid folderKey, CancellationToken ct = default)
            => Task.FromResult(0);
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

        public AutomationOrigin? OriginSeen;

        public Task<RecognitionResult?> AnalyzeAsync(
            Guid mediaKey,
            bool force = false,
            string? classificationSchemeAlias = null,
            CancellationToken ct = default)
        {
            ForceSeen = force;
            SchemeSeen = classificationSchemeAlias;
            OriginSeen = Origins.Current;
            return Task.FromResult(Result);
        }
    }

    /// <summary>The scheme of the ruleset curating every image (null: none classifies).</summary>
    private sealed class FakeSchemeLocator(string? scheme) : IClassificationSchemeLocator
    {
        public Task<string?> GetSchemeForMediaAsync(Guid mediaKey, CancellationToken cancellationToken = default)
            => Task.FromResult(scheme);
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
        var action = new CurateFolderAction(Infrastructure(), Origins, ScopeFactory(engine));

        var result = await action.ExecuteAsync(
            Context(new CurateFolderSettings { ScopeFolderKey = Guid.NewGuid().ToString(), DryRun = true }),
            CancellationToken.None);

        Assert.Equal(ActionResultStatus.Success, result.Status);
        Assert.Null(engine.ExecutedPlan);
        Assert.Null(engine.ExecutedRemoval);
        Assert.Equal(1, ((CurateFolderOutput)result.OutputData!).Planned);
        Assert.Equal(0, ((CurateFolderOutput)result.OutputData!).FoldersRemoved);
    }

    [Theory]
    [InlineData(false, EmptyFolderRemoval.RecycleBin)]
    [InlineData(true, EmptyFolderRemoval.Delete)]
    public async Task CurateFolder_removes_empty_folders_per_setting_and_outputs_the_count(bool permanent, EmptyFolderRemoval expected)
    {
        var engine = new FakeEngine
        {
            Plan = PlanWith(new PlannedMove(Guid.NewGuid(), "a.jpg", Guid.NewGuid(), ["2026"], false, null)),
            FoldersRemoved = 2,
        };
        var action = new CurateFolderAction(Infrastructure(), Origins, ScopeFactory(engine));

        var result = await action.ExecuteAsync(
            Context(new CurateFolderSettings { ScopeFolderKey = Guid.NewGuid().ToString(), PermanentlyDeleteEmptyFolders = permanent }),
            CancellationToken.None);

        Assert.Equal(expected, engine.ExecutedRemoval);
        // A whole-scope run sorts the whole scope tree.
        Assert.Equal(FolderSorting.Subtree, engine.ExecutedSorting);
        Assert.Equal(2, ((CurateFolderOutput)result.OutputData!).FoldersRemoved);
    }

    [Fact]
    public async Task CurateFolder_executes_with_automate_trigger()
    {
        var engine = new FakeEngine
        {
            Plan = PlanWith(new PlannedMove(Guid.NewGuid(), "a.jpg", Guid.NewGuid(), ["2026"], false, null)),
        };
        var action = new CurateFolderAction(Infrastructure(), Origins, ScopeFactory(engine));

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
        var action = new CurateFolderAction(Infrastructure(), Origins, ScopeFactory(new FakeEngine()));

        var result = await action.ExecuteAsync(
            Context(new CurateFolderSettings { ScopeFolderKey = Guid.NewGuid().ToString() }),
            CancellationToken.None);

        Assert.Equal(ActionResultStatus.Failed, result.Status);
    }

    [Fact]
    public async Task CategorizeMedia_moves_only_the_requested_item()
    {
        var mediaKey = Guid.NewGuid();
        
        var scope = Guid.NewGuid();
        var engine = new FakeEngine
        {
            MediaPlan = new MediaCurationPlan(mediaKey, [PlanWith(new PlannedMove(mediaKey, "a.jpg", scope, ["2026"], false, null))], []),
        };
        var resolver = new FakeResolver { Ruleset = new Ruleset { ScopeRootKey = scope, Name = "rs" } };
        var action = new CategorizeMediaAction(Infrastructure(), Origins, ScopeFactory(resolver, engine));

        var result = await action.ExecuteAsync(
            Context(new CategorizeMediaSettings { MediaKey = mediaKey.ToString() }),
            CancellationToken.None);

        Assert.Equal(ActionResultStatus.Success, result.Status);
        var output = (CategorizeMediaOutput)result.OutputData!;
        Assert.True(output.Moved);
        Assert.Equal("2026", output.TargetPath);
        Assert.Equal(mediaKey, Assert.Single(engine.ExecutedPlan!.Moves).MediaKey);
        // Planning the whole scope runs every rule (and AI recognition) for every image in it.
        Assert.False(engine.PlannedWholeScope);
        // Single-item action: no empty-folder cleanup; only the folders along its new path are sorted.
        Assert.Equal(EmptyFolderRemoval.None, engine.ExecutedRemoval);
        Assert.Equal(FolderSorting.TargetPaths, engine.ExecutedSorting);
    }

    [Fact]
    public async Task CategorizeMedia_dry_run_reports_target_without_moving()
    {
        var mediaKey = Guid.NewGuid();
        var scope = Guid.NewGuid();
        var engine = new FakeEngine
        {
            MediaPlan = new MediaCurationPlan(mediaKey, [PlanWith(new PlannedMove(mediaKey, "a.jpg", scope, ["2026"], false, null))], []),
        };
        var resolver = new FakeResolver { Ruleset = new Ruleset { ScopeRootKey = scope, Name = "rs" } };
        var action = new CategorizeMediaAction(Infrastructure(), Origins, ScopeFactory(resolver, engine));

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
        var action = new CategorizeMediaAction(Infrastructure(), Origins, ScopeFactory(new FakeResolver(), new FakeEngine()));

        var result = await action.ExecuteAsync(
            Context(new CategorizeMediaSettings { MediaKey = Guid.NewGuid().ToString() }),
            CancellationToken.None);

        var output = (CategorizeMediaOutput)result.OutputData!;
        Assert.False(output.Moved);
        Assert.Contains("No ruleset", output.Reason);
    }

    // Regression: the actions ran on a thread without the ambient execution context, so the
    // media saves they caused looked user-made and re-fired "Media Saved" automations forever.
    [Fact]
    public async Task AnalyzeImage_keeps_the_automation_origin_so_its_saves_are_recognised()
    {
        var recognition = new FakeRecognition { Result = new RecognitionResult([], "a planet") };
        var action = new AnalyzeImageAction(
            Infrastructure(),
            Origins,
            ScopeFactory(recognition, new FakeSchemeLocator(null)),
            new TestParallelWork());
        var origin = new AutomationOrigin(Guid.NewGuid(), Guid.NewGuid(), [Guid.NewGuid()]);

        using (Origins.Push(origin))
        {
            await action.ExecuteAsync(
                Context(new AnalyzeImageSettings { MediaKey = Guid.NewGuid().ToString() }),
                CancellationToken.None);
        }

        Assert.Equal(origin, recognition.OriginSeen);
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
            Origins,
            ScopeFactory(recognition, new FakeSchemeLocator(null)),
            new TestParallelWork());

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
            Origins,
            ScopeFactory(recognition, new FakeSchemeLocator("lcc")),
            new TestParallelWork());

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
    public async Task AnalyzeImage_uses_the_scheme_of_the_images_ruleset_when_the_step_has_none()
    {
        var recognition = new FakeRecognition { Result = RecognitionResult.Empty };
        var action = new AnalyzeImageAction(
            Infrastructure(),
            Origins,
            ScopeFactory(recognition, new FakeSchemeLocator("dewey-pd")),
            new TestParallelWork());

        await action.ExecuteAsync(
            Context(new AnalyzeImageSettings { MediaKey = Guid.NewGuid().ToString() }),
            CancellationToken.None);

        Assert.Equal("dewey-pd", recognition.SchemeSeen);
    }
}
