using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.AI.Extensions;
using Umbricians.MediaCurator.People;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Recognition;

namespace Umbricians.MediaCurator.Composing;

/// <summary>Registers MediaCurator services and the built-in curation providers.</summary>
public class MediaCuratorComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.MediaCurator()
            .AddProvider<DateFolderProvider>()
            .AddProvider<AlphabeticalProvider>()
            .AddProvider<ExifValueProvider>()
            .AddProvider<AiTagProvider>()
            .AddProvider<ColorProvider>()
            .AddProvider<ClassificationProvider>()
            .AddProvider<DimensionsProvider>()
            .AddProvider<ImageFormatProvider>()
            .AddProvider<FilenameConventionProvider>()
            .AddScheme<Schemes.DeweyPublicDomainScheme>()
            .AddScheme<Schemes.LccOutlineScheme>()
            .AddScheme<Schemes.TgmGenreFormatScheme>()
            .AddScheme<Schemes.WebAssetRoleScheme>();

        // "Contains people" detection: media tree badges, path upkeep and the People provider.
        builder.AddMediaCuratorPeopleDetection();

        builder.AITestFeatures()
            .Add<PizzaOriginalRecognitionTestFeature>()
            .Add<PizzaPreparedRecognitionTestFeature>();
    }
}
