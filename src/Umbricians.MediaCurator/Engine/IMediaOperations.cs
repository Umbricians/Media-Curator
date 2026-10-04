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

    /// <summary>The direct children of a folder, folders included (unlike <see cref="GetItems"/>).</summary>
    IReadOnlyList<MediaItemInfo> GetChildren(Guid folderKey);

    MediaItemInfo? GetItem(Guid mediaKey);

    /// <summary>Reads a string property value from the media item (null when absent).</summary>
    string? GetPropertyValue(Guid mediaKey, string propertyAlias);

    /// <summary>Writes a string property value on the media item and saves it. Throws when
    /// the property does not exist on the item's media type.</summary>
    void SetPropertyValue(Guid mediaKey, string propertyAlias, string value);

    /// <summary>Writes several string property values and saves the item at most once, and not at all
    /// when every value is already stored. Each save raises a "media saved" notification (and so can
    /// start a "Media Saved" automation), so writes that belong together go through here. Properties the
    /// item's media type lacks are skipped; returns the aliases the item has.</summary>
    IReadOnlySet<string> SetPropertyValues(Guid mediaKey, IReadOnlyDictionary<string, string> values)
    {
        var written = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        foreach (var (alias, value) in values)
        {
            if (string.Equals(GetPropertyValue(mediaKey, alias), value, StringComparison.Ordinal))
            {
                written.Add(alias);
                continue;
            }

            try
            {
                SetPropertyValue(mediaKey, alias, value);
                written.Add(alias);
            }
            catch (InvalidOperationException)
            {
                // The property is not on this media type (not provisioned).
            }
        }

        return written;
    }

    /// <summary>Every string property value of the item, loaded once (null when the implementation
    /// cannot, in which case callers read properties one at a time).</summary>
    IReadOnlyDictionary<string, string?>? GetPropertyValues(Guid mediaKey) => null;

    /// <summary>The key of the child folder named <paramref name="name"/> (case-insensitive, first
    /// match), or null. Implementations may remember each folder's child folders for their lifetime
    /// (one request or background run), so a folder of thousands of images is listed once, not once
    /// per image.</summary>
    Guid? FindChildFolder(Guid parentFolderKey, string name)
        => GetItems(parentFolderKey, recursive: false)
            .FirstOrDefault(i => i.IsFolder && i.Name.Equals(name, StringComparison.OrdinalIgnoreCase))?.Key;

    /// <summary>How many media items of the given types are below the folder, at any depth, without
    /// loading them.</summary>
    int CountDescendants(Guid folderKey, IReadOnlyCollection<string> contentTypeAliases)
        => GetItems(folderKey, recursive: true)
            .Count(i => contentTypeAliases.Contains(i.ContentTypeAlias, StringComparer.OrdinalIgnoreCase));

    /// <summary>Opens the media item's file for reading, or null when it has none.</summary>
    Stream? OpenFile(Guid mediaKey);

    /// <summary>Finds or creates (idempotently) the folder path under the parent and
    /// returns the key of the deepest folder.</summary>
    Guid EnsureFolderPath(Guid parentFolderKey, IReadOnlyList<string> segments);

    /// <summary>Moves the item to the target folder. No-op if already there.</summary>
    void Move(Guid mediaKey, Guid targetFolderKey);

    /// <summary>Sets the order of a folder's children to <paramref name="orderedChildKeys"/>. Children not
    /// listed keep their relative order after the listed ones. Changes sort order only — the items are
    /// not saved, so no "media saved" notifications (or automations listening for them) fire.</summary>
    void SortChildren(Guid folderKey, IReadOnlyList<Guid> orderedChildKeys);

    /// <summary>Moves the item (and anything below it) to the Recycle Bin. Recoverable.</summary>
    void MoveToRecycleBin(Guid mediaKey);

    /// <summary>Permanently deletes the item (and anything below it), bypassing the Recycle Bin.</summary>
    void Delete(Guid mediaKey);

    /// <summary>Moves an item out of the Recycle Bin back under the parent folder
    /// (<see cref="Guid.Empty"/> = the media root). No-op if it is already there.</summary>
    void RestoreFromRecycleBin(Guid mediaKey, Guid parentKey);
}
