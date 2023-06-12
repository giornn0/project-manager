use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        manager
            .create_table(
                Table::create()
                    .table(Owner::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Owner::Id)
                            .uuid()
                            .not_null()
                            .unique_key()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Owner::Name).string().not_null())
                    .col(ColumnDef::new(Owner::Lastname).string().not_null())
                    .col(ColumnDef::new(Owner::Phone).string().not_null())
                    .col(ColumnDef::new(Owner::Email).string().not_null())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts

        manager
            .drop_table(Table::drop().table(Owner::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
pub enum Owner {
    Table,
    Id,
    Name,
    Lastname,
    Phone,
    Email,
}
