using Umbraco.Cms.Core;
using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.Entities;
using Umbraco.Cms.Core.Serialization;
using Umbraco.Cms.Core.Services;

namespace Umbricians.MediaCurator.Engine;

internal sealed class UmbracoMediaOperations : IMediaOperations
{
    private const string FolderTypeAlias = global::Umbraco.Cms.Core.Constants.Conventions.MediaTypes.Folder;

    private readonly IMediaService _mediaService;
    private readonly IEntityService _entityService;
    private readonly MediaFileManager _mediaFileManager;
    private readonly IJsonSerializer _jsonSerializer;
    private readonly IMediaChangeTracker? _changes;

    // Child folders by parent folder key (name -> key, first match wins), for this instance's lifetime:
    // one request or background run. Planning and moving look up a target folder per image, and listing a
    // flat folder of thousands of images each time made a run quadratic in the folder's size.
    private readonly Dictionary<Guid, Dictionary<string, Guid>> _childFolders = [];

    // Defensive lock for simultaneous runs racing to create the same folder (§13).
    // Process-local; load-balanced setups elect a single worker for background runs.
    private static readonly object _folderCreationLock = new();

    public UmbracoMediaOperations(
        IMediaService mediaService,
        IEntityService entityService,
        MediaFileManager mediaFileManager,
        IJsonSerializer jsonSerializer,
        IMediaChangeTracker? changes = null)
    {
        _changes = changes;
        _mediaService = mediaService;
        _entityService = entityService;
        _mediaFileManager = mediaFileManager;
        _jsonSerializer = jsonSerializer;
    }

    public IReadOnlyList<MediaItemInfo> GetItems(Guid scopeFolderKey, bool recursive)
    {
        var parent = _mediaService.GetById(scopeFolderKey);
        if (parent is null)
        {
            return [];
        }

        var items = new List<MediaItemInfo>();
        CollectChildren(parent, recursive, items);
        return items;
    }

    private void CollectChildren(IMedia parent, bool recursive, List<MediaItemInfo> into)
    {
        const int pageSize = 500;
        long page = 0;
        long total;
        do
        {
            var children = _mediaService.GetPagedChildren(parent.Id, page, pageSize, out total).ToList();
            foreach (var child in children)
            {
                into.Add(Map(child));
                if (recursive && child.ContentType.Alias == FolderTypeAlias)
                {
                    CollectChildren(child, recursive, into);
                }
            }

            page++;
        } while ((page * pageSize) < total);
    }

    public IReadOnlyList<MediaItemInfo> GetChildren(Guid folderKey)
    {
        var parent = _mediaService.GetById(folderKey);
        if (parent is null)
        {
            return [];
        }

        const int pageSize = 500;
        var items = new List<MediaItemInfo>();
        long page = 0;
        long total;
        do
        {
            items.AddRange(_mediaService.GetPagedChildren(parent.Id, page, pageSize, out total).Select(Map));
            page++;
        } while ((page * pageSize) < total);

        return items;
    }

    public MediaItemInfo? GetItem(Guid mediaKey)
    {
        var media = _mediaService.GetById(mediaKey);
        return media is null ? null : Map(media);
    }

    public string? GetPropertyValue(Guid mediaKey, string propertyAlias)
    {
        var media = _mediaService.GetById(mediaKey);
        return media?.HasProperty(propertyAlias) is true ? media.GetValue<string>(propertyAlias) : null;
    }

    public void SetPropertyValue(Guid mediaKey, string propertyAlias, string value)
    {
        var media = _mediaService.GetById(mediaKey)
            ?? throw new InvalidOperationException($"Media '{mediaKey}' not found.");
        if (!media.HasProperty(propertyAlias))
        {
            throw new InvalidOperationException($"Media type '{media.ContentType.Alias}' has no property '{propertyAlias}'.");
        }

        media.SetValue(propertyAlias, value);
        _mediaService.Save(media);
    }

    public IReadOnlySet<string> SetPropertyValues(Guid mediaKey, IReadOnlyDictionary<string, string> values)
    {
        var media = _mediaService.GetById(mediaKey)
            ?? throw new InvalidOperationException($"Media '{mediaKey}' not found.");
        var present = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var changed = false;
        foreach (var (alias, value) in values)
        {
            if (!media.HasProperty(alias))
            {
                continue;
            }

            present.Add(alias);
            if (!string.Equals(media.GetValue<string>(alias), value, StringComparison.Ordinal))
            {
                media.SetValue(alias, value);
                changed = true;
            }
        }

        if (changed)
        {
            _mediaService.Save(media);
        }

        return present;
    }

