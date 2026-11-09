using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Controllers.ViewModels;

internal class SettingFieldOptionModel
{
    public required string Value { get; init; }
    public required string Label { get; init; }
}

internal class SettingFieldModel
{
    public required string Alias { get; init; }
    public required string Label { get; init; }
    public required string Type { get; init; }
    public string? Description { get; init; }
    public string? DefaultValue { get; init; }
    public List<SettingFieldOptionModel> Options { get; init; } = [];
}

internal class PropertyRequirementModel
{
    public required string Alias { get; init; }
    public required string Name { get; init; }
    public required string EditorUiAlias { get; init; }
    public required bool Mandatory { get; init; }
    public string? Description { get; init; }
}

internal class ProviderModel
{
    public required string Alias { get; init; }
    public required string Name { get; init; }
    public required string Icon { get; init; }
    public List<SettingFieldModel> SettingsFields { get; init; } = [];
    public List<PropertyRequirementModel> Requirements { get; init; } = [];

    public static ProviderModel From(ICurationProvider provider) => new()
    {
        Alias = provider.Alias,
        Name = provider.Name,
        Icon = provider.Icon,
        SettingsFields = provider.SettingsSchema.Fields.Select(f => new SettingFieldModel
        {
            Alias = f.Alias,
            Label = f.Label,
            Type = f.Type.ToString().ToLowerInvariant(),
            Description = f.Description,
            DefaultValue = f.DefaultValue,
            Options = f.Options.Select(o => new SettingFieldOptionModel { Value = o.Value, Label = o.Label }).ToList(),
        }).ToList(),
        Requirements = provider.Requirements.Select(r => new PropertyRequirementModel
        {
            Alias = r.Alias,
            Name = r.Name,
            EditorUiAlias = r.EditorUiAlias,
            Mandatory = r.Mandatory,
            Description = r.Description,
        }).ToList(),
    };
}
