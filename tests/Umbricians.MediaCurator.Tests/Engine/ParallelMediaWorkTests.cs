using Microsoft.Extensions.DependencyInjection;
using Umbricians.MediaCurator.Engine;
using Umbricians.MediaCurator.Settings;

namespace Umbricians.MediaCurator.Tests.Engine;

public class ParallelMediaWorkTests
{
    private static readonly AsyncLocal<string?> Ambient = new();

    private sealed class Settings(int parallel) : IMediaCuratorSettingsService
    {
        public Task<string?> GetTypeSafeApiKeyAsync(CancellationToken cancellationToken = default) => Task.FromResult<string?>(null);

        public Task SetTypeSafeApiKeyAsync(string? apiKey, CancellationToken cancellationToken = default) => Task.CompletedTask;

        public Task<MediaCuratorSiteSettings> GetAsync(CancellationToken cancellationToken = default)
            => Task.FromResult(new MediaCuratorSiteSettings { MaxParallelAnalyses = parallel });

        public Task SaveAsync(MediaCuratorSiteSettings settings, CancellationToken cancellationToken = default)
            => Task.CompletedTask;
    }

    private sealed class PerScope
    {
        public Guid Id { get; } = Guid.NewGuid();
    }

    /// <summary>Re-applies <see cref="Ambient"/> inside workers, like the Automate origin carrier.</summary>
    private sealed class AmbientFlow : IParallelContextFlow
    {
        public Func<IDisposable?> Capture()
        {
            var value = Ambient.Value;
            return () =>
            {
                Ambient.Value = value;
                return null;
            };
        }
    }

    private static ParallelMediaWork Create(int parallel, params IParallelContextFlow[] flows)
    {
        var provider = new ServiceCollection().AddScoped<PerScope>().BuildServiceProvider();
        return new ParallelMediaWork(provider.GetRequiredService<IServiceScopeFactory>(), new Settings(parallel), flows);
    }

    [Fact]
    public async Task Runs_up_to_the_configured_number_at_once_and_keeps_input_order()
    {
        var work = Create(parallel: 3);
        var running = 0;
        var maxSeen = 0;

        var results = await work.RunAsync(
            Enumerable.Range(0, 12).ToList(),
            async (_, i, ct) =>
            {
                var now = Interlocked.Increment(ref running);
                lock (work)
                {
                    maxSeen = Math.Max(maxSeen, now);
                }

                await Task.Delay(20 + (11 - i) * 3, ct);
                Interlocked.Decrement(ref running);
                return i * 10;
            });

        Assert.Equal(Enumerable.Range(0, 12).Select(i => i * 10), results);
        Assert.Equal(3, maxSeen);
    }

    [Fact]
    public async Task Each_item_gets_its_own_service_scope()
    {
        var work = Create(parallel: 4);

        var ids = await work.RunAsync(
            Enumerable.Range(0, 6).ToList(),
            (services, _, _) => Task.FromResult(services.GetRequiredService<PerScope>().Id));

        Assert.Equal(6, ids.Distinct().Count());
    }

    [Fact]
    public async Task Workers_do_not_inherit_the_callers_ambient_context()
    {
        var work = Create(parallel: 2);
        Ambient.Value = "caller";

        var seen = await work.RunAsync([1, 2], (_, _, _) => Task.FromResult(Ambient.Value));

        Assert.All(seen, Assert.Null);
        Assert.Equal("caller", Ambient.Value);
    }

    [Fact]
    public async Task Context_flows_carry_chosen_state_into_workers()
    {
        var work = Create(parallel: 2, new AmbientFlow());
        Ambient.Value = "automation-42";

        var seen = await work.RunAsync([1, 2, 3], (_, _, _) => Task.FromResult(Ambient.Value));

        Assert.All(seen, v => Assert.Equal("automation-42", v));
    }

    [Fact]
    public async Task A_failing_item_fails_the_run()
    {
        var work = Create(parallel: 2);

        await Assert.ThrowsAsync<InvalidOperationException>(() => work.RunAsync<int, int>(
            [1, 2, 3],
            (_, i, _) => i == 2 ? throw new InvalidOperationException("boom") : Task.FromResult(i)));
    }
}
