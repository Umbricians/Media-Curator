namespace Umbricians.MediaCurator.Recognition;

public sealed record AiTag(string Name, double Confidence);

public sealed record RecognitionResult(
    IReadOnlyList<AiTag> Tags,
    string? Description,
    string? ClassificationCode = null,
    DateTime? SourceUpdateDate = null)
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
