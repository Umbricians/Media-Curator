using Microsoft.Extensions.Logging;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.People;

/// <summary>
/// When "Detect people" is on, every fresh analysis also decides whether the image shows people, from the
/// description it just produced (no extra vision call). Images analyzed before are filled in by
/// "Analyze images", which decides from their stored description.
/// </summary>
internal sealed class PeopleRecognitionEnricher : IRecognitionEnricher
{
    private readonly IPeopleDetectionService _people;
    private readonly IMediaCuratorSettingsService _settings;
    private readonly ILogger<PeopleRecognitionEnricher> _logger;

    public PeopleRecognitionEnricher(
        IPeopleDetectionService people,
        IMediaCuratorSettingsService settings,
        ILogger<PeopleRecognitionEnricher> logger)
    {
        _people = people;
        _settings = settings;
        _logger = logger;
    }

    public async Task EnrichAsync(RecognitionContext context, CancellationToken cancellationToken = default)
    {
        // Enrichers run outside recognition's error handling: a failure here must never lose the analysis.
        try
        {
            if (!(await _settings.GetAsync(cancellationToken)).DetectPeople)
            {
                return;
            }

            await _people.DetectAsync(context.MediaKey, context.Description, context.Tags, force: true, cancellationToken);
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "MediaCurator: people detection failed for {MediaKey}.", context.MediaKey);
        }
    }
}
