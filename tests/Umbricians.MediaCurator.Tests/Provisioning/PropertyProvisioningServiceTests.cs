using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Provisioning;
using Umbricians.MediaCurator.Rules;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Tests.Provisioning;

public class PropertyProvisioningServiceTests
{
    private const string MediaType = "Image";

    private sealed class FakeSchema : IMediaTypeSchema
    {
        public readonly Dictionary<string, List<MediaTypePropertyInfo>> Types = new(StringComparer.OrdinalIgnoreCase)
        {
            [MediaType] = [],
        };

        public readonly List<(string MediaType, PropertyRequirement Requirement)> Added = [];

        public Task<IReadOnlyList<MediaTypePropertyInfo>?> GetPropertiesAsync(
            string mediaTypeAlias,
            CancellationToken cancellationToken = default)
            => Task.FromResult<IReadOnlyList<MediaTypePropertyInfo>?>(
                Types.TryGetValue(mediaTypeAlias, out var props) ? props : null);

        public Task AddPropertyAsync(string mediaTypeAlias, PropertyRequirement requirement, CancellationToken ct = default)
        {
            Added.Add((mediaTypeAlias, requirement));
            Types[mediaTypeAlias].Add(new MediaTypePropertyInfo(requirement.Alias, requirement.EditorAlias, requirement.EditorUiAlias));
            return Task.CompletedTask;
        }
    }

    private sealed class FakeMaps : IPropertyMapRepository
    {
        public readonly List<PropertyMap> Maps = [];

        public Task<IReadOnlyList<PropertyMap>> GetAllAsync(CancellationToken ct = default)
            => Task.FromResult<IReadOnlyList<PropertyMap>>(Maps);

        public Task SaveAsync(PropertyMap map, CancellationToken ct = default)
        {
            Maps.RemoveAll(m => m.RequirementAlias == map.RequirementAlias && m.MediaTypeAlias == map.MediaTypeAlias);
            Maps.Add(map);
            return Task.CompletedTask;
        }
    }

    private sealed class FakeRulesets : IRulesetRepository
    {
        public Ruleset? Ruleset;

        public Task<Ruleset?> GetAsync(Guid key, CancellationToken ct = default) => Task.FromResult(Ruleset);
        public Task<Ruleset?> GetByScopeKeyAsync(Guid s, CancellationToken ct = default) => Task.FromResult<Ruleset?>(null);
        public Task<IReadOnlyList<Ruleset>> GetAllAsync(CancellationToken ct = default) => Task.FromResult<IReadOnlyList<Ruleset>>([]);
        public Task SaveAsync(Ruleset r, CancellationToken ct = default) => Task.CompletedTask;
        public Task DeleteAsync(Guid k, CancellationToken ct = default) => Task.CompletedTask;
    }

    private sealed class RequiringProvider : ICurationProvider
    {
        public string Alias => "p.requiring";
        public string Name => Alias;
        public string Icon => "icon-box";

        public IEnumerable<PropertyRequirement> Requirements =>
        [
            new PropertyRequirement
            {
                Alias = "mcTestProp",
                Name = "Test Property",
                EditorAlias = "Umbraco.TextBox",
                EditorUiAlias = "Umb.PropertyEditorUi.TextBox",
                Mandatory = true,
            },
        ];

        public ProviderSettingsSchema SettingsSchema => ProviderSettingsSchema.Empty;

