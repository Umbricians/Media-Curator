namespace Umbricians.MediaCurator.Recognition;

public sealed record AiTag(string Name, double Confidence);

/// <param name="ClassificationMethod">How the AI chose <paramref name="ClassificationCode"/>, e.g.
/// "dewey-pd:one-step-v1". A code stored by an older method is re-decided from the saved description;
/// null for results from before methods were recorded.</param>
/// <param name="SourceFile">The media file the result describes; a different file makes it stale.</param>
public sealed record RecognitionResult(
    IReadOnlyList<AiTag> Tags,
    string? Description,
    string? ClassificationCode = null,
    DateTime? SourceUpdateDate = null,
    string? ClassificationMethod = null,
    string? SourceFile = null)
{
    public static readonly RecognitionResult Empty = new([], null);
}

/// <summary>
/// The AI step that analyses an image and produces tags/description (§8). Results are
/// cached on the media item (in the provisioned <c>mediaCuratorTags</c> property) so
/// recognition runs once per image and bulk re-categorization doesn't re-bill AI calls.
/// </summary>
public interface IRecognitionService
{
    /// <summary>
    /// Returns recognition output for the image: the cached result unless <paramref name="force"/>,
    /// otherwise a fresh analysis via the configured Umbraco.AI profile. Null when recognition is
    /// unavailable (metadata-only mode, no AI configured, item has no file, or the call failed).
    /// </summary>
    Task<RecognitionResult?> AnalyzeAsync(
        Guid mediaKey,
        bool force = false,
        string? classificationSchemeAlias = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Brings an AI-chosen classification code up to date with the current way codes are decided, without
    /// sending the image again: when the stored code was chosen by the AI with an older method (or another
    /// scheme), it is decided again from the saved description and tags. Codes an editor entered or changed
    /// are left alone, as are images with no saved description. Returns the (possibly updated) recognition
    /// result, or null when there is none.
    /// </summary>
    Task<RecognitionResult?> RefreshClassificationAsync(
        Guid mediaKey,
        string classificationSchemeAlias,
        CancellationToken cancellationToken = default)
        => Task.FromResult<RecognitionResult?>(null);
}

/// <summary>Mutable analysis state passed through enrichers before the result is cached.</summary>
public sealed class RecognitionContext
{
    public required Guid MediaKey { get; init; }

    public List<AiTag> Tags { get; } = [];

    public string? Description { get; set; }

    public string? ClassificationCode { get; set; }
}

/// <summary>
/// Extension point (§8): registered enrichers run after the AI analysis and can add or
/// adjust tags/description before the result is persisted (e.g. OCR, brand detection).
/// Register via <c>builder.MediaCurator().AddRecognitionEnricher&lt;T&gt;()</c>.
/// </summary>
public interface IRecognitionEnricher
{
    Task EnrichAsync(RecognitionContext context, CancellationToken cancellationToken = default);
}
