namespace Umbricians.MediaCurator.Engine;

/// <summary>
/// Records, for the current request, every media folder whose children changed (items moved in or out,
/// folders created, removed or sorted), so the backoffice can reload exactly those tree branches.
/// <see cref="Guid.Empty"/> stands for the media root.
/// </summary>
internal interface IMediaChangeTracker
{
    void FolderChanged(Guid folderKey);

    IReadOnlyCollection<Guid> ChangedFolders { get; }
}

internal sealed class MediaChangeTracker : IMediaChangeTracker
{
    private readonly HashSet<Guid> _changed = [];
    private readonly object _lock = new();

    public void FolderChanged(Guid folderKey)
    {
        lock (_lock)
        {
            _changed.Add(folderKey);
        }
    }

    public IReadOnlyCollection<Guid> ChangedFolders
    {
        get
        {
            lock (_lock)
            {
                return [.. _changed];
            }
        }
    }
}
