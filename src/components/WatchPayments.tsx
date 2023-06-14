"use client";
import { ModalContext } from "@/contexts/modal.context";
import { CancelSharp } from "@mui/icons-material";
import { Box } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Payment } from "@/models/Payment";
import { Project } from "@/models/Project";
import dynamic from "next/dynamic";

const CreatePayment = dynamic(() => import("../components/CreatePayment"), {
  ssr: false,
});
export interface WatchPaymentsProps {
  project: Project;
}

export default function WatchPayments({ project }: WatchPaymentsProps) {
  const [payments, setPayments] = useState<Array<Payment>>([]);
  const modalContext = useContext(ModalContext);

  const closeModal = () => {
    modalContext?.setModalContext((prev) => ({
      modalContent: null,
      setModalContext: prev.setModalContext,
    }));
  };

  const editPayment = ({ payment }: { payment: Payment }) => {
    modalContext?.setModalContext(({ setModalContext }) => ({
      modalContent: <CreatePayment project={project} editPayment={payment} />,
      setModalContext,
    }));
  };

  useEffect(() => {
    invoke<Array<Payment>>("get_payments_from_project", {
      projectId: project.id,
    })
      .then((payments) => setPayments(payments))
      .catch(console.error);
  }, []);
  return (
    <Box component="ul" className="bg-slate-200 h-full px-4 py-8 overflow-auto">
      {payments.map((paym) => (
        <li
          key={paym.id}
          className="h-fit p-2 bg-black text-white my-4 flex flex-row justify-around border hover:bg-green-100 hover:text-black hover:ring-2 ring-red-100"
        >
          <p className="font-bold">
            <AttachMoneyIcon className="text-green-300" /> {paym.amount}
          </p>{" "}
          -
          <p className="text-gray-300">
            <CalendarMonthIcon />
            {paym.date as unknown as string}
          </p>
          <EditIcon
            onClick={() => editPayment({ payment: paym })}
            className="cursor-pointer rounded-xl p-1 text-yellow-500 bg-slate-200 hover:text-slate-500 hover:bg-yellow-200 "
          />
        </li>
      ))}
      <div className="w-full flex flex-row justify-around gap-6">
        <button
          onClick={closeModal}
          className="p-4 bg-red-200 hover:bg-red-500 hover:ring-2 ring-white rounded hover:text-black"
        >
          <CancelSharp className="mr-2" />
          Cancelar
        </button>
      </div>
    </Box>
  );
}
