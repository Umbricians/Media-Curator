using Umbraco.Cms.Core.Notifications;

namespace Umbricians.MediaCurator.Engine;

/// <summary>Published before a curation plan is executed; cancel to veto the run (§12).</summary>
public sealed class MediaCuratingNotification : ICancelableNotification
{
    /// <summary>Creates the notification for a plan about to run.</summary>
    public MediaCuratingNotification(CurationPlan plan, string trigger)
    {
        Plan = plan;
        Trigger = trigger;
    }

    /// <summary>The moves the run is about to make.</summary>
    public CurationPlan Plan { get; }

    /// <summary>What started the run, such as the backoffice, a background run or a workflow.</summary>
    public string Trigger { get; }

    /// <summary>Set to true to stop the run before anything moves.</summary>
    public bool Cancel { get; set; }
}

/// <summary>Published after a curation run completes (§12); the Automate companion package
/// maps this onto its "Media curated" workflow trigger.</summary>
public sealed class MediaCuratedNotification : INotification
{
    /// <summary>Creates the notification for a finished run.</summary>
    public MediaCuratedNotification(Guid scopeFolderKey, Guid rulesetKey, CurationRunSummary summary, string trigger)
    {
        ScopeFolderKey = scopeFolderKey;
        RulesetKey = rulesetKey;
        Summary = summary;
        Trigger = trigger;
    }

    /// <summary>The folder the run curated.</summary>
    public Guid ScopeFolderKey { get; }

    /// <summary>The ruleset the run applied.</summary>
    public Guid RulesetKey { get; }

    /// <summary>How many items the run moved, left in place and failed.</summary>
    public CurationRunSummary Summary { get; }

    /// <summary>What started the run, such as the backoffice, a background run or a workflow.</summary>
    public string Trigger { get; }
}

/// <summary>Published when a curation run had failing items (§9.1).</summary>
public sealed class MediaCurationFailedNotification : INotification
{
    /// <summary>Creates the notification for a run with failed items.</summary>
    public MediaCurationFailedNotification(Guid scopeFolderKey, Guid rulesetKey, CurationRunSummary summary, string trigger)
    {
        ScopeFolderKey = scopeFolderKey;
        RulesetKey = rulesetKey;
        Summary = summary;
        Trigger = trigger;
    }

    /// <summary>The folder the run curated.</summary>
    public Guid ScopeFolderKey { get; }

    /// <summary>The ruleset the run applied.</summary>
    public Guid RulesetKey { get; }

    /// <summary>How many items the run moved, left in place and failed.</summary>
    public CurationRunSummary Summary { get; }

    /// <summary>What started the run, such as the backoffice, a background run or a workflow.</summary>
    public string Trigger { get; }
}
