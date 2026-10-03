using Umbricians.MediaCurator.People;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Tests.People;

/// <summary>An in-memory people repository that applies moves and deletes the way the real one does.</summary>
internal sealed class FakePeopleRepository : IPeopleDetectionRepository
{
    public Dictionary<Guid, PeopleDetection> Rows { get; } = [];

    public List<(IReadOnlyCollection<Guid> Keys, IReadOnlyCollection<string> FolderPaths)> Queries { get; } = [];

    public void Add(Guid key, string path, bool containsPeople = true, string? sourceFile = "/media/a.jpg")
        => Rows[key] = new PeopleDetection(key, containsPeople, 0.9, PeopleDetectionSources.Jev, path, sourceFile, DateTime.UtcNow);

    public Task<IReadOnlyDictionary<Guid, PeopleDetection>> GetManyAsync(
        IReadOnlyCollection<Guid> mediaKeys,
        CancellationToken cancellationToken = default)
        => Task.FromResult<IReadOnlyDictionary<Guid, PeopleDetection>>(
            Rows.Where(r => mediaKeys.Contains(r.Key)).ToDictionary(r => r.Key, r => r.Value));

    public Task SaveAsync(PeopleDetection detection, CancellationToken cancellationToken = default)
    {
        Rows[detection.MediaKey] = detection;
        return Task.CompletedTask;
    }

    public Task<IReadOnlyList<PeopleDetection>> FindWithPeopleAsync(
        IReadOnlyCollection<Guid> mediaKeys,
        IReadOnlyCollection<string> folderPaths,
        CancellationToken cancellationToken = default)
    {
        Queries.Add((mediaKeys, folderPaths));
        var patterns = folderPaths.Select(p => PeopleDetectionRepository.DescendantPattern(p).TrimEnd('%')).ToList();
        return Task.FromResult<IReadOnlyList<PeopleDetection>>(Rows.Values
            .Where(r => r.ContainsPeople && (mediaKeys.Contains(r.MediaKey) || patterns.Any(p => r.Path.StartsWith(p, StringComparison.Ordinal))))
            .ToList());
    }

    public Task MovePathAsync(string oldPath, string newPath, CancellationToken cancellationToken = default)
    {
        foreach (var row in Rows.Values.ToList())
        {
            Rows[row.MediaKey] = row with { Path = PeopleDetectionRepository.RewritePath(row.Path, oldPath, newPath) };
        }

        return Task.CompletedTask;
    }

    public Task DeleteAsync(IReadOnlyCollection<(Guid MediaKey, string Path)> items, CancellationToken cancellationToken = default)
    {
        foreach (var (key, path) in items)
        {
            Rows.Remove(key);
            foreach (var below in Rows.Values.Where(r => r.Path.StartsWith(path + ",", StringComparison.Ordinal)).ToList())
            {
                Rows.Remove(below.MediaKey);
            }
        }

        return Task.CompletedTask;
    }
}

internal sealed class FakePeopleSettings(MediaCuratorSiteSettings settings, string? apiKey = null) : IMediaCuratorSettingsService
{
    public MediaCuratorSiteSettings Settings { get; } = settings;

    public Task<MediaCuratorSiteSettings> GetAsync(CancellationToken cancellationToken = default) => Task.FromResult(Settings);

    public Task SaveAsync(MediaCuratorSiteSettings value, CancellationToken cancellationToken = default) => Task.CompletedTask;

    public Task<string?> GetTypeSafeApiKeyAsync(CancellationToken cancellationToken = default) => Task.FromResult(apiKey);

    public Task SetTypeSafeApiKeyAsync(string? key, CancellationToken cancellationToken = default) => Task.CompletedTask;
}
