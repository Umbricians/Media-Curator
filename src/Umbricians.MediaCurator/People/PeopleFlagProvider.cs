using Umbraco.Cms.Api.Management.Services.Flags;
using Umbraco.Cms.Api.Management.ViewModels;
using Umbraco.Cms.Api.Management.ViewModels.Tree;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.People;

/// <summary>Backoffice flags (rendered as entity signs on media tree items).</summary>
public static class PeopleFlags
{
    /// <summary>On an image the AI decided shows people.</summary>
    public const string ContainsPeople = "MediaCurator.ContainsPeople";

    /// <summary>On a folder with an image that shows people anywhere below it.</summary>
    public const string ContainsPeopleBelow = "MediaCurator.ContainsPeopleBelow";
}

/// <summary>A media tree item's path and whether it has children (only those can have people below them).</summary>
public sealed record MediaTreeNode(Guid Key, string Path, bool HasChildren);

/// <summary>Looks up tree nodes for a page of media keys in one call.</summary>
public interface IMediaTreeNodeLookup
{
    IReadOnlyDictionary<Guid, MediaTreeNode> GetNodes(IReadOnlyCollection<Guid> keys);
}

internal sealed class EntityServiceMediaTreeNodeLookup : IMediaTreeNodeLookup
{
    private readonly IEntityService _entities;

    public EntityServiceMediaTreeNodeLookup(IEntityService entities) => _entities = entities;

    public IReadOnlyDictionary<Guid, MediaTreeNode> GetNodes(IReadOnlyCollection<Guid> keys)
        => keys.Count == 0
            ? new Dictionary<Guid, MediaTreeNode>()
            : _entities.GetAll(UmbracoObjectTypes.Media, keys.ToArray())
                .Where(e => !string.IsNullOrEmpty(e.Path))
                .GroupBy(e => e.Key)
                .ToDictionary(g => g.Key, g => new MediaTreeNode(g.Key, g.First().Path, g.First().HasChildren));
}

/// <summary>Works out which flags each tree item gets from the stored images with people.</summary>
public static class PeopleFlagRollup
{
    public static IReadOnlyDictionary<Guid, IReadOnlyList<string>> Compute(
        IEnumerable<MediaTreeNode> nodes,
        IEnumerable<PeopleDetection> withPeople)
    {
        var people = withPeople.Where(d => d.ContainsPeople).ToList();
        var flaggedKeys = people.Select(d => d.MediaKey).ToHashSet();
        var result = new Dictionary<Guid, IReadOnlyList<string>>();
        foreach (var node in nodes)
        {
            var flags = new List<string>();
            if (flaggedKeys.Contains(node.Key))
            {
                flags.Add(PeopleFlags.ContainsPeople);
            }

            var below = node.Path.TrimEnd(',') + ",";
            if (node.HasChildren && people.Any(d => d.Path.StartsWith(below, StringComparison.Ordinal)))
            {
                flags.Add(PeopleFlags.ContainsPeopleBelow);
            }

            if (flags.Count > 0)
            {
                result[node.Key] = flags;
            }
        }

        return result;
    }
}

/// <summary>
/// Flags media tree items that show people, and folders with such images anywhere below them. Reads only the
/// stored decisions — never the AI — with one node lookup and one database query per tree page.
/// Only the media tree renders these signs (the grid and table collection views do not), so other item
/// models are left alone rather than paying for a query nobody sees.
/// </summary>
internal sealed class PeopleFlagProvider : IFlagProvider
{
    private readonly IPeopleDetectionRepository _repository;
    private readonly IMediaTreeNodeLookup _nodes;
    private readonly IMediaCuratorSettingsService _settings;

    public PeopleFlagProvider(
        IPeopleDetectionRepository repository,
        IMediaTreeNodeLookup nodes,
        IMediaCuratorSettingsService settings)
    {
        _repository = repository;
        _nodes = nodes;
        _settings = settings;
    }

    public bool CanProvideFlags<TItem>()
        where TItem : IHasFlags
        => typeof(MediaTreeItemResponseModel).IsAssignableFrom(typeof(TItem));

    public async Task PopulateFlagsAsync<TItem>(IEnumerable<TItem> items)
        where TItem : IHasFlags
    {
        var list = items.ToList();
        if (list.Count == 0 || !(await _settings.GetAsync()).DetectPeople)
        {
            return;
        }

        var nodes = _nodes.GetNodes(list.Select(i => i.Id).Distinct().ToList());
        if (nodes.Count == 0)
        {
            return;
        }

        var folderPaths = nodes.Values.Where(n => n.HasChildren).Select(n => n.Path).ToList();
        var withPeople = await _repository.FindWithPeopleAsync(nodes.Keys.ToList(), folderPaths);
        if (withPeople.Count == 0)
        {
            return;
        }

        var flags = PeopleFlagRollup.Compute(nodes.Values, withPeople);
        foreach (var item in list)
        {
            if (flags.TryGetValue(item.Id, out var itemFlags))
            {
                foreach (var flag in itemFlags)
                {
                    item.AddFlag(flag);
                }
            }
        }
    }
}
