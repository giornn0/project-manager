use sea_orm::{prelude::*, ActiveValue};

use entity::owner::{ActiveModel as AOwner, Entity as EOwner, Model as Owner};
use serde::Deserialize;

use crate::{database::DbConnection, errors::Error};

#[derive(Deserialize)]
pub struct NewOwner {
    name: String,
    lastname: String,
    email: String,
    phone: String,
}

#[tauri::command]
pub async fn get_owners(state: tauri::State<'_, DbConnection>) -> Result<Vec<Owner>, Error> {
    let owners = EOwner::find().all(&*state.conn.clone()).await?;

    Ok(owners)
}

#[tauri::command]
pub async fn get_owner_by_id(
    owner_id: Uuid,
    state: tauri::State<'_, DbConnection>,
) -> Result<Owner, Error> {
    let owner = EOwner::find_by_id(owner_id)
        .all(&*state.conn.clone())
        .await?
        .first()
        .expect("Id invalid")
        .clone();

    Ok(owner)
}

#[tauri::command]
pub async fn create_owner(
    owner_data: NewOwner,
    state: tauri::State<'_, DbConnection>,
) -> Result<Owner, Error> {
    let owner = AOwner {
        id: ActiveValue::Set(Uuid::new_v4()),
        name: ActiveValue::Set(owner_data.name),
        lastname: ActiveValue::Set(owner_data.lastname),
        phone: ActiveValue::Set(owner_data.phone),
        email: ActiveValue::Set(owner_data.email),
    };
    let insert = owner.insert(&*state.conn.clone()).await?;

    Ok(insert)
}
