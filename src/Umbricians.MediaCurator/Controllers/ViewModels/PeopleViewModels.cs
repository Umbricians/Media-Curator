namespace Umbricians.MediaCurator.Controllers.ViewModels;

public class AncestorFoldersRequestModel
{
    public required List<Guid> MediaKeys { get; init; }
}

public class AncestorFoldersResponseModel
{
    /// <summary>Folders above the requested items; the media root is the empty GUID.</summary>
    public List<Guid> FolderKeys { get; init; } = [];
}
