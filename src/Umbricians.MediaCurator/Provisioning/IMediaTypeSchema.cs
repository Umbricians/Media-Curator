using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Provisioning;

internal sealed record MediaTypePropertyInfo(string Alias, string EditorAlias, string EditorUiAlias);

/// <summary>
/// Thin abstraction over Umbraco's media type schema so the requirement matching logic is
/// unit-testable. MediaCurator only ever ADDS properties — never edits or removes (§13).
/// </summary>
internal interface IMediaTypeSchema
{
    /// <summary>Returns the properties of a media type, or null when the media type does not exist.</summary>
    Task<IReadOnlyList<MediaTypePropertyInfo>?> GetPropertiesAsync(string mediaTypeAlias, CancellationToken cancellationToken = default);

    /// <summary>Adds the property described by the requirement to the media type, inside the
    /// "Media Curator" property group, reusing or creating a suitable data type.</summary>
    Task AddPropertyAsync(string mediaTypeAlias, PropertyRequirement requirement, CancellationToken cancellationToken = default);
}
