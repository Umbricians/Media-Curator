namespace Umbricians.MediaCurator.Core;

/// <summary>
/// A media type property a provider needs to do its job (§7). Declared by the provider,
/// checked and provisioned (with user consent) by MediaCurator.
/// </summary>
public sealed class PropertyRequirement
{
    /// <summary>The property alias MediaCurator looks for / creates (e.g. "mediaCuratorTags").</summary>
    public required string Alias { get; init; }

    /// <summary>Display name for the property and the consent dialog.</summary>
    public required string Name { get; init; }

    /// <summary>The property editor UI to use when creating the property (e.g. "Umb.PropertyEditorUi.TextBox").</summary>
    public required string EditorUiAlias { get; init; }

    /// <summary>The property editor schema alias (e.g. "Umbraco.TextBox") used when a new
    /// data type must be created and for compatibility checks against existing properties.</summary>
    public string EditorAlias { get; init; } = "Umbraco.TextBox";

    /// <summary>The underlying value type ("STRING", "TEXT", "DATETIME", …).</summary>
    public string ValueType { get; init; } = "STRING";

    /// <summary>Whether the provider cannot function without it (degraded when declined).</summary>
    public bool Mandatory { get; init; }

    public string? Description { get; init; }
}
