using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Tests.Rules;

public class RulesetResolverTests
{
    private sealed class FakeRepository : IRulesetRepository
    {
        private readonly Dictionary<Guid, Ruleset> _byScope = [];

        public void Add(Ruleset ruleset) => _byScope[ruleset.ScopeRootKey] = ruleset;

        public Task<Ruleset?> GetAsync(Guid key, CancellationToken ct = default)
            => Task.FromResult(_byScope.Values.FirstOrDefault(r => r.Key == key));

        public Task<Ruleset?> GetByScopeKeyAsync(Guid scopeRootKey, CancellationToken ct = default)
            => Task.FromResult(_byScope.GetValueOrDefault(scopeRootKey));

        public Task<IReadOnlyList<Ruleset>> GetAllAsync(CancellationToken ct = default)
            => Task.FromResult<IReadOnlyList<Ruleset>>(_byScope.Values.ToList());

        public Task SaveAsync(Ruleset ruleset, CancellationToken ct = default) => Task.CompletedTask;

        public Task DeleteAsync(Guid key, CancellationToken ct = default) => Task.CompletedTask;
    }

    private sealed class FakeAncestry : Dictionary<Guid, IReadOnlyList<Guid>>, IMediaAncestry
    {
        public IReadOnlyList<Guid> GetAncestorOrSelfFolderKeys(Guid mediaKey)
            => TryGetValue(mediaKey, out var keys) ? keys : [];
    }

    private static Ruleset RulesetFor(Guid scope, bool enabled = true, string name = "rs")
        => new() { ScopeRootKey = scope, Name = name, Enabled = enabled };

    [Test]
    public async Task Nearest_ancestor_ruleset_wins()
    {
        var item = Guid.NewGuid();
        var clearance = Guid.NewGuid(); // parent
        var products = Guid.NewGuid();  // grandparent

        var repo = new FakeRepository();
        repo.Add(RulesetFor(products, name: "A"));
        repo.Add(RulesetFor(clearance, name: "B"));
        var ancestry = new FakeAncestry { [item] = [clearance, products] };

        var resolved = await new RulesetResolver(repo, ancestry).ResolveForItemAsync(item);

        Assert.That(resolved!.Name, Is.EqualTo("B"));
    }

    [Test]
    public async Task Disabled_rulesets_are_passed_over_for_an_enabled_ancestor()
    {
        var item = Guid.NewGuid();
        var parent = Guid.NewGuid();
        var grandparent = Guid.NewGuid();

        var repo = new FakeRepository();
        repo.Add(RulesetFor(parent, enabled: false, name: "disabled"));
        repo.Add(RulesetFor(grandparent, name: "active"));
        var ancestry = new FakeAncestry { [item] = [parent, grandparent] };

        var resolved = await new RulesetResolver(repo, ancestry).ResolveForItemAsync(item);

        Assert.That(resolved!.Name, Is.EqualTo("active"));
    }

    [Test]
    public async Task Null_when_no_ancestor_has_a_ruleset()
    {
        var item = Guid.NewGuid();
        var ancestry = new FakeAncestry { [item] = [Guid.NewGuid()] };

        var resolved = await new RulesetResolver(new FakeRepository(), ancestry).ResolveForItemAsync(item);

        Assert.That(resolved, Is.Null);
    }
}
