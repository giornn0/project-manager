// Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::services::owners::{create_owner, get_owner_by_id, get_owners};
use crate::services::payments::{create_payment, get_payments_from_project, update_payment};
use crate::services::projects::{create_project, delete_project, get_projects, update_project};

use database::start_database;
use dotenv::dotenv;
use errors::Error;

mod database;
mod errors;
mod services;

#[tokio::main]
async fn main() -> Result<(), Error> {
    dotenv().ok();
    let connection = start_database().await?;

    tauri::Builder::default()
        .manage(connection)
        .invoke_handler(tauri::generate_handler![
            get_projects,
            create_project,
            create_owner,
            get_owners,
            get_payments_from_project,
            create_payment,
            get_owner_by_id,
            update_payment,
            update_project,
            delete_project
        ])
        .run(tauri::generate_context!())?;
    Ok(())
}
