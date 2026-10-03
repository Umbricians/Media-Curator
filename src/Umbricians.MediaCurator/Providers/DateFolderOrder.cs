using System.Globalization;
using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Providers;

/// <summary>
/// Orders the folders one level of a date pattern produces (one '/'-separated part, e.g.
/// "yyyy", "MM", "MMMM", "dddd", "MM-MMM") by what the part means rather than by its text:
/// years, months and days numerically/in calendar order, weekday names in week order starting
/// from the culture's first day of the week. Names that do not match the part (e.g. the
/// "Unsorted" fallback, or an editor's own folder) go last.
/// </summary>
internal static class DateFolderOrder
{
    [Flags]
    private enum Parts
    {
        None = 0,
        Year = 1,
        Month = 2,
        Day = 4,
        Weekday = 8,
        Unsupported = 16,
    }

    /// <summary>A comparer for folder names rendered with <paramref name="part"/> in
    /// <paramref name="culture"/>, or null when the part has no date meaning to order by.</summary>
    public static IComparer<string>? Create(string part, CultureInfo culture)
    {
        var parts = Analyze(part.Trim().Length == 1 ? ExpandStandardFormat(part.Trim()[0], culture) : part);
        if (parts == Parts.None || parts.HasFlag(Parts.Unsupported))
        {
            return null;
        }

        var natural = new NaturalFolderNameComparer(culture);
        if (parts.HasFlag(Parts.Year))
        {
            // Years are open-ended: parse each name back with the part as the exact format.
            return new RankedFolderNameComparer(
                name => DateTime.TryParseExact(name.Trim(), part, culture, DateTimeStyles.AllowWhiteSpaces, out var date)
                    ? Rank(date, parts, culture)
                    : null,
                natural);
        }

        // Without a year every possible name can be generated, which also covers names a parse
        // would reject (a day-only part defaults to the current month; weekday-only parts fail
        // the day-of-week check) and folder names whose characters were made path-safe.
        var ranks = new Lazy<Dictionary<string, long>>(() => Enumerate(part, parts, culture));
        return new RankedFolderNameComparer(name => ranks.Value.TryGetValue(name.Trim(), out var r) ? r : null, natural);
    }

    private static Dictionary<string, long> Enumerate(string part, Parts parts, CultureInfo culture)
    {
        var ranks = new Dictionary<string, long>(StringComparer.Create(culture, ignoreCase: true));

        // A leap year covers every month/day (and, for one day-of-week, every weekday). A weekday
        // combined with a day or month needs a full 28-year calendar cycle to meet every combination.
        var years = parts.HasFlag(Parts.Weekday) && (parts & (Parts.Month | Parts.Day)) != 0 ? 28 : 1;
        var start = new DateTime(2000, 1, 1);
        var end = start.AddYears(years);
        for (var date = start; date < end; date = date.AddDays(1))
        {
            string name;
            try
            {
                name = date.ToString(part, culture);
            }
            catch (FormatException)
            {
                return [];
            }

            RankedFolderNameComparer.AddName(ranks, name, Rank(date, parts, culture));
        }

        return ranks;
    }

    private static long Rank(DateTime date, Parts parts, CultureInfo culture)
    {
        var calendar = culture.Calendar;
        long rank = parts.HasFlag(Parts.Year) ? calendar.GetYear(date) : 0;
        rank = (rank * 14) + (parts.HasFlag(Parts.Month) ? calendar.GetMonth(date) : 0);
        rank = (rank * 32) + (parts.HasFlag(Parts.Day) ? calendar.GetDayOfMonth(date) : 0);
        var weekday = ((int)calendar.GetDayOfWeek(date) - (int)culture.DateTimeFormat.FirstDayOfWeek + 7) % 7;
        return (rank * 8) + (parts.HasFlag(Parts.Weekday) ? weekday : 0);
    }

    /// <summary>A one-letter part is a .NET standard format ("M" = "June 10", "y" = "June 2026");
    /// the culture's pattern for it says which components it contains. Others are unsupported.</summary>
    private static string ExpandStandardFormat(char format, CultureInfo culture) => format switch
    {
        'd' => culture.DateTimeFormat.ShortDatePattern,
        'D' => culture.DateTimeFormat.LongDatePattern,
        'M' or 'm' => culture.DateTimeFormat.MonthDayPattern,
        'Y' or 'y' => culture.DateTimeFormat.YearMonthPattern,
        _ => "H",
    };

    /// <summary>Which date components a custom format part contains (quoted/escaped literals skipped).
    /// Time, era and zone tokens are unsupported: such levels keep the natural order.</summary>
    private static Parts Analyze(string part)
    {
        if (string.IsNullOrWhiteSpace(part))
        {
            return Parts.Unsupported;
        }

        var parts = Parts.None;
        for (var i = 0; i < part.Length; i++)
        {
            var c = part[i];
            switch (c)
            {
                case '\'' or '"':
                    var close = part.IndexOf(c, i + 1);
                    i = close < 0 ? part.Length : close;
                    continue;
                case '\\':
                    i++;
                    continue;
                case '%':
                    continue;
            }

            var run = 1;
            while (i + run < part.Length && part[i + run] == c)
            {
                run++;
            }

            i += run - 1;
            parts |= c switch
            {
                'y' => Parts.Year,
                'M' => Parts.Month,
                'd' => run <= 2 ? Parts.Day : Parts.Weekday,
                'h' or 'H' or 'm' or 's' or 'f' or 'F' or 't' or 'z' or 'K' or 'g' => Parts.Unsupported,
                _ => Parts.None,
            };
        }

        return parts;
    }
}
