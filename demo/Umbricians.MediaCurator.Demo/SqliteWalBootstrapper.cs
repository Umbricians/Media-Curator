using Microsoft.Data.Sqlite;

namespace Umbricians.MediaCurator.Demo;

/// <summary>
/// Enables WAL mode on local SQLite files before Umbraco and Automate open connections.
/// The CMS NPoco layer sets WAL automatically; Automate's EF Core database does not.
/// </summary>
internal static class SqliteWalBootstrapper
{
    private static readonly string[] ConnectionStringNames =
    [
        "umbracoDbDSN",
        "umbracoAutomateDbDSN",
    ];

    public static void Configure(IConfiguration configuration, string dataDirectory)
    {
        foreach (string connectionStringName in ConnectionStringNames)
        {
            string? providerName = configuration[$"ConnectionStrings:{connectionStringName}_ProviderName"];
            if (!string.Equals(providerName, "Microsoft.Data.Sqlite", StringComparison.OrdinalIgnoreCase))
            {
                continue;
            }

            string? connectionString = configuration.GetConnectionString(connectionStringName);
            if (string.IsNullOrWhiteSpace(connectionString))
            {
                continue;
            }

            string resolved = connectionString.Replace(
                "|DataDirectory|",
                dataDirectory,
                StringComparison.Ordinal);

            var builder = new SqliteConnectionStringBuilder(resolved);
            string databasePath = Path.GetFullPath(builder.DataSource);
            string? directory = Path.GetDirectoryName(databasePath);
            if (!string.IsNullOrEmpty(directory))
            {
                Directory.CreateDirectory(directory);
            }

            if (!File.Exists(databasePath))
            {
                continue;
            }

            using var connection = new SqliteConnection(builder.ConnectionString);
            connection.Open();

            using var command = connection.CreateCommand();
            command.CommandText = """
                PRAGMA journal_mode=WAL;
                PRAGMA busy_timeout=5000;
                PRAGMA synchronous=NORMAL;
                """;
            command.ExecuteNonQuery();
        }
    }
}
