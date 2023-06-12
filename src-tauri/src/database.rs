use migration::{Migrator, MigratorTrait};
use sea_orm::{ConnectOptions, DatabaseConnection};
use std::sync::Arc;
use std::time::Duration;

use crate::errors::Error;

pub struct DbConnection {
    pub connection: Arc<DatabaseConnection>,
}

pub async fn start_database() -> Result<DbConnection, Error> {
    let database_url = std::env::var("DATABASE_URL").expect("Need database connection");
    let mut opt = ConnectOptions::new(database_url);
    opt.max_connections(100)
        .min_connections(5)
        .connect_timeout(Duration::from_secs(8))
        .acquire_timeout(Duration::from_secs(8))
        .idle_timeout(Duration::from_secs(8))
        .max_lifetime(Duration::from_secs(8))
        .sqlx_logging(true)
        .sqlx_logging_level(log::LevelFilter::Info);

    let connection = sea_orm::Database::connect(opt).await?;
    Migrator::up(&connection, None).await?;

    Ok(DbConnection {
        connection: Arc::new(connection),
    })
}
