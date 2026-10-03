using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Notifications;

namespace Umbricians.MediaCurator.People;

/// <summary>
/// Keeps stored people decisions in step with the media tree, which curation reshapes constantly: a move
/// (including to and from the recycle bin) rewrites the stored paths of the item and everything below it, so
/// folder badges follow; deleting media removes its decisions. Moving to the recycle bin keeps them, so
/// restoring an image needs no new AI decision. Every rewrite is idempotent, so a notification that also
/// lists the descendants of a moved folder does no harm.
/// </summary>
internal sealed class PeoplePathNotificationHandler :
    INotificationAsyncHandler<MediaMovedNotification>,
    INotificationAsyncHandler<MediaMovedToRecycleBinNotification>,
    INotificationAsyncHandler<MediaDeletedNotification>
{
    private readonly IPeopleDetectionRepository _repository;
    private readonly ILogger<PeoplePathNotificationHandler> _logger;

    public PeoplePathNotificationHandler(IPeopleDetectionRepository repository, ILogger<PeoplePathNotificationHandler> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public Task HandleAsync(MediaMovedNotification notification, CancellationToken cancellationToken)
        => MoveAsync(notification.MoveInfoCollection.Select(i => (i.OriginalPath, i.Entity.Path)), cancellationToken);

    public Task HandleAsync(MediaMovedToRecycleBinNotification notification, CancellationToken cancellationToken)
        => MoveAsync(notification.MoveInfoCollection.Select(i => (i.OriginalPath, i.Entity.Path)), cancellationToken);

    public async Task HandleAsync(MediaDeletedNotification notification, CancellationToken cancellationToken)
    {
        try
        {
            await _repository.DeleteAsync(
                notification.DeletedEntities.Select(m => (m.Key, m.Path)).ToList(),
                cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "MediaCurator: could not remove people decisions for deleted media.");
        }
    }

    private async Task MoveAsync(IEnumerable<(string OldPath, string NewPath)> moves, CancellationToken cancellationToken)
    {
        // A missed path update only leaves a badge stale; it must never fail the editor's move.
        try
        {
            foreach (var (oldPath, newPath) in moves)
            {
                await _repository.MovePathAsync(oldPath, newPath, cancellationToken);
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "MediaCurator: could not update people decisions for moved media.");
        }
    }
}
