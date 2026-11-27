namespace Umbricians.MediaCurator.Core;

/// <summary>Field types the rule editor knows how to render generically (§4.3).</summary>
public enum SettingFieldType
{
    /// <summary>A single-line text box.</summary>
    Text,
    /// <summary>A number input.</summary>
    Number,
    /// <summary>An on/off toggle.</summary>
    Toggle,
    /// <summary>A drop-down list of <see cref="ProviderSettingField.Options"/>.</summary>
    Select,
}

/// <summary>One choice in a <see cref="SettingFieldType.Select"/> field.</summary>
public sealed class SettingFieldOption
{
    /// <summary>The value saved in the rule's settings when this choice is picked.</summary>
    public required string Value { get; init; }
    /// <summary>What the rule editor shows for this option or field.</summary>
    public required string Label { get; init; }
}

/// <summary>One setting a provider declares, shown as a field in the rule editor.</summary>
public sealed class ProviderSettingField
{
    /// <summary>The key the value is saved under in the rule's settings.</summary>
    public required string Alias { get; init; }
    /// <summary>What the rule editor shows for this option or field.</summary>
    public required string Label { get; init; }
    /// <summary>How the rule editor renders the field.</summary>
    public SettingFieldType Type { get; init; } = SettingFieldType.Text;
    /// <summary>Help text shown under the field, or null for none.</summary>
    public string? Description { get; init; }
    /// <summary>The value a new rule starts with, or null for none.</summary>
    public string? DefaultValue { get; init; }
    /// <summary>The choices of a <see cref="SettingFieldType.Select"/> field; empty for other types.</summary>
    public IReadOnlyList<SettingFieldOption> Options { get; init; } = [];
}

/// <summary>
/// A provider's declared settings, rendered automatically by the rule editor so providers
/// get a configuration UI without custom client code.
/// </summary>
public sealed class ProviderSettingsSchema
{
    /// <summary>The provider's settings, in the order the rule editor shows them.</summary>
    public IReadOnlyList<ProviderSettingField> Fields { get; init; } = [];

    /// <summary>A schema with no settings, for providers that need none.</summary>
    public static ProviderSettingsSchema Empty { get; } = new();
}
