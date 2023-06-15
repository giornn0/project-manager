"use client";
import { CancelSharp } from "@mui/icons-material";
import { Box } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { useContext, useEffect, useState } from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { Owner } from "@/models/Owner";
import { Nullable } from "@/constants/types";
import { ModalContext } from "@/contexts/modal.context";

export interface WatchOwnerDetailsProps {
  owner_id: string;
  action?: boolean;
}

export default function WatchOwnerDetails({
  owner_id,
  action,
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

  const withAction = action !== false;

  return (
    <Box
      component="section"
      className={`bg-black bg-transparent h-full ${withAction ? "px-4 py-8" : "py-4"
        } overflow-auto`}
    >
      <div
        className={`p-12 bg-blue-50 text-black font-bold rounded ${withAction ? "my-4" : "my-1"
          }`}
      >
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
        {withAction && (
          <button
            onClick={closeModal}
            className="p-2 bg-red-200 hover:bg-red-500 hover:ring-1 ring-white  hover:text-black absolute right-4 top-12"
          >
            <CancelSharp />
          </button>
        )}
      </div>
    </Box>
  );
}
