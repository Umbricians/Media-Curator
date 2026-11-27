#if !UMBRACO_18_OR_GREATER
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Umbricians.MediaCurator.OpenApi;

/// <summary>
/// Adds the package's Management API document to the backoffice's Swagger UI, signed in as the backoffice user.
/// </summary>
internal sealed class MediaCuratorSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
{
    public void Configure(SwaggerGenOptions options)
    {
        options.SwaggerDoc(Constants.ApiName, new OpenApiInfo { Title = "Umbricians Media Curator", Version = "1.0" });
        options.OperationFilter<MediaCuratorSecurityRequirementsOperationFilter>();
    }
}
#endif
