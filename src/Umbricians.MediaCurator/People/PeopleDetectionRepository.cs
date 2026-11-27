using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Extensions;

namespace Umbricians.MediaCurator.People;

/// <summary>Whether one image shows people, as decided from its AI description.</summary>
/// <param name="MediaKey">The media item the decision is for.</param>
/// <param name="ContainsPeople">Whether the image shows people.</param>
/// <param name="Confidence">Probability (0–1) of the stored answer, so 0.9 means "90% sure".</param>
/// <param name="Source">What decided it: <see cref="PeopleDetectionSources"/>.</param>
/// <param name="Path">The media item's Umbraco path ("-1,1051,1073"), kept current as media moves, so folders
/// can find flagged images below them with one prefix query.</param>
/// <param name="SourceFile">The media file the decision describes; a different file makes it stale.</param>
/// <param name="UpdateDate">When the decision was made.</param>
internal sealed record PeopleDetection(
    Guid MediaKey,
    bool ContainsPeople,
    double Confidence,
    string Source,
    string Path,
    string? SourceFile,
    DateTime UpdateDate);

internal static class PeopleDetectionSources
{
    public const string Jev = "jev";

    public const string UmbracoAi = "umbraco-ai";
}

/// <summary>
/// Stored people decisions. The media tree's flag provider reads only this table, so badges never cost an
/// AI call; analysis writes it and media notifications keep its paths current.
/// </summary>
internal interface IPeopleDetectionRepository
{
    Task<IReadOnlyDictionary<Guid, PeopleDetection>> GetManyAsync(
        IReadOnlyCollection<Guid> mediaKeys,
        CancellationToken cancellationToken = default);

    Task SaveAsync(PeopleDetection detection, CancellationToken cancellationToken = default);

    /// <summary>The images with people that are either one of <paramref name="mediaKeys"/> or sit anywhere below
    /// one of <paramref name="folderPaths"/>: one query, however many items a tree page shows.</summary>
    Task<IReadOnlyList<PeopleDetection>> FindWithPeopleAsync(
        IReadOnlyCollection<Guid> mediaKeys,
        IReadOnlyCollection<string> folderPaths,
        CancellationToken cancellationToken = default);

    /// <summary>Rewrites the stored path of the item at <paramref name="oldPath"/> and of everything below it.</summary>
    Task MovePathAsync(string oldPath, string newPath, CancellationToken cancellationToken = default);

    /// <summary>Removes the items' decisions and those of everything below them.</summary>
    Task DeleteAsync(IReadOnlyCollection<(Guid MediaKey, string Path)> items, CancellationToken cancellationToken = default);
}

[TableName(TableName)]
[PrimaryKey("mediaKey", AutoIncrement = false)]
[ExplicitColumns]
internal sealed class PeopleDetectionDto
{
    public const string TableName = "mediaCuratorPeople";

    [Column("mediaKey")]
    [PrimaryKeyColumn(AutoIncrement = false)]
    public Guid MediaKey { get; set; }

    [Column("containsPeople")]
    public bool ContainsPeople { get; set; }

    [Column("confidence")]
    public double Confidence { get; set; }

    [Column("source")]
    [Length(32)]
    public string Source { get; set; } = string.Empty;

    /// <summary>Same length as umbracoNode.path, so it can be indexed for the folder prefix query.</summary>
    [Column("path")]
    [Length(150)]
    [Index(IndexTypes.NonClustered, Name = "IX_mediaCuratorPeople_path")]
    public string Path { get; set; } = string.Empty;

    [Column("sourceFile")]
    [NullSetting(NullSetting = NullSettings.Null)]
    [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
    public string? SourceFile { get; set; }

    [Column("updateDate")]
    public DateTime UpdateDate { get; set; }

    public PeopleDetection ToModel() => new(MediaKey, ContainsPeople, Confidence, Source, Path, SourceFile, UpdateDate);

    public static PeopleDetectionDto From(PeopleDetection d) => new()
    {
        MediaKey = d.MediaKey,
        ContainsPeople = d.ContainsPeople,
        Confidence = d.Confidence,
        Source = d.Source,
        Path = d.Path,
        SourceFile = d.SourceFile,
        UpdateDate = d.UpdateDate,
    };
}

internal sealed class PeopleDetectionRepository : IPeopleDetectionRepository
{
    /// <summary>Keeps one query well under SQL Server's 2100 parameter limit; a tree page is far smaller.</summary>
    private const int MaxParametersPerQuery = 1000;

    private readonly IScopeProvider _scopeProvider;

    public PeopleDetectionRepository(IScopeProvider scopeProvider) => _scopeProvider = scopeProvider;

    public Task<IReadOnlyDictionary<Guid, PeopleDetection>> GetManyAsync(
        IReadOnlyCollection<Guid> mediaKeys,
        CancellationToken cancellationToken = default)
    {
        var found = new Dictionary<Guid, PeopleDetection>();
        if (mediaKeys.Count == 0)
        {
            return Task.FromResult<IReadOnlyDictionary<Guid, PeopleDetection>>(found);
        }

        using var scope = _scopeProvider.CreateScope(autoComplete: true);
        foreach (var chunk in mediaKeys.Distinct().Chunk(MaxParametersPerQuery))
        {
            var sql = scope.SqlContext.Sql()
                .Select("*")
                .From<PeopleDetectionDto>()
                .WhereIn<PeopleDetectionDto>(d => d.MediaKey, chunk);
            foreach (var dto in scope.Database.Fetch<PeopleDetectionDto>(sql))
            {
                found[dto.MediaKey] = dto.ToModel();
            }
        }

        return Task.FromResult<IReadOnlyDictionary<Guid, PeopleDetection>>(found);
    }

