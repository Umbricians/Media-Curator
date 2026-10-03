using System.Globalization;
using Microsoft.Extensions.Logging;
using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Rules;

namespace Umbricians.MediaCurator.Engine;

/// <summary>
/// One sorting pass at the end of an executed run: puts folders first, then the other media
/// A→Z, ordering each folder level by the provider that produced it in the run.
/// </summary>
/// <remarks>
/// Which provider produced a level is known only from execution (conditional child rules make
/// levels path-dependent), so every planned move — moved or already in place — is walked from its
/// plan's scope root along its target segments, claiming each parent folder for the rule that
/// produced the segment below it (<see cref="PlannedMove.TargetOrigins"/>). A parent claimed by two
/// different rules, and every folder nobody claimed, gets the natural order. Folders whose children
/// are already in order are left untouched. A failure to sort one folder is logged and the pass
/// carries on; it never fails the run.
/// </remarks>
internal sealed class CurationFolderSorter
{
    private readonly IMediaOperations _media;
    private readonly CurationProviderCollection _providers;
    private readonly IReadOnlySet<Guid> _excluded;
    private readonly IMediaAncestry _ancestry;
    private readonly ILogger _logger;
    private readonly HashSet<Guid> _visited = [];
    private readonly Dictionary<Guid, IReadOnlyList<MediaItemInfo>> _children = [];
    private readonly Dictionary<Guid, Level> _levels = [];
    private readonly Dictionary<Guid, CultureInfo> _scopeCultures = [];

    /// <summary>A parent folder's claim: the rule (by identity key) that produced its child folders.
    /// <see cref="Origin"/> is null once two different rules have claimed it.</summary>
    private sealed class Level
    {
        public required string Identity { get; init; }
        public FolderSegmentOrigin? Origin { get; set; }
        public required CultureInfo Culture { get; init; }
        public IComparer<string>? Comparer { get; set; }
    }

    public CurationFolderSorter(
        IMediaOperations media,
        CurationProviderCollection providers,
        IReadOnlySet<Guid> excluded,
        IMediaAncestry ancestry,
        ILogger logger)
    {
        _media = media;
        _providers = providers;
        _excluded = excluded;
        _ancestry = ancestry;
        _logger = logger;
    }

    /// <summary>Records which rule produced each folder level the plan's moves target.</summary>
    public void AddProvenance(CurationPlan plan, CultureInfo culture)
    {
        _scopeCultures.TryAdd(plan.ScopeFolderKey, culture);
        foreach (var move in plan.Moves)
        {
            var origins = move.TargetOrigins;
            if (origins is null || origins.Count != move.TargetSegments.Count)
            {
                continue;
            }

            var parent = plan.ScopeFolderKey;
            for (var i = 0; i < move.TargetSegments.Count; i++)
            {
                Claim(parent, origins[i], culture);
                var child = FindChildFolder(parent, move.TargetSegments[i]);
                if (child is null)
                {
                    break;
                }

                parent = child.Value;
            }
        }
    }

    /// <summary>Sorts the folders along each of the plan's target paths that exist: the scope root
    /// down to the item's new parent. Folders that are excluded, or under an excluded folder, are
    /// skipped. Returns the folders re-ordered.</summary>
    public int SortTargetPaths(CurationPlan plan, CultureInfo culture, CancellationToken cancellationToken)
    {
        var sorted = 0;
        foreach (var move in plan.Moves)
        {
            var current = plan.ScopeFolderKey;
            for (var i = 0; ; i++)
            {
                if (cancellationToken.IsCancellationRequested)
                {
                    return sorted;
                }

                if (_visited.Add(current) && !IsExcludedOrUnder(current) && SortFolder(current, culture))
                {
                    sorted++;
                }

                if (i >= move.TargetSegments.Count || FindChildFolder(current, move.TargetSegments[i]) is not { } child)
                {
                    break;
                }

                current = child;
            }
        }

        return sorted;
    }

