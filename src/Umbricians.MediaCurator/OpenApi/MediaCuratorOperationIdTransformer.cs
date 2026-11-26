#if UMBRACO_18_OR_GREATER
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

namespace Umbricians.MediaCurator.OpenApi;

/// <summary>
/// Uses the action name as the operation id on Umbraco 18 and later, as <c>MediaCuratorOperationIdHandler</c> does on 17,
/// so the TypeScript client generated from either major has the same short method names.
/// </summary>
internal sealed class MediaCuratorOperationIdTransformer : IOpenApiOperationTransformer
{
    public Task TransformAsync(OpenApiOperation operation, OpenApiOperationTransformerContext context, CancellationToken cancellationToken)
    {
        if (context.Description.ActionDescriptor.RouteValues.TryGetValue("action", out var action) && action is not null)
        {
            operation.OperationId = action;
        }

        return Task.CompletedTask;
    }
}
#endif
