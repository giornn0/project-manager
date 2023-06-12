use chrono::format::ParseError;
use sea_orm::DbErr;
use serde::{Deserialize, Serialize};
use tauri::Error as TauriError;
use uuid::Error as UuidError;

#[derive(Serialize, Deserialize, Debug)]
pub struct Error(String);

impl From<DbErr> for Error {
    fn from(value: DbErr) -> Self {
        log::error!("Database error -> {}", value.to_string());
        Error(value.to_string())
    }
}
impl From<TauriError> for Error {
    fn from(value: TauriError) -> Self {
        log::error!("Error -> {}", value.to_string());
        Error(value.to_string())
    }
}
impl From<ParseError> for Error {
    fn from(value: ParseError) -> Self {
        log::error!("Chrono Error -> {}", value.to_string());
        Error(value.to_string())
    }
}
impl From<UuidError> for Error {
    fn from(value: UuidError) -> Self {
        log::error!("Chrono Error -> {}", value.to_string());
        Error(value.to_string())
    }
}
