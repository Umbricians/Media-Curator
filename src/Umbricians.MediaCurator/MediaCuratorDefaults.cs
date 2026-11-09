namespace Umbricians.MediaCurator;

/// <summary>
/// Built-in defaults and limits. Everything an administrator can change lives in the backoffice
/// (Settings › Media Curator › Setup) and is stored in the database; Media Curator reads no app settings.
/// </summary>
public static class MediaCuratorDefaults
{
    public const int RecognitionEdgePixels = 768;

    public const int MaxParallelAnalyses = 4;

    /// <summary>Upper bound for the "images analyzed at once" setting, so a typo cannot flood the AI provider.</summary>
    public const int MaxParallelAnalysesLimit = 16;

    /// <summary>"Curate images" on a folder with more images than this (at any depth) runs in the
    /// background: a single request for thousands of moves outlasts hosting time limits.</summary>
    public const int BackgroundCurationThreshold = 100;

    /// <summary>Deepest scheme level a classification decision reaches.</summary>
    public const int MaxClassificationDepth = 4;

    /// <summary>Largest number of final codes decided in one step; Jev accepts at most 255 options.</summary>
    public const int OneStepClassificationLimit = 255;

    public const string JevModel = "jev-latest";

    /// <summary>
    /// Server configuration key for the TypeSafe API key. When set (app settings, an environment variable such
    /// as <c>Umbricians__MediaCurator__Secrets__TypeSafeApiKey</c>, user secrets or Azure Key Vault), it is used instead of a
    /// key saved in the backoffice, which is then locked. Secrets are the only Media Curator configuration keys.
    /// </summary>
    public const string TypeSafeApiKeyConfigurationKey = Constants.ConfigurationSection + ":Secrets:TypeSafeApiKey";

    public const string TypeSafeEndpoint = "https://api.typesafe.ai/v1/systemone";

    public const int TypeSafeTimeoutSeconds = 15;

    /// <summary>Where prepared images are written when "Save prepared images" is on, relative to the site root.</summary>
    public static readonly string PreparedImagesFolder = Path.Combine("umbraco", "Data", "TEMP", "MediaCurator", "PreparedImages");
}
