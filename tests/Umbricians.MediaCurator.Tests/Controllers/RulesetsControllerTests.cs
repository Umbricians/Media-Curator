using Microsoft.AspNetCore.Mvc;
using Umbricians.MediaCurator.Controllers;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Tests.Controllers;

public class RulesetsControllerTests
{
    private sealed class FakeRepository : IRulesetRepository
    {
        public readonly List<Ruleset> Saved = [];
        public readonly Dictionary<Guid, Ruleset> ByScope = [];

        public Task<Ruleset?> GetAsync(Guid key, CancellationToken ct = default)
            => Task.FromResult<Ruleset?>(null);

        public Task<Ruleset?> GetByScopeKeyAsync(Guid scopeRootKey, CancellationToken ct = default)
            => Task.FromResult(ByScope.GetValueOrDefault(scopeRootKey));

        public Task<IReadOnlyList<Ruleset>> GetAllAsync(CancellationToken ct = default)
            => Task.FromResult<IReadOnlyList<Ruleset>>(Saved);

        public Task SaveAsync(Ruleset ruleset, CancellationToken ct = default)
        {
            Saved.Add(ruleset);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid key, CancellationToken ct = default) => Task.CompletedTask;
    }

    private static RulesetsController Controller(FakeRepository repo)
        => new(repo, new CurationProviderCollection(() => [FakeProvider.Fixed("p.known", "x")]));

    private static RulesetModel ValidModel() => new()
    {
        ScopeRootKey = Guid.NewGuid(),
        Name = "Test",
        Rules = [new RuleNodeModel { ProviderAlias = "p.known" }],
    };

    [Fact]
    public async Task Save_rejects_missing_name()
    {
        var model = ValidModel();
        model.Name = " ";

        var result = await Controller(new FakeRepository()).SaveRuleset(model, CancellationToken.None);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task Save_rejects_empty_scope()
    {
        var model = ValidModel();
        model.ScopeRootKey = Guid.Empty;

        var result = await Controller(new FakeRepository()).SaveRuleset(model, CancellationToken.None);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task Save_rejects_unknown_provider_aliases_including_children()
    {
        var model = ValidModel();
        model.Rules[0].Children = [new RuleNodeModel { ProviderAlias = "p.unknown" }];

        var result = await Controller(new FakeRepository()).SaveRuleset(model, CancellationToken.None);

        var bad = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Contains("p.unknown", bad.Value!.ToString());
    }

    [Fact]
    public async Task Save_persists_valid_ruleset()
    {
        var repo = new FakeRepository();
        var model = ValidModel();

        var result = await Controller(repo).SaveRuleset(model, CancellationToken.None);

        Assert.IsType<OkObjectResult>(result);
        var saved = Assert.Single(repo.Saved);
        Assert.Equal(model.Name, saved.Name);
        Assert.NotEqual(Guid.Empty, saved.Key);
    }

    [Fact]
    public async Task Save_reuses_existing_key_for_same_scope()
    {
        var repo = new FakeRepository();
        var model = ValidModel();
        var existing = new Ruleset { Key = Guid.NewGuid(), ScopeRootKey = model.ScopeRootKey, Name = "old" };
        repo.ByScope[model.ScopeRootKey] = existing;

        await Controller(repo).SaveRuleset(model, CancellationToken.None);

        Assert.Equal(existing.Key, Assert.Single(repo.Saved).Key);
    }
}
