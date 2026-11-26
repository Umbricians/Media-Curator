using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Web.Common.Authorization;
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
            => Task.FromResult(ByScope.Values.FirstOrDefault(r => r.Key == key));

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
        Assert.Contains("p.unknown", Assert.IsType<ProblemDetails>(bad.Value).Title);
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
    public async Task Save_updates_existing_ruleset_with_same_key()
    {
        var repo = new FakeRepository();
        var model = ValidModel();
        var existing = new Ruleset { Key = Guid.NewGuid(), ScopeRootKey = model.ScopeRootKey, Name = "old" };
        repo.ByScope[model.ScopeRootKey] = existing;
        model.Key = existing.Key;

        var result = await Controller(repo).SaveRuleset(model, CancellationToken.None);

        Assert.IsType<OkObjectResult>(result);
        var saved = Assert.Single(repo.Saved);
        Assert.Equal(existing.Key, saved.Key);
        Assert.Equal(model.Name, saved.Name);
    }

    [Fact]
    public async Task Save_keeps_supplied_key_on_free_folder()
    {
        var repo = new FakeRepository();
        var model = ValidModel();
        model.Key = Guid.NewGuid();

        var result = await Controller(repo).SaveRuleset(model, CancellationToken.None);

        Assert.IsType<OkObjectResult>(result);
        Assert.Equal(model.Key, Assert.Single(repo.Saved).Key);
    }

    [Fact]
    public async Task Save_returns_conflict_when_folder_used_by_different_ruleset()
    {
        var repo = new FakeRepository();
        var model = ValidModel();
        model.Key = Guid.NewGuid();
        var existing = new Ruleset { Key = Guid.NewGuid(), ScopeRootKey = model.ScopeRootKey, Name = "Existing" };
        repo.ByScope[model.ScopeRootKey] = existing;

        var result = await Controller(repo).SaveRuleset(model, CancellationToken.None);

        var conflict = Assert.IsType<ConflictObjectResult>(result);
        Assert.Equal(
            "The folder is already curated by the ruleset \"Existing\". Each folder can have only one ruleset.",
            Assert.IsType<ProblemDetails>(conflict.Value).Title);
        Assert.Empty(repo.Saved);
        Assert.Equal("Existing", repo.ByScope[model.ScopeRootKey].Name);
    }

    [Fact]
    public async Task Save_returns_conflict_when_new_ruleset_has_no_key_and_folder_used()
    {
        var repo = new FakeRepository();
        var model = ValidModel();
        repo.ByScope[model.ScopeRootKey] = new Ruleset { Key = Guid.NewGuid(), ScopeRootKey = model.ScopeRootKey, Name = "Existing" };

        var result = await Controller(repo).SaveRuleset(model, CancellationToken.None);

        Assert.IsType<ConflictObjectResult>(result);
        Assert.Empty(repo.Saved);
    }

    [Fact]
    public async Task Get_returns_ruleset_by_key()
    {
        var repo = new FakeRepository();
        var scope = Guid.NewGuid();
        var existing = new Ruleset { Key = Guid.NewGuid(), ScopeRootKey = scope, Name = "Found" };
        repo.ByScope[scope] = existing;

        var result = await Controller(repo).GetRuleset(existing.Key, CancellationToken.None);

        var ok = Assert.IsType<OkObjectResult>(result);
        Assert.Equal("Found", Assert.IsType<RulesetModel>(ok.Value).Name);
    }

    [Fact]
    public async Task Get_returns_not_found_for_unknown_key()
    {
        var result = await Controller(new FakeRepository()).GetRuleset(Guid.NewGuid(), CancellationToken.None);

        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public void Api_controllers_require_settings_section_access()
    {
        var controllers = typeof(MediaCuratorControllerBase).Assembly.GetTypes()
            .Where(t => t is { IsClass: true, IsAbstract: false } && typeof(MediaCuratorControllerBase).IsAssignableFrom(t))
            .ToList();

        Assert.NotEmpty(controllers);
        Assert.All(controllers, controller => Assert.Contains(
            controller.GetCustomAttributes(typeof(AuthorizeAttribute), inherit: false).Cast<AuthorizeAttribute>(),
            authorize => authorize.Policy == AuthorizationPolicies.SectionAccessSettings));
    }

    [Fact]
    public void Api_controllers_require_a_signed_in_backoffice_user()
    {
        var authorize = typeof(MediaCuratorControllerBase)
            .GetCustomAttributes(typeof(AuthorizeAttribute), inherit: false)
            .Cast<AuthorizeAttribute>()
            .Single();

        Assert.Equal(AuthorizationPolicies.BackOfficeAccess, authorize.Policy);
    }
}
