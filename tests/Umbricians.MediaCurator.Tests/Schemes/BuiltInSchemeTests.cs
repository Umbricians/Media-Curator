using System.Text.Json.Nodes;
using System.Text.RegularExpressions;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Recognition;
using Umbricians.MediaCurator.Schemes;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Tests.Schemes;

public class BuiltInSchemeTests
{
    public static string[] SchemeAliases => ["dewey-pd", "lcc", "tgm-genre-format", "web-asset-role"];

    private static readonly IClassificationScheme[] _schemes =
        [new DeweyPublicDomainScheme(), new LccOutlineScheme(), new TgmGenreFormatScheme(), new WebAssetRoleScheme()];

    private static IClassificationScheme Scheme(string alias) => _schemes.Single(s => s.Alias == alias);

    private static ClassificationProvider Provider() => new(new ClassificationSchemeCollection(() => _schemes));

    [TestCaseSource(nameof(SchemeAliases))]
    public void Every_parent_exists_and_no_code_is_its_own_ancestor(string alias)
    {
        var scheme = Scheme(alias);
        var entries = scheme.GetAllEntries();
        Assert.That(entries, Is.Not.Empty);

        foreach (var entry in entries)
        {
            // Walk the parents directly (GetPath's depth guard would hide a cycle).
            var seen = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { entry.Code };
            var current = entry;
            while (current.ParentCode is { } parentCode)
            {
                current = scheme.GetEntry(parentCode);
                Assert.That(current is not null, Is.True, $"{entry.Code}: parent {parentCode} is not in the scheme");
                Assert.That(seen.Add(current!.Code), Is.True, $"{entry.Code}: cycle through {current.Code}");
            }

            var path = scheme.GetPath(entry.Code);
            Assert.That(path.Count, Is.EqualTo(seen.Count));
            Assert.That(path[0].ParentCode, Is.Null);
            Assert.That(path[^1].Code, Is.EqualTo(entry.Code));
        }
    }

    [TestCaseSource(nameof(SchemeAliases))]
    public void Every_code_passes_validation(string alias)
    {
        var scheme = Scheme(alias);

        foreach (var e in scheme.GetAllEntries())
        {
            Assert.That(ClassificationCodeValidator.Validate(scheme, e.Code), Is.EqualTo(e.Code));
        }
    }

    [TestCase("tgm-genre-format")]
    [TestCase("web-asset-role")]
    public void Every_code_survives_the_filename_source(string alias)
    {
        // The filename source takes the first token before a space, dash, underscore or dot.
        foreach (var e in Scheme(alias).GetAllEntries())
        {
            Assert.That(e.Code.Split(' ', '-', '_', '.')[0], Is.EqualTo(e.Code));
        }
    }

    [TestCase("BRD1 acme logo.png", "web-asset-role", new[] { "Branding", "Logo" })]
    [TestCase("ppl2-team-day.jpg", "web-asset-role", new[] { "People", "Team or group photo" })]
    [TestCase("tgm007721 harbour.jpg", "tgm-genre-format", new[] { "Pictures", "Photographs" })]
    public async Task Filename_codes_resolve_to_nested_folders(string name, string scheme, string[] folders)
    {
        var ctx = CurationContexts.Create(name: name, settings: CurationContexts.Settings(("scheme", scheme), ("source", "filename")));

        var result = await Provider().ResolveAsync(ctx);

        Assert.That(result.Segments.Select(s => s.Name), Is.EqualTo(folders));
    }

    [TestCase("in-store.jpg")]
    [TestCase("ed_sheeran.jpg")]
    [TestCase("pr-photo.jpg")]
    public async Task Ordinary_filenames_are_not_mistaken_for_web_asset_role_codes(string name)
    {
        var ctx = CurationContexts.Create(name: name, settings: CurationContexts.Settings(("scheme", "web-asset-role"), ("source", "filename")));

        Assert.That((await Provider().ResolveAsync(ctx)).IsResolved, Is.False);
    }

    [Test]
    public void Web_asset_role_has_two_levels_and_is_decided_in_one_step()
    {
        var scheme = new WebAssetRoleScheme();
        var roots = scheme.GetChildren(null);
        var finals = HierarchicalClassificationResolver.FinalEntries(scheme, MediaCuratorDefaults.MaxClassificationDepth);

        Assert.That(roots.Select(r => r.Code), Is.EqualTo(["BKG", "BRD", "EDT", "INF", "MKT", "PPL", "PRD"]));
        foreach (var r in roots)
        {
            Assert.That(scheme.GetChildren(r.Code), Is.Not.Empty);
        }
        foreach (var f in finals)
        {
            Assert.That(scheme.GetPath(f.Code).Count, Is.EqualTo(2));
        }
        Assert.That(finals.Count, Is.InRange(2, MediaCuratorDefaults.OneStepClassificationLimit));
        var method = HierarchicalClassificationResolver.MethodFor(
            scheme, ClassificationMethod.OneStep, MediaCuratorDefaults.MaxClassificationDepth, MediaCuratorDefaults.OneStepClassificationLimit);
        Assert.That(method, Is.EqualTo("web-asset-role:one-step-v1"));
    }

