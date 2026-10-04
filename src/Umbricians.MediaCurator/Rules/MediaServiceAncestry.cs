using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;

namespace Umbricians.MediaCurator.Rules;

/// <summary>Resolves a media item's ancestor folder keys from its content path, nearest first.</summary>
internal sealed class MediaServiceAncestry : IMediaAncestry
{
    private readonly IMediaService _mediaService;
    private readonly IEntityService _entityService;

    public MediaServiceAncestry(IMediaService mediaService, IEntityService entityService)
    {
        _mediaService = mediaService;
        _entityService = entityService;
    }

    // Folder keys by id, for this instance's lifetime (one request or background run): every image in a
    // run shares the same few ancestors.
    private readonly Dictionary<int, Guid?> _keys = [];

    public IReadOnlyList<Guid> GetAncestorOrSelfFolderKeys(Guid mediaKey)
    {
        // The light entity is enough for the path; loading the whole item cost a property read per image.
        var media = _entityService.Get(mediaKey, UmbracoObjectTypes.Media);
        if (media is null)
        {
            return [];
        }

        // Path is "-1,<rootId>,...,<selfId>". Ancestors nearest-first = reversed, excluding
        // self and the -1 root marker. Folders only matter as scope roots, but resolving a
        // folder's own key first also lets folders themselves be curated targets.
        var ids = media.Path
            .Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(int.Parse)
            .Where(id => id > 0 && id != media.Id)
            .Reverse();

        var keys = new List<Guid>();
        foreach (var id in ids)
        {
            Guid? key;
            lock (_keys)
            {
                if (!_keys.TryGetValue(id, out key))
                {
                    var attempt = _entityService.GetKey(id, UmbracoObjectTypes.Media);
                    key = attempt.Success ? attempt.Result : null;
                    _keys[id] = key;
                }
            }

            if (key is { } found)
            {
                keys.Add(found);
            }
        }

        return keys;
    }
}
