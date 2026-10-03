using Microsoft.Extensions.Logging;

namespace Umbricians.MediaCurator.Engine;

public interface ICurationUndoService
{
    /// <summary>Reverses a curation run: every successfully moved item goes back to its
    /// recorded original parent (§11.2). Returns counts; items that no longer exist or
    /// whose original folder is gone are reported as failures, not errors. The folder order a run
    /// applied at its end is not recorded, so undo does not restore the previous order.</summary>
    Task<CurationRunSummary> UndoRunAsync(Guid runKey, CancellationToken cancellationToken = default);
}

internal sealed class CurationUndoService : ICurationUndoService
{
    private readonly ICurationRunLog _runLog;
    private readonly IMediaOperations _media;
    private readonly ILogger<CurationUndoService> _logger;

    public CurationUndoService(ICurationRunLog runLog, IMediaOperations media, ILogger<CurationUndoService> logger)
    {
        _runLog = runLog;
        _media = media;
        _logger = logger;
    }

    public async Task<CurationRunSummary> UndoRunAsync(Guid runKey, CancellationToken cancellationToken = default)
    {
        var items = await _runLog.GetRunItemsAsync(runKey, cancellationToken);
        var undoRunKey = await _runLog.StartRunAsync(Guid.Empty, Guid.Empty, $"undo:{runKey:N}", cancellationToken);

        int moved = 0, inPlace = 0, failed = 0;

        // Empty folders removed by the run come back first, otherwise items would be moved into
        // folders that are in the Recycle Bin or gone. Permanently deleted ones are recreated, so
        // items go into the new folder (old key -> new key).
        var folderMap = new Dictionary<Guid, Guid>();
        foreach (var folder in OrderParentsFirst(items.Where(IsRemovedFolder).ToList()))
        {
            cancellationToken.ThrowIfCancellationRequested();
            var recycled = folder.TargetPath == CurationEngine.EmptyFolderRecycledMarker;
            try
            {
                var parent = folderMap.GetValueOrDefault(folder.FromParentKey, folder.FromParentKey);
                if (recycled)
                {
                    _media.RestoreFromRecycleBin(folder.MediaKey, parent);
                }
                else
                {
                    folderMap[folder.MediaKey] = _media.EnsureFolderPath(parent, [folder.MediaName]);
                }

                await _runLog.RecordItemAsync(undoRunKey, folder.MediaKey, folder.MediaName, folder.FromParentKey, null, "(undo: empty folder restored)", true, null, cancellationToken);
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                _logger.LogWarning(ex, "MediaCurator: undo could not restore folder {FolderKey}.", folder.MediaKey);
                await _runLog.RecordItemAsync(undoRunKey, folder.MediaKey, folder.MediaName, folder.FromParentKey, null, "(undo: empty folder restored)", false, ex.Message, cancellationToken);
                failed++;
            }
        }

        foreach (var item in items.Where(i => i.Success && i.ToParentKey is not null))
        {
            cancellationToken.ThrowIfCancellationRequested();
            try
            {
                var current = _media.GetItem(item.MediaKey);
                if (current is null)
                {
                    failed++;
                    await _runLog.RecordItemAsync(undoRunKey, item.MediaKey, item.MediaName, item.ToParentKey!.Value, null, "(item gone)", false, "Item no longer exists.", cancellationToken);
                    continue;
                }

                var destination = folderMap.GetValueOrDefault(item.FromParentKey, item.FromParentKey);
                if (current.ParentKey == destination)
                {
                    inPlace++;
                    continue;
                }

                _media.Move(item.MediaKey, destination);
                await _runLog.RecordItemAsync(undoRunKey, item.MediaKey, item.MediaName, item.ToParentKey!.Value, destination, "(undo)", true, null, cancellationToken);
                moved++;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "MediaCurator: undo failed for {MediaKey}.", item.MediaKey);
                await _runLog.RecordItemAsync(undoRunKey, item.MediaKey, item.MediaName, item.ToParentKey!.Value, null, "(undo)", false, ex.Message, cancellationToken);
                failed++;
            }
        }

        await _runLog.CompleteRunAsync(undoRunKey, moved, inPlace, failed, cancellationToken);
        return new CurationRunSummary(undoRunKey, moved, inPlace, failed);
    }

    private static bool IsRemovedFolder(CurationRunItem item)
        => item.Success
           && item.ToParentKey is null
           && item.TargetPath is CurationEngine.EmptyFolderRecycledMarker or CurationEngine.EmptyFolderDeletedMarker;

    /// <summary>Orders removed folders so each comes after the removed folder that was its parent
    /// (shallowest first), whatever order the log returns them in.</summary>
    private static List<CurationRunItem> OrderParentsFirst(List<CurationRunItem> folders)
    {
        var ordered = new List<CurationRunItem>();
        var pending = folders.ToList();
        while (pending.Count > 0)
        {
            var ready = pending.Where(f => pending.All(p => p.MediaKey != f.FromParentKey)).ToList();
            if (ready.Count == 0)
            {
                ready = pending; // cannot happen for a real tree; never loop forever on bad data
            }

            ordered.AddRange(ready);
            pending.RemoveAll(ready.Contains);
        }

        return ordered;
    }
}
