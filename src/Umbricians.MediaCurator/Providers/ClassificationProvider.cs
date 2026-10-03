using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Providers;

/// <summary>
/// Sorts images by a recognized classification scheme (§5.2). The code for an image is
/// resolved from a configurable source: a media type property, an administrator-defined
/// custom code table, or a filename convention (leading code). Hierarchical codes produce
/// nested folders; naming is code-only, name-only, or "code – name". Folders are ordered by
/// classification code (see <see cref="GetFolderComparer"/>).
/// </summary>
public sealed class ClassificationProvider : ICurationProvider, ICurationFolderOrder
{
    public const string ProviderAlias = "Umbricians.MediaCurator.Classification";

    public const string CodePropertyAlias = "mediaCuratorClassificationCode";

    /// <summary>Scheme used when a rule has none set.</summary>
    public const string DefaultScheme = "lcc";

    /// <summary>Code source used when a rule has none set: the stored code, filled in by AI recognition.</summary>
    public const string DefaultSource = "property";

    private readonly ClassificationSchemeCollection _schemes;

    public ClassificationProvider(ClassificationSchemeCollection schemes) => _schemes = schemes;

    public string Alias => ProviderAlias;

    public string Name => "Classification";

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
            Description = "The classification code used by the Classification rule.",
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
        var schemeAlias = context.GetSetting("scheme", DefaultScheme);
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
        var source = context.GetSetting("source", DefaultSource);
        if (source == "filename")
        {
            return ResolveFilenameCode(context);
        }

        var code = context.Properties.GetString(CodePropertyAlias);
        if (!string.IsNullOrWhiteSpace(code))
        {
            // A stored AI code may predate how codes are chosen now: re-decide it from the saved
            // description (no image is sent; editors' codes are left alone), then use whatever is stored.
            if (context.RefreshClassificationAsync is not null
                && !schemeAlias.Equals("custom", StringComparison.OrdinalIgnoreCase))
            {
                await context.RefreshClassificationAsync(schemeAlias, cancellationToken);
                code = context.Properties.GetString(CodePropertyAlias) ?? code;
            }

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

    private const string CodeNameSeparator = " – ";

    private static string Format(ClassificationEntry entry, string naming) => naming switch
    {
        "code" => entry.Code,
        "codeName" => $"{entry.Code}{CodeNameSeparator}{entry.Name}",
        _ => entry.Name,
    };

    /// <summary>Orders folders by classification code (codes compared naturally, so numeric codes
    /// sort numerically: "010" before "100"). Folder names are mapped back to codes through the
    /// scheme for every naming — names via the entries at this depth first — and, for "code – name"
    /// folders whose name is not in the scheme, through their code prefix. With the custom code table
    /// a folder takes the code of the first table line that produces it at this level. Names that
    /// cannot be mapped go last, naturally.</summary>
    public IComparer<string>? GetFolderComparer(FolderOrderContext context)
    {
        var natural = new NaturalFolderNameComparer(context.Culture);
        var schemeAlias = context.GetSetting("scheme", DefaultScheme);
        var codeByName = new Dictionary<string, string>(StringComparer.Create(context.Culture, ignoreCase: true));
        var codes = new List<string>();

        void Register(string name, string code)
        {
            codeByName.TryAdd(name.Trim(), code);
            codeByName.TryAdd(Engine.CurationEngine.SanitizeFolderName(name), code);
        }

        if (schemeAlias.Equals("custom", StringComparison.OrdinalIgnoreCase))
        {
            foreach (var line in context.GetSetting("customTable", string.Empty).Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
            {
                var separator = line.IndexOf('=');
                if (separator <= 0)
                {
                    continue;
                }

                var code = line[..separator].Trim();
                var segments = line[(separator + 1)..].Split('/', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                if (context.SegmentIndex < segments.Length)
                {
                    Register(segments[context.SegmentIndex], code);
                    codes.Add(code);
                }
            }
        }
        else
        {
            if (_schemes.GetByAlias(schemeAlias) is not { } scheme)
            {
                return null;
            }

            var naming = context.GetSetting("naming", "name");
            var entries = scheme.GetAllEntries();
            // Names can repeat across branches; prefer the entry at this folder depth.
            foreach (var entry in entries.OrderBy(e => scheme.GetPath(e.Code).Count - 1 == context.SegmentIndex ? 0 : 1))
            {
                Register(Format(entry, naming), entry.Code);
                codes.Add(entry.Code);
            }

            if (naming == "codeName")
            {
                var known = entries.Select(e => e.Code).ToHashSet(StringComparer.OrdinalIgnoreCase);
                return Ranked(name =>
                {
                    if (codeByName.TryGetValue(name.Trim(), out var code))
                    {
                        return code;
                    }

                    var at = name.IndexOf(CodeNameSeparator, StringComparison.Ordinal);
                    return at > 0 && known.Contains(name[..at].Trim()) ? name[..at].Trim() : null;
                });
            }
        }

        return Ranked(name => codeByName.TryGetValue(name.Trim(), out var code) ? code : null);

        RankedFolderNameComparer Ranked(Func<string, string?> codeFor)
        {
            var rankByCode = codes
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .Order(NaturalFolderNameComparer.Invariant)
                .Select((code, index) => (code, index))
                .ToDictionary(x => x.code, x => (long)x.index, StringComparer.OrdinalIgnoreCase);
            return new RankedFolderNameComparer(
                name => codeFor(name) is { } code && rankByCode.TryGetValue(code, out var rank) ? rank : null,
                natural);
        }
    }
}
