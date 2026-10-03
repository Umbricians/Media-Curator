using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Configuration;
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
        => new(
            repository,
            Protection,
            new ConfigurationBuilder().AddInMemoryCollection(appSettings ?? []).Build(),
            null,
            time ?? TimeProvider.System);

    [Fact]
    public async Task Defaults_are_the_benchmarked_fast_settings()
    {
        var settings = await Create(new FakeRepository()).GetAsync();

        Assert.True(settings.AiEnabled);
        Assert.Equal(768, settings.RecognitionImageSize);
        Assert.Equal(AiReasoningEffort.Low, settings.DescriptionReasoningEffort);
        Assert.Equal(AiReasoningEffort.None, settings.DecisionReasoningEffort);
        Assert.Equal(ClassificationMethod.OneStep, settings.ClassificationMethod);
        Assert.Equal(DecisionEngine.UmbracoAi, settings.DecisionEngine);
        Assert.Equal("jev-latest", settings.JevModel);
        Assert.False(settings.JevApiKeyConfigured);
        Assert.Equal(4, settings.MaxParallelAnalyses);
        Assert.False(settings.SavePreparedImages);
    }

    [Fact]
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

        Assert.Contains("\"decisionEngine\":\"Jev\"", repository.Stored!.AiSettings);
        Assert.False(settings.AiEnabled);
        Assert.Equal(512, settings.RecognitionImageSize);
        Assert.Equal("vision", settings.DescriptionProfileAlias);
        Assert.Equal(AiReasoningEffort.Medium, settings.DescriptionReasoningEffort);
        Assert.Equal(ClassificationMethod.StepByStep, settings.ClassificationMethod);
        Assert.Equal(DecisionEngine.Jev, settings.DecisionEngine);
        Assert.Null(settings.DecisionProfileAlias);
        Assert.Equal(AiReasoningEffort.Default, settings.DecisionReasoningEffort);
        Assert.Equal("jev-next", settings.JevModel);
        Assert.Equal(MediaCuratorDefaults.MaxParallelAnalysesLimit, settings.MaxParallelAnalyses);
        Assert.True(settings.SavePreparedImages);
    }

    [Fact]
    public async Task The_typesafe_key_is_stored_encrypted_and_never_part_of_the_settings()
    {
        var repository = new FakeRepository();
        var service = Create(repository);

        await service.SetTypeSafeApiKeyAsync("apikey_secret");

        Assert.DoesNotContain("apikey_secret", repository.Stored!.AiSettings);
        Assert.Equal("apikey_secret", await service.GetTypeSafeApiKeyAsync());
        Assert.True((await service.GetAsync()).JevApiKeyConfigured);

        // Saving the settings form keeps the key; an empty key removes it.
        await service.SaveAsync(await service.GetAsync());
        Assert.Equal("apikey_secret", await service.GetTypeSafeApiKeyAsync());
        await service.SetTypeSafeApiKeyAsync("");
        Assert.Null(await service.GetTypeSafeApiKeyAsync());
        Assert.False((await service.GetAsync()).JevApiKeyConfigured);
    }

    [Fact]
    public async Task Old_app_settings_are_imported_once_into_settings_not_yet_saved()
    {
        var repository = new FakeRepository
        {
            Stored = new SiteSettingsDto { PersistImageDescription = true, AiSettings = """{"recognitionImageSize":512}""" },
        };
        var appSettings = new Dictionary<string, string?>
        {
            ["MediaCurator:RecognitionProfileAlias"] = "test-profile",
            ["MediaCurator:MaxRecognitionEdgePixels"] = "1024",
            ["MediaCurator:ClassificationSchemeAlias"] = "dewey-pd",
            ["MediaCurator:TypeSafe:ApiKey"] = "apikey_from_config",
            ["MediaCurator:RecognitionPreparedImageTestFolder"] = "../test-output",
        };
        var service = Create(repository, appSettings);

        var settings = await service.GetAsync();

        Assert.Equal("test-profile", settings.DescriptionProfileAlias);
        Assert.Equal(512, settings.RecognitionImageSize); // already saved: kept
        Assert.True(settings.SavePreparedImages);
        Assert.Equal("apikey_from_config", await service.GetTypeSafeApiKeyAsync());
        Assert.DoesNotContain("apikey_from_config", repository.Stored!.AiSettings);
        Assert.Contains("\"legacyImported\":true", repository.Stored.AiSettings);

        // After the import, app settings are ignored.
        await service.SaveAsync(settings);
        var later = Create(repository, new Dictionary<string, string?> { ["MediaCurator:RecognitionProfileAlias"] = "other" });
        Assert.Equal("test-profile", (await later.GetAsync()).DescriptionProfileAlias);
    }

    [Fact]
    public async Task Metadata_only_app_setting_imports_as_ai_switched_off()
    {
        var service = Create(new FakeRepository(), new Dictionary<string, string?> { ["MediaCurator:MetadataOnly"] = "true" });

        Assert.False((await service.GetAsync()).AiEnabled);
    }

    [Fact]
    public async Task Reads_are_cached_briefly()
    {
        var repository = new FakeRepository();
        var time = new FakeTimeProvider();
        var service = Create(repository, time: time);

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
        var ai = MediaCuratorSettingsService.Deserialize("{not json");
        var settings = MediaCuratorSettingsService.Resolve(new SiteSettingsDto { PersistImageDescription = true }, ai, false);

        Assert.Equal(768, settings.RecognitionImageSize);
    }

    // Regression: the API wrote these enums as numbers but the backoffice sends names, so saving failed.
    [Fact]
    public void Api_model_reads_and_writes_enum_names()
    {
        var json = System.Text.Json.JsonSerializer.Serialize(new Umbricians.MediaCurator.Controllers.ViewModels.MediaCuratorSiteSettingsModel());
        Assert.Contains("\"DescriptionReasoningEffort\":\"Low\"", json);
        Assert.Contains("\"DecisionEngine\":\"UmbracoAi\"", json);
        Assert.Contains("\"ClassificationMethod\":\"OneStep\"", json);

        var model = System.Text.Json.JsonSerializer.Deserialize<Umbricians.MediaCurator.Controllers.ViewModels.MediaCuratorSiteSettingsModel>(
            """{"DecisionEngine":"Jev","DecisionReasoningEffort":"Medium","ClassificationMethod":"SingleCall"}""");
        Assert.Equal(DecisionEngine.Jev, model!.DecisionEngine);
        Assert.Equal(AiReasoningEffort.Medium, model.DecisionReasoningEffort);
        Assert.Equal(ClassificationMethod.SingleCall, model.ClassificationMethod);
    }

    [Fact]
    public async Task A_key_in_server_configuration_wins_over_the_backoffice_key()
    {
        var repository = new FakeRepository();
        var appSettings = new Dictionary<string, string?> { ["MediaCurator:Secrets:TypeSafeApiKey"] = " key_from_server " };
        var service = Create(repository, appSettings);
        await service.SetTypeSafeApiKeyAsync("key_from_backoffice");

        var settings = await service.GetAsync();

        Assert.Equal("key_from_server", await service.GetTypeSafeApiKeyAsync());
        Assert.Equal(ApiKeySource.ServerConfiguration, settings.JevApiKeySource);
        Assert.True(settings.JevApiKeyConfigured);
    }

    [Fact]
    public async Task Without_a_server_key_the_backoffice_key_is_used()
    {
        var service = Create(new FakeRepository());
        Assert.Equal(ApiKeySource.None, (await service.GetAsync()).JevApiKeySource);

        await service.SetTypeSafeApiKeyAsync("key_from_backoffice");

        Assert.Equal("key_from_backoffice", await service.GetTypeSafeApiKeyAsync());
        Assert.Equal(ApiKeySource.Backoffice, (await service.GetAsync()).JevApiKeySource);
    }

    [Fact]
    public async Task A_secrets_only_section_is_not_treated_as_old_settings()
    {
        var repository = new FakeRepository();
        var service = Create(repository, new Dictionary<string, string?> { ["MediaCurator:Secrets:TypeSafeApiKey"] = "k" });

        await service.GetAsync();

        Assert.Null(repository.Stored); // nothing imported, nothing written
    }
}

