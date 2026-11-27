using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Time.Testing;
using Umbricians.MediaCurator.Composers;
using Umbricians.MediaCurator.Configuration;
using Umbricians.MediaCurator.Controllers;
using Umbricians.MediaCurator.Rules;
#if !UMBRACO_18_OR_GREATER
using Swashbuckle.AspNetCore.SwaggerGen;
using Umbricians.MediaCurator.OpenApi;
#endif

namespace Umbricians.MediaCurator.Tests.Composers;

// What AddMediaCurator registers, on a plain ServiceCollection. What needs the Umbraco builder (collections,
// notification handlers, and the API document from Umbraco 18) is the composer's, and the smoke test checks it.
public class ServiceCollectionExtensionsTests
{
    [Test]
    public void Lets_MVC_find_the_package_controllers()
    {
        ServiceCollection services = WithPackageServices();

        var partManager = (ApplicationPartManager)services
            .Single(service => service.ServiceType == typeof(ApplicationPartManager)).ImplementationInstance!;

        Assert.That(partManager.FeatureProviders, Has.Some.InstanceOf<MediaCuratorControllerFeatureProvider>());
    }

    [Test]
    public void Keeps_a_time_provider_the_site_registered()
    {
        var siteTimeProvider = new FakeTimeProvider();
        var services = new ServiceCollection();
        services.AddSingleton<TimeProvider>(siteTimeProvider);

        services.AddMediaCurator(new ConfigurationBuilder().Build());

        Assert.That(services.BuildServiceProvider().GetRequiredService<TimeProvider>(), Is.SameAs(siteTimeProvider));
    }

    // A site may replace a service by registering its own, before or after the package's composer runs.
    [Test]
    public void Keeps_a_service_the_site_registered()
    {
        var services = new ServiceCollection();
        services.AddScoped<IClassificationSchemeLocator, SiteSchemeLocator>();

        services.AddMediaCurator(new ConfigurationBuilder().Build());

        var locators = services.Where(service => service.ServiceType == typeof(IClassificationSchemeLocator));
        Assert.That(locators.Select(service => service.ImplementationType), Is.EqualTo(new[] { typeof(SiteSchemeLocator) }));
    }

    [Test]
    public void Validates_the_options_from_their_annotations()
    {
        ServiceProvider provider = WithPackageServices().BuildServiceProvider();

        Assert.That(provider.GetServices<IValidateOptions<MediaCuratorOptions>>(), Is.Not.Empty);
    }

    [Test]
    public async Task Validates_the_options_when_the_site_starts()
    {
        ServiceCollection services = WithPackageServices();
        services.AddSingleton<IValidateOptions<MediaCuratorOptions>>(
            new ValidateOptions<MediaCuratorOptions>(Options.DefaultName, _ => false, "Rejected by the test."));
        ServiceProvider provider = services.BuildServiceProvider();

#if UMBRACO_19_OR_GREATER
        // .NET 11 validates at startup asynchronously.
        IAsyncStartupValidator startupValidator = provider.GetRequiredService<IAsyncStartupValidator>();
        await Assert.ThatAsync(async () => await startupValidator.ValidateAsync(CancellationToken.None),
            Throws.TypeOf<OptionsValidationException>());
#else
        IStartupValidator startupValidator = provider.GetRequiredService<IStartupValidator>();
        Assert.That(startupValidator.Validate, Throws.TypeOf<OptionsValidationException>());
        await Task.CompletedTask;
#endif
    }

#if !UMBRACO_18_OR_GREATER
    [Test]
    public void Adds_the_package_api_document()
    {
        ServiceProvider provider = WithPackageServices().BuildServiceProvider();

        SwaggerGenOptions swagger = provider.GetRequiredService<IOptions<SwaggerGenOptions>>().Value;

        Assert.That(swagger.SwaggerGeneratorOptions.SwaggerDocs, Does.ContainKey(Constants.ApiName));
    }

    [Test]
    public void Sends_the_backoffice_token_from_the_package_api_document()
    {
        ServiceProvider provider = WithPackageServices().BuildServiceProvider();

        SwaggerGenOptions swagger = provider.GetRequiredService<IOptions<SwaggerGenOptions>>().Value;

        Assert.That(swagger.OperationFilterDescriptors.Select(filter => filter.Type),
            Has.Member(typeof(MediaCuratorSecurityRequirementsOperationFilter)));
    }
#endif

    private static ServiceCollection WithPackageServices()
    {
        var services = new ServiceCollection();
        services.AddMediaCurator(new ConfigurationBuilder().Build());
        return services;
    }

    private sealed class SiteSchemeLocator : IClassificationSchemeLocator
    {
        public Task<string?> GetSchemeForMediaAsync(Guid mediaKey, CancellationToken cancellationToken = default)
            => Task.FromResult<string?>(null);
    }
}
