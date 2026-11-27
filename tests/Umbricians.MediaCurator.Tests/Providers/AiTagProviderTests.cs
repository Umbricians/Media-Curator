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

    [Test]
    public async Task Highest_confidence_tag_above_threshold_wins()
    {
        var ctx = WithTags(CurationContexts.Create(),
            new AiTag("building", 0.7), new AiTag("people", 0.95), new AiTag("food", 0.3));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.ResolvedValue, Is.EqualTo("people"));
        Assert.That(TestAssert.Single(result.Segments).Name, Is.EqualTo("people"));
    }

    [Test]
    public async Task Mapping_renames_the_folder_but_resolved_value_stays_the_tag()
    {
        var ctx = WithTags(
            CurationContexts.Create(settings: CurationContexts.Settings(("mappings", "product-shot=Products"))),
            new AiTag("product-shot", 0.9));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(TestAssert.Single(result.Segments).Name, Is.EqualTo("Products"));
        Assert.That(result.ResolvedValue, Is.EqualTo("product-shot")); // conditions match on the tag
    }

    [Test]
    public async Task Threshold_filters_noisy_tags()
    {
        var ctx = WithTags(
            CurationContexts.Create(settings: CurationContexts.Settings(("threshold", "0.8"))),
            new AiTag("blurry-maybe", 0.5));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(result.IsResolved, Is.False);
    }

    [Test]
    public async Task Mapped_only_ignores_unmapped_tags()
    {
        var ctx = WithTags(
            CurationContexts.Create(settings: CurationContexts.Settings(
                ("mappings", "people=People"), ("mappedOnly", "true"))),
            new AiTag("screenshot", 0.99), new AiTag("people", 0.7));

        var result = await _sut.ResolveAsync(ctx);

        Assert.That(TestAssert.Single(result.Segments).Name, Is.EqualTo("People"));
    }

    [Test]
    public async Task Unresolved_without_recognition_or_tags()
    {
        var noRecognition = await _sut.ResolveAsync(CurationContexts.Create());
        var nullResult = await _sut.ResolveAsync(CurationContexts.Create() with
        {
            RecognizeAsync = (_, _) => Task.FromResult<RecognitionResult?>(null),
        });
        var empty = await _sut.ResolveAsync(WithTags(CurationContexts.Create()));

        Assert.That(noRecognition.IsResolved, Is.False);
        Assert.That(nullResult.IsResolved, Is.False);
        Assert.That(empty.IsResolved, Is.False);
    }
}
