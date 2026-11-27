namespace Umbricians.MediaCurator.Core;

/// <summary>One folder level produced by a curation rule. The name is a display name;
/// path/URL sanitization happens when folders are created.</summary>
public sealed record FolderSegment(string Name);

/// <summary>
/// The outcome of a provider resolving an item: zero or more folder segments plus the
/// raw resolved value that conditional child rules can match against.
/// </summary>
public sealed class CurationResult
{
    private static readonly CurationResult _unresolved = new(false, [], null);

    private CurationResult(bool isResolved, IReadOnlyList<FolderSegment> segments, string? resolvedValue)
    {
        IsResolved = isResolved;
        Segments = segments;
        ResolvedValue = resolvedValue;
    }

    /// <summary>Whether the provider resolved the item; when false, the rule's fallback applies.</summary>
    public bool IsResolved { get; }

    /// <summary>The folder levels the item goes into, outermost first.</summary>
    public IReadOnlyList<FolderSegment> Segments { get; }

    /// <summary>The value this rule resolved to (e.g. "product-shot", "2026/06"), used by
    /// conditional child rules. Null when unresolved.</summary>
    public string? ResolvedValue { get; }

    /// <summary>A result for an item the provider couldn't resolve.</summary>
    public static CurationResult Unresolved() => _unresolved;

    /// <summary>A result that puts the item in the given folders and resolves to <paramref name="resolvedValue"/>.</summary>
    public static CurationResult Resolved(string resolvedValue, params FolderSegment[] segments)
        => new(true, segments, resolvedValue);

    /// <summary>A result that puts the item in folders with the given names and resolves to <paramref name="resolvedValue"/>.</summary>
    public static CurationResult Resolved(string resolvedValue, IEnumerable<string> segmentNames)
        => new(true, segmentNames.Select(n => new FolderSegment(n)).ToArray(), resolvedValue);
}
