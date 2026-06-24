using Umbricians.MediaCurator.Provisioning;

namespace Umbricians.MediaCurator.Controllers.ViewModels;

public class RequirementStatusItemModel
{
    public required string ProviderAlias { get; init; }
    public required string RequirementAlias { get; init; }
    public required string RequirementName { get; init; }
    public string? Description { get; init; }
    public required string MediaTypeAlias { get; init; }
    public required string EditorUiAlias { get; init; }
    public required bool Mandatory { get; init; }

    /// <summary>"satisfied" | "partialMatch" | "missing"</summary>
    public required string Status { get; init; }

    public string? CandidatePropertyAlias { get; init; }
}

public class RequirementReportModel
{
    public required bool AllSatisfied { get; init; }
    public List<RequirementStatusItemModel> Items { get; init; } = [];

    public static RequirementReportModel From(RequirementReport report) => new()
    {
        AllSatisfied = report.AllSatisfied,
        Items = report.Items.Select(i => new RequirementStatusItemModel
        {
            ProviderAlias = i.ProviderAlias,
            RequirementAlias = i.Requirement.Alias,
            RequirementName = i.Requirement.Name,
            Description = i.Requirement.Description,
            MediaTypeAlias = i.MediaTypeAlias,
            EditorUiAlias = i.Requirement.EditorUiAlias,
            Mandatory = i.Requirement.Mandatory,
            Status = i.Status switch
            {
                RequirementStatus.Satisfied => "satisfied",
                RequirementStatus.PartialMatch => "partialMatch",
                _ => "missing",
            },
            CandidatePropertyAlias = i.CandidatePropertyAlias,
        }).ToList(),
    };
}

public class ProvisioningApprovalModel
{
    public required string RequirementAlias { get; init; }
    public required string MediaTypeAlias { get; init; }

    /// <summary>"create" | "map"</summary>
    public required string Action { get; init; }

    public string? MapToPropertyAlias { get; init; }

    public ProvisioningApproval ToApproval() => new(
        RequirementAlias,
        MediaTypeAlias,
        Action.Equals("map", StringComparison.OrdinalIgnoreCase) ? ApprovalAction.Map : ApprovalAction.Create,
        MapToPropertyAlias);
}

public class ProvisioningResultModel
{
    public List<string> CreatedProperties { get; init; } = [];
    public List<string> MappedProperties { get; init; } = [];
    public List<string> Errors { get; init; } = [];

    public static ProvisioningResultModel From(ProvisioningResult result) => new()
    {
        CreatedProperties = result.CreatedProperties.ToList(),
        MappedProperties = result.MappedProperties.ToList(),
        Errors = result.Errors.ToList(),
    };
}
