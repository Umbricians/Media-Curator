using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Cms.Infrastructure.Scoping;

namespace Umbricians.MediaCurator.Engine;

/// <summary>Folders or items pinned/excluded so MediaCurator never touches them (§11.2).
/// Excluding a folder excludes its whole subtree.</summary>
internal interface IExclusionRepository
{
    Task<IReadOnlySet<Guid>> GetAllAsync(CancellationToken cancellationToken = default);

    Task SetAsync(Guid mediaKey, bool excluded, CancellationToken cancellationToken = default);
}

[TableName(TableName)]
[PrimaryKey("mediaKey", AutoIncrement = false)]
[ExplicitColumns]
internal sealed class ExclusionDto
{
    public const string TableName = "mediaCuratorExclusion";

    [Column("mediaKey")]
    [PrimaryKeyColumn(AutoIncrement = false)]
    public Guid MediaKey { get; set; }

    [Column("dateCreated")]
    public DateTime DateCreated { get; set; }
}

internal sealed class ExclusionRepository : IExclusionRepository
{
    private readonly IScopeProvider _scopeProvider;
    private readonly TimeProvider _time;

    public ExclusionRepository(IScopeProvider scopeProvider, TimeProvider time)
    {
        _scopeProvider = scopeProvider;
        _time = time;
    }

    public Task<IReadOnlySet<Guid>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        using var scope = _scopeProvider.CreateScope(autoComplete: true);
        var keys = scope.Database.Fetch<ExclusionDto>().Select(d => d.MediaKey).ToHashSet();
        return Task.FromResult<IReadOnlySet<Guid>>(keys);
    }

    public Task SetAsync(Guid mediaKey, bool excluded, CancellationToken cancellationToken = default)
    {
        using var scope = _scopeProvider.CreateScope();
        scope.Database.Delete<ExclusionDto>(mediaKey);
        if (excluded)
        {
            scope.Database.Insert(new ExclusionDto { MediaKey = mediaKey, DateCreated = _time.GetUtcNow().UtcDateTime });
        }

        scope.Complete();
        return Task.CompletedTask;
    }
}
