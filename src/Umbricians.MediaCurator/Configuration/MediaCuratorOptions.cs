namespace Umbricians.MediaCurator.Configuration;

/// <summary>
/// Options bound from the <c>Umbricians:MediaCurator</c> configuration section. Everything else is configured in the
/// backoffice; only secrets can come from server configuration.
/// </summary>
public class MediaCuratorOptions
{
    public MediaCuratorSecretsOptions Secrets { get; set; } = new();
}

public class MediaCuratorSecretsOptions
{
    /// <summary>When set, used instead of a key saved in the backoffice, which is then locked.</summary>
    public string? TypeSafeApiKey { get; set; }
}
