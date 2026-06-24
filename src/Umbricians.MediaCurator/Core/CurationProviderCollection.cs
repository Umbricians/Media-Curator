using Umbraco.Cms.Core.Composing;

namespace Umbricians.MediaCurator.Core;

public sealed class CurationProviderCollection : BuilderCollectionBase<ICurationProvider>
{
    public CurationProviderCollection(Func<IEnumerable<ICurationProvider>> items)
        : base(items)
    {
    }

    public ICurationProvider? GetByAlias(string alias)
        => this.FirstOrDefault(p => string.Equals(p.Alias, alias, StringComparison.OrdinalIgnoreCase));
}

public sealed class CurationProviderCollectionBuilder
    : LazyCollectionBuilderBase<CurationProviderCollectionBuilder, CurationProviderCollection, ICurationProvider>
{
    protected override CurationProviderCollectionBuilder This => this;
}
