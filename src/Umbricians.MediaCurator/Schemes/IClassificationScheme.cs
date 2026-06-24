using Umbraco.Cms.Core.Composing;

namespace Umbricians.MediaCurator.Schemes;

/// <summary>A single entry in a classification scheme.</summary>
public sealed record ClassificationEntry(string Code, string Name, string? ParentCode);

/// <summary>
/// A pluggable classification scheme (§5.2): a code → name hierarchy whose codes resolve to
/// nested folder paths. Only public-domain / license-free scheme data is embedded; data
/// lives in replaceable resource files so open lists can be added without code changes.
/// </summary>
public interface IClassificationScheme
{
    string Alias { get; }

    string Name { get; }

    /// <summary>Returns the entry for a code, or null when the scheme does not define it.</summary>
    ClassificationEntry? GetEntry(string code);

    /// <summary>The entry and its ancestors, root first — hierarchical codes naturally
    /// produce nested folders (e.g. LCC N → NA becomes Fine Arts/Architecture).</summary>
    IReadOnlyList<ClassificationEntry> GetPath(string code);

    /// <summary>All entries defined by the scheme, for AI prompt construction and lookup.</summary>
    IReadOnlyList<ClassificationEntry> GetAllEntries();

    /// <summary>Direct children of <paramref name="parentCode"/>; when null, returns root entries.</summary>
    IReadOnlyList<ClassificationEntry> GetChildren(string? parentCode);
}

public sealed class ClassificationSchemeCollection : BuilderCollectionBase<IClassificationScheme>
{
    public ClassificationSchemeCollection(Func<IEnumerable<IClassificationScheme>> items)
        : base(items)
    {
    }

    public IClassificationScheme? GetByAlias(string alias)
        => this.FirstOrDefault(s => string.Equals(s.Alias, alias, StringComparison.OrdinalIgnoreCase));
}

public sealed class ClassificationSchemeCollectionBuilder
    : LazyCollectionBuilderBase<ClassificationSchemeCollectionBuilder, ClassificationSchemeCollection, IClassificationScheme>
{
    protected override ClassificationSchemeCollectionBuilder This => this;
}

/// <summary>Base for schemes backed by an embedded "code|name|parentCode" resource file.</summary>
public abstract class ResourceFileScheme : IClassificationScheme
{
    private readonly Lazy<Dictionary<string, ClassificationEntry>> _entries;

    protected ResourceFileScheme(string resourceName)
    {
        _entries = new Lazy<Dictionary<string, ClassificationEntry>>(() => Load(resourceName));
    }

    public abstract string Alias { get; }

    public abstract string Name { get; }

    public ClassificationEntry? GetEntry(string code)
        => _entries.Value.GetValueOrDefault(code.Trim());

    public IReadOnlyList<ClassificationEntry> GetPath(string code)
    {
        var path = new List<ClassificationEntry>();
        var current = GetEntry(code);
        var guard = 0;
        while (current is not null && guard++ < 20)
        {
            path.Insert(0, current);
            current = current.ParentCode is null ? null : GetEntry(current.ParentCode);
        }

        return path;
    }

    public IReadOnlyList<ClassificationEntry> GetAllEntries()
        => _entries.Value.Values.OrderBy(e => e.Code, StringComparer.OrdinalIgnoreCase).ToList();

    public IReadOnlyList<ClassificationEntry> GetChildren(string? parentCode)
    {
        var parent = NormalizeParentCode(parentCode);
        return _entries.Value.Values
            .Where(e => ParentMatches(e.ParentCode, parent))
            .OrderBy(e => e.Code, StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    private static string? NormalizeParentCode(string? parentCode)
        => string.IsNullOrWhiteSpace(parentCode) ? null : parentCode.Trim();

    private static bool ParentMatches(string? entryParent, string? parent)
    {
        var normalizedEntryParent = NormalizeParentCode(entryParent);
        return string.Equals(normalizedEntryParent, parent, StringComparison.OrdinalIgnoreCase);
    }

    private static Dictionary<string, ClassificationEntry> Load(string resourceName)
    {
        var entries = new Dictionary<string, ClassificationEntry>(StringComparer.OrdinalIgnoreCase);
        var assembly = typeof(ResourceFileScheme).Assembly;
        using var stream = assembly.GetManifestResourceStream(resourceName)
            ?? throw new InvalidOperationException($"Embedded scheme resource '{resourceName}' not found.");
        using var reader = new StreamReader(stream);
        while (reader.ReadLine() is { } line)
        {
            if (line.StartsWith('#') || string.IsNullOrWhiteSpace(line))
            {
                continue;
            }

            var parts = line.Split('|');
            if (parts.Length < 2)
            {
                continue;
            }

            var code = parts[0].Trim();
            var name = parts[1].Trim();
            var parent = parts.Length > 2 && parts[2].Trim().Length > 0 ? parts[2].Trim() : null;
            entries[code] = new ClassificationEntry(code, name, parent);
        }

        return entries;
    }
}

/// <summary>Strictly the public-domain levels of the Dewey system: the ten main classes and
/// hundred divisions as published in out-of-copyright editions. Modern DDC editions are
/// proprietary to OCLC and are explicitly NOT embedded (§5.2).</summary>
public sealed class DeweyPublicDomainScheme : ResourceFileScheme
{
    public DeweyPublicDomainScheme()
        : base("Umbricians.MediaCurator.Schemes.Resources.dewey-public-domain.txt")
    {
    }

    public override string Alias => "dewey-pd";

    public override string Name => "Dewey (public domain levels)";
}

/// <summary>The Library of Congress Classification outline (classes and subclasses),
/// freely available from the Library of Congress (§5.2).</summary>
public sealed class LccOutlineScheme : ResourceFileScheme
{
    public LccOutlineScheme()
        : base("Umbricians.MediaCurator.Schemes.Resources.lcc-outline.txt")
    {
    }

    public override string Alias => "lcc";

    public override string Name => "Library of Congress Classification (outline)";
}
