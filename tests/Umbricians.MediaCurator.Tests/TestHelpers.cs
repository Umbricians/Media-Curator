using System.Globalization;
using System.Text.Json.Nodes;
using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Tests;

internal static class TestContext
{
    public static CurationContext Create(
        string name = "Sample Image",
        DateTime? createDate = null,
        DateTime? updateDate = null,
        string culture = "en-US",
        JsonObject? settings = null)
        => new()
        {
            MediaKey = Guid.NewGuid(),
            MediaName = name,
            CreateDate = createDate ?? new DateTime(2026, 6, 10, 12, 0, 0, DateTimeKind.Utc),
            UpdateDate = updateDate ?? new DateTime(2026, 7, 1, 12, 0, 0, DateTimeKind.Utc),
            Culture = CultureInfo.GetCultureInfo(culture),
            Settings = settings ?? new JsonObject(),
        };

    public static JsonObject Settings(params (string Key, string Value)[] pairs)
    {
        var o = new JsonObject();
        foreach (var (k, v) in pairs)
        {
            o[k] = v;
        }

        return o;
    }
}

/// <summary>A configurable fake provider for executor tests.</summary>
internal sealed class FakeProvider : ICurationProvider
{
    private readonly Func<CurationContext, CurationResult> _resolve;

    public FakeProvider(string alias, Func<CurationContext, CurationResult> resolve)
    {
        Alias = alias;
        _resolve = resolve;
    }

    public string Alias { get; }

    public string Name => Alias;

    public string Icon => "icon-box";

    public IEnumerable<PropertyRequirement> Requirements => [];

    public ProviderSettingsSchema SettingsSchema => ProviderSettingsSchema.Empty;

    public Task<CurationResult> ResolveAsync(CurationContext context, CancellationToken cancellationToken = default)
        => Task.FromResult(_resolve(context));

    public static FakeProvider Fixed(string alias, string value)
        => new(alias, _ => CurationResult.Resolved(value, new FolderSegment(value)));

    public static FakeProvider Unresolvable(string alias)
        => new(alias, _ => CurationResult.Unresolved());
}
