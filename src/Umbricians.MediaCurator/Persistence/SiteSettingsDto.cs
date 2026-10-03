using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbricians.MediaCurator.Persistence;

[TableName(TableName)]
[PrimaryKey("id", AutoIncrement = false)]
[ExplicitColumns]
internal sealed class SiteSettingsDto
{
    public const string TableName = "mediaCuratorSiteSettings";
    public const int SingletonId = 1;

    [Column("id")]
    [PrimaryKeyColumn(AutoIncrement = false)]
    public int Id { get; set; } = SingletonId;

    [Column("persistImageDescription")]
    public bool PersistImageDescription { get; set; } = true;

    /// <summary>AI settings as JSON (<see cref="Settings.StoredAiSettings"/>); null until first saved.</summary>
    [Column("aiSettings")]
    [NullSetting(NullSetting = NullSettings.Null)]
    [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
    public string? AiSettings { get; set; }

    [Column("dateUpdated")]
    public DateTime DateUpdated { get; set; }
}
