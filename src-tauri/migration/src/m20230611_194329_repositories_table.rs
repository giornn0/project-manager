use sea_orm_migration::prelude::*;

use crate::m20230611_191017_projects_table::Projects;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        manager
            .create_table(
                Table::create()
                    .table(Repository::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Repository::ProjectId).uuid().not_null())
                    .col(
                        ColumnDef::new(Repository::Url)
                            .string()
                            .not_null()
                            .primary_key(),
                    )
                    .to_owned(),
            )
            .await?;
        manager
            .create_foreign_key(
                ForeignKey::create()
                    .name("FK_repository_project")
                    .from(Repository::Table, Repository::ProjectId)
                    .to(Projects::Table, Projects::Id)
                    .on_delete(ForeignKeyAction::Cascade)
                    .on_update(ForeignKeyAction::Cascade)
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        manager
            .drop_table(Table::drop().table(Repository::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum Repository {
    Table,
    ProjectId,
    Url,
}