    public Task SaveAsync(PeopleDetection detection, CancellationToken cancellationToken = default)
    {
        using var scope = _scopeProvider.CreateScope();
        var dto = PeopleDetectionDto.From(detection);
        if (scope.Database.Update(dto) == 0)
        {
            scope.Database.Insert(dto);
        }

        scope.Complete();
        return Task.CompletedTask;
    }

    public Task<IReadOnlyList<PeopleDetection>> FindWithPeopleAsync(
        IReadOnlyCollection<Guid> mediaKeys,
        IReadOnlyCollection<string> folderPaths,
        CancellationToken cancellationToken = default)
    {
        var found = new List<PeopleDetection>();
        if (mediaKeys.Count == 0 && folderPaths.Count == 0)
        {
            return Task.FromResult<IReadOnlyList<PeopleDetection>>(found);
        }

        using var scope = _scopeProvider.CreateScope(autoComplete: true);
        var keys = mediaKeys.Distinct().ToArray();
        var prefixes = folderPaths.Distinct().Select(DescendantPattern).ToArray();
        for (int k = 0, p = 0; k < keys.Length || p < prefixes.Length;)
        {
            var keyChunk = keys.Skip(k).Take(MaxParametersPerQuery).ToArray();
            var prefixChunk = prefixes.Skip(p).Take(MaxParametersPerQuery - keyChunk.Length).ToArray();
            k += keyChunk.Length;
            p += prefixChunk.Length;

            var (where, args) = BuildWhere(keyChunk, prefixChunk);
            found.AddRange(scope.Database
                .Fetch<PeopleDetectionDto>($"SELECT * FROM {PeopleDetectionDto.TableName} WHERE {where}", args)
                .Select(d => d.ToModel()));
        }

        return Task.FromResult<IReadOnlyList<PeopleDetection>>(
            found.DistinctBy(d => d.MediaKey).ToList());
    }

    /// <summary>"containsPeople = 1 AND (mediaKey IN (...) OR path LIKE '-1,1051,%' OR ...)".</summary>
    internal static (string Where, object[] Args) BuildWhere(IReadOnlyList<Guid> keys, IReadOnlyList<string> patterns)
    {
        var args = new List<object> { true };
        var clauses = new List<string>();
        if (keys.Count > 0)
        {
            clauses.Add($"mediaKey IN (@{args.Count})");
            args.Add(keys);
        }

        foreach (var pattern in patterns)
        {
            clauses.Add($"path LIKE @{args.Count}");
            args.Add(pattern);
        }

        return ($"containsPeople = @0 AND ({string.Join(" OR ", clauses)})", args.ToArray());
    }

    /// <summary>Matches everything below a path but not a sibling sharing its digits: "-1,105," never
    /// matches "-1,1052". Paths hold only digits, commas and minus signs, so nothing needs escaping.</summary>
    internal static string DescendantPattern(string path) => path.TrimEnd(',') + ",%";

    public Task MovePathAsync(string oldPath, string newPath, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrEmpty(oldPath) || string.IsNullOrEmpty(newPath) || oldPath == newPath)
        {
            return Task.CompletedTask;
        }

        using var scope = _scopeProvider.CreateScope();

        // Rewritten in code rather than with SQL string functions, which differ between SQL Server and SQLite.
        var rows = scope.Database.Fetch<PeopleDetectionDto>(
            $"SELECT * FROM {PeopleDetectionDto.TableName} WHERE path = @0 OR path LIKE @1",
            oldPath,
            DescendantPattern(oldPath));
        foreach (var row in rows)
        {
            row.Path = RewritePath(row.Path, oldPath, newPath);
            scope.Database.Update(row);
        }

        scope.Complete();
        return Task.CompletedTask;
    }

    internal static string RewritePath(string path, string oldPath, string newPath)
        => path == oldPath ? newPath
            : path.StartsWith(oldPath + ",", StringComparison.Ordinal) ? newPath + path[oldPath.Length..]
            : path;

    public Task DeleteAsync(IReadOnlyCollection<(Guid MediaKey, string Path)> items, CancellationToken cancellationToken = default)
    {
        if (items.Count == 0)
        {
            return Task.CompletedTask;
        }

        using var scope = _scopeProvider.CreateScope();
        foreach (var (mediaKey, path) in items)
        {
            scope.Database.Delete<PeopleDetectionDto>(mediaKey);
            if (!string.IsNullOrEmpty(path))
            {
                scope.Database.Execute(
                    $"DELETE FROM {PeopleDetectionDto.TableName} WHERE path LIKE @0",
                    DescendantPattern(path));
            }
        }

        scope.Complete();
        return Task.CompletedTask;
    }
}
