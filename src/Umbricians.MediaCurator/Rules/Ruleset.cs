namespace Umbricians.MediaCurator.Rules;

/// <summary>
/// A ruleset attached to a media folder (the "scope root"). Governs everything beneath that
/// folder unless a descendant folder defines its own ruleset (nearest-ancestor-wins, §4.1).
/// </summary>
public sealed class Ruleset
{
    public Guid Key { get; set; } = Guid.NewGuid();

    /// <summary>The media folder this ruleset is attached to.</summary>
    public required Guid ScopeRootKey { get; set; }

    public required string Name { get; set; }

    /// <summary>Culture used for generated folder names (null = site default culture, §10).</summary>
    public string? CultureName { get; set; }

    public bool Enabled { get; set; } = true;

    public List<RuleNode> Rules { get; set; } = [];

    public DateTime DateUpdated { get; set; }
}
