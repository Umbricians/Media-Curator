using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;
using Umbricians.MediaCurator.Controllers.ViewModels;

namespace Umbricians.MediaCurator.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "Media Curator")]
[BackOfficeRoute("umbriciansmediacurator/api/v{version:apiVersion}")]
[Authorize(Policy = AuthorizationPolicies.SectionAccessSettings)]
internal class PeopleController : MediaCuratorControllerBase
{
    private const int RecycleBinId = -21;

    private readonly IEntityService _entities;

    public PeopleController(IEntityService entities) => _entities = entities;

    /// <summary>
    /// Every folder above the given media items, the media root included (as the empty GUID). A tree item's
    /// people badge only refreshes when its parent's children reload, and a folder's "people below" badge
    /// depends on everything under it, so after analyzing or curating the backoffice reloads all of these.
    /// </summary>
    [HttpPost("people/ancestor-folders")]
    [ProducesResponseType<AncestorFoldersResponseModel>(StatusCodes.Status200OK)]
    public IActionResult GetAncestorFolders(AncestorFoldersRequestModel request)
    {
        var keys = request.MediaKeys.Where(k => k != Guid.Empty).Distinct().ToArray();
        var paths = keys.Length == 0
            ? []
            : _entities.GetAll(UmbracoObjectTypes.Media, keys).Select(e => e.Path).ToList();

        var (ancestorIds, includesRoot) = AncestorIds(paths);
        var folderKeys = ancestorIds.Count == 0
            ? []
            : _entities.GetAll(UmbracoObjectTypes.Media, ancestorIds.ToArray()).Select(e => e.Key).ToList();
        if (includesRoot || request.MediaKeys.Contains(Guid.Empty))
        {
            folderKeys.Insert(0, Guid.Empty);
        }

        return Ok(new AncestorFoldersResponseModel { FolderKeys = folderKeys.Distinct().ToList() });
    }

    /// <summary>The node ids above each path (not the item itself), and whether any item sits under the media
    /// root rather than the recycle bin.</summary>
    internal static (IReadOnlyCollection<int> Ids, bool IncludesRoot) AncestorIds(IEnumerable<string> paths)
    {
        var ids = new HashSet<int>();
        var includesRoot = false;
        foreach (var path in paths)
        {
            var segments = path.Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(s => int.TryParse(s, out var id) ? id : (int?)null)
                .OfType<int>()
                .ToList();
            if (segments.Count < 2 || segments.Contains(RecycleBinId))
            {
                continue;
            }

            includesRoot = true;
            foreach (var id in segments.Skip(1).SkipLast(1))
            {
                ids.Add(id);
            }
        }

        return (ids, includesRoot);
    }
}
