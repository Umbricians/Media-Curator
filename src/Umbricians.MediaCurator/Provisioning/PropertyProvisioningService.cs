using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Rules;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Provisioning;

public interface IPropertyProvisioningService
{
    /// <summary>Checks every requirement declared by the providers used in a ruleset
    /// against the target media types (declare → check, §7).</summary>
    Task<RequirementReport> CheckAsync(Guid rulesetKey, CancellationToken cancellationToken = default);

    /// <summary>Applies user-approved provisioning actions (consent → provision, §7).
    /// Never modifies or deletes existing schema.</summary>
    Task<ProvisioningResult> ApplyAsync(IReadOnlyList<ProvisioningApproval> approvals, CancellationToken cancellationToken = default);
}

public sealed class PropertyProvisioningService : IPropertyProvisioningService
{
    /// <summary>v1: requirements are checked against the built-in Image media type.
    /// (User-configurable target media types are a later milestone.)</summary>
    public static readonly string[] TargetMediaTypes = ["Image"];

    private static readonly HashSet<string> RecognitionProviderAliases = new(StringComparer.OrdinalIgnoreCase)
    {
        AiTagProvider.ProviderAlias,
        ClassificationProvider.ProviderAlias,
    };

    private readonly IRulesetRepository _rulesets;
    private readonly CurationProviderCollection _providers;
    private readonly IMediaTypeSchema _schema;
    private readonly IPropertyMapRepository _propertyMaps;
    private readonly IMediaCuratorSettingsService _settings;

    public PropertyProvisioningService(
        IRulesetRepository rulesets,
        CurationProviderCollection providers,
        IMediaTypeSchema schema,
        IPropertyMapRepository propertyMaps,
        IMediaCuratorSettingsService settings)
    {
        _rulesets = rulesets;
        _providers = providers;
        _schema = schema;
        _propertyMaps = propertyMaps;
        _settings = settings;
    }

    public async Task<RequirementReport> CheckAsync(Guid rulesetKey, CancellationToken cancellationToken = default)
    {
        var ruleset = await _rulesets.GetAsync(rulesetKey, cancellationToken)
            ?? throw new InvalidOperationException($"Ruleset '{rulesetKey}' not found.");

        var maps = await _propertyMaps.GetAllAsync(cancellationToken);
        var items = new List<RequirementStatusItem>();

        foreach (var providerAlias in CollectProviderAliases(ruleset.Rules).Distinct(StringComparer.OrdinalIgnoreCase))
        {
            var provider = _providers.GetByAlias(providerAlias);
            if (provider is null)
            {
                continue;
            }

            foreach (var requirement in provider.Requirements)
            {
                foreach (var mediaTypeAlias in TargetMediaTypes)
                {
                    items.Add(await EvaluateAsync(provider.Alias, requirement, mediaTypeAlias, maps, cancellationToken));
                }
            }
        }

        if (await ShouldIncludeDescriptionRequirementAsync(ruleset.Rules, cancellationToken))
        {
            foreach (var mediaTypeAlias in TargetMediaTypes)
            {
                items.Add(await EvaluateAsync(
                    RecognitionRequirements.ProviderAlias,
                    RecognitionRequirements.Description,
                    mediaTypeAlias,
                    maps,
                    cancellationToken));
            }
        }

        return new RequirementReport(items);
    }

    private async Task<bool> ShouldIncludeDescriptionRequirementAsync(
        IEnumerable<RuleNode> rules,
        CancellationToken cancellationToken)
    {
        var settings = await _settings.GetAsync(cancellationToken);
        if (!settings.PersistImageDescription)
        {
            return false;
        }

        return CollectProviderAliases(rules)
            .Any(alias => RecognitionProviderAliases.Contains(alias));
    }

