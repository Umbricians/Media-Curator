using System.Collections.Concurrent;
using System.Globalization;
using System.Text.Json.Nodes;

namespace Umbricians.MediaCurator.Core;

/// <summary>
/// Optional contract for an <see cref="ICurationProvider"/> whose folders have a logical order
/// (months in calendar order, a palette in its listed order, classification codes…).
/// </summary>
/// <remarks>
/// <para>At the end of every executed curation run the engine sorts the folders it curated:
/// folders first, then the other media A→Z. Each folder level is ordered by the provider (and
/// rule settings) that produced it in that run; a level no rule produced, a provider that does
/// not implement this interface, or a comparer of <c>null</c> gets
/// <see cref="NaturalFolderNameComparer"/>. The "Unsorted" fallback folder always goes last
/// at rule-produced levels.</para>
/// <para>Comparers receive folder names exactly as they exist in the media tree — i.e. after
/// the engine has stripped characters that break paths/URLs — and must not throw for names
/// they do not recognise (editors can add their own folders anywhere). Put unrecognised names
/// last; <see cref="RankedFolderNameComparer"/> does this for you.</para>
/// </remarks>
public interface ICurationFolderOrder
{
    /// <summary>The order for the folder names this provider produces at
    /// <see cref="FolderOrderContext.SegmentIndex"/> of its output (0 = the first segment it
    /// produces). Return <c>null</c> for the default natural order.</summary>
    IComparer<string>? GetFolderComparer(FolderOrderContext context);
}

/// <summary>What a provider gets when asked for a folder order (<see cref="ICurationFolderOrder"/>).</summary>
public sealed class FolderOrderContext
{
    /// <summary>The settings of the rule that produced the folder level.</summary>
    public JsonObject Settings { get; init; } = new();

    /// <summary>Which of the provider's own segments the level is (0 = the first segment it produced).
    /// A provider that resolves "2026/06" produces segment 0 ("2026") and segment 1 ("06").</summary>
    public int SegmentIndex { get; init; }

    /// <summary>The ruleset culture folder names were generated in (invariant when none is set).</summary>
    public CultureInfo Culture { get; init; } = CultureInfo.InvariantCulture;

    /// <summary>Convenience accessor for a string setting with a default (as <see cref="CurationContext.GetSetting"/>).</summary>
    public string GetSetting(string key, string defaultValue)
        => Settings[key]?.GetValue<string>() is { Length: > 0 } v ? v : defaultValue;
}

/// <summary>
/// The default folder order: culture-aware and case-insensitive, with digit runs compared by
/// numeric value so "2" sorts before "10" ("Photo 2", "Photo 10"). Ties are broken
/// case-sensitively and then ordinally, so the order is total and stable across runs.
/// </summary>
public sealed class NaturalFolderNameComparer : IComparer<string>
{
    /// <summary>A natural comparer using the invariant culture.</summary>
    public static NaturalFolderNameComparer Invariant { get; } = new(CultureInfo.InvariantCulture);

    private readonly CompareInfo _compareInfo;

    public NaturalFolderNameComparer(CultureInfo culture)
    {
        Culture = culture ?? CultureInfo.InvariantCulture;
        _compareInfo = Culture.CompareInfo;
    }

    public CultureInfo Culture { get; }

    public int Compare(string? x, string? y)
    {
        if (ReferenceEquals(x, y))
        {
            return 0;
        }

        if (x is null)
        {
            return -1;
        }

        if (y is null)
        {
            return 1;
        }

        int i = 0, j = 0;
        while (i < x.Length && j < y.Length)
        {
            var xDigits = char.IsAsciiDigit(x[i]);
            var yDigits = char.IsAsciiDigit(y[j]);
            var xRun = Run(x, ref i, xDigits);
            var yRun = Run(y, ref j, yDigits);

            int result;
            if (xDigits && yDigits)
            {
                var a = xRun.TrimStart('0');
                var b = yRun.TrimStart('0');
                result = a.Length != b.Length ? a.Length.CompareTo(b.Length) : string.CompareOrdinal(a, b);
            }
            else
            {
                result = _compareInfo.Compare(xRun, yRun, CompareOptions.IgnoreCase);
            }

            if (result != 0)
            {
                return result;
            }
        }

        var remaining = (x.Length - i).CompareTo(y.Length - j);
        if (remaining != 0)
        {
            return remaining;
        }

        var cased = _compareInfo.Compare(x, y, CompareOptions.None);
        return cased != 0 ? cased : string.CompareOrdinal(x, y);
    }

