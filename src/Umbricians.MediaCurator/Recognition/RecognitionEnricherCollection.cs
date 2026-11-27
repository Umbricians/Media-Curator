using Umbraco.Cms.Core.Composing;

namespace Umbricians.MediaCurator.Recognition;

internal sealed class RecognitionEnricherCollection : BuilderCollectionBase<IRecognitionEnricher>
{
    public RecognitionEnricherCollection(Func<IEnumerable<IRecognitionEnricher>> items)
        : base(items)
    {
    }
}

internal sealed class RecognitionEnricherCollectionBuilder
    : LazyCollectionBuilderBase<RecognitionEnricherCollectionBuilder, RecognitionEnricherCollection, IRecognitionEnricher>
{
    protected override RecognitionEnricherCollectionBuilder This => this;
}
