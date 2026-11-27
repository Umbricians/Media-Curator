using System.Text.Json;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Umbraco.AI.Core.Chat;
using Umbraco.Cms.Core.Services;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.People;

/// <summary>Decides, from an image's AI description and tags (never the image itself), whether it shows
/// people, and stores the answer for the media tree badges.</summary>
internal interface IPeopleDetectionService
{
    /// <summary>
    /// The stored decision when it still describes the item's file (unless <paramref name="force"/>), otherwise
    /// a new one: Jev when it is the decision engine and has an API key, else the Umbraco.AI decision profile.
    /// Null when AI is off, there is no description to decide from, or the decision failed. Never throws
    /// for AI or storage failures, so analysis carries on without it.
    /// </summary>
    Task<PeopleDetection?> DetectAsync(
        Guid mediaKey,
        string? description,
        IReadOnlyList<AiTag> tags,
        bool force = false,
        CancellationToken cancellationToken = default);
}

/// <summary>The media item's tree path and current file, or null when the item is gone.</summary>
internal interface IPeopleMediaInfo
{
    (string Path, string? SourceFile)? Get(Guid mediaKey);
}

internal sealed class MediaServicePeopleMediaInfo : IPeopleMediaInfo
{
    private readonly IMediaService _mediaService;

    public MediaServicePeopleMediaInfo(IMediaService mediaService) => _mediaService = mediaService;

    public (string Path, string? SourceFile)? Get(Guid mediaKey)
    {
        var media = _mediaService.GetById(mediaKey);
        return media is null
            ? null
            : (media.Path, SourceFileOf(media.GetValue<string>(global::Umbraco.Cms.Core.Constants.Conventions.Media.File)));
    }

    /// <summary>The "src" of an image cropper value, or a plain upload path.</summary>
    internal static string? SourceFileOf(string? value)
    {
        value = value?.Trim();
        if (string.IsNullOrEmpty(value))
        {
            return null;
        }

        if (!value.StartsWith('{'))
        {
            return value;
        }

        try
        {
            using var json = JsonDocument.Parse(value);
            return json.RootElement.TryGetProperty("src", out var src) && src.ValueKind == JsonValueKind.String
                ? src.GetString()
                : null;
        }
        catch (JsonException)
        {
            return null;
        }
    }
}

internal sealed class PeopleDetectionService : IPeopleDetectionService
{
    /// <summary>Probability at or above which an image counts as showing people. Privacy review would rather
    /// check one image too many than miss one, but a coin flip is not evidence either way.</summary>
    internal const double Threshold = 0.5;

    private const string PeopleChatAlias = "media-curator-people";

    private readonly IPeopleDetectionRepository _repository;
    private readonly IPeopleMediaInfo _media;
    private readonly IMediaCuratorSettingsService _settings;
    private readonly IServiceScopeFactory _scopes;
    private readonly ILogger<PeopleDetectionService> _logger;
    private readonly IJevPeopleDecider? _jev;
    private readonly TimeProvider _time;

    public PeopleDetectionService(
        IPeopleDetectionRepository repository,
        IPeopleMediaInfo media,
        IMediaCuratorSettingsService settings,
        IServiceScopeFactory scopes,
        ILogger<PeopleDetectionService> logger,
        IJevPeopleDecider? jev = null)
        : this(repository, media, settings, scopes, logger, jev, TimeProvider.System)
    {
    }

    internal PeopleDetectionService(
        IPeopleDetectionRepository repository,
        IPeopleMediaInfo media,
        IMediaCuratorSettingsService settings,
        IServiceScopeFactory scopes,
        ILogger<PeopleDetectionService> logger,
        IJevPeopleDecider? jev,
        TimeProvider time)
    {
        _repository = repository;
        _media = media;
        _settings = settings;
        _scopes = scopes;
        _logger = logger;
        _jev = jev;
        _time = time;
    }

