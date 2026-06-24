using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Cms.Infrastructure.Scoping;

namespace Umbricians.MediaCurator.Engine;

public sealed record CurationRun(
    Guid Key,
    Guid ScopeFolderKey,
    Guid RulesetKey,
    string Trigger,
    DateTime Started,
    DateTime? Completed,
    int Moved,
    int AlreadyInPlace,
    int Failed);

public sealed record CurationRunItem(
    Guid RunKey,
    Guid MediaKey,
    string MediaName,
    Guid FromParentKey,
    Guid? ToParentKey,
    string TargetPath,
    bool Success,
    string? Note);

/// <summary>Activity log: what moved, when, why, by which trigger — with original locations
/// recorded so a run can be undone (§11.2). Environment-local; never synced (§13).</summary>
public interface ICurationRunLog
{
    Task<Guid> StartRunAsync(Guid scopeFolderKey, Guid rulesetKey, string trigger, CancellationToken ct = default);

    Task RecordItemAsync(Guid runKey, Guid mediaKey, string mediaName, Guid fromParentKey, Guid? toParentKey, string targetPath, bool success, string? note, CancellationToken ct = default);

    Task CompleteRunAsync(Guid runKey, int moved, int alreadyInPlace, int failed, CancellationToken ct = default);

    Task<IReadOnlyList<CurationRun>> GetRunsAsync(int take = 50, CancellationToken ct = default);

    Task<IReadOnlyList<CurationRunItem>> GetRunItemsAsync(Guid runKey, CancellationToken ct = default);
}

[TableName(TableName)]
[PrimaryKey("key", AutoIncrement = false)]
[ExplicitColumns]
internal sealed class CurationRunDto
{
    public const string TableName = "mediaCuratorRun";

    [Column("key")]
    [PrimaryKeyColumn(AutoIncrement = false)]
    public Guid Key { get; set; }

    [Column("scopeFolderKey")]
    public Guid ScopeFolderKey { get; set; }

    [Column("rulesetKey")]
    public Guid RulesetKey { get; set; }

    [Column("trigger")]
    public string Trigger { get; set; } = string.Empty;

    [Column("started")]
    public DateTime Started { get; set; }

    [Column("completed")]
    [NullSetting(NullSetting = NullSettings.Null)]
    public DateTime? Completed { get; set; }

    [Column("moved")]
    public int Moved { get; set; }

    [Column("alreadyInPlace")]
    public int AlreadyInPlace { get; set; }

    [Column("failed")]
    public int Failed { get; set; }
}

[TableName(TableName)]
[PrimaryKey("id", AutoIncrement = true)]
[ExplicitColumns]
internal sealed class CurationRunItemDto
{
    public const string TableName = "mediaCuratorRunItem";

    [Column("id")]
    [PrimaryKeyColumn(AutoIncrement = true)]
    public int Id { get; set; }

    [Column("runKey")]
    [Index(IndexTypes.NonClustered, Name = "IX_mediaCuratorRunItem_runKey")]
    public Guid RunKey { get; set; }

    [Column("mediaKey")]
    public Guid MediaKey { get; set; }

    [Column("mediaName")]
    public string MediaName { get; set; } = string.Empty;

    [Column("fromParentKey")]
    public Guid FromParentKey { get; set; }

    [Column("toParentKey")]
    [NullSetting(NullSetting = NullSettings.Null)]
    public Guid? ToParentKey { get; set; }

    [Column("targetPath")]
    public string TargetPath { get; set; } = string.Empty;

    [Column("success")]
    public bool Success { get; set; }

    [Column("note")]
    [NullSetting(NullSetting = NullSettings.Null)]
    public string? Note { get; set; }
}

internal sealed class CurationRunLog : ICurationRunLog
{
    private readonly IScopeProvider _scopeProvider;

    public CurationRunLog(IScopeProvider scopeProvider) => _scopeProvider = scopeProvider;

    public Task<Guid> StartRunAsync(Guid scopeFolderKey, Guid rulesetKey, string trigger, CancellationToken ct = default)
    {
        var key = Guid.NewGuid();
        using var scope = _scopeProvider.CreateScope();
        scope.Database.Insert(new CurationRunDto
        {
            Key = key,
            ScopeFolderKey = scopeFolderKey,
            RulesetKey = rulesetKey,
            Trigger = trigger,
            Started = DateTime.UtcNow,
        });
        scope.Complete();
        return Task.FromResult(key);
    }

    public Task RecordItemAsync(Guid runKey, Guid mediaKey, string mediaName, Guid fromParentKey, Guid? toParentKey, string targetPath, bool success, string? note, CancellationToken ct = default)
    {
        using var scope = _scopeProvider.CreateScope();
        scope.Database.Insert(new CurationRunItemDto
        {
            RunKey = runKey,
            MediaKey = mediaKey,
            MediaName = mediaName,
            FromParentKey = fromParentKey,
            ToParentKey = toParentKey,
            TargetPath = targetPath,
            Success = success,
            Note = note,
        });
        scope.Complete();
        return Task.CompletedTask;
    }

    public Task CompleteRunAsync(Guid runKey, int moved, int alreadyInPlace, int failed, CancellationToken ct = default)
    {
        using var scope = _scopeProvider.CreateScope();
        var dto = scope.Database.SingleOrDefaultById<CurationRunDto>(runKey);
        if (dto is not null)
        {
            dto.Completed = DateTime.UtcNow;
            dto.Moved = moved;
            dto.AlreadyInPlace = alreadyInPlace;
            dto.Failed = failed;
            scope.Database.Update(dto);
        }

        scope.Complete();
        return Task.CompletedTask;
    }

    public Task<IReadOnlyList<CurationRun>> GetRunsAsync(int take = 50, CancellationToken ct = default)
    {
        using var scope = _scopeProvider.CreateScope(autoComplete: true);
        // Page() generates provider-appropriate paging SQL (SQLite and SQL Server).
        var page = scope.Database.Page<CurationRunDto>(1, Math.Clamp(take, 1, 500), "SELECT * FROM mediaCuratorRun ORDER BY started DESC");
        return Task.FromResult<IReadOnlyList<CurationRun>>(page.Items.Select(Map).ToList());
    }

    public Task<IReadOnlyList<CurationRunItem>> GetRunItemsAsync(Guid runKey, CancellationToken ct = default)
    {
        using var scope = _scopeProvider.CreateScope(autoComplete: true);
        var dtos = scope.Database.Fetch<CurationRunItemDto>("WHERE runKey = @0", runKey);
        return Task.FromResult<IReadOnlyList<CurationRunItem>>(dtos
            .Select(d => new CurationRunItem(d.RunKey, d.MediaKey, d.MediaName, d.FromParentKey, d.ToParentKey, d.TargetPath, d.Success, d.Note))
            .ToList());
    }

    private static CurationRun Map(CurationRunDto d)
        => new(d.Key, d.ScopeFolderKey, d.RulesetKey, d.Trigger, d.Started, d.Completed, d.Moved, d.AlreadyInPlace, d.Failed);
}
