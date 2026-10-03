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

    [Fact]
    public async Task Missing_property_is_reported_missing()
    {
        var (service, _, _, key) = Setup();

        var report = await service.CheckAsync(key);

        var item = Assert.Single(report.Items);
        Assert.Equal(RequirementStatus.Missing, item.Status);
        Assert.False(report.AllSatisfied);
    }

    [Fact]
    public async Task Exact_alias_and_editor_match_is_satisfied()
    {
        var (service, schema, _, key) = Setup();
        schema.Types[MediaType].Add(new MediaTypePropertyInfo("mcTestProp", "Umbraco.TextBox", "Umb.PropertyEditorUi.TextBox"));

        var report = await service.CheckAsync(key);

        Assert.Equal(RequirementStatus.Satisfied, Assert.Single(report.Items).Status);
    }

    [Fact]
    public async Task Same_alias_different_editor_is_partial_match()
    {
        var (service, schema, _, key) = Setup();
        schema.Types[MediaType].Add(new MediaTypePropertyInfo("mcTestProp", "Umbraco.RichText", "Umb.PropertyEditorUi.Tiptap"));

        var report = await service.CheckAsync(key);

        var item = Assert.Single(report.Items);
        Assert.Equal(RequirementStatus.PartialMatch, item.Status);
        Assert.Equal("mcTestProp", item.CandidatePropertyAlias);
    }

    [Fact]
    public async Task Compatible_editor_under_different_alias_is_partial_match_candidate()
    {
        var (service, schema, _, key) = Setup();
        schema.Types[MediaType].Add(new MediaTypePropertyInfo("photoDescription", "Umbraco.TextBox", "Umb.PropertyEditorUi.TextBox"));

        var report = await service.CheckAsync(key);

        var item = Assert.Single(report.Items);
        Assert.Equal(RequirementStatus.PartialMatch, item.Status);
        Assert.Equal("photoDescription", item.CandidatePropertyAlias);
    }

    [Fact]
    public async Task Administrator_mapping_satisfies_requirement()
    {
        var (service, schema, maps, key) = Setup();
        schema.Types[MediaType].Add(new MediaTypePropertyInfo("photoDescription", "Umbraco.TextBox", "Umb.PropertyEditorUi.TextBox"));
        maps.Maps.Add(new PropertyMap("mcTestProp", MediaType, "photoDescription"));

        var report = await service.CheckAsync(key);

        Assert.Equal(RequirementStatus.Satisfied, Assert.Single(report.Items).Status);
    }

    [Fact]
    public async Task Apply_create_adds_property_and_subsequent_check_is_satisfied()
    {
        var (service, schema, _, key) = Setup();

        var result = await service.ApplyAsync([new ProvisioningApproval("mcTestProp", MediaType, ApprovalAction.Create)]);

        Assert.Empty(result.Errors);
        Assert.Single(schema.Added);
        var report = await service.CheckAsync(key);
        Assert.True(report.AllSatisfied);
    }

    [Fact]
    public async Task Apply_map_persists_mapping()
    {
        var (service, schema, maps, key) = Setup();
        schema.Types[MediaType].Add(new MediaTypePropertyInfo("photoDescription", "Umbraco.TextBox", "Umb.PropertyEditorUi.TextBox"));

        var result = await service.ApplyAsync(
            [new ProvisioningApproval("mcTestProp", MediaType, ApprovalAction.Map, "photoDescription")]);

        Assert.Empty(result.Errors);
        Assert.Single(maps.Maps);
        Assert.True((await service.CheckAsync(key)).AllSatisfied);
    }

    [Fact]
    public async Task Apply_map_without_target_is_an_error()
    {
        var (service, _, _, _) = Setup();

        var result = await service.ApplyAsync([new ProvisioningApproval("mcTestProp", MediaType, ApprovalAction.Map)]);

        Assert.NotEmpty(result.Errors);
    }

    // Classification needs the recognition cache to tell AI codes (which it may update) from editors' codes.
    [Theory]
    [InlineData(false)]
    [InlineData(true)]
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

        Assert.Single(report.Items, i => i.Requirement.Alias == "mediaCuratorTags");
    }
}

