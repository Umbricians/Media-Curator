using Umbraco.Cms.Core.Packaging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbricians.MediaCurator.Persistence;

namespace Umbricians.MediaCurator.Migrations;

/// <summary>Runs automatically on startup (unattended package migrations).</summary>
public class MediaCuratorMigrationPlan : PackageMigrationPlan
{
    /// <summary>Creates the plan under the package id, which matches the name in umbraco-package.json.</summary>
    public MediaCuratorMigrationPlan()
        : base("Umbricians.MediaCurator")
    {
    }

    /// <inheritdoc />
    protected override void DefinePlan()
    {
        To<CreateRulesetTableMigration>("8f3c1a52-6d47-4b0e-9a11-2c5e7d90b1a3");
        To<CreatePropertyMapTableMigration>("1b7e4d09-3a6f-4c82-8e55-f40a92c6d718");
        To<CreateRunLogTablesMigration>("c2a95f36-7e18-4d3b-b6c4-0d81e3f7a524");
        To<CreateExclusionTableMigration>("4e60b7d1-92c3-4fa8-a07d-6b13c8e5f209");
        To<CreateSiteSettingsTableMigration>("a7d3086e-15fb-49c6-83e2-9f2b4c6d1e70");
        To<AddSiteSettingsAiColumnMigration>("63f1c8ab-40e7-4d95-bc18-e7a05d3c92f6");
        To<CreatePeopleDetectionTableMigration>("d95e2b74-c801-4a3f-96d7-31b8f6a0c45e");
    }
}

internal sealed class CreatePeopleDetectionTableMigration : AsyncMigrationBase
{
    public CreatePeopleDetectionTableMigration(IMigrationContext context)
        : base(context)
    {
    }

    protected override Task MigrateAsync()
    {
        if (!TableExists(People.PeopleDetectionDto.TableName))
        {
            Create.Table<People.PeopleDetectionDto>().Do();
        }

        return Task.CompletedTask;
    }
}

internal sealed class AddSiteSettingsAiColumnMigration : AsyncMigrationBase
{
    public AddSiteSettingsAiColumnMigration(IMigrationContext context)
        : base(context)
    {
    }

    protected override Task MigrateAsync()
    {
        if (TableExists(SiteSettingsDto.TableName) && !ColumnExists(SiteSettingsDto.TableName, "aiSettings"))
        {
            AddColumn<SiteSettingsDto>(SiteSettingsDto.TableName, "aiSettings");
        }

        return Task.CompletedTask;
    }
}

internal sealed class CreateSiteSettingsTableMigration : AsyncMigrationBase
{
    public CreateSiteSettingsTableMigration(IMigrationContext context)
        : base(context)
    {
    }

    protected override Task MigrateAsync()
    {
        if (!TableExists(SiteSettingsDto.TableName))
        {
            Create.Table<SiteSettingsDto>().Do();
        }

        return Task.CompletedTask;
    }
}

internal sealed class CreateExclusionTableMigration : AsyncMigrationBase
{
    public CreateExclusionTableMigration(IMigrationContext context)
        : base(context)
    {
    }

    protected override Task MigrateAsync()
    {
        if (!TableExists(Engine.ExclusionDto.TableName))
        {
            Create.Table<Engine.ExclusionDto>().Do();
        }

        return Task.CompletedTask;
    }
}

internal sealed class CreateRunLogTablesMigration : AsyncMigrationBase
{
    public CreateRunLogTablesMigration(IMigrationContext context)
        : base(context)
    {
    }

    protected override Task MigrateAsync()
    {
        if (!TableExists(Engine.CurationRunDto.TableName))
        {
            Create.Table<Engine.CurationRunDto>().Do();
        }

        if (!TableExists(Engine.CurationRunItemDto.TableName))
        {
            Create.Table<Engine.CurationRunItemDto>().Do();
        }

        return Task.CompletedTask;
    }
}

internal sealed class CreatePropertyMapTableMigration : AsyncMigrationBase
{
    public CreatePropertyMapTableMigration(IMigrationContext context)
        : base(context)
    {
    }

    protected override Task MigrateAsync()
    {
        if (!TableExists(Provisioning.PropertyMapDto.TableName))
        {
            Create.Table<Provisioning.PropertyMapDto>().Do();
        }

        return Task.CompletedTask;
    }
}

internal sealed class CreateRulesetTableMigration : AsyncMigrationBase
{
    public CreateRulesetTableMigration(IMigrationContext context)
        : base(context)
    {
    }

    protected override Task MigrateAsync()
    {
        if (!TableExists(RulesetDto.TableName))
        {
            Create.Table<RulesetDto>().Do();
        }

        return Task.CompletedTask;
    }
}
