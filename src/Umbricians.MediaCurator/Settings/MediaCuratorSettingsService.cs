using Microsoft.Extensions.Options;
using Umbricians.MediaCurator.Persistence;

namespace Umbricians.MediaCurator.Settings;

internal sealed class MediaCuratorSettingsService : IMediaCuratorSettingsService
{
    private readonly IMediaCuratorSettingsRepository _repository;
    private readonly IOptionsMonitor<MediaCuratorOptions> _options;

    public MediaCuratorSettingsService(
        IMediaCuratorSettingsRepository repository,
        IOptionsMonitor<MediaCuratorOptions> options)
    {
        _repository = repository;
        _options = options;
    }

    public async Task<MediaCuratorSiteSettings> GetAsync(CancellationToken cancellationToken = default)
    {
        var stored = await _repository.GetAsync(cancellationToken);
        if (stored is not null)
        {
            return new MediaCuratorSiteSettings
            {
                PersistImageDescription = stored.PersistImageDescription,
            };
        }

        return new MediaCuratorSiteSettings
        {
            PersistImageDescription = _options.CurrentValue.PersistImageDescription,
        };
    }

    public async Task SaveAsync(MediaCuratorSiteSettings settings, CancellationToken cancellationToken = default)
    {
        await _repository.SaveAsync(
            new SiteSettingsDto
            {
                PersistImageDescription = settings.PersistImageDescription,
            },
            cancellationToken);
    }
}
