using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "Media Curator")]
[BackOfficeRoute("umbriciansmediacurator/api/v{version:apiVersion}")]
[Authorize(Policy = AuthorizationPolicies.SectionAccessSettings)]
internal class ProvidersController : MediaCuratorControllerBase
{
    private readonly CurationProviderCollection _providers;

    public ProvidersController(CurationProviderCollection providers) => _providers = providers;

    [HttpGet("providers")]
    [ProducesResponseType<List<ProviderModel>>(StatusCodes.Status200OK)]
    public List<ProviderModel> GetProviders()
        => _providers.Select(ProviderModel.From).OrderBy(p => p.Name).ToList();
}
