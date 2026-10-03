using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Persistence;
using Umbricians.MediaCurator.Provisioning;
using Umbricians.MediaCurator.Rules;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Composing;

/// <summary>Fluent registration surface: <c>builder.MediaCurator().AddProvider&lt;MyProvider&gt;()</c>.</summary>
public sealed class MediaCuratorBuilder
{
    private readonly IUmbracoBuilder _builder;

    internal MediaCuratorBuilder(IUmbracoBuilder builder) => _builder = builder;

    public MediaCuratorBuilder AddProvider<T>()
        where T : class, ICurationProvider
    {
        _builder.WithCollectionBuilder<CurationProviderCollectionBuilder>().Add<T>();
        return this;
    }

    public MediaCuratorBuilder AddRecognitionEnricher<T>()
        where T : class, Recognition.IRecognitionEnricher
    {
        _builder.WithCollectionBuilder<Recognition.RecognitionEnricherCollectionBuilder>().Add<T>();
        return this;
    }

    public MediaCuratorBuilder AddScheme<T>()
        where T : class, Schemes.IClassificationScheme
    {
        _builder.WithCollectionBuilder<Schemes.ClassificationSchemeCollectionBuilder>().Add<T>();
        return this;
    }
}

public static class MediaCuratorBuilderExtensions
{
    /// <summary>Adds MediaCurator core services (idempotent) and returns the fluent builder.</summary>
    public static MediaCuratorBuilder MediaCurator(this IUmbracoBuilder builder)
    {
        // Idempotence marker: only register services once.
        if (builder.Services.All(s => s.ServiceType != typeof(IRulesetRepository)))
        {
            builder.Services.AddSingleton<IRulesetRepository, RulesetRepository>();
            builder.Services.AddScoped<IRulesetResolver, RulesetResolver>();
            builder.Services.AddScoped<IMediaAncestry, MediaServiceAncestry>();
            builder.Services.AddSingleton<RuleChainExecutor>();
            builder.Services.AddSingleton<IPropertyMapRepository, PropertyMapRepository>();
            builder.Services.AddSingleton<IMediaTypeSchema, UmbracoMediaTypeSchema>();
            builder.Services.AddSingleton<IPropertyProvisioningService, PropertyProvisioningService>();
            builder.Services.AddSingleton<Exif.IExifReader, Exif.MetadataExtractorExifReader>();
            builder.Services.AddScoped<Engine.IMediaOperations, Engine.UmbracoMediaOperations>();
            builder.Services.AddSingleton<Engine.ICurationRunLog, Engine.CurationRunLog>();
            builder.Services.AddScoped<Engine.ICurationEngine, Engine.CurationEngine>();
            builder.Services.AddScoped<Recognition.IRecognitionService, Recognition.UmbracoAiRecognitionService>();
            builder.Services.AddHttpClient(Recognition.JevClassificationDecider.HttpClientName);
            builder.Services.AddSingleton<Recognition.IJevClassificationDecider, Recognition.JevClassificationDecider>();
            builder.Services.AddSingleton<Engine.IParallelMediaWork, Engine.ParallelMediaWork>();
            builder.Services.AddSingleton<Engine.IBulkCurationQueue, Engine.BulkCurationQueue>();
            builder.Services.AddScoped<Engine.ICurationUndoService, Engine.CurationUndoService>();
            builder.Services.AddSingleton<Engine.IExclusionRepository, Engine.ExclusionRepository>();
            builder.Services.AddSingleton<IRulesetTransferService, RulesetTransferService>();
            builder.Services.AddSingleton<IMediaCuratorSettingsRepository, MediaCuratorSettingsRepository>();
            builder.Services.AddSingleton<IMediaCuratorSettingsService, MediaCuratorSettingsService>();
            builder.Services.AddSingleton<Umbraco.Cms.Infrastructure.BackgroundJobs.IRecurringBackgroundJob, Engine.BulkCurationJob>();
            builder.Services.AddOptions<MediaCuratorOptions>().BindConfiguration(MediaCuratorOptions.SectionName);
            builder.WithCollectionBuilder<Recognition.RecognitionEnricherCollectionBuilder>();

            // Ensure the collections exist even before any Add* call.
            builder.WithCollectionBuilder<CurationProviderCollectionBuilder>();
            builder.WithCollectionBuilder<Schemes.ClassificationSchemeCollectionBuilder>();
        }

        return new MediaCuratorBuilder(builder);
    }
}
