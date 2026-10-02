using Umbricians.MediaCurator.Engine;

namespace Umbricians.MediaCurator.Controllers.ViewModels;

public class CurationRequestModel
{
    public required Guid ScopeFolderKey { get; init; }
    public bool Recursive { get; init; } = true;
}

public class PlannedMoveModel
{
    public required Guid MediaKey { get; init; }
    public required string MediaName { get; init; }
    public required string TargetPath { get; init; }
    public required bool AlreadyInPlace { get; init; }

    public static PlannedMoveModel From(PlannedMove move) => new()
    {
        MediaKey = move.MediaKey,
        MediaName = move.MediaName,
        TargetPath = move.TargetPath,
        AlreadyInPlace = move.AlreadyInPlace,
    };
}

public class CurationPlanModel
{
    public required Guid ScopeFolderKey { get; init; }
    public required string RulesetName { get; init; }
    public required int MoveCount { get; init; }
    public List<PlannedMoveModel> Moves { get; init; } = [];
    public List<string> SkippedItems { get; init; } = [];

    public static CurationPlanModel From(CurationPlan plan) => new()
    {
        ScopeFolderKey = plan.ScopeFolderKey,
        RulesetName = plan.RulesetName,
        MoveCount = plan.MoveCount,
        Moves = plan.Moves.Select(PlannedMoveModel.From).ToList(),
        SkippedItems = plan.SkippedItems.ToList(),
    };
}

public class MediaCurationPlanModel
{
    public required Guid MediaKey { get; init; }
    public required int MoveCount { get; init; }
    public required int AlreadyInPlaceCount { get; init; }
    public List<CurationPlanModel> Plans { get; init; } = [];
    public List<string> SkippedItems { get; init; } = [];

    public static MediaCurationPlanModel From(MediaCurationPlan plan) => new()
    {
        MediaKey = plan.MediaKey,
        MoveCount = plan.Plans.Sum(p => p.MoveCount),
        AlreadyInPlaceCount = plan.Plans.Sum(p => p.Moves.Count(m => m.AlreadyInPlace)),
        Plans = plan.Plans.Select(CurationPlanModel.From).ToList(),
        SkippedItems = plan.Skipped.Concat(plan.Plans.SelectMany(p => p.SkippedItems)).ToList(),
    };
}

public class MediaCurationSummaryModel
{
    public required int Moved { get; init; }
    public required int AlreadyInPlace { get; init; }
    public required int Failed { get; init; }
    public List<Guid> RunKeys { get; init; } = [];
}

public class CurationRunSummaryModel
{
    public required Guid RunKey { get; init; }
    public required int Moved { get; init; }
    public required int AlreadyInPlace { get; init; }
    public required int Failed { get; init; }

    public static CurationRunSummaryModel From(CurationRunSummary summary) => new()
    {
        RunKey = summary.RunKey,
        Moved = summary.Moved,
        AlreadyInPlace = summary.AlreadyInPlace,
        Failed = summary.Failed,
    };
}

public class BulkRunStatusModel
{
    public required Guid ScopeFolderKey { get; init; }
    public required string State { get; init; }
    public required int Processed { get; init; }
    public required int Total { get; init; }
    public string? Error { get; init; }
}

public class BulkQueueStatusModel
{
    public required int QueueLength { get; init; }
    public List<BulkRunStatusModel> Statuses { get; init; } = [];

    public static BulkQueueStatusModel From(int queueLength, IReadOnlyList<BulkRunStatus> statuses) => new()
    {
        QueueLength = queueLength,
        Statuses = statuses.Select(s => new BulkRunStatusModel
        {
            ScopeFolderKey = s.ScopeFolderKey,
            State = s.State.ToString().ToLowerInvariant(),
            Processed = s.Processed,
            Total = s.Total,
            Error = s.Error,
        }).ToList(),
    };
}

public class CurationRunModel
{
    public required Guid Key { get; init; }
    public required Guid ScopeFolderKey { get; init; }
    public required string Trigger { get; init; }
    public required DateTime Started { get; init; }
    public DateTime? Completed { get; init; }
    public required int Moved { get; init; }
    public required int AlreadyInPlace { get; init; }
    public required int Failed { get; init; }

    public static CurationRunModel From(CurationRun run) => new()
    {
        Key = run.Key,
        ScopeFolderKey = run.ScopeFolderKey,
        Trigger = run.Trigger,
        Started = run.Started,
        Completed = run.Completed,
        Moved = run.Moved,
        AlreadyInPlace = run.AlreadyInPlace,
        Failed = run.Failed,
    };
}

public class CurationRunItemModel
{
    public required Guid MediaKey { get; init; }
    public required string MediaName { get; init; }
    public required string TargetPath { get; init; }
    public required bool Success { get; init; }
    public string? Note { get; init; }

    public static CurationRunItemModel From(CurationRunItem item) => new()
    {
        MediaKey = item.MediaKey,
        MediaName = item.MediaName,
        TargetPath = item.TargetPath,
        Success = item.Success,
        Note = item.Note,
    };
}
