using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "Media Curator")]
public class ProvidersController : MediaCuratorApiControllerBase
{
    private readonly CurationProviderCollection _providers;

    public ProvidersController(CurationProviderCollection providers) => _providers = providers;

    [HttpGet("providers")]
    [ProducesResponseType<List<ProviderModel>>(StatusCodes.Status200OK)]
    public List<ProviderModel> GetProviders()
        => _providers.Select(ProviderModel.From).OrderBy(p => p.Name).ToList();
}
