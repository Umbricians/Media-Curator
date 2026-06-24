using Umbraco.Cms.Core.Notifications;

namespace Umbricians.MediaCurator.Engine;

/// <summary>Published before a curation plan is executed; cancel to veto the run (§12).</summary>
public sealed class MediaCuratingNotification : ICancelableNotification
{
    public MediaCuratingNotification(CurationPlan plan, string trigger)
    {
        Plan = plan;
        Trigger = trigger;
    }

    public CurationPlan Plan { get; }

    public string Trigger { get; }

    public bool Cancel { get; set; }
}

/// <summary>Published after a curation run completes (§12); the Automate companion package
/// maps this onto its "Media curated" workflow trigger.</summary>
public sealed class MediaCuratedNotification : INotification
{
    public MediaCuratedNotification(Guid scopeFolderKey, Guid rulesetKey, CurationRunSummary summary, string trigger)
    {
        ScopeFolderKey = scopeFolderKey;
        RulesetKey = rulesetKey;
        Summary = summary;
        Trigger = trigger;
    }

    public Guid ScopeFolderKey { get; }

    public Guid RulesetKey { get; }

    public CurationRunSummary Summary { get; }

    public string Trigger { get; }
}

/// <summary>Published when a curation run had failing items (§9.1).</summary>
public sealed class MediaCurationFailedNotification : INotification
{
    public MediaCurationFailedNotification(Guid scopeFolderKey, Guid rulesetKey, CurationRunSummary summary, string trigger)
    {
        ScopeFolderKey = scopeFolderKey;
        RulesetKey = rulesetKey;
        Summary = summary;
        Trigger = trigger;
    }

    public Guid ScopeFolderKey { get; }

    public Guid RulesetKey { get; }

    public CurationRunSummary Summary { get; }

    public string Trigger { get; }
}
