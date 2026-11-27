namespace Umbricians.MediaCurator.Configuration;

/// <summary>
/// Options bound from the <c>Umbricians:MediaCurator</c> configuration section. Everything else is configured in the
/// backoffice; only secrets can come from server configuration.
/// </summary>
public class MediaCuratorOptions
{
    /// <summary>Secrets that can come from server configuration instead of the backoffice.</summary>
    public MediaCuratorSecretsOptions Secrets { get; set; } = new();
}

/// <summary>Secrets under <c>Umbricians:MediaCurator:Secrets</c>.</summary>
public class MediaCuratorSecretsOptions
{
    /// <summary>When set, used instead of a key saved in the backoffice, which is then locked.</summary>
    public string? TypeSafeApiKey { get; set; }
}
