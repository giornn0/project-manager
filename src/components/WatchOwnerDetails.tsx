"use client";
import { Nullable, Owner } from "@/constants/models";
import { ModalContext } from "@/contexts/modal.service";
import { CancelSharp } from "@mui/icons-material";
import { Box } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { useContext, useEffect, useState } from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

export interface WatchOwnerDetailsProps {
  owner_id: string;
}

export default function WatchOwnerDetails({
  owner_id,
}: WatchOwnerDetailsProps) {
  const [owner, setOwner] = useState<Nullable<Owner>>(null);
  const modalContext = useContext(ModalContext);

  const closeModal = () => {
    modalContext?.setModalContext((prev) => ({
      modalContent: null,
      setModalContext: prev.setModalContext,
    }));
  };

  useEffect(() => {
    invoke<Owner>("get_owner_by_id", {
      ownerId: owner_id,
    })
      .then((owner) => setOwner(owner))
      .catch(console.error);
  }, []);
  return (
    <Box
      component="section"
      className="bg-slate-200 h-full px-4 py-8 overflow-auto"
    >
      <div className="p-12 bg-blue-50 text-black font-bold my-4 rounded">
        <p className="text-xl">
          <AssignmentIndIcon fontSize="large" />
          {owner?.lastname}, {owner?.name}
        </p>
        <br />
        <p className="text-lg ml-1">
          <AttachEmailIcon />
          {owner?.email} <br />
          <PhoneAndroidIcon />
          {owner?.phone}
        </p>
      </div>
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
