using Microsoft.Extensions.Options;
using Umbricians.MediaCurator.Persistence;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Tests.Settings;

public class MediaCuratorSettingsServiceTests
{
    private sealed class FakeRepository : IMediaCuratorSettingsRepository
    {
        public SiteSettingsDto? Stored;
        public int Reads;

        public Task<SiteSettingsDto?> GetAsync(CancellationToken cancellationToken = default)
        {
            Reads++;
            return Task.FromResult(Stored);
        }

        public Task SaveAsync(SiteSettingsDto dto, CancellationToken cancellationToken = default)
        {
            Stored = dto;
            return Task.CompletedTask;
        }
    }

    private sealed class FakeTimeProvider : TimeProvider
    {
        private DateTimeOffset _now = new(2026, 10, 3, 12, 0, 0, TimeSpan.Zero);

        public override DateTimeOffset GetUtcNow() => _now;

        public void Advance(TimeSpan by) => _now += by;
    }

    private sealed class Options(MediaCuratorOptions value) : IOptionsMonitor<MediaCuratorOptions>
    {
        public MediaCuratorOptions CurrentValue => value;
        public MediaCuratorOptions Get(string? name) => value;
        public IDisposable? OnChange(Action<MediaCuratorOptions, string?> listener) => null;
    }

    [Fact]
    public async Task Defaults_are_the_benchmarked_fast_settings()
    {
        var service = new MediaCuratorSettingsService(new FakeRepository(), new Options(new MediaCuratorOptions()));

        var settings = await service.GetAsync();

        Assert.Equal(768, settings.RecognitionImageSize);
        Assert.Equal(AiReasoningEffort.Low, settings.DescriptionReasoningEffort);
        Assert.Equal(AiReasoningEffort.None, settings.DecisionReasoningEffort);
        Assert.Equal(DecisionEngine.UmbracoAi, settings.DecisionEngine);
        Assert.Equal(4, settings.MaxParallelAnalyses);
    }

    [Fact]
    public async Task Appsettings_fill_in_until_the_ai_settings_are_saved()
    {
        var repository = new FakeRepository { Stored = new SiteSettingsDto { PersistImageDescription = false } };
        var options = new MediaCuratorOptions
        {
            MaxRecognitionEdgePixels = 1024,
            DecisionEngine = DecisionEngine.Jev,
            DecisionProfileAlias = "decider",
            MaxParallelAnalyses = 2,
        };
        var service = new MediaCuratorSettingsService(repository, new Options(options));

        var settings = await service.GetAsync();

        Assert.False(settings.PersistImageDescription);
        Assert.Equal(1024, settings.RecognitionImageSize);
        Assert.Equal(DecisionEngine.Jev, settings.DecisionEngine);
        Assert.Null(settings.DecisionProfileAlias); // the appsettings alias is applied at call time
        Assert.Equal(2, settings.MaxParallelAnalyses);
    }

    [Fact]
    public async Task Saved_settings_round_trip_and_replace_the_cached_copy()
    {
        var repository = new FakeRepository();
        var service = new MediaCuratorSettingsService(repository, new Options(new MediaCuratorOptions()));
        await service.GetAsync();

        await service.SaveAsync(new MediaCuratorSiteSettings
        {
            PersistImageDescription = true,
            RecognitionImageSize = 512,
            DescriptionProfileAlias = "  vision  ",
            DescriptionReasoningEffort = AiReasoningEffort.Medium,
            DecisionEngine = DecisionEngine.Jev,
            DecisionProfileAlias = " ",
            DecisionReasoningEffort = AiReasoningEffort.Default,
            MaxParallelAnalyses = 99,
        });
        var settings = await service.GetAsync();

        Assert.Contains("\"decisionEngine\":\"Jev\"", repository.Stored!.AiSettings);
        Assert.Equal(512, settings.RecognitionImageSize);
        Assert.Equal("vision", settings.DescriptionProfileAlias);
        Assert.Equal(AiReasoningEffort.Medium, settings.DescriptionReasoningEffort);
        Assert.Equal(DecisionEngine.Jev, settings.DecisionEngine);
        Assert.Null(settings.DecisionProfileAlias);
        Assert.Equal(AiReasoningEffort.Default, settings.DecisionReasoningEffort);
        Assert.Equal(MediaCuratorOptions.MaxParallelAnalysesLimit, settings.MaxParallelAnalyses);
    }

    [Fact]
    public async Task Reads_are_cached_briefly()
    {
        var repository = new FakeRepository();
        var time = new FakeTimeProvider();
        var service = new MediaCuratorSettingsService(repository, new Options(new MediaCuratorOptions()), time);

        await service.GetAsync();
        (await service.GetAsync()).MaxParallelAnalyses = 1; // callers get copies
        Assert.Equal(1, repository.Reads);
        Assert.Equal(4, (await service.GetAsync()).MaxParallelAnalyses);

        time.Advance(TimeSpan.FromMinutes(1));
        await service.GetAsync();
        Assert.Equal(2, repository.Reads);
    }

    [Fact]
    public void Unreadable_stored_json_falls_back_to_defaults()
    {
        var settings = MediaCuratorSettingsService.Resolve(
            new SiteSettingsDto { PersistImageDescription = true, AiSettings = "{not json" },
            new MediaCuratorOptions());

        Assert.Equal(768, settings.RecognitionImageSize);
    }

    // Regression: the API wrote these enums as numbers but the backoffice sends names, so saving failed.
    [Fact]
    public void Api_model_reads_and_writes_enum_names()
    {
        var json = System.Text.Json.JsonSerializer.Serialize(new Umbricians.MediaCurator.Controllers.ViewModels.MediaCuratorSiteSettingsModel());
        Assert.Contains("\"DescriptionReasoningEffort\":\"Low\"", json);
        Assert.Contains("\"DecisionEngine\":\"UmbracoAi\"", json);

        var model = System.Text.Json.JsonSerializer.Deserialize<Umbricians.MediaCurator.Controllers.ViewModels.MediaCuratorSiteSettingsModel>(
            """{"DecisionEngine":"Jev","DecisionReasoningEffort":"Medium"}""");
        Assert.Equal(DecisionEngine.Jev, model!.DecisionEngine);
        Assert.Equal(AiReasoningEffort.Medium, model.DecisionReasoningEffort);
    }
}

