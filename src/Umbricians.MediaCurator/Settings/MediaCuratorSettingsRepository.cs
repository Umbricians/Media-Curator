using NPoco;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbricians.MediaCurator.Persistence;

namespace Umbricians.MediaCurator.Settings;

internal interface IMediaCuratorSettingsRepository
{
    Task<SiteSettingsDto?> GetAsync(CancellationToken cancellationToken = default);

    Task SaveAsync(SiteSettingsDto dto, CancellationToken cancellationToken = default);
}

internal sealed class MediaCuratorSettingsRepository : IMediaCuratorSettingsRepository
{
    private readonly IScopeProvider _scopeProvider;
    private readonly TimeProvider _time;

    public MediaCuratorSettingsRepository(IScopeProvider scopeProvider, TimeProvider time)
    {
        _scopeProvider = scopeProvider;
        _time = time;
    }

    public async Task<SiteSettingsDto?> GetAsync(CancellationToken cancellationToken = default)
    {
        using var scope = _scopeProvider.CreateScope(autoComplete: true);
        return await scope.Database.FirstOrDefaultAsync<SiteSettingsDto>(
            "WHERE id = @0",
            SiteSettingsDto.SingletonId);
    }

    public async Task SaveAsync(SiteSettingsDto dto, CancellationToken cancellationToken = default)
    {
        dto.Id = SiteSettingsDto.SingletonId;
        dto.DateUpdated = _time.GetUtcNow().UtcDateTime;

        using var scope = _scopeProvider.CreateScope();
        var existing = await scope.Database.FirstOrDefaultAsync<SiteSettingsDto>(
            "WHERE id = @0",
            SiteSettingsDto.SingletonId);

        if (existing is null)
        {
            await scope.Database.InsertAsync(dto);
        }
        else
        {
            await scope.Database.UpdateAsync(dto);
        }

        scope.Complete();
    }
}
