using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Metadata.Profiles.Exif;
using SixLabors.ImageSharp.PixelFormats;
using Umbricians.MediaCurator.Exif;
using Umbricians.MediaCurator.Providers;

namespace Umbricians.MediaCurator.Tests.Exif;

// The Date provider parses the text the EXIF reader gives it, so check that text with a real file.
public class DateTakenFromFileTests
{
    [Test]
    public void Reads_the_date_taken_from_a_photo()
    {
        using var image = new Image<Rgb24>(8, 8);
        image.Metadata.ExifProfile = new ExifProfile();
        image.Metadata.ExifProfile.SetValue(ExifTag.DateTimeOriginal, "2019:08:12 14:30:05");
        using var stream = new MemoryStream();
        image.SaveAsJpeg(stream);
        stream.Position = 0;

        var exif = new MetadataExtractorExifReader().Read(stream);

        Assert.That(DateFolderProvider.DateTaken(exif), Is.EqualTo(new DateTime(2019, 8, 12, 14, 30, 5)));
    }

    [Test]
    public void Has_no_date_taken_for_a_photo_without_EXIF()
    {
        using var image = new Image<Rgb24>(8, 8);
        using var stream = new MemoryStream();
        image.SaveAsJpeg(stream);
        stream.Position = 0;

        var exif = new MetadataExtractorExifReader().Read(stream);

        Assert.That(DateFolderProvider.DateTaken(exif), Is.Null);
    }
}
