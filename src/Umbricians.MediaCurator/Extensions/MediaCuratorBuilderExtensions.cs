using Umbraco.Cms.Core.DependencyInjection;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Extensions;

/// <summary>Adds a site's own Media Curator extensions from a composer or <c>Program.cs</c>.</summary>
public static class MediaCuratorBuilderExtensions
{
    /// <summary>Adds a curation provider, which then appears in the ruleset designer.</summary>
    public static IUmbracoBuilder AddMediaCuratorProvider<T>(this IUmbracoBuilder builder)
        where T : class, ICurationProvider
    {
        builder.WithCollectionBuilder<CurationProviderCollectionBuilder>().Add<T>();
        return builder;
    }

    /// <summary>Adds a step that runs alongside image recognition.</summary>
    public static IUmbracoBuilder AddMediaCuratorRecognitionEnricher<T>(this IUmbracoBuilder builder)
        where T : class, IRecognitionEnricher
    {
        builder.WithCollectionBuilder<RecognitionEnricherCollectionBuilder>().Add<T>();
        return builder;
    }

    /// <summary>Adds a classification scheme for the Classification provider to offer.</summary>
    public static IUmbracoBuilder AddMediaCuratorScheme<T>(this IUmbracoBuilder builder)
        where T : class, IClassificationScheme
    {
        builder.WithCollectionBuilder<ClassificationSchemeCollectionBuilder>().Add<T>();
        return builder;
    }
}
