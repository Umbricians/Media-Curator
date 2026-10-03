using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.AI.Core.Models;
using Umbraco.AI.Core.Profiles;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "MediaCurator")]
public class SettingsController : MediaCuratorApiControllerBase
{
    private readonly IMediaCuratorSettingsService _settings;
    private readonly IOptionsMonitor<MediaCuratorOptions> _options;
    private readonly IServiceProvider _services;
    private readonly ILogger<SettingsController> _logger;

    public SettingsController(
        IMediaCuratorSettingsService settings,
        IOptionsMonitor<MediaCuratorOptions> options,
        IServiceProvider services,
        ILogger<SettingsController> logger)
    {
        _settings = settings;
        _options = options;
        _services = services;
        _logger = logger;
    }

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
        await _settings.SaveAsync(model.ToSettings(), cancellationToken);
        return MediaCuratorSiteSettingsModel.From(await _settings.GetAsync(cancellationToken));
    }

    /// <summary>The Umbraco.AI chat profiles to choose from, and whether Jev is available.</summary>
    [HttpGet("settings/ai-options")]
    [ProducesResponseType<AiSettingsOptionsModel>(StatusCodes.Status200OK)]
    public async Task<AiSettingsOptionsModel> GetAiOptions(CancellationToken cancellationToken)
    {
        var options = _options.CurrentValue;
        var model = new AiSettingsOptionsModel
        {
            FallbackProfileAlias = string.IsNullOrWhiteSpace(options.RecognitionProfileAlias) ? null : options.RecognitionProfileAlias.Trim(),
            JevAvailable = options.TypeSafe.IsConfigured,
        };

        // Resolved lazily: the site may not have Umbraco.AI's runtime registered at all.
        var profiles = _services.GetService<IAIProfileService>();
        if (profiles is null)
        {
            return model;
        }

        try
        {
            model.Profiles = (await profiles.GetProfilesAsync(AICapability.Chat, cancellationToken))
                .OrderBy(p => p.Name, StringComparer.OrdinalIgnoreCase)
                .Select(p => new AiProfileOptionModel { Alias = p.Alias, Name = p.Name, Model = p.Model.ModelId })
                .ToList();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "MediaCurator: could not list Umbraco.AI profiles.");
        }

        return model;
    }
}
