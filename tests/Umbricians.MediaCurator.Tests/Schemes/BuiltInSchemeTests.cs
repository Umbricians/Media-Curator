using System.Text.Json.Nodes;
using System.Text.RegularExpressions;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Schemes;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Tests.Schemes;

public class BuiltInSchemeTests
{
    public static TheoryData<string> SchemeAliases => ["dewey-pd", "lcc", "tgm-genre-format", "web-asset-role"];

    private static readonly IClassificationScheme[] _schemes =
        [new DeweyPublicDomainScheme(), new LccOutlineScheme(), new TgmGenreFormatScheme(), new WebAssetRoleScheme()];

    private static IClassificationScheme Scheme(string alias) => _schemes.Single(s => s.Alias == alias);

    private static ClassificationProvider Provider() => new(new ClassificationSchemeCollection(() => _schemes));

    [Theory]
    [MemberData(nameof(SchemeAliases))]
    public void Every_parent_exists_and_no_code_is_its_own_ancestor(string alias)
    {
        var scheme = Scheme(alias);
        var entries = scheme.GetAllEntries();
        Assert.NotEmpty(entries);

        foreach (var entry in entries)
        {
            // Walk the parents directly (GetPath's depth guard would hide a cycle).
            var seen = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { entry.Code };
            var current = entry;
            while (current.ParentCode is { } parentCode)
            {
                current = scheme.GetEntry(parentCode);
                Assert.True(current is not null, $"{entry.Code}: parent {parentCode} is not in the scheme");
                Assert.True(seen.Add(current!.Code), $"{entry.Code}: cycle through {current.Code}");
            }

            var path = scheme.GetPath(entry.Code);
            Assert.Equal(seen.Count, path.Count);
            Assert.Null(path[0].ParentCode);
            Assert.Equal(entry.Code, path[^1].Code);
        }
    }

    [Theory]
    [MemberData(nameof(SchemeAliases))]
    public void Every_code_passes_validation(string alias)
    {
        var scheme = Scheme(alias);

        Assert.All(scheme.GetAllEntries(), e => Assert.Equal(e.Code, ClassificationCodeValidator.Validate(scheme, e.Code)));
    }

    [Theory]
    [InlineData("tgm-genre-format")]
    [InlineData("web-asset-role")]
    public void Every_code_survives_the_filename_source(string alias)
    {
        // The filename source takes the first token before a space, dash, underscore or dot.
        Assert.All(Scheme(alias).GetAllEntries(), e => Assert.Equal(e.Code, e.Code.Split(' ', '-', '_', '.')[0]));
    }

    [Theory]
    [InlineData("BRD1 acme logo.png", "web-asset-role", new[] { "Branding", "Logo" })]
    [InlineData("ppl2-team-day.jpg", "web-asset-role", new[] { "People", "Team or group photo" })]
    [InlineData("tgm007721 harbour.jpg", "tgm-genre-format", new[] { "Pictures", "Photographs" })]
    public async Task Filename_codes_resolve_to_nested_folders(string name, string scheme, string[] folders)
    {
        var ctx = TestContext.Create(name: name, settings: TestContext.Settings(("scheme", scheme), ("source", "filename")));

        var result = await Provider().ResolveAsync(ctx);

        Assert.Equal(folders, result.Segments.Select(s => s.Name));
    }

    [Theory]
    [InlineData("in-store.jpg")]
    [InlineData("ed_sheeran.jpg")]
    [InlineData("pr-photo.jpg")]
    public async Task Ordinary_filenames_are_not_mistaken_for_web_asset_role_codes(string name)
    {
        var ctx = TestContext.Create(name: name, settings: TestContext.Settings(("scheme", "web-asset-role"), ("source", "filename")));

        Assert.False((await Provider().ResolveAsync(ctx)).IsResolved);
    }

    [Fact]
    public void Web_asset_role_has_two_levels_and_is_decided_in_one_step()
    {
        var scheme = new WebAssetRoleScheme();
        var roots = scheme.GetChildren(null);
        var finals = HierarchicalClassificationResolver.FinalEntries(scheme, MediaCuratorDefaults.MaxClassificationDepth);

        Assert.Equal(["BKG", "BRD", "EDT", "INF", "MKT", "PPL", "PRD"], roots.Select(r => r.Code));
        Assert.All(roots, r => Assert.NotEmpty(scheme.GetChildren(r.Code)));
        Assert.All(finals, f => Assert.Equal(2, scheme.GetPath(f.Code).Count));
        Assert.InRange(finals.Count, 2, MediaCuratorDefaults.OneStepClassificationLimit);
        Assert.Equal(
            "web-asset-role:one-step-v1",
            HierarchicalClassificationResolver.MethodFor(
                scheme, ClassificationMethod.OneStep, MediaCuratorDefaults.MaxClassificationDepth, MediaCuratorDefaults.OneStepClassificationLimit));
    }

