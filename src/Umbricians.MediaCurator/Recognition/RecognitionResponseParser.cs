using System.Text.Json;

namespace Umbricians.MediaCurator.Recognition;

/// <summary>Parses strict-JSON recognition and classification responses from AI models.</summary>
internal static class RecognitionResponseParser
{
    private static readonly JsonSerializerOptions _json = new() { PropertyNameCaseInsensitive = true };

    public static RecognitionResult? Parse(string? text)
    {
        var json = ExtractJsonObject(text);
        if (json is null)
        {
            return null;
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<ParsedResponse>(json, _json);
            if (parsed is null)
            {
                return null;
            }

            var tags = (parsed.Tags ?? [])
                .Where(t => !string.IsNullOrWhiteSpace(t.Name))
                .Select(t => new AiTag(t.Name!.Trim().ToLowerInvariant(), Math.Clamp(t.Confidence, 0, 1)))
                .ToList();
            var description = string.IsNullOrWhiteSpace(parsed.Description) ? null : parsed.Description.Trim();
            var classificationCode = string.IsNullOrWhiteSpace(parsed.ClassificationCode)
                ? null
                : parsed.ClassificationCode.Trim();
            return new RecognitionResult(tags, description, classificationCode);
        }
        catch (JsonException)
        {
            return null;
        }
    }

    public static string? ParseClassificationCode(string? text)
        => Parse(text)?.ClassificationCode;

    private static string? ExtractJsonObject(string? text)
    {
        if (string.IsNullOrWhiteSpace(text))
        {
            return null;
        }

        var json = text.Trim();
        if (json.StartsWith("```", StringComparison.Ordinal))
        {
            var start = json.IndexOf('{');
            var end = json.LastIndexOf('}');
            if (start < 0 || end <= start)
            {
                return null;
            }

            json = json[start..(end + 1)];
        }

        return json.StartsWith("{", StringComparison.Ordinal) ? json : null;
    }

    private sealed class ParsedResponse
    {
        public string? Description { get; set; }
        public List<ParsedTag>? Tags { get; set; }
        public string? ClassificationCode { get; set; }
    }

    private sealed class ParsedTag
    {
        public string? Name { get; set; }
        public double Confidence { get; set; }
    }
}
