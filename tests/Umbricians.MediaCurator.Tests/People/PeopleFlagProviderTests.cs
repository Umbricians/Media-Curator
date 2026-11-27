using Umbraco.Cms.Api.Management.ViewModels.Tree;
using Umbricians.MediaCurator.People;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Tests.People;

public class PeopleFlagProviderTests
{
    private sealed class FakeNodes(params MediaTreeNode[] nodes) : IMediaTreeNodeLookup
    {
        public int Calls { get; private set; }

        public IReadOnlyDictionary<Guid, MediaTreeNode> GetNodes(IReadOnlyCollection<Guid> keys)
        {
            Calls++;
            return nodes.Where(n => keys.Contains(n.Key)).ToDictionary(n => n.Key);
        }
    }

    private static readonly Guid Root = Guid.NewGuid();
    private static readonly Guid Sub = Guid.NewGuid();
    private static readonly Guid Photo = Guid.NewGuid();
    private static readonly Guid Other = Guid.NewGuid();
    private static readonly Guid Sibling = Guid.NewGuid();

    private static PeopleDetection WithPeople(Guid key, string path)
        => new(key, true, 0.9, PeopleDetectionSources.Jev, path, null, DateTime.UtcNow);

    [Test]
    public void Rollup_flags_the_image_and_every_folder_above_it_at_any_depth()
    {
        var nodes = new[]
        {
            new MediaTreeNode(Root, "-1,100", true),
            new MediaTreeNode(Sub, "-1,100,101", true),
            new MediaTreeNode(Photo, "-1,100,101,102", false),
        };

        var flags = PeopleFlagRollup.Compute(nodes, [WithPeople(Photo, "-1,100,101,102")]);

        Assert.That(flags[Root], Is.EqualTo([PeopleFlags.ContainsPeopleBelow]));
        Assert.That(flags[Sub], Is.EqualTo([PeopleFlags.ContainsPeopleBelow]));
        Assert.That(flags[Photo], Is.EqualTo([PeopleFlags.ContainsPeople]));
    }

    [Test]
    public void Rollup_does_not_flag_a_sibling_whose_id_shares_the_prefix_digits()
    {
        // Folder 105 must not count folder 1052's image as below it.
        var nodes = new[] { new MediaTreeNode(Root, "-1,105", true), new MediaTreeNode(Sibling, "-1,1052", true) };

        var flags = PeopleFlagRollup.Compute(nodes, [WithPeople(Photo, "-1,1052,1060")]);

        Assert.That(flags.ContainsKey(Root), Is.False);
        Assert.That(flags[Sibling], Is.EqualTo([PeopleFlags.ContainsPeopleBelow]));
    }

    [Test]
    public void Rollup_ignores_images_without_people_and_images_in_the_recycle_bin()
    {
        var nodes = new[] { new MediaTreeNode(Root, "-1,100", true) };
        var noPeople = WithPeople(Photo, "-1,100,102") with { ContainsPeople = false };
        var trashed = WithPeople(Other, "-1,-21,100,103");

        var flags = PeopleFlagRollup.Compute(nodes, [noPeople, trashed]);

        Assert.That(flags, Is.Empty);
    }

    [Test]
    public void Rollup_gives_an_item_without_children_no_folder_flag()
    {
        var nodes = new[] { new MediaTreeNode(Root, "-1,100", false) };

        var flags = PeopleFlagRollup.Compute(nodes, [WithPeople(Photo, "-1,100,102")]);

        Assert.That(flags, Is.Empty);
    }

    [Test]
    public async Task Provider_flags_a_tree_page_with_one_lookup_and_one_query()
    {
        var repository = new FakePeopleRepository();
        repository.Add(Photo, "-1,100,101,102");
        repository.Add(Other, "-1,200,201", containsPeople: false);
        var nodes = new FakeNodes(
            new MediaTreeNode(Root, "-1,100", true),
            new MediaTreeNode(Other, "-1,200,201", false),
            new MediaTreeNode(Sibling, "-1,300", true));
        var provider = new PeopleFlagProvider(repository, nodes, new FakePeopleSettings(new MediaCuratorSiteSettings { DetectPeople = true }));
        var items = new[] { Item(Root), Item(Other), Item(Sibling) };

        await provider.PopulateFlagsAsync(items);

        Assert.That(nodes.Calls, Is.EqualTo(1));
        var query = TestAssert.Single(repository.Queries);
        Assert.That(query.FolderPaths.Order(), Is.EqualTo(["-1,100", "-1,300"]));
        Assert.That(items[0].Flags.Select(f => f.Alias), Is.EqualTo([PeopleFlags.ContainsPeopleBelow]));
        Assert.That(items[1].Flags, Is.Empty);
        Assert.That(items[2].Flags, Is.Empty);
    }

    [Test]
    public async Task Provider_adds_no_flags_while_people_detection_is_off()
    {
        var repository = new FakePeopleRepository();
        repository.Add(Photo, "-1,100,102");
        var nodes = new FakeNodes(new MediaTreeNode(Root, "-1,100", true));
        var provider = new PeopleFlagProvider(repository, nodes, new FakePeopleSettings(new MediaCuratorSiteSettings()));
        var items = new[] { Item(Root) };

        await provider.PopulateFlagsAsync(items);

        Assert.That(items[0].Flags, Is.Empty);
        Assert.That(nodes.Calls, Is.EqualTo(0));
        Assert.That(repository.Queries, Is.Empty);
    }

    [Test]
    public void Provider_only_handles_media_tree_items()
    {
        var provider = new PeopleFlagProvider(
            new FakePeopleRepository(),
            new FakeNodes(),
            new FakePeopleSettings(new MediaCuratorSiteSettings()));

        Assert.That(provider.CanProvideFlags<MediaTreeItemResponseModel>(), Is.True);
        Assert.That(provider.CanProvideFlags<DocumentTreeItemResponseModel>(), Is.False);
    }

    [Test]
    public void Descendant_pattern_ends_at_a_path_separator()
    {
        Assert.That(PeopleDetectionRepository.DescendantPattern("-1,105"), Is.EqualTo("-1,105,%"));
        Assert.That(PeopleDetectionRepository.DescendantPattern("-1,105,"), Is.EqualTo("-1,105,%"));
    }

    [Test]
    public void Query_matches_the_page_keys_or_anything_below_its_folders()
    {
        var key = Guid.NewGuid();
        var (where, args) = PeopleDetectionRepository.BuildWhere([key], ["-1,100,%", "-1,200,%"]);

        Assert.That(where, Is.EqualTo("containsPeople = @0 AND (mediaKey IN (@1) OR path LIKE @2 OR path LIKE @3)"));
        Assert.That(args[0], Is.EqualTo(true));
        Assert.That((IEnumerable<Guid>)args[1], Is.EqualTo([key]));
        Assert.That(args[3], Is.EqualTo("-1,200,%"));
    }

    private static MediaTreeItemResponseModel Item(Guid key) => new() { Id = key };
}
