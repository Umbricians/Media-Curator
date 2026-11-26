using Microsoft.Extensions.Logging.Abstractions;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Strings;
using Umbricians.MediaCurator.People;

namespace Umbricians.MediaCurator.Tests.People;

public class PeoplePathNotificationHandlerTests
{
    private static readonly Guid Folder = Guid.NewGuid();
    private static readonly Guid Photo = Guid.NewGuid();
    private static readonly Guid Deep = Guid.NewGuid();
    private static readonly Guid Elsewhere = Guid.NewGuid();

    private static (PeoplePathNotificationHandler Handler, FakePeopleRepository Repository) Create()
    {
        var repository = new FakePeopleRepository();
        repository.Add(Photo, "-1,100,101,102");
        repository.Add(Deep, "-1,100,101,103,104");
        repository.Add(Elsewhere, "-1,1010,105");
        return (new PeoplePathNotificationHandler(repository, NullLogger<PeoplePathNotificationHandler>.Instance), repository);
    }

    // The handler reads only the original and new paths. Umbraco 18 makes the parent id constructor obsolete (it goes in
    // 19), and 17 has no constructor without the parent id.
    private static MoveEventInfo<IMedia> Moved(IMedia entity, string originalPath, int newParentId)
#if UMBRACO_18_OR_GREATER
        => new(entity, originalPath, (Guid?)null);
#else
        => new(entity, originalPath, newParentId);
#endif

    private static IMedia Media(Guid key, string path)
    {
        var mediaType = new MediaType(new DefaultShortStringHelper(new DefaultShortStringHelperConfig()), -1);
        return new Media("item", -1, mediaType) { Key = key, Path = path };
    }

    [Fact]
    public async Task Moving_a_folder_rewrites_the_paths_of_everything_below_it()
    {
        var (handler, repository) = Create();
        var moved = Media(Folder, "-1,200,101");

        await handler.HandleAsync(
            new MediaMovedNotification(Moved(moved, "-1,100,101", 200), new EventMessages()),
            CancellationToken.None);

        Assert.Equal("-1,200,101,102", repository.Rows[Photo].Path);
        Assert.Equal("-1,200,101,103,104", repository.Rows[Deep].Path);
        Assert.Equal("-1,1010,105", repository.Rows[Elsewhere].Path);
    }

    [Fact]
    public async Task A_move_reported_for_a_descendant_after_its_folder_changes_nothing_more()
    {
        var (handler, repository) = Create();
        var folder = Media(Folder, "-1,200,101");
        var photo = Media(Photo, "-1,200,101,102");

        await handler.HandleAsync(
            new MediaMovedNotification(
                [
                    Moved(folder, "-1,100,101", 200),
                    Moved(photo, "-1,100,101,102", 101),
                ],
                new EventMessages()),
            CancellationToken.None);

        Assert.Equal("-1,200,101,102", repository.Rows[Photo].Path);
    }

    [Fact]
    public async Task Moving_to_the_recycle_bin_keeps_the_decisions_under_the_bin_path()
    {
        var (handler, repository) = Create();
        var trashed = Media(Folder, "-1,-21,101");

        await handler.HandleAsync(
            new MediaMovedToRecycleBinNotification(new MoveToRecycleBinEventInfo<IMedia>(trashed, "-1,100,101"), new EventMessages()),
            CancellationToken.None);

        Assert.Equal("-1,-21,101,102", repository.Rows[Photo].Path);
        Assert.Equal(3, repository.Rows.Count);
    }

    [Fact]
    public async Task Deleting_media_removes_its_decisions_and_those_below_it()
    {
        var (handler, repository) = Create();

        await handler.HandleAsync(
            new MediaDeletedNotification(Media(Folder, "-1,100,101"), new EventMessages()),
            CancellationToken.None);

        Assert.Equal([Elsewhere], repository.Rows.Keys);
    }

    [Theory]
    [InlineData("-1,100,101", "-1,100,101", "-1,200", "-1,200")]
    [InlineData("-1,100,101,102", "-1,100,101", "-1,200,101", "-1,200,101,102")]
    [InlineData("-1,100,1010", "-1,100,101", "-1,200,101", "-1,100,1010")]
    public void Rewrite_path_only_touches_the_item_and_its_descendants(string path, string oldPath, string newPath, string expected)
        => Assert.Equal(expected, PeopleDetectionRepository.RewritePath(path, oldPath, newPath));
}
