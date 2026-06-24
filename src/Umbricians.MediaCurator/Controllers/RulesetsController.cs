using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "MediaCurator")]
public class RulesetsController : MediaCuratorApiControllerBase
{
    private readonly IRulesetRepository _repository;
    private readonly CurationProviderCollection _providers;

    public RulesetsController(IRulesetRepository repository, CurationProviderCollection providers)
    {
        _repository = repository;
        _providers = providers;
    }

    [HttpGet("rulesets")]
    [ProducesResponseType<List<RulesetModel>>(StatusCodes.Status200OK)]
    public async Task<List<RulesetModel>> GetRulesets(CancellationToken ct)
        => (await _repository.GetAllAsync(ct)).Select(RulesetModel.From).ToList();

    [HttpGet("rulesets/by-scope/{scopeRootKey:guid}")]
    [ProducesResponseType<RulesetModel>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetRulesetByScope(Guid scopeRootKey, CancellationToken ct)
    {
        var ruleset = await _repository.GetByScopeKeyAsync(scopeRootKey, ct);
        return ruleset is null ? NotFound() : Ok(RulesetModel.From(ruleset));
    }

    [HttpPut("rulesets")]
    [ProducesResponseType<RulesetModel>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> SaveRuleset(RulesetModel model, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(model.Name))
        {
            return BadRequest("Name is required.");
        }

        if (model.ScopeRootKey == Guid.Empty)
        {
            return BadRequest("ScopeRootKey is required.");
        }

        var unknown = CollectAliases(model.Rules)
            .Where(a => _providers.GetByAlias(a) is null)
            .Distinct()
            .ToList();
        if (unknown.Count > 0)
        {
            return BadRequest($"Unknown provider alias(es): {string.Join(", ", unknown)}.");
        }

        // One ruleset per scope folder: an existing ruleset on the same scope is updated.
        var existing = await _repository.GetByScopeKeyAsync(model.ScopeRootKey, ct);
        var ruleset = model.ToRuleset();
        if (existing is not null && existing.Key != ruleset.Key)
        {
            ruleset.Key = existing.Key;
        }

        await _repository.SaveAsync(ruleset, ct);
        return Ok(RulesetModel.From(ruleset));
    }

    [HttpDelete("rulesets/{key:guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DeleteRuleset(Guid key, CancellationToken ct)
    {
        await _repository.DeleteAsync(key, ct);
        return Ok();
    }

    private static IEnumerable<string> CollectAliases(IEnumerable<RuleNodeModel> nodes)
        => nodes.SelectMany(n => new[] { n.ProviderAlias }.Concat(CollectAliases(n.Children)));
}
