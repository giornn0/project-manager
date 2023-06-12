use bigdecimal::FromPrimitive;
use sea_orm::{prelude::*, ActiveValue};

use entity::payments::{
    self as payment, ActiveModel as APayment, Entity as EPayment, Model as Payment,
};
use serde::Deserialize;

use crate::{database::DbConnection, errors::Error};

#[derive(Deserialize, Debug)]
pub struct NewPayment {
    project_id: Uuid,
    date: String,
    amount: f64,
}

#[tauri::command]
pub async fn get_payments_from_project(
    project_id: Uuid,
    state: tauri::State<'_, DbConnection>,
) -> Result<Vec<Payment>, Error> {
    let payments = EPayment::find()
        .filter(payment::Column::ProjectId.eq(project_id))
        .all(&*state.connection.clone())
        .await?;

    Ok(payments)
}

#[tauri::command]
pub async fn create_payment(
    payment_data: NewPayment,
    state: tauri::State<'_, DbConnection>,
) -> Result<Payment, Error> {
    println!(
        "{:?}",
        Date::parse_from_str(payment_data.date.split('T').next().unwrap(), "%Y-%m-%d")?
    );
    println!(
        "{:?}",
        BigDecimal::from_f64(payment_data.amount).expect("A valid amount")
    );
    let payment = APayment {
        id: ActiveValue::Set(Uuid::new_v4()),
        project_id: ActiveValue::Set(payment_data.project_id),
        amount: ActiveValue::Set(
            BigDecimal::from_f64(payment_data.amount).expect("A valid amount"),
        ),
        date: ActiveValue::Set(Date::parse_from_str(
            payment_data.date.split('T').next().unwrap(),
            "%Y-%m-%d",
        )?),
    };
    let insert = payment.insert(&*state.connection.clone()).await?;

    Ok(insert)
}
