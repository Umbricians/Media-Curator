using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbricians.MediaCurator.Controllers.ViewModels;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "Media Curator")]
internal class RulesetsController : MediaCuratorApiControllerBase
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

    [HttpGet("rulesets/{key:guid}")]
    [ProducesResponseType<RulesetModel>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetRuleset(Guid key, CancellationToken ct)
    {
        var ruleset = await _repository.GetAsync(key, ct);
        return ruleset is null ? NotFound() : Ok(RulesetModel.From(ruleset));
    }

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
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> SaveRuleset(RulesetModel model, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(model.Name))
        {
            return BadRequest(SaveError("Name is required."));
        }

        if (model.ScopeRootKey == Guid.Empty)
        {
            return BadRequest(SaveError("Choose a scope folder for the ruleset."));
        }

        var unknown = CollectAliases(model.Rules)
            .Where(a => _providers.GetByAlias(a) is null)
            .Distinct()
            .ToList();
        if (unknown.Count > 0)
        {
            return BadRequest(SaveError($"Unknown provider alias(es): {string.Join(", ", unknown)}."));
        }

        // One ruleset per scope folder: a different ruleset already on this folder is a conflict.
        var existing = await _repository.GetByScopeKeyAsync(model.ScopeRootKey, ct);
        var ruleset = model.ToRuleset();
        if (existing is not null && existing.Key != ruleset.Key)
        {
            return Conflict(SaveError(
                $"The folder is already curated by the ruleset \"{existing.Name}\". Each folder can have only one ruleset."));
        }

        await _repository.SaveAsync(ruleset, ct);
        return Ok(RulesetModel.From(ruleset));
    }

    // The backoffice shows a problem's title in its error notification, so the reason goes there.
    // It only treats the body as problem details when "type" is present.
    private static ProblemDetails SaveError(string message) => new() { Title = message, Type = "Error" };

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
