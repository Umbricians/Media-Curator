namespace Umbricians.MediaCurator.Controllers.ViewModels;

internal class AncestorFoldersRequestModel
{
    public required List<Guid> MediaKeys { get; init; }
}

internal class AncestorFoldersResponseModel
{
    /// <summary>Folders above the requested items; the media root is the empty GUID.</summary>
    public List<Guid> FolderKeys { get; init; } = [];
}
