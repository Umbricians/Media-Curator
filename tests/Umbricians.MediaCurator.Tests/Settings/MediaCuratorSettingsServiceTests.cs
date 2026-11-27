using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Umbricians.MediaCurator.Configuration;
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

    private static readonly IDataProtectionProvider Protection = new EphemeralDataProtectionProvider();

    private static MediaCuratorSettingsService Create(
        FakeRepository repository,
        Dictionary<string, string?>? appSettings = null,
        TimeProvider? time = null)
    {
        var options = new MediaCuratorOptions();
        new ConfigurationBuilder().AddInMemoryCollection(appSettings ?? []).Build()
            .GetSection(Constants.ConfigurationSection).Bind(options);
        return new(repository, Protection, new FixedOptionsMonitor(options), null, time ?? TimeProvider.System);
    }

    private sealed class FixedOptionsMonitor(MediaCuratorOptions value) : IOptionsMonitor<MediaCuratorOptions>
    {
        public MediaCuratorOptions CurrentValue => value;

        public MediaCuratorOptions Get(string? name) => value;

        public IDisposable? OnChange(Action<MediaCuratorOptions, string?> listener) => null;
    }

    [Test]
    public async Task Defaults_are_the_benchmarked_fast_settings()
    {
        var settings = await Create(new FakeRepository()).GetAsync();

        Assert.That(settings.AiEnabled, Is.True);
        Assert.That(settings.RecognitionImageSize, Is.EqualTo(768));
        Assert.That(settings.DescriptionReasoningEffort, Is.EqualTo(AiReasoningEffort.Low));
        Assert.That(settings.DecisionReasoningEffort, Is.EqualTo(AiReasoningEffort.None));
        Assert.That(settings.ClassificationMethod, Is.EqualTo(ClassificationMethod.OneStep));
        Assert.That(settings.DecisionEngine, Is.EqualTo(DecisionEngine.UmbracoAi));
        Assert.That(settings.JevModel, Is.EqualTo("jev-latest"));
        Assert.That(settings.JevApiKeyConfigured, Is.False);
        Assert.That(settings.MaxParallelAnalyses, Is.EqualTo(4));
        Assert.That(settings.SavePreparedImages, Is.False);
    }

    [Test]
    public async Task Saved_settings_round_trip_and_replace_the_cached_copy()
    {
        var repository = new FakeRepository();
        var service = Create(repository);
        await service.GetAsync();

        await service.SaveAsync(new MediaCuratorSiteSettings
        {
            AiEnabled = false,
            PersistImageDescription = true,
            RecognitionImageSize = 512,
            DescriptionProfileAlias = "  vision  ",
            DescriptionReasoningEffort = AiReasoningEffort.Medium,
            ClassificationMethod = ClassificationMethod.StepByStep,
            DecisionEngine = DecisionEngine.Jev,
            DecisionProfileAlias = " ",
            DecisionReasoningEffort = AiReasoningEffort.Default,
            JevModel = "jev-next",
            MaxParallelAnalyses = 99,
            SavePreparedImages = true,
        });
        var settings = await service.GetAsync();

        Assert.That(repository.Stored!.AiSettings, Does.Contain("\"decisionEngine\":\"Jev\""));
        Assert.That(settings.AiEnabled, Is.False);
        Assert.That(settings.RecognitionImageSize, Is.EqualTo(512));
        Assert.That(settings.DescriptionProfileAlias, Is.EqualTo("vision"));
        Assert.That(settings.DescriptionReasoningEffort, Is.EqualTo(AiReasoningEffort.Medium));
        Assert.That(settings.ClassificationMethod, Is.EqualTo(ClassificationMethod.StepByStep));
        Assert.That(settings.DecisionEngine, Is.EqualTo(DecisionEngine.Jev));
        Assert.That(settings.DecisionProfileAlias, Is.Null);
        Assert.That(settings.DecisionReasoningEffort, Is.EqualTo(AiReasoningEffort.Default));
        Assert.That(settings.JevModel, Is.EqualTo("jev-next"));
        Assert.That(settings.MaxParallelAnalyses, Is.EqualTo(MediaCuratorDefaults.MaxParallelAnalysesLimit));
        Assert.That(settings.SavePreparedImages, Is.True);
    }

    [Test]
    public async Task The_typesafe_key_is_stored_encrypted_and_never_part_of_the_settings()
    {
        var repository = new FakeRepository();
        var service = Create(repository);

        await service.SetTypeSafeApiKeyAsync("apikey_secret");

        Assert.That(repository.Stored!.AiSettings, Does.Not.Contain("apikey_secret"));
        Assert.That(await service.GetTypeSafeApiKeyAsync(), Is.EqualTo("apikey_secret"));
        Assert.That((await service.GetAsync()).JevApiKeyConfigured, Is.True);

        // Saving the settings form keeps the key; an empty key removes it.
        await service.SaveAsync(await service.GetAsync());
        Assert.That(await service.GetTypeSafeApiKeyAsync(), Is.EqualTo("apikey_secret"));
        await service.SetTypeSafeApiKeyAsync("");
        Assert.That(await service.GetTypeSafeApiKeyAsync(), Is.Null);
        Assert.That((await service.GetAsync()).JevApiKeyConfigured, Is.False);
    }

    [Test]
    public async Task Reads_are_cached_briefly()
    {
        var repository = new FakeRepository();
        var time = new FakeTimeProvider();
        var service = Create(repository, time: time);

        await service.GetAsync();
        (await service.GetAsync()).MaxParallelAnalyses = 1; // callers get copies
        Assert.That(repository.Reads, Is.EqualTo(1));
        Assert.That((await service.GetAsync()).MaxParallelAnalyses, Is.EqualTo(4));

        time.Advance(TimeSpan.FromMinutes(1));
        await service.GetAsync();
        Assert.That(repository.Reads, Is.EqualTo(2));
    }

    [Test]
    public void Unreadable_stored_json_falls_back_to_defaults()
    {
        var ai = MediaCuratorSettingsService.Deserialize("{not json");
        var settings = MediaCuratorSettingsService.Resolve(new SiteSettingsDto { PersistImageDescription = true }, ai, false);

        Assert.That(settings.RecognitionImageSize, Is.EqualTo(768));
    }

    // Regression: the API wrote these enums as numbers but the backoffice sends names, so saving failed.
    [Test]
    public void Api_model_reads_and_writes_enum_names()
    {
        var json = System.Text.Json.JsonSerializer.Serialize(new Umbricians.MediaCurator.Controllers.ViewModels.MediaCuratorSiteSettingsModel());
        Assert.That(json, Does.Contain("\"DescriptionReasoningEffort\":\"Low\""));
        Assert.That(json, Does.Contain("\"DecisionEngine\":\"UmbracoAi\""));
        Assert.That(json, Does.Contain("\"ClassificationMethod\":\"OneStep\""));

        var model = System.Text.Json.JsonSerializer.Deserialize<Umbricians.MediaCurator.Controllers.ViewModels.MediaCuratorSiteSettingsModel>(
            """{"DecisionEngine":"Jev","DecisionReasoningEffort":"Medium","ClassificationMethod":"SingleCall"}""");
        Assert.That(model!.DecisionEngine, Is.EqualTo(DecisionEngine.Jev));
        Assert.That(model.DecisionReasoningEffort, Is.EqualTo(AiReasoningEffort.Medium));
        Assert.That(model.ClassificationMethod, Is.EqualTo(ClassificationMethod.SingleCall));
    }

    [Test]
    public async Task A_key_in_server_configuration_wins_over_the_backoffice_key()
    {
        var repository = new FakeRepository();
        var appSettings = new Dictionary<string, string?> { ["Umbricians:MediaCurator:Secrets:TypeSafeApiKey"] = " key_from_server " };
        var service = Create(repository, appSettings);
        await service.SetTypeSafeApiKeyAsync("key_from_backoffice");

        var settings = await service.GetAsync();

        Assert.That(await service.GetTypeSafeApiKeyAsync(), Is.EqualTo("key_from_server"));
        Assert.That(settings.JevApiKeySource, Is.EqualTo(ApiKeySource.ServerConfiguration));
        Assert.That(settings.JevApiKeyConfigured, Is.True);
    }

    [Test]
    public async Task Without_a_server_key_the_backoffice_key_is_used()
    {
        var service = Create(new FakeRepository());
        Assert.That((await service.GetAsync()).JevApiKeySource, Is.EqualTo(ApiKeySource.None));

        await service.SetTypeSafeApiKeyAsync("key_from_backoffice");

        Assert.That(await service.GetTypeSafeApiKeyAsync(), Is.EqualTo("key_from_backoffice"));
        Assert.That((await service.GetAsync()).JevApiKeySource, Is.EqualTo(ApiKeySource.Backoffice));
    }
}

