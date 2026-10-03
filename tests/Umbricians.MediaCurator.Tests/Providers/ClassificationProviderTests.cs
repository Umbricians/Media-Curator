using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Schemes;

namespace Umbricians.MediaCurator.Tests.Providers;

public class ClassificationProviderTests
{
    private static ClassificationProvider Create()
        => new(new ClassificationSchemeCollection(() => [new DeweyPublicDomainScheme(), new LccOutlineScheme()]));

    private sealed class DictAccessor : Dictionary<string, string>, IPropertyAccessor
    {
        public string? GetString(string alias) => this.GetValueOrDefault(alias);
    }

    private static CurationContext WithCode(string code, params (string K, string V)[] settings)
        => TestContext.Create(settings: TestContext.Settings(settings))
            with { Properties = new DictAccessor { [ClassificationProvider.CodePropertyAlias] = code } };

    // A one-step decision stores only the final code; its folders still nest by main class.
    [Theory]
    [InlineData("910", new[] { "History", "Geography and Travels" })]
    [InlineData("790", new[] { "Fine Arts", "Amusements" })]
    [InlineData("385", new[] { "Sociology", "Commerce and Communication", "Railroad Transportation" })]
    public async Task Final_dewey_codes_nest_under_their_classes(string code, string[] folders)
    {
        var result = await Create().ResolveAsync(WithCode(code, ("scheme", "dewey-pd")));

        Assert.Equal(folders, result.Segments.Select(s => s.Name));
    }

    [Fact]
    public async Task Hierarchical_lcc_code_produces_nested_name_folders()
    {
        var result = await Create().ResolveAsync(WithCode("NA", ("scheme", "lcc")));

        Assert.True(result.IsResolved);
        Assert.Equal(["Fine Arts", "Architecture"], result.Segments.Select(s => s.Name));
        Assert.Equal("NA", result.ResolvedValue);
    }

    [Fact]
    public async Task Dewey_division_resolves_under_its_main_class()
    {
        var result = await Create().ResolveAsync(WithCode("770", ("scheme", "dewey-pd"), ("naming", "codeName")));

        Assert.Equal(["700 – Fine Arts", "770 – Photography"], result.Segments.Select(s => s.Name));
    }

    [Fact]
    public async Task Code_only_naming_uses_codes()
    {
        var result = await Create().ResolveAsync(WithCode("770", ("scheme", "dewey-pd"), ("naming", "code")));

        Assert.Equal(["700", "770"], result.Segments.Select(s => s.Name));
    }

    [Fact]
    public async Task Filename_source_takes_leading_token()
    {
        var ctx = TestContext.Create(
            name: "NA modern-building.jpg",
            settings: TestContext.Settings(("scheme", "lcc"), ("source", "filename")));

        var result = await Create().ResolveAsync(ctx);

        Assert.Equal(["Fine Arts", "Architecture"], result.Segments.Select(s => s.Name));
    }

    [Fact]
    public async Task Custom_code_table_maps_to_folder_path()
    {
        var result = await Create().ResolveAsync(
            WithCode("PROJ-1", ("scheme", "custom"), ("customTable", "PROJ-1=Projects/Alpha\nPROJ-2=Projects/Beta")));

        Assert.Equal(["Projects", "Alpha"], result.Segments.Select(s => s.Name));
    }

    [Fact]
    public async Task Unknown_code_or_missing_source_is_unresolved()
    {
        var unknown = await Create().ResolveAsync(WithCode("XYZ999", ("scheme", "lcc")));
        var missing = await Create().ResolveAsync(TestContext.Create(settings: TestContext.Settings(("scheme", "lcc"))));

        Assert.False(unknown.IsResolved);
        Assert.False(missing.IsResolved);
    }

    [Fact]
    public void Schemes_load_their_embedded_resources()
    {
        var dewey = new DeweyPublicDomainScheme();
        var lcc = new LccOutlineScheme();

        Assert.Equal("Photography", dewey.GetEntry("770")!.Name);
        Assert.Equal("700", dewey.GetEntry("770")!.ParentCode);
        Assert.Equal("Photography", lcc.GetEntry("TR")!.Name);
        Assert.Equal(["T", "TR"], lcc.GetPath("TR").Select(e => e.Code));
    }

    [Fact]
    public async Task Property_source_triggers_recognition_when_code_missing()
    {
        var accessor = new DictAccessor();
        var schemeSeen = string.Empty;
        var ctx = TestContext.Create(settings: TestContext.Settings(("scheme", "dewey-pd"), ("source", "property")))
            with
            {
                Properties = accessor,
                RecognizeAsync = (scheme, _) =>
                {
                    schemeSeen = scheme!;
                    accessor[ClassificationProvider.CodePropertyAlias] = "770";
                    return Task.FromResult<RecognitionResult?>(new RecognitionResult([], null, "770"));
                },
            };

        var result = await Create().ResolveAsync(ctx);

        Assert.Equal("dewey-pd", schemeSeen);
        Assert.Equal(["Fine Arts", "Photography"], result.Segments.Select(s => s.Name));
    }

    [Fact]
    public async Task Stored_codes_are_refreshed_before_use_and_the_updated_code_is_used()
    {
        var accessor = new DictAccessor { [ClassificationProvider.CodePropertyAlias] = "390" };
        string? refreshedFor = null;
        var context = TestContext.Create(settings: TestContext.Settings(("scheme", "dewey-pd")))
            with
            {
                Properties = accessor,
                RefreshClassificationAsync = (scheme, _) =>
                {
                    refreshedFor = scheme;
                    accessor[ClassificationProvider.CodePropertyAlias] = "910";
                    return Task.FromResult<RecognitionResult?>(null);
                },
            };

        var result = await Create().ResolveAsync(context);

        Assert.Equal("dewey-pd", refreshedFor);
        Assert.Equal(["History", "Geography and Travels"], result.Segments.Select(s => s.Name));
    }
}

