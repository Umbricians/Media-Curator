namespace Umbricians.MediaCurator.Core;

/// <summary>Field types the rule editor knows how to render generically (§4.3).</summary>
public enum SettingFieldType
{
    Text,
    Number,
    Toggle,
    Select,
}

public sealed class SettingFieldOption
{
    public required string Value { get; init; }
    public required string Label { get; init; }
}

public sealed class ProviderSettingField
{
    public required string Alias { get; init; }
    public required string Label { get; init; }
    public SettingFieldType Type { get; init; } = SettingFieldType.Text;
    public string? Description { get; init; }
    public string? DefaultValue { get; init; }
    public IReadOnlyList<SettingFieldOption> Options { get; init; } = [];
}

/// <summary>
/// A provider's declared settings, rendered automatically by the rule editor so providers
/// get a configuration UI without custom client code.
/// </summary>
public sealed class ProviderSettingsSchema
{
    public IReadOnlyList<ProviderSettingField> Fields { get; init; } = [];

    public static ProviderSettingsSchema Empty { get; } = new();
}