    [Test]
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

        Assert.That(code, Is.EqualTo("BRD1"));
        Assert.That(seen, Is.Not.Null);
        Assert.That(seen!.Candidates.Count, Is.EqualTo(22));
        Assert.That(seen.Label(scheme.GetEntry("BRD1")!), Is.EqualTo("BRD1 Logo (Branding)"));
        var prompt = ClassificationPromptBuilder.BuildRefinePrompt(seen);
        Assert.That(prompt, Does.Contain("ROLE the image plays on a website"));
        Assert.That(prompt, Does.Not.Contain("DEPICTS"));
    }

    [Test]
    public void Tgm_genre_format_terms_load_with_tgm_identifiers()
    {
        var scheme = new TgmGenreFormatScheme();
        var entries = scheme.GetAllEntries();

        Assert.That(entries.Count >= 700, Is.True, $"Only {entries.Count} TGM genre/format terms loaded.");
        foreach (var e in entries)
        {
            Assert.That(e.Code, Does.Match(new Regex("^tgm[0-9]{6}$")));
        }
        foreach (var e in entries)
        {
            Assert.That(string.IsNullOrWhiteSpace(e.Name), Is.False);
        }
        Assert.That(scheme.GetEntry("tgm007721")!.Name, Is.EqualTo("Photographs"));
        Assert.That(scheme.GetPath("tgm007721").Select(e => e.Name), Is.EqualTo(["Pictures", "Photographs"]));
    }

    [Test]
    public void Tgm_levels_fit_a_single_jev_choice_and_the_scheme_drills_down()
    {
        var scheme = new TgmGenreFormatScheme();
        var parents = scheme.GetAllEntries().Select(e => (string?)e.Code).Append(null);
        var finals = HierarchicalClassificationResolver.FinalEntries(scheme, MediaCuratorDefaults.MaxClassificationDepth);

        // Jev accepts at most 255 options per choice.
        foreach (var p in parents)
        {
            Assert.That(scheme.GetChildren(p).Count <= 255, Is.True, $"{p} has too many children");
        }
        Assert.That(finals.Count > MediaCuratorDefaults.OneStepClassificationLimit, Is.True);
        var method = HierarchicalClassificationResolver.MethodFor(
            scheme, ClassificationMethod.OneStep, MediaCuratorDefaults.MaxClassificationDepth, MediaCuratorDefaults.OneStepClassificationLimit);
        Assert.That(method, Is.EqualTo("tgm-genre-format:drill-down-v2"));
    }

    [Test]
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

        Assert.That(code, Is.EqualTo(target.Code));
        Assert.That(choices[0].Parent, Is.Null);
        Assert.That(choices[0].Candidates.Count, Is.EqualTo(scheme.GetChildren(null).Count));
        foreach (var c in choices.Skip(1))
        {
            Assert.That(path.Any(p => p.Code == c.Parent!.Code), Is.True);
        }
        var prompt = ClassificationPromptBuilder.BuildRefinePrompt(choices[0]);
        Assert.That(prompt, Does.Contain("GENRE or FORMAT"));
        Assert.That(prompt, Does.Not.Contain("DEPICTS"));
    }

    [Test]
    public void Jev_instructions_use_the_scheme_guidance()
    {
        var scheme = new TgmGenreFormatScheme();
        var choice = new ClassificationChoice(scheme, "a poster", [], null, scheme.GetChildren(null));

        var request = JsonNode.Parse(System.Text.Json.JsonSerializer.Serialize(JevClassificationDecider.BuildRequest(choice, "jev-latest")))!;
        var instructions = (string?)request["questions"]!["classification"]!["instructions"];

        Assert.That(instructions, Does.Contain("\"Thesaurus for Graphic Materials (genre/format)\" classification scheme"));
        Assert.That(instructions, Does.Contain("GENRE or FORMAT"));
        Assert.That(instructions, Does.Not.Contain("library").IgnoreCase);
        Assert.That(instructions, Does.Not.Contain("DEPICTS"));
    }
}
