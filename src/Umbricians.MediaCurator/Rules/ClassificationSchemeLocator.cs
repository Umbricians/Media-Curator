using Umbricians.MediaCurator.Providers;

namespace Umbricians.MediaCurator.Rules;

/// <summary>Finds which classification scheme applies to a media item, from the rules it is curated by.</summary>
public interface IClassificationSchemeLocator
{
    /// <summary>
    /// The scheme of the first Library Classification rule (in rule order) in the ruleset governing the
    /// item, when that rule asks the AI for codes; null when the item has no ruleset, no such rule, or
    /// its codes come from file names or a custom table. Analysis then describes and tags the image only.
    /// </summary>
    Task<string?> GetSchemeForMediaAsync(Guid mediaKey, CancellationToken cancellationToken = default);
}

internal sealed class ClassificationSchemeLocator : IClassificationSchemeLocator
{
    private readonly IRulesetResolver _resolver;

    public ClassificationSchemeLocator(IRulesetResolver resolver) => _resolver = resolver;

    public async Task<string?> GetSchemeForMediaAsync(Guid mediaKey, CancellationToken cancellationToken = default)
    {
        var ruleset = await _resolver.ResolveForItemAsync(mediaKey, cancellationToken);
        return ruleset is null ? null : FindScheme(ruleset.Rules);
    }

    /// <summary>Depth-first in rule order, so the rule that runs first decides.</summary>
    internal static string? FindScheme(IEnumerable<RuleNode> rules)
    {
        foreach (var rule in rules)
        {
            if (rule.ProviderAlias.Equals(ClassificationProvider.ProviderAlias, StringComparison.OrdinalIgnoreCase))
            {
                var scheme = Setting(rule, "scheme", ClassificationProvider.DefaultScheme);
                var source = Setting(rule, "source", ClassificationProvider.DefaultSource);
                if (source.Equals(ClassificationProvider.DefaultSource, StringComparison.OrdinalIgnoreCase)
                    && !scheme.Equals("custom", StringComparison.OrdinalIgnoreCase))
                {
                    return scheme;
                }
            }

            if (FindScheme(rule.Children) is { } nested)
            {
                return nested;
            }
        }

        return null;
    }

    private static string Setting(RuleNode rule, string key, string defaultValue)
        => rule.Settings[key]?.GetValue<string>() is { Length: > 0 } value ? value : defaultValue;
}
