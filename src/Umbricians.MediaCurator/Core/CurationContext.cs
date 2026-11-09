using System.Globalization;
using System.Text.Json.Nodes;

namespace Umbricians.MediaCurator.Core;

/// <summary>The outcome of a single rule in the chain, available to descendant rules.</summary>
public sealed record RuleOutcome(string ProviderAlias, string? ResolvedValue);

/// <summary>Read access to property values on the media item (provisioned or pre-existing).</summary>
public interface IPropertyAccessor
{
    string? GetString(string alias);
}

/// <summary>An empty <see cref="IPropertyAccessor"/> for items without property data.</summary>
internal sealed class EmptyPropertyAccessor : IPropertyAccessor
{
    public static readonly EmptyPropertyAccessor Instance = new();
    public string? GetString(string alias) => null;
}

/// <summary>
/// Everything a provider gets when resolving an item. Extended in later milestones with
/// EXIF data, AI tags, and a file stream accessor.
/// </summary>
public sealed record CurationContext
{
    public required Guid MediaKey { get; init; }

    public required string MediaName { get; init; }

    public DateTime CreateDate { get; init; }

    public DateTime UpdateDate { get; init; }

    /// <summary>The culture folder names are generated against (configured per ruleset, §10).</summary>
    public required CultureInfo Culture { get; init; }

    /// <summary>The folder the active ruleset is attached to.</summary>
    public Guid ScopeRootKey { get; init; }

    /// <summary>The current rule's user-configured settings.</summary>
    public JsonObject Settings { get; init; } = new();

    /// <summary>Outcomes of ancestor rules in the chain, nearest last.</summary>
    public IReadOnlyList<RuleOutcome> ParentOutcomes { get; init; } = [];

    public IPropertyAccessor Properties { get; init; } = EmptyPropertyAccessor.Instance;

    /// <summary>Parsed EXIF values for the image (tag name → value), or null when
    /// unavailable. Populated by the curation engine via <c>IExifReader</c>.</summary>
    public IReadOnlyDictionary<string, string>? Exif { get; init; }

    /// <summary>Lazy AI recognition for the item (cached per image, §8). The optional scheme
    /// alias requests a classification code suggestion. Null when the engine has no recognition
    /// service wired; providers must handle a null result.</summary>
    public Func<string?, CancellationToken, Task<Recognition.RecognitionResult?>>? RecognizeAsync { get; init; }

    /// <summary>Brings the item's AI-chosen classification code (for the given scheme) up to date with how
    /// codes are chosen now, from its saved description: never re-sends the image and never changes a code
    /// an editor entered. Null when the engine has no recognition service wired.</summary>
    public Func<string, CancellationToken, Task<Recognition.RecognitionResult?>>? RefreshClassificationAsync { get; init; }

    /// <summary>Opens the item's file for reading (caller disposes), or null when the item
    /// has no file. Wired by the engine for providers that analyze pixels (e.g. Color).</summary>
    public Func<Stream?>? OpenFile { get; init; }

    /// <summary>Convenience accessor for a string setting with a default.</summary>
    public string GetSetting(string key, string defaultValue)
        => Settings[key]?.GetValue<string>() is { Length: > 0 } v ? v : defaultValue;
}
