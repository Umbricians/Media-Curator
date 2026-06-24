using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Providers;

/// <summary>
/// Sorts images by a recognized classification scheme (§5.2). The code for an image is
/// resolved from a configurable source: a media type property, an administrator-defined
/// custom code table, or a filename convention (leading code). Hierarchical codes produce
/// nested folders; naming is code-only, name-only, or "code – name".
/// </summary>
public sealed class ClassificationProvider : ICurationProvider
{
    public const string ProviderAlias = "Umbricians.MediaCurator.Classification";

    public const string CodePropertyAlias = "mediaCuratorClassificationCode";

    private readonly ClassificationSchemeCollection _schemes;

    public ClassificationProvider(ClassificationSchemeCollection schemes) => _schemes = schemes;

    public string Alias => ProviderAlias;

    public string Name => "Library Classification";

    public string Icon => "icon-books";

    public IEnumerable<PropertyRequirement> Requirements =>
    [
        new PropertyRequirement
        {
            Alias = CodePropertyAlias,
            Name = "Classification code (Media Curator)",
            EditorAlias = "Umbraco.TextBox",
            EditorUiAlias = "Umb.PropertyEditorUi.TextBox",
            Mandatory = false,
            Description = "The classification code used by the Library Classification rule.",
        },
    ];

    public ProviderSettingsSchema SettingsSchema => new()
    {
        Fields =
        [
            new ProviderSettingField
            {
                Alias = "scheme",
                Label = "Scheme",
                Type = SettingFieldType.Select,
                DefaultValue = "lcc",
                Options = _schemes
                    .Select(s => new SettingFieldOption { Value = s.Alias, Label = s.Name })
                    .Append(new SettingFieldOption { Value = "custom", Label = "Custom code table" })
                    .ToList(),
            },
            new ProviderSettingField
            {
                Alias = "source",
                Label = "Code source",
                Type = SettingFieldType.Select,
                DefaultValue = "property",
                Options =
                [
                    new SettingFieldOption { Value = "property", Label = $"Media property ({CodePropertyAlias})" },
                    new SettingFieldOption { Value = "filename", Label = "Filename prefix (code before first space/dash)" },
                ],
            },
            new ProviderSettingField
            {
                Alias = "naming",
                Label = "Folder naming",
                Type = SettingFieldType.Select,
                DefaultValue = "name",
                Options =
                [
                    new SettingFieldOption { Value = "code", Label = "Code only (770)" },
                    new SettingFieldOption { Value = "name", Label = "Name only (Photography)" },
                    new SettingFieldOption { Value = "codeName", Label = "Code – Name (770 – Photography)" },
                ],
            },
            new ProviderSettingField
            {
                Alias = "customTable",
                Label = "Custom code table",
                Description = "Used when Scheme is 'Custom code table'. One per line: code=Folder/Sub Folder.",
            },
        ],
    };

    public async Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken cancellationToken = default)
    {
        var schemeAlias = context.GetSetting("scheme", "lcc");
        var code = await ResolveCodeAsync(context, schemeAlias, cancellationToken);
        if (string.IsNullOrWhiteSpace(code))
        {
            return CurationResult.Unresolved();
        }

        if (schemeAlias.Equals("custom", StringComparison.OrdinalIgnoreCase))
        {
            return ResolveCustom(code, context.GetSetting("customTable", string.Empty));
        }

        var scheme = _schemes.GetByAlias(schemeAlias);
        var path = scheme?.GetPath(code) ?? [];
        if (path.Count == 0)
        {
            return CurationResult.Unresolved();
        }

        var naming = context.GetSetting("naming", "name");
        var segments = path.Select(e => Format(e, naming)).ToArray();
        return CurationResult.Resolved(code, segments);
    }

    private static async Task<string?> ResolveCodeAsync(
        CurationContext context,
        string schemeAlias,
        CancellationToken cancellationToken)
    {
        var source = context.GetSetting("source", "property");
        if (source == "filename")
        {
            return ResolveFilenameCode(context);
        }

        var code = context.Properties.GetString(CodePropertyAlias);
        if (!string.IsNullOrWhiteSpace(code))
        {
            return code;
        }

        if (context.RecognizeAsync is not null
            && !schemeAlias.Equals("custom", StringComparison.OrdinalIgnoreCase))
        {
            await context.RecognizeAsync(schemeAlias, cancellationToken);
            code = context.Properties.GetString(CodePropertyAlias);
        }

        return code;
    }

    private static string? ResolveFilenameCode(CurationContext context)
    {
        var name = context.MediaName?.Trim();
        if (string.IsNullOrEmpty(name))
        {
            return null;
        }

        var token = name.Split(' ', '-', '_', '.')[0].Trim();
        return token.Length > 0 ? token : null;
    }

    private static CurationResult ResolveCustom(string code, string table)
    {
        foreach (var line in table.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            var separator = line.IndexOf('=');
            if (separator <= 0)
            {
                continue;
            }

            var key = line[..separator].Trim();
            if (!key.Equals(code, StringComparison.OrdinalIgnoreCase))
            {
                continue;
            }

            var segments = line[(separator + 1)..]
                .Split('/', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
            if (segments.Length > 0)
            {
                return CurationResult.Resolved(code, segments);
            }
        }

        return CurationResult.Unresolved();
    }

    private static string Format(ClassificationEntry entry, string naming) => naming switch
    {
        "code" => entry.Code,
        "codeName" => $"{entry.Code} – {entry.Name}",
        _ => entry.Name,
    };
}
