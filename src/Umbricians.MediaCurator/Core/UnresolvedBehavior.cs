namespace Umbricians.MediaCurator.Core;

/// <summary>
/// What happens when a rule cannot resolve a value for an item (§4.2 of the scope document).
/// </summary>
public enum UnresolvedBehavior
{
    /// <summary>Contribute no folder level and continue with child rules.</summary>
    Skip,

    /// <summary>Route the item into an "Unsorted" segment at this level, then continue.</summary>
    Unsorted,

    /// <summary>Stop the chain entirely and leave the item where it is.</summary>
    Stop,
}
