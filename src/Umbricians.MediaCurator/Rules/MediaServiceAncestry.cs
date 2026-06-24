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

    public IReadOnlyList<Guid> GetAncestorOrSelfFolderKeys(Guid mediaKey)
    {
        var media = _mediaService.GetById(mediaKey);
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
            var attempt = _entityService.GetKey(id, UmbracoObjectTypes.Media);
            if (attempt.Success)
            {
                keys.Add(attempt.Result);
            }
        }

        return keys;
    }
}
