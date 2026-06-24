using Umbraco.Automate.Core.Settings;
using Umbraco.Automate.Core.Triggers;
using Umbricians.MediaCurator.Engine;

namespace Umbricians.MediaCurator.Automate.Triggers;

file static class MediaCuratedTriggerFilters
{
    internal static bool MatchesScopeFilter(string? scopeFolderKey, Guid outputScopeFolderKey)
    {
        if (string.IsNullOrWhiteSpace(scopeFolderKey))
        {
            return true;
        }

        return Guid.TryParse(scopeFolderKey, out var scope) && scope == outputScopeFolderKey;
    }
}

public class MediaCuratedTriggerSettings
{
    /// <summary>Optional: only fire for runs on this scope folder. Empty = all scopes.</summary>
    [Field(SupportsBindings = true)]
    public string? ScopeFolderKey { get; set; }
}

public class MediaCuratedTriggerOutput
{
    public Guid ScopeFolderKey { get; set; }
    public Guid RulesetKey { get; set; }
    public Guid RunKey { get; set; }
    public int Moved { get; set; }
    public int AlreadyInPlace { get; set; }
    public int Failed { get; set; }
    public string Trigger { get; set; } = string.Empty;
}

/// <summary>Fires after a curation run completes, with the run summary available for
/// binding into downstream steps (§9.1).</summary>
[Trigger("mediaCurator.curated", "Media curated")]
public class MediaCuratedTrigger
    : NotificationTriggerBase<MediaCuratedTriggerSettings, MediaCuratedTriggerOutput, MediaCuratedNotification>
{
    public MediaCuratedTrigger(TriggerInfrastructure infrastructure)
        : base(infrastructure)
    {
    }

    public override IEnumerable<TriggerEvent> MapEvent(MediaCuratedNotification notification)
    {
        yield return new TriggerEvent<MediaCuratedTriggerOutput>
        {
            TriggerAlias = "mediaCurator.curated",
            InitiatorType = "mediaCurator",
            InitiatorId = notification.Summary.RunKey.ToString("N"),
            Output = new MediaCuratedTriggerOutput
            {
                ScopeFolderKey = notification.ScopeFolderKey,
                RulesetKey = notification.RulesetKey,
                RunKey = notification.Summary.RunKey,
                Moved = notification.Summary.Moved,
                AlreadyInPlace = notification.Summary.AlreadyInPlace,
                Failed = notification.Summary.Failed,
                Trigger = notification.Trigger,
            },
            IdempotencyKey = notification.Summary.RunKey.ToString("N"),
        };
    }

    protected override bool CanHandle(MediaCuratedTriggerOutput output, MediaCuratedTriggerSettings? settings)
        => MediaCuratedTriggerFilters.MatchesScopeFilter(settings?.ScopeFolderKey, output.ScopeFolderKey);
}

/// <summary>Fires when a curation run had failing items (§9.1).</summary>
[Trigger("mediaCurator.curationFailed", "Media curation failed")]
public class MediaCurationFailedTrigger
    : NotificationTriggerBase<MediaCuratedTriggerSettings, MediaCuratedTriggerOutput, MediaCurationFailedNotification>
{
    public MediaCurationFailedTrigger(TriggerInfrastructure infrastructure)
        : base(infrastructure)
    {
    }

    public override IEnumerable<TriggerEvent> MapEvent(MediaCurationFailedNotification notification)
    {
        yield return new TriggerEvent<MediaCuratedTriggerOutput>
        {
            TriggerAlias = "mediaCurator.curationFailed",
            InitiatorType = "mediaCurator",
            InitiatorId = notification.Summary.RunKey.ToString("N"),
            Output = new MediaCuratedTriggerOutput
            {
                ScopeFolderKey = notification.ScopeFolderKey,
                RulesetKey = notification.RulesetKey,
                RunKey = notification.Summary.RunKey,
                Moved = notification.Summary.Moved,
                AlreadyInPlace = notification.Summary.AlreadyInPlace,
                Failed = notification.Summary.Failed,
                Trigger = notification.Trigger,
            },
            IdempotencyKey = "failed-" + notification.Summary.RunKey.ToString("N"),
        };
    }

    protected override bool CanHandle(MediaCuratedTriggerOutput output, MediaCuratedTriggerSettings? settings)
        => MediaCuratedTriggerFilters.MatchesScopeFilter(settings?.ScopeFolderKey, output.ScopeFolderKey);
}