    public async Task<PeopleDetection?> DetectAsync(
        Guid mediaKey,
        string? description,
        IReadOnlyList<AiTag> tags,
        bool force = false,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var info = _media.Get(mediaKey);
            if (info is not { } item)
            {
                return null;
            }

            if (!force)
            {
                var stored = (await _repository.GetManyAsync([mediaKey], cancellationToken)).GetValueOrDefault(mediaKey);
                if (stored is not null && string.Equals(stored.SourceFile, item.SourceFile, StringComparison.OrdinalIgnoreCase))
                {
                    return stored;
                }
            }

            var settings = await _settings.GetAsync(cancellationToken);
            if (!settings.AiEnabled || string.IsNullOrWhiteSpace(description))
            {
                return null;
            }

            var decided = await DecideAsync(settings, description.Trim(), tags, cancellationToken);
            if (decided is not { } answer)
            {
                return null;
            }

            var detection = new PeopleDetection(
                mediaKey,
                answer.ContainsPeople,
                Math.Round(answer.Confidence, 4),
                answer.Source,
                item.Path,
                item.SourceFile,
                _time.GetUtcNow().UtcDateTime);
            await _repository.SaveAsync(detection, cancellationToken);
            return detection;
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "MediaCurator: could not decide whether {MediaKey} shows people.", mediaKey);
            return null;
        }
    }

    private async Task<(bool ContainsPeople, double Confidence, string Source)?> DecideAsync(
        MediaCuratorSiteSettings settings,
        string description,
        IReadOnlyList<AiTag> tags,
        CancellationToken cancellationToken)
    {
        if (settings.DecisionEngine == DecisionEngine.Jev && _jev is not null)
        {
            var probability = await _jev.ProbabilityAsync(description, tags, cancellationToken);
            if (probability is { } p)
            {
                var containsPeople = p >= Threshold;
                return (containsPeople, containsPeople ? p : 1 - p, PeopleDetectionSources.Jev);
            }

            _logger.LogDebug("MediaCurator: no Jev people decision (no TypeSafe API key, or the call failed); using Umbraco.AI.");
        }

        using var scope = _scopes.CreateScope();

        // Resolved lazily: the site may not have Umbraco.AI's runtime registered at all.
        var chat = scope.ServiceProvider.GetService<IAIChatService>();
        if (chat is null)
        {
            return null;
        }

        var profile = Blank(settings.DecisionProfileAlias) ?? Blank(settings.DescriptionProfileAlias);
        var response = await chat.GetChatResponseAsync(
            builder =>
            {
                builder.WithAlias(PeopleChatAlias);
                if (profile is not null)
                {
                    builder.WithProfile(profile);
                }
            },
            [new ChatMessage(ChatRole.User, PeopleDetectionPrompt.BuildUmbracoAiPrompt(description, tags))],
            cancellationToken);
        return ParseUmbracoAiAnswer(response.Text) is { } parsed
            ? (parsed.ContainsPeople, parsed.Confidence, PeopleDetectionSources.UmbracoAi)
            : null;
    }

    /// <summary>Reads <c>{"containsPeople": true, "confidence": 0.9}</c>, tolerating code fences or prose
    /// around it. A missing or out-of-range confidence counts as fairly sure (0.75).</summary>
    internal static (bool ContainsPeople, double Confidence)? ParseUmbracoAiAnswer(string? text)
    {
        if (string.IsNullOrWhiteSpace(text))
        {
            return null;
        }

        var start = text.IndexOf('{');
        var end = text.LastIndexOf('}');
        if (start < 0 || end <= start)
        {
            return null;
        }

        try
        {
            using var json = JsonDocument.Parse(text[start..(end + 1)]);
            var root = json.RootElement;
            if (!TryGetProperty(root, "containsPeople", out var answer))
            {
                return null;
            }

            bool? containsPeople = answer.ValueKind switch
            {
                JsonValueKind.True => true,
                JsonValueKind.False => false,
                JsonValueKind.String when bool.TryParse(answer.GetString(), out var b) => b,
                _ => null,
            };
            if (containsPeople is null)
            {
                return null;
            }

            var confidence = TryGetProperty(root, "confidence", out var c) && c.ValueKind == JsonValueKind.Number
                && c.GetDouble() is var value and >= 0 and <= 1
                    ? value
                    : 0.75;
            return (containsPeople.Value, confidence);
        }
        catch (JsonException)
        {
            return null;
        }
    }

    private static bool TryGetProperty(JsonElement element, string name, out JsonElement value)
    {
        if (element.ValueKind == JsonValueKind.Object)
        {
            foreach (var property in element.EnumerateObject())
            {
                if (string.Equals(property.Name, name, StringComparison.OrdinalIgnoreCase))
                {
                    value = property.Value;
                    return true;
                }
            }
        }

        value = default;
        return false;
    }

    private static string? Blank(string? value) => string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