    [Fact]
    public async Task Web_asset_role_one_step_choice_lists_every_role_with_its_group()
    {
        var scheme = new WebAssetRoleScheme();
        ClassificationChoice? seen = null;

        var code = await HierarchicalClassificationResolver.ResolveAsync(
            scheme,
            "a company logo on a white background",
            [new AiTag("logo", 0.95)],
            (choice, _) =>
            {
                seen = choice;
                return Task.FromResult<string?>("BRD1");
            },
            MediaCuratorDefaults.MaxClassificationDepth,
            CancellationToken.None,
            MediaCuratorDefaults.OneStepClassificationLimit);

        Assert.Equal("BRD1", code);
        Assert.NotNull(seen);
        Assert.Equal(22, seen!.Candidates.Count);
        Assert.Equal("BRD1 Logo (Branding)", seen.Label(scheme.GetEntry("BRD1")!));
        var prompt = ClassificationPromptBuilder.BuildRefinePrompt(seen);
        Assert.Contains("ROLE the image plays on a website", prompt);
        Assert.DoesNotContain("DEPICTS", prompt);
    }

    [Fact]
    public void Tgm_genre_format_terms_load_with_tgm_identifiers()
    {
        var scheme = new TgmGenreFormatScheme();
        var entries = scheme.GetAllEntries();

        Assert.True(entries.Count >= 700, $"Only {entries.Count} TGM genre/format terms loaded.");
        Assert.All(entries, e => Assert.Matches(new Regex("^tgm[0-9]{6}$"), e.Code));
        Assert.All(entries, e => Assert.False(string.IsNullOrWhiteSpace(e.Name)));
        Assert.Equal("Photographs", scheme.GetEntry("tgm007721")!.Name);
        Assert.Equal(["Pictures", "Photographs"], scheme.GetPath("tgm007721").Select(e => e.Name));
    }

    [Fact]
    public void Tgm_levels_fit_a_single_jev_choice_and_the_scheme_drills_down()
    {
        var scheme = new TgmGenreFormatScheme();
        var parents = scheme.GetAllEntries().Select(e => (string?)e.Code).Append(null);
        var finals = HierarchicalClassificationResolver.FinalEntries(scheme, MediaCuratorDefaults.MaxClassificationDepth);

        // Jev accepts at most 255 options per choice.
        Assert.All(parents, p => Assert.True(scheme.GetChildren(p).Count <= 255, $"{p} has too many children"));
        Assert.True(finals.Count > MediaCuratorDefaults.OneStepClassificationLimit);
        Assert.Equal(
            "tgm-genre-format:drill-down-v2",
            HierarchicalClassificationResolver.MethodFor(
                scheme, ClassificationMethod.OneStep, MediaCuratorDefaults.MaxClassificationDepth, MediaCuratorDefaults.OneStepClassificationLimit));
    }

    [Fact]
    public async Task Tgm_drill_down_reaches_a_fourth_level_term()
    {
        var scheme = new TgmGenreFormatScheme();
        var target = scheme.GetAllEntries().First(e => scheme.GetPath(e.Code).Count == MediaCuratorDefaults.MaxClassificationDepth);
        var path = scheme.GetPath(target.Code);
        var choices = new List<ClassificationChoice>();

        var code = await HierarchicalClassificationResolver.ResolveAsync(
            scheme,
            "an old photographic print",
            [new AiTag("photograph", 0.9)],
            (choice, _) =>
            {
                choices.Add(choice);
                // Pick whichever candidate lies on the way to the target.
                return Task.FromResult(choice.Candidates.FirstOrDefault(c => path.Any(p => p.Code == c.Code))?.Code);
            },
            MediaCuratorDefaults.MaxClassificationDepth,
            CancellationToken.None,
            MediaCuratorDefaults.OneStepClassificationLimit);

        Assert.Equal(target.Code, code);
        Assert.Null(choices[0].Parent);
        Assert.Equal(scheme.GetChildren(null).Count, choices[0].Candidates.Count);
        Assert.All(choices.Skip(1), c => Assert.Contains(path, p => p.Code == c.Parent!.Code));
        var prompt = ClassificationPromptBuilder.BuildRefinePrompt(choices[0]);
        Assert.Contains("GENRE or FORMAT", prompt);
        Assert.DoesNotContain("DEPICTS", prompt);
    }

    [Fact]
    public void Jev_instructions_use_the_scheme_guidance()
    {
        var scheme = new TgmGenreFormatScheme();
        var choice = new ClassificationChoice(scheme, "a poster", [], null, scheme.GetChildren(null));

        var request = JsonNode.Parse(System.Text.Json.JsonSerializer.Serialize(JevClassificationDecider.BuildRequest(choice, "jev-latest")))!;
        var instructions = (string?)request["questions"]!["classification"]!["instructions"];

        Assert.Contains("\"Thesaurus for Graphic Materials (genre/format)\" classification scheme", instructions);
        Assert.Contains("GENRE or FORMAT", instructions);
        Assert.DoesNotContain("library", instructions, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain("DEPICTS", instructions);
    }
}
