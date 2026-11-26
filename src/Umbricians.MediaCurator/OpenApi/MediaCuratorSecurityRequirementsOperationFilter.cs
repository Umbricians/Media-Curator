#if !UMBRACO_18_OR_GREATER
using Umbraco.Cms.Api.Management.OpenApi;

namespace Umbricians.MediaCurator.OpenApi;

/// <summary>
/// Makes the Swagger UI send the backoffice user's token with the package's API calls.
/// </summary>
internal sealed class MediaCuratorSecurityRequirementsOperationFilter : BackOfficeSecurityRequirementsOperationFilterBase
{
    protected override string ApiName => Constants.ApiName;
}
#endif
