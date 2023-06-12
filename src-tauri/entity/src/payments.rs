//! `SeaORM` Entity. Generated by sea-orm-codegen 0.11.3
use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Deserialize, Serialize)]
#[sea_orm(table_name = "payments")]
pub struct Model {
    #[sea_orm(
        primary_key,
        auto_increment = false,
        column_type = "Binary(BlobSize::Blob(Some(16)))",
        unique
    )]
    pub id: Uuid,
    #[sea_orm(column_type = "Binary(BlobSize::Blob(Some(16)))")]
    pub project_id: Uuid,
    #[sea_orm(column_type = "Double")]
    pub amount: BigDecimal,
    pub date: Date,
}

impl Eq for Model {}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::projects::Entity",
        from = "Column::ProjectId",
        to = "super::projects::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Projects,
}

impl Related<super::projects::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Projects.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}