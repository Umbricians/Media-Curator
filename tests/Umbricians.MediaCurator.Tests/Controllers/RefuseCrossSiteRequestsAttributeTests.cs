using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Configuration.Models;
using Umbricians.MediaCurator.Controllers;

namespace Umbricians.MediaCurator.Tests.Controllers;

public class RefuseCrossSiteRequestsAttributeTests
{
    private static readonly Uri BackOfficeHost = new("https://backoffice.example.com");

    [TestCase("same-site")]
    [TestCase("cross-site")]
    public void Refuses_a_change_from_another_site_or_subdomain(string fetchSite)
    {
        HttpRequest request = Request("POST", fetchSite, origin: "https://blog.example.com");

        Assert.That(RefuseCrossSiteRequestsAttribute.IsRefused(request, backOfficeHost: null), Is.True);
    }

    [TestCase("same-origin")]
    [TestCase("none")]
    public void Accepts_a_change_from_the_same_origin(string fetchSite)
    {
        Assert.That(RefuseCrossSiteRequestsAttribute.IsRefused(Request("POST", fetchSite), null), Is.False);
    }

    [TestCase("PUT")]
    [TestCase("DELETE")]
    [TestCase("PATCH")]
    public void Refuses_every_method_that_changes_something(string method)
    {
        Assert.That(RefuseCrossSiteRequestsAttribute.IsRefused(Request(method, "same-site"), null), Is.True);
    }

    [TestCase("GET")]
    [TestCase("HEAD")]
    [TestCase("OPTIONS")]
    public void Accepts_a_read_from_another_site(string method)
    {
        Assert.That(RefuseCrossSiteRequestsAttribute.IsRefused(Request(method, "cross-site"), null), Is.False);
    }

    [Test]
    public void Accepts_a_request_without_Sec_Fetch_Site_since_it_is_not_from_a_browser()
    {
        Assert.That(RefuseCrossSiteRequestsAttribute.IsRefused(Request("POST", fetchSite: null), null), Is.False);
    }

    // Another origin can't add an Authorization header without a CORS preflight, and Umbraco 17 and 18's
    // backoffice sends one with every request.
    [Test]
    public void Accepts_a_request_with_an_Authorization_header()
    {
        HttpRequest request = Request("POST", "cross-site");
        request.Headers.Authorization = "Bearer [redacted]";

        Assert.That(RefuseCrossSiteRequestsAttribute.IsRefused(request, null), Is.False);
    }

    [TestCase("https://backoffice.example.com")]
    [TestCase("https://BACKOFFICE.example.com:443")]
    public void Accepts_the_configured_backoffice_host(string origin)
    {
        HttpRequest request = Request("POST", "same-site", origin);

        Assert.That(RefuseCrossSiteRequestsAttribute.IsRefused(request, BackOfficeHost), Is.False);
    }

    [TestCase("https://blog.example.com")]
    [TestCase("http://backoffice.example.com")]
    [TestCase("https://backoffice.example.com:8443")]
    [TestCase("null")]
    public void Refuses_other_origins_when_a_backoffice_host_is_configured(string origin)
    {
        HttpRequest request = Request("POST", "same-site", origin);

        Assert.That(RefuseCrossSiteRequestsAttribute.IsRefused(request, BackOfficeHost), Is.True);
    }

    [Test]
    public void Answers_a_refused_request_with_403()
    {
        AuthorizationFilterContext context = FilterContext(Request("POST", "same-site"));

        new RefuseCrossSiteRequestsAttribute().OnAuthorization(context);

        var result = TestAssert.IsType<ObjectResult>(context.Result);
        Assert.That(result.StatusCode, Is.EqualTo(StatusCodes.Status403Forbidden));
    }

    [Test]
    public void Reads_the_backoffice_host_from_Umbraco_settings()
    {
        var services = new ServiceCollection();
        services.Configure<SecuritySettings>(settings => settings.BackOfficeHost = BackOfficeHost);
        HttpRequest request = Request("POST", "same-site", "https://backoffice.example.com");
        request.HttpContext.RequestServices = services.BuildServiceProvider();
        AuthorizationFilterContext context = FilterContext(request);

        new RefuseCrossSiteRequestsAttribute().OnAuthorization(context);

        Assert.That(context.Result, Is.Null);
    }

    [Test]
    public void Applies_to_every_Media_Curator_controller()
    {
        Assert.That(typeof(MediaCuratorControllerBase).GetCustomAttributes(typeof(RefuseCrossSiteRequestsAttribute), true),
            Is.Not.Empty);
    }

    private static HttpRequest Request(string method, string? fetchSite, string? origin = null)
    {
        var httpContext = new DefaultHttpContext { RequestServices = new ServiceCollection().BuildServiceProvider() };
        httpContext.Request.Method = method;
        if (fetchSite is not null)
        {
            httpContext.Request.Headers["Sec-Fetch-Site"] = fetchSite;
        }

        if (origin is not null)
        {
            httpContext.Request.Headers.Origin = origin;
        }

        return httpContext.Request;
    }

    private static AuthorizationFilterContext FilterContext(HttpRequest request)
        => new(new ActionContext(request.HttpContext, new RouteData(), new ActionDescriptor()), []);
}
