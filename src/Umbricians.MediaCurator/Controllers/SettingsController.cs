using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Web.Common.Authorization;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "MediaCurator")]
public class SettingsController : MediaCuratorApiControllerBase
{
    private readonly IMediaCuratorSettingsService _settings;

    public SettingsController(IMediaCuratorSettingsService settings) => _settings = settings;

    [HttpGet("settings")]
    [ProducesResponseType<MediaCuratorSiteSettingsModel>(StatusCodes.Status200OK)]
    public async Task<MediaCuratorSiteSettingsModel> GetSettings(CancellationToken cancellationToken)
        => MediaCuratorSiteSettingsModel.From(await _settings.GetAsync(cancellationToken));

    [HttpPut("settings")]
    [ProducesResponseType<MediaCuratorSiteSettingsModel>(StatusCodes.Status200OK)]
    public async Task<MediaCuratorSiteSettingsModel> SaveSettings(
        MediaCuratorSiteSettingsModel model,
        CancellationToken cancellationToken)
    {
        var settings = model.ToSettings();
        await _settings.SaveAsync(settings, cancellationToken);
        return MediaCuratorSiteSettingsModel.From(settings);
    }
}
