namespace Umbricians.MediaCurator.Settings;

/// <summary>Site-wide Media Curator settings (backoffice setup + appsettings defaults).</summary>
public interface IMediaCuratorSettingsService
{
    Task<MediaCuratorSiteSettings> GetAsync(CancellationToken cancellationToken = default);

    Task SaveAsync(MediaCuratorSiteSettings settings, CancellationToken cancellationToken = default);
}

public sealed class MediaCuratorSiteSettings
{
    /// <summary>When true, vision output is stored on media and reused for later classification runs.</summary>
    public bool PersistImageDescription { get; set; } = true;
}
