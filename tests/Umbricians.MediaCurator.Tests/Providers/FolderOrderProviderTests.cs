using System.Globalization;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Tests.Providers;

public class FolderOrderProviderTests
{
    private static FolderOrderContext Context(int segmentIndex, string culture, params (string Key, string Value)[] settings)
        => new()
        {
            Settings = TestContext.Settings(settings),
            SegmentIndex = segmentIndex,
            Culture = CultureInfo.GetCultureInfo(culture),
        };

    private static string[] Sort(ICurationFolderOrder provider, FolderOrderContext context, params string[] names)
    {
        var comparer = provider.GetFolderComparer(context);
        Assert.NotNull(comparer);
        return names.OrderBy(n => n, comparer).ToArray();
    }

    // ----- Date Folders -----

    private static string[] SortDates(string format, int segmentIndex, string culture, params string[] names)
        => Sort(new DateFolderProvider(), Context(segmentIndex, culture, ("format", format)), names);

    [Fact]
    public void Date_numeric_months_sort_numerically_with_unmatched_names_last()
    {
        Assert.Equal(
            ["01", "02", "10", "12", "Archive", "Unsorted"],
            SortDates("yyyy/MM", 1, "en-US", "12", "Unsorted", "02", "10", "Archive", "01"));
    }

    [Fact]
    public void Date_years_sort_numerically()
    {
        Assert.Equal(["1999", "2024", "2025", "Unsorted"], SortDates("yyyy/MM", 0, "en-US", "2025", "Unsorted", "1999", "2024"));
    }

    [Fact]
    public void Date_month_names_sort_in_calendar_order()
    {
        Assert.Equal(
            ["Jan", "Feb", "May", "Aug", "Dec", "Unsorted"],
            SortDates("yyyy/MMM", 1, "en-US", "Dec", "Aug", "Unsorted", "Jan", "May", "Feb"));
        Assert.Equal(
            ["January", "february", "March", "October", "December"],
            SortDates("yyyy/MMMM", 1, "en-US", "October", "December", "March", "february", "January"));
    }

    [Fact]
    public void Date_month_names_sort_in_calendar_order_in_another_culture()
    {
        Assert.Equal(
            ["janvier", "février", "mars", "août", "décembre", "Unsorted"],
            SortDates("yyyy/MMMM", 1, "fr-FR", "décembre", "Unsorted", "août", "février", "mars", "janvier"));

        var abbreviated = Enumerable.Range(1, 12)
            .Select(m => new DateTime(2026, m, 1).ToString("MMM", CultureInfo.GetCultureInfo("fr-FR")))
            .ToArray();
        Assert.Equal(abbreviated, SortDates("yyyy/MMM", 1, "fr-FR", abbreviated.Reverse().ToArray()));
    }

    [Fact]
    public void Date_weekday_names_sort_from_the_cultures_first_day_of_the_week()
    {
        // en-US weeks start on Sunday, fr-FR weeks on Monday.
        Assert.Equal(
            ["Sunday", "Monday", "Wednesday", "Saturday", "Unsorted"],
            SortDates("dddd", 0, "en-US", "Saturday", "Unsorted", "Monday", "Sunday", "Wednesday"));
        Assert.Equal(
            ["lundi", "mercredi", "samedi", "dimanche"],
            SortDates("dddd", 0, "fr-FR", "dimanche", "samedi", "lundi", "mercredi"));
    }

    [Fact]
    public void Date_days_sort_numerically_whatever_the_current_month()
    {
        Assert.Equal(["1", "2", "10", "29", "31"], SortDates("yyyy/MM/d", 2, "en-US", "31", "10", "2", "29", "1"));
    }

    [Fact]
    public void Date_composite_parts_sort_by_their_date_components()
    {
        Assert.Equal(["01-Jan", "02-Feb", "10-Oct"], SortDates("yyyy/MM-MMM", 1, "en-US", "10-Oct", "01-Jan", "02-Feb"));
        Assert.Equal(
            ["March 2025", "December 2025", "January 2026", "Unsorted"],
            SortDates("MMMM yyyy", 0, "en-US", "January 2026", "Unsorted", "December 2025", "March 2025"));
    }

