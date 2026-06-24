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

    public bool IsResolved { get; }

    public IReadOnlyList<FolderSegment> Segments { get; }

    /// <summary>The value this rule resolved to (e.g. "product-shot", "2026/06"), used by
    /// conditional child rules. Null when unresolved.</summary>
    public string? ResolvedValue { get; }

    public static CurationResult Unresolved() => _unresolved;

    public static CurationResult Resolved(string resolvedValue, params FolderSegment[] segments)
        => new(true, segments, resolvedValue);

    public static CurationResult Resolved(string resolvedValue, IEnumerable<string> segmentNames)
        => new(true, segmentNames.Select(n => new FolderSegment(n)).ToArray(), resolvedValue);
}
