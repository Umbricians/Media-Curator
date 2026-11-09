using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Extensions;
using Umbricians.MediaCurator.Extensions;

namespace Umbricians.MediaCurator.People;

public static class PeopleCompositionExtensions
{
    /// <summary>Registers "contains people" detection: the stored decisions, the media tree flags, the
    /// analysis enricher, path upkeep on media moves and deletes, and the People curation provider.</summary>
    public static IUmbracoBuilder AddMediaCuratorPeopleDetection(this IUmbracoBuilder builder)
    {
        if (builder.Services.Any(s => s.ServiceType == typeof(IPeopleDetectionRepository)))
        {
            return builder;
        }

        builder.Services.AddSingleton<IPeopleDetectionRepository, PeopleDetectionRepository>();
        builder.Services.AddSingleton<IPeopleMediaInfo, MediaServicePeopleMediaInfo>();
        builder.Services.AddSingleton<IMediaTreeNodeLookup, EntityServiceMediaTreeNodeLookup>();
        builder.Services.AddSingleton<IJevPeopleDecider, JevPeopleDecider>();
        builder.Services.AddSingleton<IPeopleDetectionService, PeopleDetectionService>();

        builder.FlagProviders().Append<PeopleFlagProvider>();

        builder.AddNotificationAsyncHandler<MediaMovedNotification, PeoplePathNotificationHandler>();
        builder.AddNotificationAsyncHandler<MediaMovedToRecycleBinNotification, PeoplePathNotificationHandler>();
        builder.AddNotificationAsyncHandler<MediaDeletedNotification, PeoplePathNotificationHandler>();

        builder.AddMediaCuratorRecognitionEnricher<PeopleRecognitionEnricher>();
        builder.AddMediaCuratorProvider<PeopleProvider>();
        return builder;
    }
}
