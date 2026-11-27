namespace Umbricians.MediaCurator.Rules;

internal interface IRulesetRepository
{
    Task<Ruleset?> GetAsync(Guid key, CancellationToken cancellationToken = default);

    Task<Ruleset?> GetByScopeKeyAsync(Guid scopeRootKey, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Ruleset>> GetAllAsync(CancellationToken cancellationToken = default);

    Task SaveAsync(Ruleset ruleset, CancellationToken cancellationToken = default);

    Task DeleteAsync(Guid key, CancellationToken cancellationToken = default);
}
