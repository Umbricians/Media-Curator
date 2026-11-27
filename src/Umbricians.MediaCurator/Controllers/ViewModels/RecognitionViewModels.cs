namespace Umbricians.MediaCurator.Controllers.ViewModels;

internal class ReanalyzeImagesRequestModel
{
    public required List<Guid> MediaKeys { get; init; }

    /// <summary>Optional scheme alias; uses the configured default when omitted.</summary>
    public string? ClassificationSchemeAlias { get; init; }

    /// <summary>When true, an image that already has a stored analysis is not sent to the AI again: only what
    /// is missing (such as whether it shows people) is decided, from the stored description.</summary>
    public bool KeepExistingAnalysis { get; init; }
}

internal class ReanalyzeImageResultModel
{
    public required Guid MediaKey { get; init; }
    public string? MediaName { get; init; }
    public bool Analyzed { get; init; }
    public string? Description { get; init; }
    public List<string> Tags { get; init; } = [];
    public string? ClassificationCode { get; init; }

    /// <summary>Whether the image shows people; null when people detection is off or undecided.</summary>
    public bool? ContainsPeople { get; init; }
    public string? Error { get; init; }
}

internal class ReanalyzeImagesResponseModel
{
    public List<ReanalyzeImageResultModel> Results { get; init; } = [];
}

internal class MediaImageCountModel
{
    public required int Count { get; init; }

    /// <summary>Images with no stored AI analysis yet.</summary>
    public required int NotAnalyzedCount { get; init; }
}

internal class MediaImageModel
{
    public required Guid MediaKey { get; init; }

    public required string MediaName { get; init; }
}

internal class MediaImagesToAnalyzeModel
{
    public List<MediaImageModel> Images { get; init; } = [];

    /// <summary>Images left out because they were already analyzed.</summary>
    public int AlreadyAnalyzedCount { get; init; }
}

internal class AnalyzeMediaImagesResponseModel
{
    /// <summary>One entry per image sent to the AI.</summary>
    public List<ReanalyzeImageResultModel> Results { get; init; } = [];

    /// <summary>Images skipped because they were already analyzed.</summary>
    public int AlreadyAnalyzedCount { get; init; }
}
