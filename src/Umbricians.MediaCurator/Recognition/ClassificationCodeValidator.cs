using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Recognition;

/// <summary>Validates AI-suggested classification codes against a registered scheme.</summary>
internal static class ClassificationCodeValidator
{
    public static string? Validate(IClassificationScheme? scheme, string? code)
    {
        if (scheme is null || string.IsNullOrWhiteSpace(code))
        {
            return null;
        }

        var trimmed = code.Trim();
        if (scheme.GetEntry(trimmed) is not null)
        {
            return trimmed;
        }

        return CodeBeforeName(trimmed) is { } leading && scheme.GetEntry(leading) is { } entry ? entry.Code : null;
    }

    /// <summary>
    /// The code from an answer that repeats a whole choice: the prompt lists each one as "CODE|Name", and the AI
    /// sometimes answers "PEOPLE|People" instead of "PEOPLE". Null when the answer has no code before a bar.
    /// </summary>
    public static string? CodeBeforeName(string answer)
    {
        var separator = answer.IndexOf('|');
        var code = separator > 0 ? answer[..separator].Trim() : string.Empty;
        return code.Length > 0 ? code : null;
    }
}
