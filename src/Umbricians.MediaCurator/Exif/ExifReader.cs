using MetadataExtractor;
using MetadataExtractor.Formats.Exif;

namespace Umbricians.MediaCurator.Exif;

/// <summary>Reads EXIF values from an image stream into a flat tag-name → value dictionary.</summary>
internal interface IExifReader
{
    IReadOnlyDictionary<string, string> Read(Stream imageStream);
}

internal sealed class MetadataExtractorExifReader : IExifReader
{
    /// <summary>Well-known tags exposed under stable names (§5.3).</summary>
    private static readonly Dictionary<string, int> _ifd0Tags = new()
    {
        ["Make"] = ExifDirectoryBase.TagMake,
        ["Model"] = ExifDirectoryBase.TagModel,
    };

    private static readonly Dictionary<string, int> _subIfdTags = new()
    {
        ["LensModel"] = ExifDirectoryBase.TagLensModel,
        ["ISO"] = ExifDirectoryBase.TagIsoEquivalent,
        ["FNumber"] = ExifDirectoryBase.TagFNumber,
        ["ExposureTime"] = ExifDirectoryBase.TagExposureTime,
        ["FocalLength"] = ExifDirectoryBase.TagFocalLength,
        ["DateTimeOriginal"] = ExifDirectoryBase.TagDateTimeOriginal,
    };

    public IReadOnlyDictionary<string, string> Read(Stream imageStream)
    {
        var values = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

        IReadOnlyList<MetadataExtractor.Directory> directories;
        try
        {
            directories = ImageMetadataReader.ReadMetadata(imageStream);
        }
        catch (ImageProcessingException)
        {
            return values;
        }

        var ifd0 = directories.OfType<ExifIfd0Directory>().FirstOrDefault();
        if (ifd0 is not null)
        {
            foreach (var (name, tag) in _ifd0Tags)
            {
                var value = ifd0.GetDescription(tag);
                if (!string.IsNullOrWhiteSpace(value))
                {
                    values[name] = value.Trim();
                }
            }
        }

        var subIfd = directories.OfType<ExifSubIfdDirectory>().FirstOrDefault();
        if (subIfd is not null)
        {
            foreach (var (name, tag) in _subIfdTags)
            {
                var value = subIfd.GetDescription(tag);
                if (!string.IsNullOrWhiteSpace(value))
                {
                    values[name] = value.Trim();
                }
            }
        }

        return values;
    }
}
