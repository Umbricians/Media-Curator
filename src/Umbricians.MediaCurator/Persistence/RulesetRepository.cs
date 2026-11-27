using Umbraco.Cms.Infrastructure.Scoping;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Persistence;

internal sealed class RulesetRepository : IRulesetRepository
{
    private readonly IScopeProvider _scopeProvider;
    private readonly TimeProvider _time;

    public RulesetRepository(IScopeProvider scopeProvider, TimeProvider time)
    {
        _scopeProvider = scopeProvider;
        _time = time;
    }

    public Task<Ruleset?> GetAsync(Guid key, CancellationToken cancellationToken = default)
    {
        using var scope = _scopeProvider.CreateScope(autoComplete: true);
        var dto = scope.Database.FirstOrDefault<RulesetDto>("WHERE [key] = @0", key);
        return Task.FromResult(Map(dto));
    }

    public Task<Ruleset?> GetByScopeKeyAsync(Guid scopeRootKey, CancellationToken cancellationToken = default)
    {
        using var scope = _scopeProvider.CreateScope(autoComplete: true);
        var dto = scope.Database.FirstOrDefault<RulesetDto>("WHERE [scopeRootKey] = @0", scopeRootKey);
        return Task.FromResult(Map(dto));
    }

    public Task<IReadOnlyList<Ruleset>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        using var scope = _scopeProvider.CreateScope(autoComplete: true);
        var dtos = scope.Database.Fetch<RulesetDto>("ORDER BY [name]");
        return Task.FromResult<IReadOnlyList<Ruleset>>(dtos.Select(d => Map(d)!).ToList());
    }

    public Task SaveAsync(Ruleset ruleset, CancellationToken cancellationToken = default)
    {
        ruleset.DateUpdated = _time.GetUtcNow().UtcDateTime;
        var dto = new RulesetDto
        {
            Key = ruleset.Key,
            ScopeRootKey = ruleset.ScopeRootKey,
            Name = ruleset.Name,
            CultureName = ruleset.CultureName,
            Enabled = ruleset.Enabled,
            RulesJson = RulesetSerializer.Serialize(ruleset.Rules),
            DateUpdated = ruleset.DateUpdated,
        };

        using var scope = _scopeProvider.CreateScope();
        var exists = scope.Database.Exists<RulesetDto>(dto.Key);
        if (exists)
        {
            scope.Database.Update(dto);
        }
        else
        {
            scope.Database.Insert(dto);
        }

        scope.Complete();
        return Task.CompletedTask;
    }

    public Task DeleteAsync(Guid key, CancellationToken cancellationToken = default)
    {
        using var scope = _scopeProvider.CreateScope();
        scope.Database.Delete<RulesetDto>(key);
        scope.Complete();
        return Task.CompletedTask;
    }

    private static Ruleset? Map(RulesetDto? dto)
        => dto is null
            ? null
            : new Ruleset
            {
                Key = dto.Key,
                ScopeRootKey = dto.ScopeRootKey,
                Name = dto.Name,
                CultureName = dto.CultureName,
                Enabled = dto.Enabled,
                Rules = RulesetSerializer.Deserialize(dto.RulesJson),
                DateUpdated = dto.DateUpdated,
            };
}
