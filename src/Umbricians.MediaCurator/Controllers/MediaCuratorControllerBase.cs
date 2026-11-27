using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Common.Filters;
using Umbraco.Cms.Web.Common.Authorization;

namespace Umbricians.MediaCurator.Controllers;

/// <summary>
/// The base of every Media Curator Management API controller: signed-in backoffice users only, the backoffice's JSON
/// settings, and the package's own API document. Each controller also requires access to the Settings section, and
/// changes are refused from other sites (see <see cref="RefuseCrossSiteRequestsAttribute"/>).
/// </summary>
[ApiController]
[Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
[RefuseCrossSiteRequests]
[JsonOptionsName(Umbraco.Cms.Core.Constants.JsonOptionsNames.BackOffice)]
[MapToApi(Constants.ApiName)]
internal abstract class MediaCuratorControllerBase : ControllerBase
{
}
