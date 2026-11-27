using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.People;

/// <summary>Decides with TypeSafe's Jev model whether an image description shows people.</summary>
internal interface IJevPeopleDecider
{
    /// <summary>The probability (0–1) that the described image shows a real person, or null when no TypeSafe
    /// API key is stored or the call failed, so the caller can fall back to Umbraco.AI.</summary>
    Task<double?> ProbabilityAsync(string description, IReadOnlyList<AiTag> tags, CancellationToken cancellationToken = default);
}

/// <summary>
/// One Noul (yes/no) question over the saved image summary and tags. Jev returns a calibrated probability
/// rather than text, so there is nothing to parse and the threshold stays in code.
/// API: https://docs.typesafe.ai/primitives/noul.md
/// </summary>
internal sealed class JevPeopleDecider : IJevPeopleDecider
{
    internal const string QuestionId = "contains_people";

    private const int MaxAttempts = 3;

    private static readonly JsonSerializerOptions _json = new()
    {
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    };

    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IMediaCuratorSettingsService _settings;
    private readonly ILogger<JevPeopleDecider> _logger;
    private readonly Func<TimeSpan, CancellationToken, Task> _delay;

    public JevPeopleDecider(
        IHttpClientFactory httpClientFactory,
        IMediaCuratorSettingsService settings,
        ILogger<JevPeopleDecider> logger)
        : this(httpClientFactory, settings, logger, Task.Delay)
    {
    }

    internal JevPeopleDecider(
        IHttpClientFactory httpClientFactory,
        IMediaCuratorSettingsService settings,
        ILogger<JevPeopleDecider> logger,
        Func<TimeSpan, CancellationToken, Task> delay)
    {
        _httpClientFactory = httpClientFactory;
        _settings = settings;
        _logger = logger;
        _delay = delay;
    }

    public async Task<double?> ProbabilityAsync(
        string description,
        IReadOnlyList<AiTag> tags,
        CancellationToken cancellationToken = default)
    {
        var apiKey = await _settings.GetTypeSafeApiKeyAsync(cancellationToken);
        if (apiKey is null)
        {
            return null;
        }

        var body = BuildRequest(description, tags, (await _settings.GetAsync(cancellationToken)).JevModel);
        for (var attempt = 1; attempt <= MaxAttempts; attempt++)
        {
            try
            {
                using var request = new HttpRequestMessage(HttpMethod.Post, MediaCuratorDefaults.TypeSafeEndpoint)
                {
                    Content = JsonContent.Create(body, options: _json),
                };
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

                using var timeout = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
                timeout.CancelAfter(TimeSpan.FromSeconds(MediaCuratorDefaults.TypeSafeTimeoutSeconds));

                var client = _httpClientFactory.CreateClient(JevClassificationDecider.HttpClientName);
                using var response = await client.SendAsync(request, timeout.Token);
                if (IsRetryable(response.StatusCode) && attempt < MaxAttempts)
                {
                    await _delay(TimeSpan.FromSeconds(Math.Pow(2, attempt)), cancellationToken);
                    continue;
                }

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning(
                        "MediaCurator: Jev people decision failed with HTTP {StatusCode}; falling back to Umbraco.AI.",
                        (int)response.StatusCode);
                    return null;
                }

                var parsed = await response.Content.ReadFromJsonAsync<SystemOneResponse>(_json, timeout.Token);
                var probability = parsed?.Answers?.GetValueOrDefault(QuestionId)?.Noul;
                return probability is { } p && p is >= 0 and <= 1 ? p : null;
            }
            catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
            {
                throw;
            }
            catch (Exception ex) when (ex is HttpRequestException or OperationCanceledException or JsonException)
            {
                if (attempt < MaxAttempts)
                {
                    await _delay(TimeSpan.FromSeconds(Math.Pow(2, attempt)), cancellationToken);
                    continue;
                }

                _logger.LogWarning(ex, "MediaCurator: Jev people decision failed; falling back to Umbraco.AI.");
                return null;
            }
        }

        return null;
    }

    internal static object BuildRequest(string description, IReadOnlyList<AiTag> tags, string model) => new
    {
        model,
        state = new Dictionary<string, object>
        {
            ["image_summary"] = description,
            ["tags"] = tags.Select(t => t.Name).ToArray(),
        },
        questions = new Dictionary<string, object>
        {
            [QuestionId] = new
            {
                type = "noul",
                instructions = PeopleDetectionPrompt.Question,
                criteria = new Dictionary<string, string>
                {
                    ["true"] = PeopleDetectionPrompt.Yes,
                    ["false"] = PeopleDetectionPrompt.No,
                },
            },
        },
    };

    private static bool IsRetryable(HttpStatusCode status)
        => status is HttpStatusCode.TooManyRequests or (HttpStatusCode)529 or HttpStatusCode.BadGateway
            or HttpStatusCode.ServiceUnavailable or HttpStatusCode.GatewayTimeout;

    private sealed class SystemOneResponse
    {
        [JsonPropertyName("answers")]
        public Dictionary<string, SystemOneAnswer>? Answers { get; set; }
    }

    private sealed class SystemOneAnswer
    {
        [JsonPropertyName("noul")]
        public double? Noul { get; set; }
    }
}

/// <summary>The people question, shared by Jev and the Umbraco.AI fallback so both judge the same thing.</summary>
internal static class PeopleDetectionPrompt
{
    public const string Question =
        "Does the image described in `image_summary` and `tags` show one or more real people?";

    public const string Yes =
        "A real person is visible: any photographed or filmed human being, including people seen only in part, " +
        "from behind, in the background or in a crowd, a face, or body parts such as hands that belong to a real person.";

    public const string No =
        "No real person is visible: only objects, places, animals, food, text or graphics, or only depictions that are " +
        "not real people, such as statues, mannequins, dolls, toys, cartoons, drawings or illustrations.";

    public static string BuildUmbracoAiPrompt(string description, IReadOnlyList<AiTag> tags)
        => $$"""
            You decide whether an image shows people, from its description only.

            Image description: {{description}}
            Tags: {{string.Join(", ", tags.Select(t => t.Name))}}

            Answer true when: {{Yes}}
            Answer false when: {{No}}

            Reply with JSON only, no other text: {"containsPeople": true or false, "confidence": a number from 0 to 1 for how sure you are}
            """;
}
