using Umbraco.Automate.Extensions;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbricians.MediaCurator.Automate.Actions;
using Umbricians.MediaCurator.Automate.Triggers;

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
    }
}