    [Fact]
    public void Date_levels_beyond_the_pattern_have_no_order()
    {
        Assert.Null(new DateFolderProvider().GetFolderComparer(Context(2, "en-US", ("format", "yyyy/MM"))));
    }

    // ----- Classification -----

    private static ClassificationProvider Classification()
        => new(new ClassificationSchemeCollection(() => [new DeweyPublicDomainScheme(), new LccOutlineScheme()]));

    [Fact]
    public void Classification_names_sort_by_their_code()
    {
        var provider = Classification();

        Assert.Equal(
            ["General Works", "Philosophy", "Fine Arts", "History"],
            Sort(provider, Context(0, "en-US", ("scheme", "dewey-pd"), ("naming", "name")), "Fine Arts", "History", "General Works", "Philosophy"));
        // Alphabetically this would be Architecture, Music, Painting, Photography.
        Assert.Equal(
            ["Architecture", "Painting", "Photography", "Music", "My Folder", "Unsorted"],
            Sort(provider, Context(1, "en-US", ("scheme", "dewey-pd"), ("naming", "name")), "Unsorted", "Photography", "My Folder", "Music", "Architecture", "Painting"));
    }

    [Fact]
    public void Classification_codes_sort_numerically_and_unknown_codes_go_last()
    {
        Assert.Equal(
            ["010", "100", "710", "770", "780", "999", "Unsorted"],
            Sort(Classification(), Context(0, "en-US", ("scheme", "dewey-pd"), ("naming", "code")), "780", "Unsorted", "100", "999", "770", "010", "710"));
    }

    [Fact]
    public void Classification_code_name_folders_sort_by_code_including_renamed_entries()
    {
        Assert.Equal(
            ["710 – Landscape Gardening", "770 – Photos", "780 – Music", "999 – Unknown", "Unsorted"],
            Sort(
                Classification(),
                Context(1, "en-US", ("scheme", "dewey-pd"), ("naming", "codeName")),
                "780 – Music", "Unsorted", "999 – Unknown", "770 – Photos", "710 – Landscape Gardening"));
    }

    [Fact]
    public void Classification_custom_table_folders_sort_by_code()
    {
        var context = Context(0, "en-US", ("scheme", "custom"), ("customTable", "2=Zebra/Stripes\n1=Yak/Fur\n10=Ant"));

        Assert.Equal(["Yak", "Zebra", "Ant", "Other"], Sort(Classification(), context, "Ant", "Other", "Zebra", "Yak"));
    }

    // ----- Color, Alphabetical -----

    [Fact]
    public void Color_folders_follow_the_palette_order_with_unknown_names_last()
    {
        var context = Context(0, "en-US");

        Assert.Equal(
            ["Red", "Blue", "Gray", "Mauve", "Unsorted"],
            Sort(new ColorProvider(), context, "Gray", "Unsorted", "Blue", "Mauve", "Red"));
    }

    [Fact]
    public void Color_folders_follow_a_custom_palette()
    {
        var context = Context(0, "en-US", ("palette", "Brand Teal=#008080\nBrand Coral=#FF7F50"));

        Assert.Equal(["Brand Teal", "Brand Coral", "Red"], Sort(new ColorProvider(), context, "Red", "Brand Coral", "Brand Teal"));
    }

    [Fact]
    public void Alphabetical_buckets_sort_with_the_non_letter_bucket_last()
    {
        // The default "#" bucket is created as "_" (path-safe).
        Assert.Equal(["a", "B", "Z", "_"], Sort(new AlphabeticalProvider(), Context(0, "en-US"), "_", "Z", "a", "B"));
        Assert.Equal(["A", "Z", "Other"], Sort(new AlphabeticalProvider(), Context(0, "en-US", ("otherBucket", "Other")), "Other", "Z", "A"));
    }
}
