using Microsoft.Extensions.Logging;

namespace Umbricians.MediaCurator.Engine;

public interface ICurationUndoService
{
    /// <summary>Reverses a curation run: every successfully moved item goes back to its
    /// recorded original parent (§11.2). Returns counts; items that no longer exist or
    /// whose original folder is gone are reported as failures, not errors.</summary>
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

                if (current.ParentKey == item.FromParentKey)
                {
                    inPlace++;
                    continue;
                }

                _media.Move(item.MediaKey, item.FromParentKey);
                await _runLog.RecordItemAsync(undoRunKey, item.MediaKey, item.MediaName, item.ToParentKey!.Value, item.FromParentKey, "(undo)", true, null, cancellationToken);
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
}
