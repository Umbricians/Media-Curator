using Umbraco.Automate.Core.Execution;
using Umbricians.MediaCurator.Engine;

namespace Umbricians.MediaCurator.Automate.Execution;

/// <summary>Carries the running automation into Media Curator's parallel workers, so media they save
/// still counts as automation-originated and "Media Saved" automations skip their own cycle.</summary>
internal sealed class AutomationOriginContextFlow : IParallelContextFlow
{
    private readonly IAutomationOriginAccessor _originAccessor;

    public AutomationOriginContextFlow(IAutomationOriginAccessor originAccessor) => _originAccessor = originAccessor;

    public Func<IDisposable?> Capture()
    {
        var origin = _originAccessor.Current;
        return () => origin is null ? null : _originAccessor.Push(origin);
    }
}
