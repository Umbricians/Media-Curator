using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Web.Common.Authorization;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Provisioning;

namespace Umbricians.MediaCurator.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "MediaCurator")]
public class RequirementsController : MediaCuratorApiControllerBase
{
    private readonly IPropertyProvisioningService _provisioning;

    public RequirementsController(IPropertyProvisioningService provisioning) => _provisioning = provisioning;

    /// <summary>Checks property requirements for a ruleset (any media-section user).</summary>
    [HttpGet("requirements/check/{rulesetKey:guid}")]
    [ProducesResponseType<RequirementReportModel>(StatusCodes.Status200OK)]
    public async Task<RequirementReportModel> CheckRequirements(Guid rulesetKey, CancellationToken ct)
        => RequirementReportModel.From(await _provisioning.CheckAsync(rulesetKey, ct));

    /// <summary>Applies approved provisioning actions. Requires Settings access because it
    /// changes media type schema (§7 permissions).</summary>
    [HttpPost("requirements/apply")]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessSettings)]
    [ProducesResponseType<ProvisioningResultModel>(StatusCodes.Status200OK)]
    public async Task<ProvisioningResultModel> ApplyRequirements(List<ProvisioningApprovalModel> approvals, CancellationToken ct)
    {
        var result = await _provisioning.ApplyAsync(approvals.Select(a => a.ToApproval()).ToList(), ct);
        return ProvisioningResultModel.From(result);
    }
}