        public Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken ct = default)
            => Task.FromResult(CurationResult.Unresolved());
    }

    private sealed class FakeSettingsService : IMediaCuratorSettingsService
    {
        public Task<string?> GetTypeSafeApiKeyAsync(CancellationToken cancellationToken = default) => Task.FromResult<string?>(null);

        public Task SetTypeSafeApiKeyAsync(string? apiKey, CancellationToken cancellationToken = default) => Task.CompletedTask;

        public MediaCuratorSiteSettings Value { get; set; } = new();

        public Task<MediaCuratorSiteSettings> GetAsync(CancellationToken cancellationToken = default)
            => Task.FromResult(Value);

        public Task SaveAsync(MediaCuratorSiteSettings settings, CancellationToken cancellationToken = default)
        {
            Value = settings;
            return Task.CompletedTask;
        }
    }

    private static (PropertyProvisioningService Service, FakeSchema Schema, FakeMaps Maps, Guid RulesetKey) Setup()
    {
        var rulesets = new FakeRulesets();
        var ruleset = new Ruleset
        {
            ScopeRootKey = Guid.NewGuid(),
            Name = "rs",
            Rules = [new RuleNode { ProviderAlias = "p.requiring" }],
        };
        rulesets.Ruleset = ruleset;

        var schema = new FakeSchema();
        var maps = new FakeMaps();
        var providers = new CurationProviderCollection(() => [new RequiringProvider()]);
        var service = new PropertyProvisioningService(rulesets, providers, schema, maps, new FakeSettingsService());
        return (service, schema, maps, ruleset.Key);
    }

    [Test]
    public async Task Missing_property_is_reported_missing()
    {
        var (service, _, _, key) = Setup();

        var report = await service.CheckAsync(key);

        var item = TestAssert.Single(report.Items);
        Assert.That(item.Status, Is.EqualTo(RequirementStatus.Missing));
        Assert.That(report.AllSatisfied, Is.False);
    }

    [Test]
    public async Task Exact_alias_and_editor_match_is_satisfied()
    {
        var (service, schema, _, key) = Setup();
        schema.Types[MediaType].Add(new MediaTypePropertyInfo("mcTestProp", "Umbraco.TextBox", "Umb.PropertyEditorUi.TextBox"));

        var report = await service.CheckAsync(key);

        Assert.That(TestAssert.Single(report.Items).Status, Is.EqualTo(RequirementStatus.Satisfied));
    }

    [Test]
    public async Task Same_alias_different_editor_is_partial_match()
    {
        var (service, schema, _, key) = Setup();
        schema.Types[MediaType].Add(new MediaTypePropertyInfo("mcTestProp", "Umbraco.RichText", "Umb.PropertyEditorUi.Tiptap"));

        var report = await service.CheckAsync(key);

        var item = TestAssert.Single(report.Items);
        Assert.That(item.Status, Is.EqualTo(RequirementStatus.PartialMatch));
        Assert.That(item.CandidatePropertyAlias, Is.EqualTo("mcTestProp"));
    }

    [Test]
    public async Task Compatible_editor_under_different_alias_is_partial_match_candidate()
    {
        var (service, schema, _, key) = Setup();
        schema.Types[MediaType].Add(new MediaTypePropertyInfo("photoDescription", "Umbraco.TextBox", "Umb.PropertyEditorUi.TextBox"));

        var report = await service.CheckAsync(key);

        var item = TestAssert.Single(report.Items);
        Assert.That(item.Status, Is.EqualTo(RequirementStatus.PartialMatch));
        Assert.That(item.CandidatePropertyAlias, Is.EqualTo("photoDescription"));
    }

    [Test]
    public async Task Administrator_mapping_satisfies_requirement()
    {
        var (service, schema, maps, key) = Setup();
        schema.Types[MediaType].Add(new MediaTypePropertyInfo("photoDescription", "Umbraco.TextBox", "Umb.PropertyEditorUi.TextBox"));
        maps.Maps.Add(new PropertyMap("mcTestProp", MediaType, "photoDescription"));

        var report = await service.CheckAsync(key);

        Assert.That(TestAssert.Single(report.Items).Status, Is.EqualTo(RequirementStatus.Satisfied));
    }

    [Test]
    public async Task Apply_create_adds_property_and_subsequent_check_is_satisfied()
    {
        var (service, schema, _, key) = Setup();

        var result = await service.ApplyAsync([new ProvisioningApproval("mcTestProp", MediaType, ApprovalAction.Create)]);

        Assert.That(result.Errors, Is.Empty);
        Assert.That(schema.Added, Has.Exactly(1).Items);
        var report = await service.CheckAsync(key);
        Assert.That(report.AllSatisfied, Is.True);
    }

    [Test]
    public async Task Apply_map_persists_mapping()
    {
        var (service, schema, maps, key) = Setup();
        schema.Types[MediaType].Add(new MediaTypePropertyInfo("photoDescription", "Umbraco.TextBox", "Umb.PropertyEditorUi.TextBox"));

        var result = await service.ApplyAsync(
            [new ProvisioningApproval("mcTestProp", MediaType, ApprovalAction.Map, "photoDescription")]);

        Assert.That(result.Errors, Is.Empty);
        Assert.That(maps.Maps, Has.Exactly(1).Items);
        Assert.That((await service.CheckAsync(key)).AllSatisfied, Is.True);
    }

    [Test]
    public async Task Apply_map_without_target_is_an_error()
    {
        var (service, _, _, _) = Setup();

        var result = await service.ApplyAsync([new ProvisioningApproval("mcTestProp", MediaType, ApprovalAction.Map)]);

        Assert.That(result.Errors, Is.Not.Empty);
    }

    // Classification needs the recognition cache to tell AI codes (which it may update) from editors' codes.
    [TestCase(false)]
    [TestCase(true)]
    public async Task Classification_rules_require_the_recognition_cache_once(bool withAiTagRule)
    {
        var rulesets = new FakeRulesets();
        RuleNode[] rules = withAiTagRule
            ? [new RuleNode { ProviderAlias = Umbricians.MediaCurator.Providers.ClassificationProvider.ProviderAlias }, new RuleNode { ProviderAlias = Umbricians.MediaCurator.Providers.AiTagProvider.ProviderAlias }]
            : [new RuleNode { ProviderAlias = Umbricians.MediaCurator.Providers.ClassificationProvider.ProviderAlias }];
        rulesets.Ruleset = new Ruleset { ScopeRootKey = Guid.NewGuid(), Name = "rs", Rules = [.. rules] };
        var providers = new CurationProviderCollection(() =>
        [
            new Umbricians.MediaCurator.Providers.ClassificationProvider(new Umbricians.MediaCurator.Schemes.ClassificationSchemeCollection(() => [new Umbricians.MediaCurator.Schemes.DeweyPublicDomainScheme()])),
            new Umbricians.MediaCurator.Providers.AiTagProvider(),
        ]);
        var service = new PropertyProvisioningService(rulesets, providers, new FakeSchema(), new FakeMaps(), new FakeSettingsService());

        var report = await service.CheckAsync(rulesets.Ruleset.Key);

        TestAssert.Single(report.Items, i => i.Requirement.Alias == "mediaCuratorTags");
    }
}

