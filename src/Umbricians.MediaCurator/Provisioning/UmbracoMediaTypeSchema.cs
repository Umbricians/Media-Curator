using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Serialization;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;
using Umbricians.MediaCurator.Core;

namespace Umbricians.MediaCurator.Provisioning;

/// <summary>Umbraco-backed media type schema access. Data types are reused where a suitable
/// one exists or created with a clear "MediaCurator" name; properties land in a dedicated
/// "Media Curator" group so editors can see what is package-managed (§7).</summary>
internal sealed class UmbracoMediaTypeSchema : IMediaTypeSchema
{
    public const string GroupAlias = "mediaCurator";
    public const string GroupName = "Media Curator";

    private readonly IMediaTypeService _mediaTypeService;
    private readonly IDataTypeService _dataTypeService;
    private readonly PropertyEditorCollection _propertyEditors;
    private readonly IShortStringHelper _shortStringHelper;
    private readonly IConfigurationEditorJsonSerializer _configurationEditorJsonSerializer;

    public UmbracoMediaTypeSchema(
        IMediaTypeService mediaTypeService,
        IDataTypeService dataTypeService,
        PropertyEditorCollection propertyEditors,
        IShortStringHelper shortStringHelper,
        IConfigurationEditorJsonSerializer configurationEditorJsonSerializer)
    {
        _mediaTypeService = mediaTypeService;
        _dataTypeService = dataTypeService;
        _propertyEditors = propertyEditors;
        _shortStringHelper = shortStringHelper;
        _configurationEditorJsonSerializer = configurationEditorJsonSerializer;
    }

    public async Task<IReadOnlyList<MediaTypePropertyInfo>?> GetPropertiesAsync(
        string mediaTypeAlias,
        CancellationToken cancellationToken = default)
    {
        var mediaType = _mediaTypeService.Get(mediaTypeAlias);
        if (mediaType is null)
        {
            return null;
        }

        var properties = new List<MediaTypePropertyInfo>();
        foreach (var propertyType in mediaType.CompositionPropertyTypes)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var dataType = await _dataTypeService.GetAsync(propertyType.DataTypeKey);
            properties.Add(new MediaTypePropertyInfo(
                propertyType.Alias,
                propertyType.PropertyEditorAlias,
                dataType?.EditorUiAlias ?? string.Empty));
        }

        return properties;
    }

    public async Task AddPropertyAsync(string mediaTypeAlias, PropertyRequirement requirement, CancellationToken cancellationToken = default)
    {
        var mediaType = _mediaTypeService.Get(mediaTypeAlias)
            ?? throw new InvalidOperationException($"Media type '{mediaTypeAlias}' not found.");

        if (mediaType.CompositionPropertyTypes.Any(p => p.Alias.Equals(requirement.Alias, StringComparison.OrdinalIgnoreCase)))
        {
            return; // Idempotent: never touch existing properties.
        }

        var dataType = await GetOrCreateDataTypeAsync(requirement);

        var propertyType = new PropertyType(_shortStringHelper, dataType)
        {
            Alias = requirement.Alias,
            Name = requirement.Name,
            Description = requirement.Description,
            Mandatory = false,
        };

        mediaType.AddPropertyType(propertyType, GroupAlias, GroupName);
        await _mediaTypeService.UpdateAsync(mediaType, global::Umbraco.Cms.Core.Constants.Security.SuperUserKey);
    }

    private async Task<IDataType> GetOrCreateDataTypeAsync(PropertyRequirement requirement)
    {
        // Reuse: any existing data type with the same editor schema + UI.
        var all = await _dataTypeService.GetAllAsync();
        var existing = all.FirstOrDefault(d =>
            d.EditorAlias.Equals(requirement.EditorAlias, StringComparison.OrdinalIgnoreCase)
            && (d.EditorUiAlias?.Equals(requirement.EditorUiAlias, StringComparison.OrdinalIgnoreCase) ?? false));
        if (existing is not null)
        {
            return existing;
        }

        if (!_propertyEditors.TryGet(requirement.EditorAlias, out var editor))
        {
            throw new InvalidOperationException($"Property editor '{requirement.EditorAlias}' is not installed.");
        }

        var dataType = new DataType(editor, _configurationEditorJsonSerializer)
        {
            Name = $"MediaCurator - {requirement.Name}",
            EditorUiAlias = requirement.EditorUiAlias,
        };

        var attempt = await _dataTypeService.CreateAsync(dataType, global::Umbraco.Cms.Core.Constants.Security.SuperUserKey);
        if (!attempt.Success)
        {
            throw new InvalidOperationException($"Could not create data type for '{requirement.Alias}': {attempt.Status}.");
        }

        return attempt.Result;
    }
}
