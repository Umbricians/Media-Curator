using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Umbraco.AI.Core.Models;
using Umbraco.AI.Core.Profiles;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "Media Curator")]
[BackOfficeRoute("umbriciansmediacurator/api/v{version:apiVersion}")]
[Authorize(Policy = AuthorizationPolicies.SectionAccessSettings)]
internal class SettingsController : MediaCuratorControllerBase
{
    private readonly IMediaCuratorSettingsService _settings;
    private readonly IServiceProvider _services;
    private readonly ILogger<SettingsController> _logger;

    public SettingsController(
        IMediaCuratorSettingsService settings,
        IServiceProvider services,
        ILogger<SettingsController> logger)
    {
        _settings = settings;
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

    /// <summary>Stores the TypeSafe API key for Jev (encrypted), or removes it when the key is empty.
    /// The key is write-only: no endpoint returns it.</summary>
    [HttpPut("settings/typesafe-api-key")]
    [ProducesResponseType<MediaCuratorSiteSettingsModel>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> SetTypeSafeApiKey(
        TypeSafeApiKeyModel model,
        CancellationToken cancellationToken)
    {
        if ((await _settings.GetAsync(cancellationToken)).JevApiKeySource == ApiKeySource.ServerConfiguration)
        {
            return Conflict(new ProblemDetails
            {
                Title = $"The TypeSafe API key is set in server configuration ({MediaCuratorDefaults.TypeSafeApiKeyConfigurationKey}); change it there.",
                Type = "Error",
            });
        }

        await _settings.SetTypeSafeApiKeyAsync(model.ApiKey, cancellationToken);
        return Ok(MediaCuratorSiteSettingsModel.From(await _settings.GetAsync(cancellationToken)));
    }

    /// <summary>The Umbraco.AI chat profiles to choose from.</summary>
    [HttpGet("settings/ai-options")]
    [ProducesResponseType<AiSettingsOptionsModel>(StatusCodes.Status200OK)]
    public async Task<AiSettingsOptionsModel> GetAiOptions(CancellationToken cancellationToken)
    {
        var model = new AiSettingsOptionsModel();

        // Resolved lazily: the site may not have Umbraco.AI's runtime registered at all.
        var profiles = _services.GetService<IAIProfileService>();
        if (profiles is null)
        {
            return model;
        }

        try
        {
            // GetDefaultProfileAsync throws when no default chat profile is set up.
            if (await profiles.HasDefaultProfileAsync(AICapability.Chat, cancellationToken))
            {
                model.DefaultProfileAlias = (await profiles.GetDefaultProfileAsync(AICapability.Chat, cancellationToken))?.Alias;
            }

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
