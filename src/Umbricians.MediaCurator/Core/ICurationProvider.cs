namespace Umbricians.MediaCurator.Core;

/// <summary>
/// A pluggable unit that, given an image, returns the folder segment(s) it belongs under (§12).
/// Register via <c>builder.MediaCurator().AddProvider&lt;MyProvider&gt;()</c>; registered providers
/// automatically appear in the ruleset editor and participate in property provisioning.
/// </summary>
public interface ICurationProvider
{
    /// <summary>Unique alias, e.g. "Umbricians.MediaCurator.Date".</summary>
    string Alias { get; }

    /// <summary>Display name shown in the ruleset editor.</summary>
    string Name { get; }

    /// <summary>Backoffice icon alias, e.g. "icon-calendar".</summary>
    string Icon { get; }

    /// <summary>Media type properties this provider needs (§7). Empty when none.</summary>
    IEnumerable<PropertyRequirement> Requirements { get; }

    /// <summary>Settings rendered automatically in the rule editor (§4.3).</summary>
    ProviderSettingsSchema SettingsSchema { get; }

    /// <summary>
    /// Returns the folder path segments this item should be placed under for this rule,
    /// or <see cref="CurationResult.Unresolved"/> if the provider cannot resolve one.
    /// </summary>
    Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken cancellationToken = default);
}
