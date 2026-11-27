using System.Globalization;
using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Tests.Core;

public class FolderOrderTests
{
    private static string[] Sort(IComparer<string> comparer, params string[] names)
        => names.OrderBy(n => n, comparer).ToArray();

    [Test]
    public void Natural_order_compares_digit_runs_numerically()
    {
        var sorted = Sort(NaturalFolderNameComparer.Invariant, "Photo 10", "Photo 2", "Photo 1", "Photo 007", "Photo 8");

        Assert.That(sorted, Is.EqualTo(["Photo 1", "Photo 2", "Photo 007", "Photo 8", "Photo 10"]));
    }

    [Test]
    public void Natural_order_ignores_case_and_breaks_ties_deterministically()
    {
        var comparer = NaturalFolderNameComparer.Invariant;

        Assert.That(Sort(comparer, "cherry", "Banana", "apple"), Is.EqualTo(["apple", "Banana", "cherry"]));
        Assert.That(Sort(comparer, "Photo 10", "photo 2"), Is.EqualTo(["photo 2", "Photo 10"]));
        // Same text in different case: still a total order, the same either way round.
        Assert.That(comparer.Compare("alpha", "Alpha"), Is.EqualTo(-comparer.Compare("Alpha", "alpha")));
        Assert.That(comparer.Compare("Alpha", "alpha"), Is.Not.EqualTo(0));
        Assert.That(comparer.Compare("Alpha", "Alpha"), Is.EqualTo(0));
    }

    [Test]
    public void Natural_order_is_culture_aware()
    {
        // Swedish sorts ö after z; English treats it as an o.
        Assert.That(Sort(new NaturalFolderNameComparer(CultureInfo.GetCultureInfo("sv-SE")), "zebra", "örn", "apa"), Is.EqualTo(["apa", "zebra", "örn"]));
        Assert.That(Sort(new NaturalFolderNameComparer(CultureInfo.GetCultureInfo("en-US")), "zebra", "örn", "apa"), Is.EqualTo(["apa", "örn", "zebra"]));
    }

    [Test]
    public void Ranked_order_puts_unranked_names_last_in_natural_order()
    {
        var comparer = RankedFolderNameComparer.FromOrderedNames(["Small", "Medium", "Large"], CultureInfo.InvariantCulture);

        Assert.That(Sort(comparer, "Large", "extra 10", "small", "Extra 2", "Medium"), Is.EqualTo(["small", "Medium", "Large", "Extra 2", "extra 10"]));
    }

    [Test]
    public void Ranked_order_matches_names_in_their_path_safe_form()
    {
        // "#" cannot be in a folder name; the folder is created as "_".
        var comparer = RankedFolderNameComparer.FromOrderedNames(["B", "#", "A"], CultureInfo.InvariantCulture);

        Assert.That(Sort(comparer, "Other", "A", "_", "B"), Is.EqualTo(["B", "_", "A", "Other"]));
    }
}
