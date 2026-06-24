using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Controllers.ViewModels;

public class MediaCuratorSiteSettingsModel
{
    public bool PersistImageDescription { get; set; } = true;

    public static MediaCuratorSiteSettingsModel From(MediaCuratorSiteSettings settings) => new()
    {
        PersistImageDescription = settings.PersistImageDescription,
    };

    public MediaCuratorSiteSettings ToSettings() => new()
    {
        PersistImageDescription = PersistImageDescription,
    };
}
