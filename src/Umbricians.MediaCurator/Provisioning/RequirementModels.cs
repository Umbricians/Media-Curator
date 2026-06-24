using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Provisioning;

public enum RequirementStatus
{
    /// <summary>A property with the right alias and a compatible editor exists (or is mapped).</summary>
    Satisfied,

    /// <summary>Something close exists: same alias with a different editor, or a compatible
    /// editor under a different alias. The user chooses map-onto-existing or create-new (§7).</summary>
    PartialMatch,

    /// <summary>No matching property exists; creating it requires consent.</summary>
    Missing,
}

/// <summary>The status of one requirement against one media type.</summary>
public sealed record RequirementStatusItem(
    string ProviderAlias,
    PropertyRequirement Requirement,
    string MediaTypeAlias,
    RequirementStatus Status,
    /// <summary>For PartialMatch: an existing property the requirement could map onto.</summary>
    string? CandidatePropertyAlias);

public sealed record RequirementReport(IReadOnlyList<RequirementStatusItem> Items)
{
    public bool AllSatisfied => Items.All(i => i.Status == RequirementStatus.Satisfied);
}

public enum ApprovalAction
{
    /// <summary>Create the property (and data type if needed) on the media type.</summary>
    Create,

    /// <summary>Map the requirement onto an existing property with a different alias.</summary>
    Map,
}

/// <summary>One user-approved provisioning action (consent is granular per
/// requirement / media type combination, §7).</summary>
public sealed record ProvisioningApproval(
    string RequirementAlias,
    string MediaTypeAlias,
    ApprovalAction Action,
    /// <summary>Required when Action is Map: the existing property alias to map onto.</summary>
    string? MapToPropertyAlias = null);

public sealed record ProvisioningResult(
    IReadOnlyList<string> CreatedProperties,
    IReadOnlyList<string> MappedProperties,
    IReadOnlyList<string> Errors);
