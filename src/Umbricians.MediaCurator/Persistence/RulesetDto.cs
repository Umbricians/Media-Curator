using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbricians.MediaCurator.Persistence;

[TableName(TableName)]
[PrimaryKey("key", AutoIncrement = false)]
[ExplicitColumns]
internal sealed class RulesetDto
{
    public const string TableName = "mediaCuratorRuleset";

    [Column("key")]
    [PrimaryKeyColumn(AutoIncrement = false)]
    public Guid Key { get; set; }

    [Column("scopeRootKey")]
    [Index(IndexTypes.UniqueNonClustered, Name = "IX_mediaCuratorRuleset_scopeRootKey")]
    public Guid ScopeRootKey { get; set; }

    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Column("cultureName")]
    [NullSetting(NullSetting = NullSettings.Null)]
    public string? CultureName { get; set; }

    [Column("enabled")]
    public bool Enabled { get; set; }

    [Column("rulesJson")]
    [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
    public string RulesJson { get; set; } = "[]";

    [Column("dateUpdated")]
    public DateTime DateUpdated { get; set; }
}
