using Umbricians.MediaCurator.Providers;

namespace Umbricians.MediaCurator.Tests.Providers;

public class DateFolderProviderTests
{
    private readonly DateFolderProvider _sut = new();

    [TestCase("yyyy/MM", new[] { "2026", "06" })]
    [TestCase("yyyy/MM/dd", new[] { "2026", "06", "10" })]
    [TestCase("yy/MM", new[] { "26", "06" })]
    [TestCase("yyyy", new[] { "2026" })]
    public async Task Formats_create_date_into_segments(string format, string[] expected)
    {
        var ctx = CurationContexts.Create(settings: CurationContexts.Settings(("format", format)));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.IsResolved, Is.True);
        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(expected));
    }

    [Test]
    public async Task Defaults_to_yyyy_MM_when_no_format_configured()
    {
        var result = await _sut.ResolveAsync(CurationContexts.Create());

        Assert.That(result.IsResolved, Is.True);
        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(["2026", "06"]));
        Assert.That(result.ResolvedValue, Is.EqualTo("2026/06"));
    }

    [Test]
    public async Task Localizes_month_names_to_ruleset_culture()
    {
        var ctx = CurationContexts.Create(culture: "da-DK", settings: CurationContexts.Settings(("format", "yyyy/MMMM")));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.IsResolved, Is.True);
        Assert.That(result.Segments[1].Name, Is.EqualTo("juni"));
    }

    [Test]
    public async Task Uses_update_date_when_configured()
    {
        var ctx = CurationContexts.Create(settings: CurationContexts.Settings(("format", "yyyy/MM"), ("source", "updateDate")));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(["2026", "07"]));
    }

    [Test]
    public async Task Unresolved_when_date_is_missing()
    {
        var ctx = CurationContexts.Create(createDate: default(DateTime));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.IsResolved, Is.False);
    }

    [TestCase("2019:08:12 14:30:05")]
    [TestCase("2019-08-12 14:30:05")]
    [TestCase(" 2019:08:12 14:30:05 ")]
    [TestCase("2019:08:12")]
    public async Task Uses_the_date_the_photo_was_taken(string dateTimeOriginal)
    {
        var result = await _sut.ResolveAsync(DateTakenContext(dateTimeOriginal));

        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(["2019", "08", "12"]));
    }

    // Cameras without a set clock write zeros, and some software writes blanks or text.
    [TestCase(null)]
    [TestCase("")]
    [TestCase("0000:00:00 00:00:00")]
    [TestCase("    :  :     :  :  ")]
    [TestCase("not a date")]
    [TestCase("2019:13:45 25:61:00")]
    public async Task Falls_back_to_the_upload_date_without_a_date_taken(string? dateTimeOriginal)
    {
        var result = await _sut.ResolveAsync(DateTakenContext(dateTimeOriginal));

        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(["2026", "06", "10"]));
    }

    [Test]
    public async Task Falls_back_to_the_upload_date_when_EXIF_could_not_be_read()
    {
        var ctx = CurationContexts.Create(settings: CurationContexts.Settings(("format", "yyyy/MM/dd"), ("source", "dateTaken")))
            with { Exif = null };

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(["2026", "06", "10"]));
    }

    // The camera's local time is used as recorded, so a photo taken late on New Year's Eve stays in that year.
    [Test]
    public async Task Keeps_the_time_the_camera_recorded()
    {
        var result = await _sut.ResolveAsync(DateTakenContext("2019:12:31 23:59:59"));

        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(["2019", "12", "31"]));
    }

    [Test]
    public void Offers_date_taken_as_a_source()
    {
        var source = _sut.SettingsSchema.Fields.Single(field => field.Alias == "source");

        Assert.That(source.Options!.Select(option => option.Value), Does.Contain(DateFolderProvider.DateTakenSource));
    }

    private static Umbricians.MediaCurator.Core.CurationContext DateTakenContext(string? dateTimeOriginal)
        => CurationContexts.Create(settings: CurationContexts.Settings(("format", "yyyy/MM/dd"), ("source", "dateTaken")))
            with
            {
                Exif = dateTimeOriginal is null
                    ? new Dictionary<string, string>()
                    : new Dictionary<string, string> { ["DateTimeOriginal"] = dateTimeOriginal },
            };
}