    /// <summary>Sorts the children of <paramref name="rootKey"/> and of every folder below it. Nothing
    /// happens when the root is excluded or under an excluded folder, and excluded sub-folders' contents
    /// are left alone (an excluded folder still takes its place among its siblings). Returns the folders
    /// re-ordered.</summary>
    public int SortSubtree(Guid rootKey, CultureInfo culture, CancellationToken cancellationToken)
    {
        if (IsExcludedOrUnder(rootKey))
        {
            return 0;
        }

        var sorted = 0;
        var pending = new Stack<(Guid Folder, CultureInfo Culture)>();
        pending.Push((rootKey, culture));
        while (pending.Count > 0 && !cancellationToken.IsCancellationRequested)
        {
            var (folder, folderCulture) = pending.Pop();
            // At and below a (nested) scope root that ran, unclaimed levels use that scope's culture.
            folderCulture = _scopeCultures.GetValueOrDefault(folder, folderCulture);
            if (_visited.Add(folder) && SortFolder(folder, folderCulture))
            {
                sorted++;
            }

            foreach (var child in Children(folder).Where(c => c.IsFolder && !_excluded.Contains(c.Key)).Reverse())
            {
                pending.Push((child.Key, folderCulture));
            }
        }

        return sorted;
    }

    private bool IsExcludedOrUnder(Guid folderKey)
        => _excluded.Count > 0
           && (_excluded.Contains(folderKey) || _ancestry.GetAncestorOrSelfFolderKeys(folderKey).Any(_excluded.Contains));

    private bool SortFolder(Guid folderKey, CultureInfo culture)
    {
        try
        {
            var children = Children(folderKey);
            if (children.Count < 2)
            {
                return false;
            }

            var natural = new NaturalFolderNameComparer(culture);
            var folderOrder = FolderComparer(folderKey) ?? natural;
            var ordered = children.Where(c => c.IsFolder).OrderBy(c => c.Name, folderOrder)
                .Concat(children.Where(c => !c.IsFolder).OrderBy(c => c.Name, natural))
                .Select(c => c.Key)
                .ToList();

            if (ordered.SequenceEqual(children.Select(c => c.Key)))
            {
                return false;
            }

            _media.SortChildren(folderKey, ordered);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "MediaCurator: could not sort the children of folder {FolderKey}; the run carries on.", folderKey);
            return false;
        }
    }

    private void Claim(Guid parent, FolderSegmentOrigin origin, CultureInfo culture)
    {
        var identity = string.Join('|', origin.ProviderAlias, origin.SegmentIndex, culture.Name, origin.Settings.ToJsonString());
        if (!_levels.TryGetValue(parent, out var level))
        {
            _levels[parent] = new Level { Identity = identity, Origin = origin, Culture = culture };
        }
        else if (level.Identity != identity)
        {
            // Two different rules produce folders here: neither order fits all of them.
            level.Origin = null;
        }
    }

    /// <summary>The order for a folder's child folders, or null for the natural default.</summary>
    private IComparer<string>? FolderComparer(Guid folderKey)
    {
        if (!_levels.TryGetValue(folderKey, out var level) || level.Origin is not { } origin)
        {
            return null;
        }

        if (level.Comparer is null)
        {
            IComparer<string>? providerOrder = null;
            if (_providers.GetByAlias(origin.ProviderAlias) is ICurationFolderOrder order)
            {
                try
                {
                    providerOrder = order.GetFolderComparer(new FolderOrderContext
                    {
                        Settings = origin.Settings,
                        SegmentIndex = origin.SegmentIndex,
                        Culture = level.Culture,
                    });
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "MediaCurator: provider {Provider} failed to supply a folder order; using the natural order.", origin.ProviderAlias);
                }
            }

            // The "Unsorted" fallback goes last at every rule-produced level.
            level.Comparer = new RankedFolderNameComparer(
                name => string.Equals(name, RuleChainExecutor.UnsortedFolderName, StringComparison.OrdinalIgnoreCase) ? null : 0,
                providerOrder ?? new NaturalFolderNameComparer(level.Culture));
        }

        return level.Comparer;
    }

    private IReadOnlyList<MediaItemInfo> Children(Guid folderKey)
    {
        if (!_children.TryGetValue(folderKey, out var children))
        {
            children = _media.GetChildren(folderKey);
            _children[folderKey] = children;
        }

        return children;
    }

    private Guid? FindChildFolder(Guid parent, string name)
        => Children(parent).FirstOrDefault(c => c.IsFolder && c.Name.Equals(name, StringComparison.OrdinalIgnoreCase))?.Key;

}