    private async Task<RequirementStatusItem> EvaluateAsync(
        string providerAlias,
        PropertyRequirement requirement,
        string mediaTypeAlias,
        IReadOnlyList<PropertyMap> maps,
        CancellationToken cancellationToken)
    {
        var properties = await _schema.GetPropertiesAsync(mediaTypeAlias, cancellationToken);
        if (properties is null)
        {
            return new RequirementStatusItem(providerAlias, requirement, mediaTypeAlias, RequirementStatus.Missing, null);
        }

        // 1. An administrator-defined mapping satisfies the requirement if the mapped property still exists.
        var map = maps.FirstOrDefault(m =>
            m.RequirementAlias.Equals(requirement.Alias, StringComparison.OrdinalIgnoreCase)
            && m.MediaTypeAlias.Equals(mediaTypeAlias, StringComparison.OrdinalIgnoreCase));
        if (map is not null && properties.Any(p => p.Alias.Equals(map.PropertyAlias, StringComparison.OrdinalIgnoreCase)))
        {
            return new RequirementStatusItem(providerAlias, requirement, mediaTypeAlias, RequirementStatus.Satisfied, map.PropertyAlias);
        }

        // 2. Match by alias first, with an editor compatibility check (§7).
        var byAlias = properties.FirstOrDefault(p => p.Alias.Equals(requirement.Alias, StringComparison.OrdinalIgnoreCase));
        if (byAlias is not null)
        {
            return IsEditorCompatible(byAlias, requirement)
                ? new RequirementStatusItem(providerAlias, requirement, mediaTypeAlias, RequirementStatus.Satisfied, byAlias.Alias)
                // Right alias, different editor: partial match — offer map-vs-create.
                : new RequirementStatusItem(providerAlias, requirement, mediaTypeAlias, RequirementStatus.PartialMatch, byAlias.Alias);
        }

        // 3. A compatible editor under a different alias is also a partial match candidate.
        var byEditor = properties.FirstOrDefault(p => IsEditorCompatible(p, requirement));
        return byEditor is not null
            ? new RequirementStatusItem(providerAlias, requirement, mediaTypeAlias, RequirementStatus.PartialMatch, byEditor.Alias)
            : new RequirementStatusItem(providerAlias, requirement, mediaTypeAlias, RequirementStatus.Missing, null);
    }

    private static bool IsEditorCompatible(MediaTypePropertyInfo property, PropertyRequirement requirement)
        => property.EditorAlias.Equals(requirement.EditorAlias, StringComparison.OrdinalIgnoreCase);

    public async Task<ProvisioningResult> ApplyAsync(IReadOnlyList<ProvisioningApproval> approvals, CancellationToken cancellationToken = default)
    {
        var created = new List<string>();
        var mapped = new List<string>();
        var errors = new List<string>();

        var requirementsByAlias = _providers
            .SelectMany(p => p.Requirements)
            .Append(RecognitionRequirements.Description)
            .GroupBy(r => r.Alias, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);

        foreach (var approval in approvals)
        {
            if (!requirementsByAlias.TryGetValue(approval.RequirementAlias, out var requirement))
            {
                errors.Add($"No provider declares requirement '{approval.RequirementAlias}'.");
                continue;
            }

            try
            {
                switch (approval.Action)
                {
                    case ApprovalAction.Map when string.IsNullOrWhiteSpace(approval.MapToPropertyAlias):
                        errors.Add($"Mapping for '{approval.RequirementAlias}' is missing the target property alias.");
                        break;

                    case ApprovalAction.Map:
                        await _propertyMaps.SaveAsync(
                            new PropertyMap(approval.RequirementAlias, approval.MediaTypeAlias, approval.MapToPropertyAlias!),
                            cancellationToken);
                        mapped.Add($"{approval.MediaTypeAlias}.{approval.MapToPropertyAlias} ← {approval.RequirementAlias}");
                        break;

                    case ApprovalAction.Create:
                        await _schema.AddPropertyAsync(approval.MediaTypeAlias, requirement, cancellationToken);
                        created.Add($"{approval.MediaTypeAlias}.{requirement.Alias}");
                        break;
                }
            }
            catch (Exception ex)
            {
                errors.Add($"{approval.RequirementAlias} on {approval.MediaTypeAlias}: {ex.Message}");
            }
        }

        return new ProvisioningResult(created, mapped, errors);
    }

    private static IEnumerable<string> CollectProviderAliases(IEnumerable<RuleNode> nodes)
        => nodes.SelectMany(n => new[] { n.ProviderAlias }.Concat(CollectProviderAliases(n.Children)));
}
