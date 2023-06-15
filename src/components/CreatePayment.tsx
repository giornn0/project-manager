"use client";
import { ModalContext } from "@/contexts/modal.context";
import { AddBox, CancelSharp } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { useContext, useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/es";
import { Payment } from "@/models/Payment";
import { Nullable } from "@/constants/types";
import { Project } from "@/models/Project";
import dayjs, { Dayjs } from "dayjs";

export interface CreatePaymentProps {
  project: Project;
  editPayment?: Payment;
}

export default function CreatePayment({
  project,
  editPayment,
}: CreatePaymentProps) {
  const modalContext = useContext(ModalContext);
  const [payment, setPayment] = useState({ project_id: project.id } as Payment);

  useEffect(() => {
    debugger;
    if (editPayment)
      setPayment({
        ...editPayment,
        date: dayjs(new Date(editPayment.date as Date)),
      });
  }, []);

  const closeModal = () => {
    modalContext?.setModalContext((prev) => ({
      modalContent: null,
      setModalContext: prev.setModalContext,
    }));
  };

  const createPayment = async () => {
    try {
      const invocation = editPayment
        ? invoke<Payment>("update_payment", {
          paymentData: { ...payment, amount: Number(payment.amount) },
        })
        : invoke<Payment>("create_payment", {
          paymentData: { ...payment, amount: Number(payment.amount) },
        });

      invocation.then(console.log).catch((err) => console.error(err));
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

  const handleChangeDate = (
    event: Nullable<Dayjs | Date>,
    camp: keyof Payment
  ) => {
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
        <h3 className="text-black underline underline-offset-1 font-bold text-xl">
          Payment
        </h3>
        <div className="h-fit grid grid-cols-1 gap-8 my-4">
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  disabled={!!editPayment}
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
            className={`p-4 ${!!editPayment
                ? "bg-yellow-200 hover:bg-yellow-500"
                : "bg-blue-200 hover:bg-blue-500"
              } hover:ring-2 ring-white rounded hover:text-black`}
          >
            <AddBox className="mr-2" />
            {!!editPayment ? "Edit" : "Create"}
          </button>
        </div>
      </Box>
    </>
  );
}
