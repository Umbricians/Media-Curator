using Umbraco.Cms.Core.Packaging;
using Umbraco.Cms.Infrastructure.Migrations;

namespace Umbricians.MediaCurator.Persistence;

/// <summary>Runs automatically on startup (unattended package migrations).</summary>
public class MediaCuratorMigrationPlan : PackageMigrationPlan
{
    public MediaCuratorMigrationPlan()
        : base("Umbricians.MediaCurator")
    {
    }

    protected override void DefinePlan()
    {
        To<CreateRulesetTableMigration>("mediacurator-create-ruleset-table");
        To<CreatePropertyMapTableMigration>("mediacurator-create-property-map-table");
        To<CreateRunLogTablesMigration>("mediacurator-create-run-log-tables");
        To<CreateExclusionTableMigration>("mediacurator-create-exclusion-table");
        To<CreateSiteSettingsTableMigration>("mediacurator-create-site-settings-table");
        To<AddSiteSettingsAiColumnMigration>("mediacurator-add-site-settings-ai-column");
        To<CreatePeopleDetectionTableMigration>("mediacurator-create-people-table");
    }
}

public class CreatePeopleDetectionTableMigration : AsyncMigrationBase
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

public class AddSiteSettingsAiColumnMigration : AsyncMigrationBase
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

public class CreateSiteSettingsTableMigration : AsyncMigrationBase
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

public class CreateExclusionTableMigration : AsyncMigrationBase
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

public class CreateRunLogTablesMigration : AsyncMigrationBase
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

public class CreatePropertyMapTableMigration : AsyncMigrationBase
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

public class CreateRulesetTableMigration : AsyncMigrationBase
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
