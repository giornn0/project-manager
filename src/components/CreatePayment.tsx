"use client";

import { Nullable, Payment } from "@/constants/models";
import { ModalContext } from "@/contexts/modal.service";
import { AddBox, CancelSharp } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { useContext, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/es";

export interface CreatePaymentProps {
  project_id: string;
}

export default function CreatePayment({ project_id }: CreatePaymentProps) {
  const modalContext = useContext(ModalContext);

  const closeModal = () => {
    modalContext?.setModalContext((prev) => ({
      modalContent: null,
      setModalContext: prev.setModalContext,
    }));
  };

  const [payment, setPayment] = useState({ project_id } as Payment);
  const createPayment = async () => {
    try {
      console.log(payment);
      invoke<Payment>("create_payment", {
        paymentData: { ...payment, amount: Number(payment.amount) },
      })
        .then(console.log)
        .catch((err) => {
          console.error(err);
          debugger;
        });
    } catch (e) {
      console.error(e);
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    camp: keyof Payment
  ) => {
    setPayment((prev) => ({ ...prev, [camp]: event.target.value }));
  };

  const handleChangeDate = (event: Nullable<Date>, camp: keyof Payment) => {
    setPayment((prev) => ({ ...prev, [camp]: event }));
  };
  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="bg-slate-200 h-full px-4 py-8 overflow-auto"
      >
        <div className="h-fit grid grid-cols-1 gap-8 my-4">
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={payment.date || null}
                  onChange={(event) => handleChangeDate(event, "date")}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <TextField
            required
            id="outlined-required"
            margin="none"
            label="Amount"
            type="number"
            defaultValue={payment.amount || null}
            onChange={(event) => handleChange(event, "amount")}
          />
        </div>
        <div className="w-full flex flex-row justify-around gap-6">
          <button
            onClick={closeModal}
            className="p-4 bg-red-200 hover:bg-red-500 hover:ring-2 ring-white rounded hover:text-black"
          >
            <CancelSharp className="mr-2" />
            Cancelar
          </button>

          <button
            onClick={createPayment}
            className="p-4 bg-blue-200 hover:bg-blue-500 hover:ring-2 ring-white rounded hover:text-black"
          >
            <AddBox className="mr-2" />
            Create
          </button>
        </div>
      </Box>
    </>
  );
}