    public IReadOnlyDictionary<string, string?>? GetPropertyValues(Guid mediaKey)
    {
        var media = _mediaService.GetById(mediaKey);
        return media?.Properties.ToDictionary(
            p => p.Alias,
            p => media.GetValue<string>(p.Alias),
            StringComparer.OrdinalIgnoreCase);
    }

    public Guid? FindChildFolder(Guid parentFolderKey, string name)
    {
        lock (_childFolders)
        {
            return ChildFoldersOf(parentFolderKey).TryGetValue(name, out var key) ? key : null;
        }
    }

    public int CountDescendants(Guid folderKey, IReadOnlyCollection<string> contentTypeAliases)
    {
        var folder = _mediaService.GetById(folderKey);
        return folder is null ? 0 : contentTypeAliases.Sum(alias => _mediaService.CountDescendants(folder.Id, alias));
    }

    private Dictionary<string, Guid> ChildFoldersOf(Guid parentFolderKey)
    {
        if (!_childFolders.TryGetValue(parentFolderKey, out var folders))
        {
            folders = new Dictionary<string, Guid>(StringComparer.OrdinalIgnoreCase);
            foreach (var child in _entityService.GetChildren(parentFolderKey, UmbracoObjectTypes.Media))
            {
                if (child is IContentEntitySlim { ContentTypeAlias: FolderTypeAlias } && child.Name is { } childName)
                {
                    folders.TryAdd(childName, child.Key);
                }
            }

            _childFolders[parentFolderKey] = folders;
        }

        return folders;
    }

    /// <summary>A folder was moved, trashed or deleted: forget the remembered child folders.</summary>
    private void ForgetChildFolders()
    {
        lock (_childFolders)
        {
            _childFolders.Clear();
        }
    }

    public Stream? OpenFile(Guid mediaKey)
    {
        var media = _mediaService.GetById(mediaKey);
        if (media is null)
        {
            return null;
        }

        var path = GetFilePath(media);
        if (string.IsNullOrWhiteSpace(path) || !_mediaFileManager.FileSystem.FileExists(path))
        {
            return null;
        }

        return _mediaFileManager.FileSystem.OpenFile(path);
    }

    private string? GetFilePath(IMedia media)
    {
        var value = media.GetValue<string>(global::Umbraco.Cms.Core.Constants.Conventions.Media.File);
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        // The umbracoFile property is either a raw path or an ImageCropper JSON value.
        if (value.TrimStart().StartsWith('{'))
        {
            try
            {
                var cropper = _jsonSerializer.Deserialize<ImageCropperValue>(value);
                return cropper?.Src;
            }
            catch
            {
                return null;
            }
        }

        return value;
    }

    private sealed class ImageCropperValue
    {
        public string? Src { get; set; }
    }

    public Guid EnsureFolderPath(Guid parentFolderKey, IReadOnlyList<string> segments)
    {
        lock (_folderCreationLock)
        {
            var parent = _mediaService.GetById(parentFolderKey)
                ?? throw new InvalidOperationException($"Folder '{parentFolderKey}' not found.");

            var (parentKey, parentId) = (parent.Key, parent.Id);
            foreach (var segment in segments)
            {
                if (FindChildFolder(parentKey, segment) is { } existingKey)
                {
                    parentId = _entityService.GetId(existingKey, UmbracoObjectTypes.Media).Result;
                    parentKey = existingKey;
                    continue;
                }

                var created = _mediaService.CreateMedia(segment, parentId, FolderTypeAlias);
                _mediaService.Save(created);
                _changes?.FolderChanged(parentKey);
                lock (_childFolders)
                {
                    ChildFoldersOf(parentKey).TryAdd(segment, created.Key);
                }

                (parentKey, parentId) = (created.Key, created.Id);
            }

            return parentKey;
        }
    }

    public void Move(Guid mediaKey, Guid targetFolderKey)
    {
        var media = _mediaService.GetById(mediaKey)
            ?? throw new InvalidOperationException($"Media '{mediaKey}' not found.");
        var target = _mediaService.GetById(targetFolderKey)
            ?? throw new InvalidOperationException($"Target folder '{targetFolderKey}' not found.");

        if (media.ParentId == target.Id)
        {
            return;
        }

        var fromParent = ParentKeyOf(media);
        _mediaService.Move(media, target.Id);
        if (media.ContentType.Alias == FolderTypeAlias)
        {
            ForgetChildFolders();
        }

        _changes?.FolderChanged(fromParent);
        _changes?.FolderChanged(target.Key);
    }

