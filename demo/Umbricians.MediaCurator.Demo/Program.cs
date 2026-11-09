using Microsoft.Extensions.Options;
using OpenIddict.Server.AspNetCore;
using Umbricians.MediaCurator.Demo;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

string sqliteDataDirectory = Path.Combine(builder.Environment.ContentRootPath, "umbraco", "Data");
Directory.CreateDirectory(sqliteDataDirectory);
AppDomain.CurrentDomain.SetData("DataDirectory", sqliteDataDirectory);
SqliteWalBootstrapper.Configure(builder.Configuration, sqliteDataDirectory);

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddComposers()
    .Build();

SwaggerGenOptionsWorkaround.Apply(builder.Services);

// Demo site only: allow backoffice OAuth over plain HTTP so E2E tests can run
// without a trusted HTTPS dev certificate (OpenIddict rejects HTTP by default).
builder.Services.Configure<OpenIddictServerAspNetCoreOptions>(
    options => options.DisableTransportSecurityRequirement = true);

WebApplication app = builder.Build();

await app.BootUmbracoAsync();

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

await app.RunAsync();
