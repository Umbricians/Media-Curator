namespace Umbricians.MediaCurator.Engine;

/// <summary>A media item as the engine sees it.</summary>
public sealed record MediaItemInfo(
    Guid Key,
    string Name,
    string ContentTypeAlias,
    Guid ParentKey,
    DateTime CreateDate,
    DateTime UpdateDate,
    bool IsFolder);

/// <summary>
/// Thin facade over Umbraco's media service so the curation engine is unit-testable.
/// All moves go through IMediaService, preserving keys/UDIs and content references (§13).
/// </summary>
public interface IMediaOperations
{
    /// <summary>Items under the scope folder (folders excluded), optionally recursive.</summary>
    IReadOnlyList<MediaItemInfo> GetItems(Guid scopeFolderKey, bool recursive);

    MediaItemInfo? GetItem(Guid mediaKey);

    /// <summary>Reads a string property value from the media item (null when absent).</summary>
    string? GetPropertyValue(Guid mediaKey, string propertyAlias);

    /// <summary>Writes a string property value on the media item and saves it. Throws when
    /// the property does not exist on the item's media type.</summary>
    void SetPropertyValue(Guid mediaKey, string propertyAlias, string value);

    /// <summary>Opens the media item's file for reading, or null when it has none.</summary>
    Stream? OpenFile(Guid mediaKey);

    /// <summary>Finds or creates (idempotently) the folder path under the parent and
    /// returns the key of the deepest folder.</summary>
    Guid EnsureFolderPath(Guid parentFolderKey, IReadOnlyList<string> segments);

    /// <summary>Moves the item to the target folder. No-op if already there.</summary>
    void Move(Guid mediaKey, Guid targetFolderKey);
}
