use sea_orm::{prelude::*, ActiveValue};

use entity::projects::{ActiveModel as AProject, Entity as EProject, Model as Project};
use serde::Deserialize;

use crate::{database::DbConnection, errors::Error};

#[derive(Deserialize)]
pub struct NewProject {
    name: String,
    owner_id: Uuid,
    url: String,
}

#[derive(Deserialize)]
pub struct EditProject {
    id: Uuid,
    name: String,
    url: String,
}

#[tauri::command]
pub async fn get_projects(state: tauri::State<'_, DbConnection>) -> Result<Vec<Project>, Error> {
    let connection = &*state.conn.clone();
    let projects = EProject::find().all(connection).await?;

    Ok(projects)
}

#[tauri::command]
pub async fn create_project(
    project_data: NewProject,
    state: tauri::State<'_, DbConnection>,
) -> Result<Project, Error> {
    let project = AProject {
        id: ActiveValue::Set(Uuid::new_v4()),
        name: ActiveValue::Set(project_data.name),
        owner_id: ActiveValue::Set(project_data.owner_id),
        url: ActiveValue::Set(project_data.url),
    };
    let conn = &*state.conn.clone();
    let insert = project.insert(conn).await?;

    Ok(insert)
}
#[tauri::command]
pub async fn update_project(
    project_data: EditProject,
    state: tauri::State<'_, DbConnection>,
) -> Result<Project, Error> {
    let conn = &*state.conn.clone();

    let mut project: AProject = EProject::find_by_id(project_data.id)
        .one(conn)
        .await?
        .unwrap()
        .into();

    project.name = ActiveValue::Set(project_data.name);
    project.url = ActiveValue::Set(project_data.url);

    let update = project.update(conn).await?;

    Ok(update)
}

#[tauri::command]
pub async fn delete_project(id: Uuid, state: tauri::State<'_, DbConnection>) -> Result<(), Error> {
    let conn = &*state.conn.clone();
    let project = EProject::find_by_id(id).one(conn).await?.unwrap();
    project.delete(conn).await?;
    Ok(())
}
