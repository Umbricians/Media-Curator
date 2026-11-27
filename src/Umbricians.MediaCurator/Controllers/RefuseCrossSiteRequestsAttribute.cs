using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Configuration.Models;

namespace Umbricians.MediaCurator.Controllers;

/// <summary>
/// Refuses a request that changes something when the browser says it came from another site, or from another
/// subdomain of this one.
/// </summary>
/// <remarks>
/// <para>
/// From Umbraco 19 the backoffice signs in with a SameSite=Strict cookie alone, and the Management API has no
/// antiforgery tokens. SameSite keeps other sites' requests from carrying the cookie, but a page on a sibling
/// subdomain counts as the same site, so it could post a form to an action that reads no body. Browsers mark every
/// request with <c>Sec-Fetch-Site</c>, which a page can't change, so this refuses <c>same-site</c> and
/// <c>cross-site</c> requests.
/// </para>
/// <para>
/// A request with an <c>Authorization</c> header passes: no other origin can add one without a CORS preflight,
/// and on Umbraco 17 and 18 the backoffice always sends one. Requests without <c>Sec-Fetch-Site</c> (servers and
/// scripts, not browsers) pass, and so does the origin configured as <c>Umbraco:CMS:Security:BackOfficeHost</c>,
/// which is how a backoffice served from another host reaches the API.
/// </para>
/// </remarks>
[AttributeUsage(AttributeTargets.Class, Inherited = true)]
internal sealed class RefuseCrossSiteRequestsAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        HttpContext httpContext = context.HttpContext;
        Uri? backOfficeHost = httpContext.RequestServices.GetService<IOptionsMonitor<SecuritySettings>>()?.CurrentValue
            .BackOfficeHost;
        if (!IsRefused(httpContext.Request, backOfficeHost))
        {
            return;
        }

        context.Result = new ObjectResult(new ProblemDetails
        {
            Title = "Cross-site request refused",
            Detail = "Media Curator only accepts changes from the backoffice's own origin.",
            Status = StatusCodes.Status403Forbidden,
        })
        {
            StatusCode = StatusCodes.Status403Forbidden,
        };
    }

    internal static bool IsRefused(HttpRequest request, Uri? backOfficeHost)
    {
        if (HttpMethods.IsGet(request.Method) || HttpMethods.IsHead(request.Method)
            || HttpMethods.IsOptions(request.Method) || HttpMethods.IsTrace(request.Method))
        {
            return false;
        }

        if (request.Headers.ContainsKey("Authorization"))
        {
            return false;
        }

        string? fetchSite = request.Headers["Sec-Fetch-Site"];
        if (fetchSite is null || fetchSite is "same-origin" or "none")
        {
            return false;
        }

        return !IsBackOfficeHost(request.Headers.Origin, backOfficeHost);
    }

    private static bool IsBackOfficeHost(string? origin, Uri? backOfficeHost)
        => backOfficeHost is not null
            && Uri.TryCreate(origin, UriKind.Absolute, out Uri? originUri)
            && Uri.Compare(originUri, backOfficeHost, UriComponents.SchemeAndServer, UriFormat.Unescaped,
                StringComparison.OrdinalIgnoreCase) == 0;
}
