using Microsoft.Extensions.DependencyInjection;
using Umbraco.Automate.Extensions;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbricians.MediaCurator.Automate.Actions;
using Umbricians.MediaCurator.Automate.Execution;
using Umbricians.MediaCurator.Automate.Triggers;
using Umbricians.MediaCurator.Engine;

namespace Umbricians.MediaCurator.Automate.Composers;

/// <summary>Adds Media Curator's triggers and actions to Umbraco.Automate workflows.</summary>
public class MediaCuratorAutomateComposer : IComposer
{
    /// <inheritdoc />
    public void Compose(IUmbracoBuilder builder)
    {
        builder.AutomateTriggers()
            .Add<MediaCuratedTrigger>()
            .Add<MediaCurationFailedTrigger>();

        builder.AutomateActions()
            .Add<AnalyzeImageAction>()
            .Add<CategorizeMediaAction>()
            .Add<CurateFolderAction>();

        builder.Services.AddSingleton<IParallelContextFlow, AutomationOriginContextFlow>();
    }
}
