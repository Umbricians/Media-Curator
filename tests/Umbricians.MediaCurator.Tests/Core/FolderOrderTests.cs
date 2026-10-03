using System.Globalization;
using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Tests.Core;

public class FolderOrderTests
{
    private static string[] Sort(IComparer<string> comparer, params string[] names)
        => names.OrderBy(n => n, comparer).ToArray();

    [Fact]
    public void Natural_order_compares_digit_runs_numerically()
    {
        var sorted = Sort(NaturalFolderNameComparer.Invariant, "Photo 10", "Photo 2", "Photo 1", "Photo 007", "Photo 8");

        Assert.Equal(["Photo 1", "Photo 2", "Photo 007", "Photo 8", "Photo 10"], sorted);
    }

    [Fact]
    public void Natural_order_ignores_case_and_breaks_ties_deterministically()
    {
        var comparer = NaturalFolderNameComparer.Invariant;

        Assert.Equal(["apple", "Banana", "cherry"], Sort(comparer, "cherry", "Banana", "apple"));
        Assert.Equal(["photo 2", "Photo 10"], Sort(comparer, "Photo 10", "photo 2"));
        // Same text in different case: still a total order, the same either way round.
        Assert.Equal(-comparer.Compare("Alpha", "alpha"), comparer.Compare("alpha", "Alpha"));
        Assert.NotEqual(0, comparer.Compare("Alpha", "alpha"));
        Assert.Equal(0, comparer.Compare("Alpha", "Alpha"));
    }

    [Fact]
    public void Natural_order_is_culture_aware()
    {
        // Swedish sorts ö after z; English treats it as an o.
        Assert.Equal(["apa", "zebra", "örn"], Sort(new NaturalFolderNameComparer(CultureInfo.GetCultureInfo("sv-SE")), "zebra", "örn", "apa"));
        Assert.Equal(["apa", "örn", "zebra"], Sort(new NaturalFolderNameComparer(CultureInfo.GetCultureInfo("en-US")), "zebra", "örn", "apa"));
    }

    [Fact]
    public void Ranked_order_puts_unranked_names_last_in_natural_order()
    {
        var comparer = RankedFolderNameComparer.FromOrderedNames(["Small", "Medium", "Large"], CultureInfo.InvariantCulture);

        Assert.Equal(["small", "Medium", "Large", "Extra 2", "extra 10"], Sort(comparer, "Large", "extra 10", "small", "Extra 2", "Medium"));
    }

    [Fact]
    public void Ranked_order_matches_names_in_their_path_safe_form()
    {
        // "#" cannot be in a folder name; the folder is created as "_".
        var comparer = RankedFolderNameComparer.FromOrderedNames(["B", "#", "A"], CultureInfo.InvariantCulture);

        Assert.Equal(["B", "_", "A", "Other"], Sort(comparer, "Other", "A", "_", "B"));
    }
}
