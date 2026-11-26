#if UMBRACO_18_OR_GREATER
using Umbraco.Cms.Api.Common.OpenApi;
using Umbraco.Cms.Api.Management.OpenApi;
using Umbraco.Cms.Core.DependencyInjection;

namespace Umbricians.MediaCurator.OpenApi;

/// <summary>
/// The package's API document on Umbraco 18 and later, which replaced Swashbuckle with Microsoft.AspNetCore.OpenApi.
/// </summary>
internal static class MediaCuratorOpenApi
{
    /// <summary>
    /// Adds the package's Management API document, signed in as the backoffice user.
    /// </summary>
    public static IUmbracoBuilder AddMediaCuratorOpenApi(this IUmbracoBuilder builder)
    {
        builder.AddBackOfficeOpenApiDocument(Constants.ApiName, document => document
            .WithTitle("Umbricians Media Curator")
            // The controllers serialize with the backoffice's JSON options, so the document's schemas use them too.
            .WithJsonOptions(Umbraco.Cms.Core.Constants.JsonOptionsNames.BackOffice)
            .ConfigureOpenApiOptions(options => options.AddOperationTransformer<MediaCuratorOperationIdTransformer>())
            .WithBackOfficeAuthentication());
        return builder;
    }
}
#endif
