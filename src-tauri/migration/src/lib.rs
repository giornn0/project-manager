pub use sea_orm_migration::prelude::*;

mod m20230611_191008_owners_table;
mod m20230611_191017_projects_table;
mod m20230611_191023_payments_table;
mod m20230611_194329_repositories_table;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20230611_191008_owners_table::Migration),
            Box::new(m20230611_191017_projects_table::Migration),
            Box::new(m20230611_191023_payments_table::Migration),
            Box::new(m20230611_194329_repositories_table::Migration),
        ]
    }
}