    private static string Run(string s, ref int index, bool digits)
    {
        var start = index;
        while (index < s.Length && char.IsAsciiDigit(s[index]) == digits)
        {
            index++;
        }

        return s[start..index];
    }
}

/// <summary>
/// Orders folder names by a provider-defined rank (lower first). Names the rank function does
/// not recognise (returns <c>null</c>) go last; equal ranks and unranked names fall back to the
/// tie-break comparer (natural by default). Ranks are cached per name, so the rank function can
/// do real work (parsing, lookups).
/// </summary>
/// <example><code>
/// // Small, Medium, Large — anything else last.
/// RankedFolderNameComparer.FromOrderedNames(["Small", "Medium", "Large"], context.Culture);
/// </code></example>
public sealed class RankedFolderNameComparer : IComparer<string>
{
    private readonly Func<string, long?> _rank;
    private readonly IComparer<string> _tieBreak;
    private readonly ConcurrentDictionary<string, long?> _ranks = new(StringComparer.Ordinal);

    /// <param name="rank">The rank for a folder name, or null when the name is not recognised.</param>
    /// <param name="tieBreak">Orders names of equal rank, and the unrecognised names among themselves.
    /// Defaults to <see cref="NaturalFolderNameComparer.Invariant"/>.</param>
    public RankedFolderNameComparer(Func<string, long?> rank, IComparer<string>? tieBreak = null)
    {
        _rank = rank ?? throw new ArgumentNullException(nameof(rank));
        _tieBreak = tieBreak ?? NaturalFolderNameComparer.Invariant;
    }

    /// <summary>Orders names in the given sequence order (matched case-insensitively in
    /// <paramref name="culture"/>, also in their path-safe form); other names go last, naturally.</summary>
    public static RankedFolderNameComparer FromOrderedNames(IEnumerable<string> orderedNames, CultureInfo culture)
    {
        var ranks = new Dictionary<string, long>(StringComparer.Create(culture, ignoreCase: true));
        long next = 0;
        foreach (var name in orderedNames)
        {
            AddName(ranks, name, next++);
        }

        return new RankedFolderNameComparer(n => ranks.TryGetValue(n, out var r) ? r : null, new NaturalFolderNameComparer(culture));
    }

    /// <summary>Registers a generated name under the rank, both as generated and in the path-safe
    /// form folders are created with. The first registration of a name wins.</summary>
    internal static void AddName(Dictionary<string, long> ranks, string name, long rank)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return;
        }

        ranks.TryAdd(name.Trim(), rank);
        ranks.TryAdd(Engine.CurationEngine.SanitizeFolderName(name), rank);
    }

    public int Compare(string? x, string? y)
    {
        if (ReferenceEquals(x, y))
        {
            return 0;
        }

        if (x is null || y is null)
        {
            return _tieBreak.Compare(x, y);
        }

        var rx = _ranks.GetOrAdd(x, _rank);
        var ry = _ranks.GetOrAdd(y, _rank);
        if (rx.HasValue != ry.HasValue)
        {
            return rx.HasValue ? -1 : 1;
        }

        if (rx.HasValue && rx.Value != ry!.Value)
        {
            return rx.Value.CompareTo(ry.Value);
        }

        return _tieBreak.Compare(x, y);
    }
}
