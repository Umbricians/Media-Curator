using System.Text.Json;
using System.Text.Json.Serialization;
using Umbricians.MediaCurator.Persistence;

namespace Umbricians.MediaCurator.Rules;

/// <summary>One ruleset in the transfer document. Scope folders are referenced by key, which
/// is stable across environments when media flows through uSync/Deploy (§13).</summary>
public sealed class RulesetTransferModel
{
    public Guid Key { get; set; }
    public Guid ScopeRootKey { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? CultureName { get; set; }
    public bool Enabled { get; set; }
    public string RulesJson { get; set; } = "[]";
}

public interface IRulesetTransferService
{
    /// <summary>Exports all rulesets as a configuration-friendly JSON document.</summary>
    Task<string> ExportAsync(CancellationToken cancellationToken = default);

    /// <summary>Imports rulesets from an export document (upsert by scope key).
    /// Returns the number of rulesets imported.</summary>
    Task<int> ImportAsync(string json, CancellationToken cancellationToken = default);
}

/// <summary>
/// Environment portability for rulesets (§13): a JSON export/import that uSync or Deploy
/// integrations can wrap. (Activity log and exclusions remain environment-local.)
/// </summary>
internal sealed class RulesetTransferService : IRulesetTransferService
{
    private static readonly JsonSerializerOptions _json = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        PropertyNameCaseInsensitive = true,
        WriteIndented = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    };

    private readonly IRulesetRepository _repository;
    private readonly Core.CurationProviderCollection _providers;

    public RulesetTransferService(IRulesetRepository repository, Core.CurationProviderCollection providers)
    {
        _repository = repository;
        _providers = providers;
    }

    public async Task<string> ExportAsync(CancellationToken cancellationToken = default)
    {
        var rulesets = await _repository.GetAllAsync(cancellationToken);
        var models = rulesets.Select(r => new RulesetTransferModel
        {
            Key = r.Key,
            ScopeRootKey = r.ScopeRootKey,
            Name = r.Name,
            CultureName = r.CultureName,
            Enabled = r.Enabled,
            RulesJson = RulesetSerializer.Serialize(r.Rules),
        });
        return JsonSerializer.Serialize(models, _json);
    }

    public async Task<int> ImportAsync(string json, CancellationToken cancellationToken = default)
    {
        var models = JsonSerializer.Deserialize<List<RulesetTransferModel>>(json, _json) ?? [];
        var count = 0;
        foreach (var model in models)
        {
            if (model.ScopeRootKey == Guid.Empty || string.IsNullOrWhiteSpace(model.Name))
            {
                continue;
            }

            var rules = RulesetSerializer.Deserialize(model.RulesJson);
            var unknown = CollectAliases(rules)
                .Where(a => _providers.GetByAlias(a) is null)
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToList();
            if (unknown.Count > 0)
            {
                throw new InvalidOperationException(
                    $"Ruleset '{model.Name}' references unknown provider alias(es): {string.Join(", ", unknown)}.");
            }

            var existing = await _repository.GetByScopeKeyAsync(model.ScopeRootKey, cancellationToken);
            var ruleset = new Ruleset
            {
                Key = existing?.Key ?? (model.Key == Guid.Empty ? Guid.NewGuid() : model.Key),
                ScopeRootKey = model.ScopeRootKey,
                Name = model.Name,
                CultureName = model.CultureName,
                Enabled = model.Enabled,
                Rules = rules,
            };
            await _repository.SaveAsync(ruleset, cancellationToken);
            count++;
        }

        return count;
    }

    private static IEnumerable<string> CollectAliases(IEnumerable<RuleNode> nodes)
        => nodes.SelectMany(n => new[] { n.ProviderAlias }.Concat(CollectAliases(n.Children)));
}
