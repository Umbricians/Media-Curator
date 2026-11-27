using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Recognition;

/// <summary>Picks one classification code per drill-down level with TypeSafe's Jev model.</summary>
internal interface IJevClassificationDecider
{

    /// <summary>The chosen code, or null when no TypeSafe API key is stored or the call failed, so the
    /// caller can fall back to Umbraco.AI.</summary>
    Task<string?> ChooseAsync(ClassificationChoice choice, CancellationToken cancellationToken = default);
}

/// <summary>
/// One Choice question per level: the image summary and tags are the state, each candidate code is an
/// option. Jev answers in well under a second and returns calibrated probabilities instead of text, so
/// there is no format to parse and no reasoning tokens to pay for.
/// API: https://docs.typesafe.ai/api.md
/// </summary>
internal sealed class JevClassificationDecider : IJevClassificationDecider
{
    public const string HttpClientName = "MediaCurator.TypeSafe";

    private const int MaxAttempts = 3;

    /// <summary>Jev accepts at most this many options per Choice.</summary>
    private const int MaxChoiceOptions = 255;

    private static readonly JsonSerializerOptions _json = new()
    {
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    };

    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IMediaCuratorSettingsService _settings;
    private readonly ILogger<JevClassificationDecider> _logger;
    private readonly Func<TimeSpan, CancellationToken, Task> _delay;

    public JevClassificationDecider(
        IHttpClientFactory httpClientFactory,
        IMediaCuratorSettingsService settings,
        ILogger<JevClassificationDecider> logger)
        : this(httpClientFactory, settings, logger, Task.Delay)
    {
    }

    internal JevClassificationDecider(
        IHttpClientFactory httpClientFactory,
        IMediaCuratorSettingsService settings,
        ILogger<JevClassificationDecider> logger,
        Func<TimeSpan, CancellationToken, Task> delay)
    {
        _httpClientFactory = httpClientFactory;
        _settings = settings;
        _logger = logger;
        _delay = delay;
    }

    public async Task<string?> ChooseAsync(ClassificationChoice choice, CancellationToken cancellationToken = default)
    {
        var apiKey = await _settings.GetTypeSafeApiKeyAsync(cancellationToken);
        if (apiKey is null || choice.Candidates.Count == 0 || choice.Candidates.Count > MaxChoiceOptions)
        {
            return null;
        }

        var model = (await _settings.GetAsync(cancellationToken)).JevModel;
        var body = BuildRequest(choice, model);
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

                var client = _httpClientFactory.CreateClient(HttpClientName);
                using var response = await client.SendAsync(request, timeout.Token);
                if (IsRetryable(response.StatusCode) && attempt < MaxAttempts)
                {
                    await _delay(TimeSpan.FromSeconds(Math.Pow(2, attempt)), cancellationToken);
                    continue;
                }

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning(
                        "MediaCurator: Jev decision failed with HTTP {StatusCode}; falling back to Umbraco.AI.",
                        (int)response.StatusCode);
                    return null;
                }

                var parsed = await response.Content.ReadFromJsonAsync<SystemOneResponse>(_json, timeout.Token);
                var answer = parsed?.Answers?.GetValueOrDefault(QuestionId);
                var code = answer?.Choice;
                if (string.IsNullOrWhiteSpace(code))
                {
                    return null;
                }

                _logger.LogDebug(
                    "MediaCurator: Jev picked {Code} under {Parent} (confidence {Confidence:0.00}).",
                    code,
                    choice.Parent?.Code ?? "(top level)",
                    answer?.Confidence);
                return code;
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

                _logger.LogWarning(ex, "MediaCurator: Jev decision failed; falling back to Umbraco.AI.");
                return null;
            }
        }

        return null;
    }

    private const string QuestionId = "classification";

    internal static object BuildRequest(ClassificationChoice choice, string model)
    {
        var state = new Dictionary<string, object>
        {
            ["image_summary"] = choice.Description,
            ["tags"] = choice.Tags.Select(t => t.Name).ToArray(),
        };
        if (choice.Parent is not null)
        {
            state["already_classified_under"] = $"{choice.Parent.Code} {choice.Parent.Name}";
        }

        var instructions =
            $"Which category of the \"{choice.Scheme.Name}\" classification scheme best fits the image " +
            "described in `image_summary` and `tags`" +
            (choice.Parent is null ? "?" : ", within `already_classified_under`?") +
            " " + choice.Scheme.DecisionGuidance;

        return new
        {
            model,
            state,
            questions = new Dictionary<string, object>
            {
                [QuestionId] = new
                {
                    type = "choice",
                    instructions,
                    criteria = choice.Candidates.ToDictionary(c => c.Code, c => choice.Label(c)),
                },
            },
        };
    }

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
        [JsonPropertyName("choice")]
        public string? Choice { get; set; }

        [JsonPropertyName("confidence")]
        public double? Confidence { get; set; }
    }
}
