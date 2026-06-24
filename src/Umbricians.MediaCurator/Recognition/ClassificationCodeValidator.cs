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
        return scheme.GetEntry(trimmed) is not null ? trimmed : null;
    }
}
