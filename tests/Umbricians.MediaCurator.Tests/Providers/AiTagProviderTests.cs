using Umbricians.MediaCurator.Core;
using Umbricians.MediaCurator.Providers;
using Umbricians.MediaCurator.Recognition;

namespace Umbricians.MediaCurator.Tests.Providers;

public class AiTagProviderTests
{
    private readonly AiTagProvider _sut = new();

    private static CurationContext WithTags(CurationContext ctx, params AiTag[] tags)
        => ctx with
        {
            RecognizeAsync = (_, _) => Task.FromResult<RecognitionResult?>(new RecognitionResult(tags, null)),
        };

    [Fact]
    public async Task Highest_confidence_tag_above_threshold_wins()
    {
        var ctx = WithTags(TestContext.Create(),
            new AiTag("building", 0.7), new AiTag("people", 0.95), new AiTag("food", 0.3));

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal("people", result.ResolvedValue);
        Assert.Equal("people", Assert.Single(result.Segments).Name);
    }

    [Fact]
    public async Task Mapping_renames_the_folder_but_resolved_value_stays_the_tag()
    {
        var ctx = WithTags(
            TestContext.Create(settings: TestContext.Settings(("mappings", "product-shot=Products"))),
            new AiTag("product-shot", 0.9));

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal("Products", Assert.Single(result.Segments).Name);
        Assert.Equal("product-shot", result.ResolvedValue); // conditions match on the tag
    }

    [Fact]
    public async Task Threshold_filters_noisy_tags()
    {
        var ctx = WithTags(
            TestContext.Create(settings: TestContext.Settings(("threshold", "0.8"))),
            new AiTag("blurry-maybe", 0.5));

        var result = await _sut.ResolveAsync(ctx);

        Assert.False(result.IsResolved);
    }

    [Fact]
    public async Task Mapped_only_ignores_unmapped_tags()
    {
        var ctx = WithTags(
            TestContext.Create(settings: TestContext.Settings(
                ("mappings", "people=People"), ("mappedOnly", "true"))),
            new AiTag("screenshot", 0.99), new AiTag("people", 0.7));

        var result = await _sut.ResolveAsync(ctx);

        Assert.Equal("People", Assert.Single(result.Segments).Name);
    }

    [Fact]
    public async Task Unresolved_without_recognition_or_tags()
    {
        var noRecognition = await _sut.ResolveAsync(TestContext.Create());
        var nullResult = await _sut.ResolveAsync(TestContext.Create() with
        {
            RecognizeAsync = (_, _) => Task.FromResult<RecognitionResult?>(null),
        });
        var empty = await _sut.ResolveAsync(WithTags(TestContext.Create()));

        Assert.False(noRecognition.IsResolved);
        Assert.False(nullResult.IsResolved);
        Assert.False(empty.IsResolved);
    }
}
