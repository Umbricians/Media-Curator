#if !UMBRACO_18_OR_GREATER
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Api.Common.OpenApi;

namespace Umbricians.MediaCurator.OpenApi;

/// <summary>Uses the action name as the operation id, so the generated TypeScript client has short method names.</summary>
internal sealed class MediaCuratorOperationIdHandler : OperationIdHandler
{
    public MediaCuratorOperationIdHandler(IOptions<ApiVersioningOptions> apiVersioningOptions)
        : base(apiVersioningOptions)
    {
    }

    protected override bool CanHandle(ApiDescription apiDescription, ControllerActionDescriptor controllerActionDescriptor)
        => controllerActionDescriptor.ControllerTypeInfo.Namespace?.StartsWith(
            "Umbricians.MediaCurator.Controllers",
            StringComparison.InvariantCultureIgnoreCase) is true;

    public override string Handle(ApiDescription apiDescription)
        => $"{apiDescription.ActionDescriptor.RouteValues["action"]}";
}
#endif
