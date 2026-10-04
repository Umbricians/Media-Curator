namespace Umbricians.MediaCurator.Rules;

/// <summary>Provides the ancestor folder keys of a media item, nearest (parent) first.</summary>
public interface IMediaAncestry
{
    IReadOnlyList<Guid> GetAncestorOrSelfFolderKeys(Guid mediaKey);
}

public interface IRulesetResolver
{
    /// <summary>Returns the ruleset governing the given media item: walk up the tree, the
    /// nearest enabled ruleset wins (§4.1). Null when no ruleset applies.</summary>
    Task<Ruleset?> ResolveForItemAsync(Guid mediaKey, CancellationToken cancellationToken = default);
}

public sealed class RulesetResolver : IRulesetResolver
{
    private readonly IRulesetRepository _repository;
    private readonly IMediaAncestry _ancestry;

    // Rulesets by folder key for this resolver's lifetime (one request or background run): every image
    // in a run asks about the same few ancestor folders, and each question was a database query.
    private readonly Dictionary<Guid, Ruleset?> _byFolder = [];

    public RulesetResolver(IRulesetRepository repository, IMediaAncestry ancestry)
    {
        _repository = repository;
        _ancestry = ancestry;
    }

    public async Task<Ruleset?> ResolveForItemAsync(Guid mediaKey, CancellationToken cancellationToken = default)
    {
        foreach (var folderKey in _ancestry.GetAncestorOrSelfFolderKeys(mediaKey))
        {
            Ruleset? ruleset;
            lock (_byFolder)
            {
                _byFolder.TryGetValue(folderKey, out ruleset);
            }

            if (ruleset is null && !IsKnown(folderKey))
            {
                ruleset = await _repository.GetByScopeKeyAsync(folderKey, cancellationToken);
                lock (_byFolder)
                {
                    _byFolder[folderKey] = ruleset;
                }
            }

            if (ruleset is { Enabled: true })
            {
                return ruleset;
            }
        }

        return null;
    }

    private bool IsKnown(Guid folderKey)
    {
        lock (_byFolder)
        {
            return _byFolder.ContainsKey(folderKey);
        }
    }
}
