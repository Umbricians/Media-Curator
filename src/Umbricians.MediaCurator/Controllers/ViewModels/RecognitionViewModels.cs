namespace Umbricians.MediaCurator.Controllers.ViewModels;

public class ReanalyzeImagesRequestModel
{
    public required List<Guid> MediaKeys { get; init; }

    /// <summary>Optional scheme alias; uses the configured default when omitted.</summary>
    public string? ClassificationSchemeAlias { get; init; }
}

public class ReanalyzeImageResultModel
{
    public required Guid MediaKey { get; init; }
    public string? MediaName { get; init; }
    public bool Analyzed { get; init; }
    public string? Description { get; init; }
    public List<string> Tags { get; init; } = [];
    public string? ClassificationCode { get; init; }
    public string? Error { get; init; }
}

public class ReanalyzeImagesResponseModel
{
    public List<ReanalyzeImageResultModel> Results { get; init; } = [];
}

public class MediaImageCountModel
{
    public required int Count { get; init; }

    /// <summary>Images with no stored AI analysis yet.</summary>
    public required int NotAnalyzedCount { get; init; }
}

public class MediaImageModel
{
    public required Guid MediaKey { get; init; }

    public required string MediaName { get; init; }
}

public class MediaImagesToAnalyzeModel
{
    public List<MediaImageModel> Images { get; init; } = [];

    /// <summary>Images left out because they were already analyzed.</summary>
    public int AlreadyAnalyzedCount { get; init; }
}

public class AnalyzeMediaImagesResponseModel
{
    /// <summary>One entry per image sent to the AI.</summary>
    public List<ReanalyzeImageResultModel> Results { get; init; } = [];

    /// <summary>Images skipped because they were already analyzed.</summary>
    public int AlreadyAnalyzedCount { get; init; }
}

public class PizzaRecognitionTestRequestModel
{
    /// <summary>Optional Umbraco.AI profile aliases to compare. Uses MediaCurator config/default profile when empty.</summary>
    public List<string> ProfileAliases { get; init; } = [];

    /// <summary>Longest edge used for the prepared-image test. Uses MediaCurator config when omitted.</summary>
    public int? MaxEdgePixels { get; init; }
}

public class PizzaRecognitionTestResultModel
{
    public required string Variant { get; init; }
    public string? ProfileAlias { get; init; }
    public required string MediaType { get; init; }
    public required int Width { get; init; }
    public required int Height { get; init; }
    public required int ByteLength { get; init; }
    public string? RawResponse { get; init; }
    public string? Description { get; init; }
    public List<string> Tags { get; init; } = [];
    public string? Error { get; init; }
}

public class PizzaRecognitionTestResponseModel
{
    public List<PizzaRecognitionTestResultModel> Results { get; init; } = [];
}
