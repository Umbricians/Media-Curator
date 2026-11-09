using Asp.Versioning;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi;
using Swashbuckle.AspNetCore.SwaggerGen;
using Umbraco.Cms.Api.Common.OpenApi;
using Umbraco.Cms.Api.Management.OpenApi;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Infrastructure.BackgroundJobs;
using Umbricians.MediaCurator.Configuration;
using Umbricians.MediaCurator.Controllers;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Engine;
using Umbricians.MediaCurator.Exif;
using Umbricians.MediaCurator.Extensions;
using Umbricians.MediaCurator.People;
using Umbricians.MediaCurator.Persistence;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Provisioning;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Rules;
using Umbricians.MediaCurator.Schemes;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Composers;

/// <summary>Registers Media Curator's services, built-in providers and classification schemes, and its API.</summary>
public class MediaCuratorComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddOptions<MediaCuratorOptions>().Bind(builder.Config.GetSection(Constants.ConfigurationSection));

        builder.Services.AddMvcCore().ConfigureApplicationPartManager(parts =>
            parts.FeatureProviders.Add(new MediaCuratorControllerFeatureProvider()));
        builder.Services.TryAddSingleton(TimeProvider.System);

        AddServices(builder);
        AddBuiltInExtensions(builder);
        AddApiDocumentation(builder);

        // "Contains people" detection: media tree badges, path upkeep and the People provider.
        builder.AddMediaCuratorPeopleDetection();
    }

    private static void AddServices(IUmbracoBuilder builder)
    {
        var services = builder.Services;
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
    }

    private static void AddBuiltInExtensions(IUmbracoBuilder builder)
    {
        builder.AddMediaCuratorProvider<DateFolderProvider>();
        builder.AddMediaCuratorProvider<AlphabeticalProvider>();
        builder.AddMediaCuratorProvider<ExifValueProvider>();
        builder.AddMediaCuratorProvider<AiTagProvider>();
        builder.AddMediaCuratorProvider<ColorProvider>();
        builder.AddMediaCuratorProvider<ClassificationProvider>();
        builder.AddMediaCuratorProvider<DimensionsProvider>();
        builder.AddMediaCuratorProvider<ImageFormatProvider>();
        builder.AddMediaCuratorProvider<FilenameConventionProvider>();

        builder.AddMediaCuratorScheme<DeweyPublicDomainScheme>();
        builder.AddMediaCuratorScheme<LccOutlineScheme>();
        builder.AddMediaCuratorScheme<TgmGenreFormatScheme>();
        builder.AddMediaCuratorScheme<WebAssetRoleScheme>();

        // Ensure the enricher collection exists even when nothing adds to it.
        builder.WithCollectionBuilder<RecognitionEnricherCollectionBuilder>();
    }

    private static void AddApiDocumentation(IUmbracoBuilder builder)
    {
        builder.Services.AddSingleton<IOperationIdHandler, MediaCuratorOperationIdHandler>();

        builder.Services.Configure<SwaggerGenOptions>(options =>
        {
            options.SwaggerDoc(Constants.ApiName, new OpenApiInfo
            {
                Title = "Media Curator Backoffice API",
                Version = "1.0",
            });

            options.OperationFilter<MediaCuratorOperationSecurityFilter>();
        });
    }
}

internal sealed class MediaCuratorOperationSecurityFilter : BackOfficeSecurityRequirementsOperationFilterBase
{
    protected override string ApiName => Constants.ApiName;
}

/// <summary>Uses the action name as the operation id, so the generated TypeScript client has short method names.</summary>
internal sealed class MediaCuratorOperationIdHandler : OperationIdHandler
{
    public MediaCuratorOperationIdHandler(IOptions<ApiVersioningOptions> apiVersioningOptions)
        : base(apiVersioningOptions)
    {
    }

    protected override bool CanHandle(ApiDescription apiDescription, ControllerActionDescriptor controllerActionDescriptor)
        => controllerActionDescriptor.ControllerTypeInfo.Namespace?.StartsWith(
            "Umbricians.MediaCurator.Controllers",
            StringComparison.InvariantCultureIgnoreCase) is true;

    public override string Handle(ApiDescription apiDescription)
        => $"{apiDescription.ActionDescriptor.RouteValues["action"]}";
}