    public void SortChildren(Guid folderKey, IReadOnlyList<Guid> orderedChildKeys)
    {
        var parent = _mediaService.GetById(folderKey)
            ?? throw new InvalidOperationException($"Folder '{folderKey}' not found.");

        // Current children in their current order, so any not listed (e.g. added meanwhile) keep
        // their relative order after the listed ones.
        const int pageSize = 500;
        var current = new List<(Guid Key, int Id)>();
        long page = 0;
        long total;
        do
        {
            current.AddRange(_mediaService.GetPagedChildren(parent.Id, page, pageSize, out total).Select(c => (c.Key, c.Id)));
            page++;
        } while ((page * pageSize) < total);

        var idByKey = current.ToDictionary(c => c.Key, c => c.Id);
        var listed = orderedChildKeys.Where(idByKey.ContainsKey).Distinct().ToList();
        var listedSet = listed.ToHashSet();
        var orderedIds = listed.Select(k => idByKey[k])
            .Concat(current.Where(c => !listedSet.Contains(c.Key)).Select(c => c.Id))
            .ToList();

        // SortChildren, NOT IMediaService.Sort(items): Sort saves every item and publishes a
        // MediaSavedNotification for each, which would re-trigger "Media Saved" automations (and
        // their AI calls) for every image in the folder. SortChildren only persists the sort order
        // and publishes a single MediaTreeChangeNotification.
        var result = _mediaService.SortChildren(parent.Id, orderedIds);
        if (!result.Success)
        {
            throw new InvalidOperationException($"The children of folder '{folderKey}' could not be sorted.");
        }

        _changes?.FolderChanged(folderKey);
    }

    public void MoveToRecycleBin(Guid mediaKey)
    {
        var media = _mediaService.GetById(mediaKey)
            ?? throw new InvalidOperationException($"Media '{mediaKey}' not found.");
        var parentKey = ParentKeyOf(media);
        var result = _mediaService.MoveToRecycleBin(media);
        ForgetChildFolders();
        if (!result.Success)
        {
            throw new InvalidOperationException($"Media '{mediaKey}' could not be moved to the Recycle Bin.");
        }

        _changes?.FolderChanged(parentKey);
    }

    public void Delete(Guid mediaKey)
    {
        var media = _mediaService.GetById(mediaKey)
            ?? throw new InvalidOperationException($"Media '{mediaKey}' not found.");
        var parentKey = ParentKeyOf(media);
        var result = _mediaService.Delete(media);
        ForgetChildFolders();
        if (!result.Success)
        {
            throw new InvalidOperationException($"Media '{mediaKey}' could not be deleted.");
        }

        _changes?.FolderChanged(parentKey);
    }

    public void RestoreFromRecycleBin(Guid mediaKey, Guid parentKey)
    {
        var media = _mediaService.GetById(mediaKey)
            ?? throw new InvalidOperationException($"Media '{mediaKey}' not found.");

        var parentId = global::Umbraco.Cms.Core.Constants.System.Root;
        if (parentKey != Guid.Empty)
        {
            parentId = (_mediaService.GetById(parentKey)
                ?? throw new InvalidOperationException($"Parent folder '{parentKey}' not found.")).Id;
        }

        if (media.ParentId == parentId && !media.Trashed)
        {
            return;
        }

        // Moving a trashed item to a normal parent is how Umbraco restores it from the bin.
        var result = _mediaService.Move(media, parentId);
        ForgetChildFolders();
        if (!result.Success)
        {
            throw new InvalidOperationException($"Media '{mediaKey}' could not be restored from the Recycle Bin.");
        }

        _changes?.FolderChanged(parentKey);
    }

    /// <summary>The key of the item's parent folder; <see cref="Guid.Empty"/> for the media root.</summary>
    private Guid ParentKeyOf(IMedia media)
    {
        if (media.ParentId <= 0)
        {
            return Guid.Empty;
        }

        var attempt = _entityService.GetKey(media.ParentId, UmbracoObjectTypes.Media);
        return attempt.Success ? attempt.Result : Guid.Empty;
    }

    private MediaItemInfo Map(IMedia media)
    {
        // ParentId -1 is the media root; represented as Guid.Empty.
        var parentKey = Guid.Empty;
        if (media.ParentId > 0)
        {
            var attempt = _entityService.GetKey(media.ParentId, UmbracoObjectTypes.Media);
            if (attempt.Success)
            {
                parentKey = attempt.Result;
            }
        }

        return new MediaItemInfo(
            media.Key,
            media.Name ?? string.Empty,
            media.ContentType.Alias,
            parentKey,
            media.CreateDate,
            media.UpdateDate,
            media.ContentType.Alias == FolderTypeAlias);
    }
}
