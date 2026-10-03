using Microsoft.Extensions.DependencyInjection;
using Umbraco.Automate.Extensions;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbricians.MediaCurator.Automate.Actions;
using Umbricians.MediaCurator.Automate.Triggers;
using Engine = Umbricians.MediaCurator.Engine;

namespace Umbricians.MediaCurator.Automate;

/// <summary>Contributes MediaCurator triggers and actions to Umbraco.Automate workflows (§9).</summary>
public class MediaCuratorAutomateComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.AutomateTriggers()
            .Add<MediaCuratedTrigger>()
            .Add<MediaCurationFailedTrigger>();

        builder.AutomateActions()
            .Add<AnalyzeImageAction>()
            .Add<CategorizeMediaAction>()
            .Add<CurateFolderAction>();

        builder.Services.AddSingleton<Engine.IParallelContextFlow, Execution.AutomationOriginContextFlow>();
    }
}
