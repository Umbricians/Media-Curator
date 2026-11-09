using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Umbricians.MediaCurator.Demo;

/// <summary>
/// Umbraco.Automate registers <see cref="Type"/> in Swagger without checking for an existing mapping.
/// Umbraco.AI registers the same mapping with a guard. When AI runs first, startup fails.
/// </summary>
internal static class SwaggerGenOptionsWorkaround
{
    public static void Apply(IServiceCollection services)
    {
        List<ServiceDescriptor> configureDescriptors = services
            .Where(d => d.ServiceType == typeof(IConfigureOptions<SwaggerGenOptions>))
            .ToList();

        foreach (ServiceDescriptor descriptor in configureDescriptors)
        {
            services.Remove(descriptor);
            services.Add(CreateGuardedDescriptor(descriptor));
        }
    }

    private static ServiceDescriptor CreateGuardedDescriptor(ServiceDescriptor descriptor)
    {
        if (descriptor.ImplementationType is Type implementationType)
        {
            return ServiceDescriptor.Singleton(
                typeof(IConfigureOptions<SwaggerGenOptions>),
                sp => new GuardedSwaggerConfigure(
                    (IConfigureOptions<SwaggerGenOptions>)ActivatorUtilities.CreateInstance(sp, implementationType)));
        }

        if (descriptor.ImplementationInstance is IConfigureOptions<SwaggerGenOptions> instance)
        {
            return ServiceDescriptor.Singleton(typeof(IConfigureOptions<SwaggerGenOptions>), new GuardedSwaggerConfigure(instance));
        }

        if (descriptor.ImplementationFactory is not null)
        {
            Func<IServiceProvider, object> factory = descriptor.ImplementationFactory;
            return ServiceDescriptor.Singleton(
                typeof(IConfigureOptions<SwaggerGenOptions>),
                sp => new GuardedSwaggerConfigure((IConfigureOptions<SwaggerGenOptions>)factory(sp)));
        }

        return descriptor;
    }

    private sealed class GuardedSwaggerConfigure(IConfigureOptions<SwaggerGenOptions> inner) : IConfigureOptions<SwaggerGenOptions>
    {
        public void Configure(SwaggerGenOptions options)
        {
            try
            {
                inner.Configure(options);
            }
            catch (ArgumentException ex) when (ex.Message.Contains("System.Type", StringComparison.Ordinal))
            {
                // Automate and AI both map System.Type for workflow binding schemas.
            }
        }
    }
}
