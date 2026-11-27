using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbricians.MediaCurator.Extensions;
using Umbricians.MediaCurator.People;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Schemes;
#if UMBRACO_18_OR_GREATER
using Umbricians.MediaCurator.OpenApi;
#endif

namespace Umbricians.MediaCurator.Composers;

/// <summary>Registers Media Curator's services, built-in providers and classification schemes, and its API.</summary>
public class MediaCuratorComposer : IComposer
{
    /// <inheritdoc />
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddMediaCurator(builder.Config);
#if UMBRACO_18_OR_GREATER
        builder.AddMediaCuratorOpenApi();
#endif

        AddBuiltInExtensions(builder);

        // "Contains people" detection: media tree badges, path upkeep and the People provider.
        builder.AddMediaCuratorPeopleDetection();
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
}
