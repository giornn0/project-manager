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

#[tauri::command]
pub async fn get_projects(state: tauri::State<'_, DbConnection>) -> Result<Vec<Project>, Error> {
    let projects = EProject::find().all(&*state.connection.clone()).await?;

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
    let insert = project.insert(&*state.connection.clone()).await?;

    Ok(insert)
}
