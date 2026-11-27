namespace Umbricians.MediaCurator.Rules;

/// <summary>
/// A ruleset attached to a media folder (the "scope root"). Governs everything beneath that
/// folder unless a descendant folder defines its own ruleset (nearest-ancestor-wins, §4.1).
/// </summary>
public sealed class Ruleset
{
    /// <summary>The ruleset's unique key.</summary>
    public Guid Key { get; set; } = Guid.NewGuid();

    /// <summary>The media folder this ruleset is attached to.</summary>
    public required Guid ScopeRootKey { get; set; }

    /// <summary>The name editors see.</summary>
    public required string Name { get; set; }

    /// <summary>Culture used for generated folder names (null = site default culture, §10).</summary>
    public string? CultureName { get; set; }

    /// <summary>Whether the ruleset applies; a disabled one is skipped when finding the nearest ruleset.</summary>
    public bool Enabled { get; set; } = true;

    /// <summary>The top-level rules, applied in order.</summary>
    public List<RuleNode> Rules { get; set; } = [];

    /// <summary>When the ruleset was last saved.</summary>
    public DateTime DateUpdated { get; set; }
}
