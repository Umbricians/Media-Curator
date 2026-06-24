using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Cms.Infrastructure.Scoping;

namespace Umbricians.MediaCurator.Provisioning;

/// <summary>A requirement mapped onto an existing property with a different alias (§7).</summary>
public sealed record PropertyMap(string RequirementAlias, string MediaTypeAlias, string PropertyAlias);

public interface IPropertyMapRepository
{
    Task<IReadOnlyList<PropertyMap>> GetAllAsync(CancellationToken cancellationToken = default);

    Task SaveAsync(PropertyMap map, CancellationToken cancellationToken = default);
}

[TableName(TableName)]
[PrimaryKey("id", AutoIncrement = true)]
[ExplicitColumns]
internal sealed class PropertyMapDto
{
    public const string TableName = "mediaCuratorPropertyMap";

    [Column("id")]
    [PrimaryKeyColumn(AutoIncrement = true)]
    public int Id { get; set; }

    [Column("requirementAlias")]
    public string RequirementAlias { get; set; } = string.Empty;

    [Column("mediaTypeAlias")]
    public string MediaTypeAlias { get; set; } = string.Empty;

    [Column("propertyAlias")]
    public string PropertyAlias { get; set; } = string.Empty;
}

internal sealed class PropertyMapRepository : IPropertyMapRepository
{
    private readonly IScopeProvider _scopeProvider;

    public PropertyMapRepository(IScopeProvider scopeProvider) => _scopeProvider = scopeProvider;

    public Task<IReadOnlyList<PropertyMap>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        using var scope = _scopeProvider.CreateScope(autoComplete: true);
        var dtos = scope.Database.Fetch<PropertyMapDto>();
        return Task.FromResult<IReadOnlyList<PropertyMap>>(
            dtos.Select(d => new PropertyMap(d.RequirementAlias, d.MediaTypeAlias, d.PropertyAlias)).ToList());
    }

    public Task SaveAsync(PropertyMap map, CancellationToken cancellationToken = default)
    {
        using var scope = _scopeProvider.CreateScope();
        // One mapping per requirement/media type pair: replace any existing row.
        scope.Database.Execute(
            $"DELETE FROM {TableNameQuoted(scope)} WHERE requirementAlias = @0 AND mediaTypeAlias = @1",
            map.RequirementAlias, map.MediaTypeAlias);
        scope.Database.Insert(new PropertyMapDto
        {
            RequirementAlias = map.RequirementAlias,
            MediaTypeAlias = map.MediaTypeAlias,
            PropertyAlias = map.PropertyAlias,
        });
        scope.Complete();
        return Task.CompletedTask;
    }

    private static string TableNameQuoted(IScope scope)
        => scope.Database.DatabaseType.EscapeTableName(PropertyMapDto.TableName);
}
