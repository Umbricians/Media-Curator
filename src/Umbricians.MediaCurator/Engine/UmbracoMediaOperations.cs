using Umbraco.Cms.Core;
using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.Models;
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

    // Defensive lock for simultaneous runs racing to create the same folder (§13).
    // Process-local; load-balanced setups elect a single worker for background runs.
    private static readonly object _folderCreationLock = new();

    public UmbracoMediaOperations(
        IMediaService mediaService,
        IEntityService entityService,
        MediaFileManager mediaFileManager,
        IJsonSerializer jsonSerializer)
    {
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

            foreach (var segment in segments)
            {
                var existing = FindChildFolder(parent, segment);
                if (existing is null)
                {
                    existing = _mediaService.CreateMedia(segment, parent.Id, FolderTypeAlias);
                    _mediaService.Save(existing);
                }

                parent = existing;
            }

            return parent.Key;
        }
    }

    private IMedia? FindChildFolder(IMedia parent, string name)
    {
        const int pageSize = 500;
        long page = 0;
        long total;
        do
        {
            var children = _mediaService.GetPagedChildren(parent.Id, page, pageSize, out total);
            var match = children.FirstOrDefault(c =>
                c.ContentType.Alias == FolderTypeAlias
                && c.Name?.Equals(name, StringComparison.OrdinalIgnoreCase) is true);
            if (match is not null)
            {
                return match;
            }

            page++;
        } while ((page * pageSize) < total);

        return null;
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

        _mediaService.Move(media, target.Id);
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
