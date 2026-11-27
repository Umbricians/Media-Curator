using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Umbraco.Cms.Infrastructure.BackgroundJobs;
using Umbricians.MediaCurator.Configuration;
using Umbricians.MediaCurator.Controllers;
using Umbricians.MediaCurator.Engine;
using Umbricians.MediaCurator.Exif;
using Umbricians.MediaCurator.Persistence;
using Umbricians.MediaCurator.Provisioning;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Rules;
using Umbricians.MediaCurator.Settings;
#if !UMBRACO_18_OR_GREATER
using Umbraco.Cms.Api.Common.OpenApi;
using Umbricians.MediaCurator.OpenApi;
#endif

namespace Umbricians.MediaCurator.Composers;

internal static class ServiceCollectionExtensions
{
    /// <summary>
    /// Registers Media Curator's options, controllers, API document and services. Everything that needs the
    /// Umbraco builder (collections, notification handlers) is in <see cref="MediaCuratorComposer"/>.
    /// </summary>
    public static IServiceCollection AddMediaCurator(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddOptions<MediaCuratorOptions>()
            .Bind(configuration.GetSection(Constants.ConfigurationSection))
            .ValidateDataAnnotations()
            .ValidateOnStart();

        services.AddMvcCore().ConfigureApplicationPartManager(parts =>
            parts.FeatureProviders.Add(new MediaCuratorControllerFeatureProvider()));
#if !UMBRACO_18_OR_GREATER
        services.ConfigureOptions<MediaCuratorSwaggerGenOptions>();
        services.AddSingleton<IOperationIdHandler, MediaCuratorOperationIdHandler>();
#endif

        services.TryAddSingleton(TimeProvider.System);

        services.TryAddSingleton<IRulesetRepository, RulesetRepository>();
        services.TryAddScoped<IRulesetResolver, RulesetResolver>();
        services.TryAddScoped<IClassificationSchemeLocator, ClassificationSchemeLocator>();
        services.TryAddScoped<IMediaAncestry, MediaServiceAncestry>();
        services.TryAddSingleton<RuleChainExecutor>();
        services.TryAddSingleton<IPropertyMapRepository, PropertyMapRepository>();
        services.TryAddSingleton<IMediaTypeSchema, UmbracoMediaTypeSchema>();
        services.TryAddSingleton<IPropertyProvisioningService, PropertyProvisioningService>();
        services.TryAddSingleton<IExifReader, MetadataExtractorExifReader>();
        services.TryAddScoped<IMediaChangeTracker, MediaChangeTracker>();
        services.TryAddScoped<IMediaOperations, UmbracoMediaOperations>();
        services.TryAddSingleton<ICurationRunLog, CurationRunLog>();
        services.TryAddScoped<ICurationEngine, CurationEngine>();
        services.TryAddScoped<IRecognitionService, UmbracoAiRecognitionService>();
        services.AddHttpClient(JevClassificationDecider.HttpClientName);
        services.TryAddSingleton<IJevClassificationDecider, JevClassificationDecider>();
        services.TryAddSingleton<IParallelMediaWork, ParallelMediaWork>();
        services.TryAddSingleton<IBulkCurationQueue, BulkCurationQueue>();
        services.TryAddScoped<ICurationUndoService, CurationUndoService>();
        services.TryAddSingleton<IExclusionRepository, ExclusionRepository>();
        services.TryAddSingleton<IRulesetTransferService, RulesetTransferService>();
        services.TryAddSingleton<IMediaCuratorSettingsRepository, MediaCuratorSettingsRepository>();
        services.TryAddSingleton<IMediaCuratorSettingsService, MediaCuratorSettingsService>();

        // Umbraco runs every registered job, so this must be added alongside the others.
        services.AddSingleton<IRecurringBackgroundJob, BulkCurationJob>();
        return services;
    }
}
