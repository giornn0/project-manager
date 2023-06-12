"use client";
import { ModalContext } from "@/contexts/modal.service";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useContext } from "react";
import CreateOwner from "./CreateOwner";

export default function AddOwnerButton() {
  const modalContext = useContext(ModalContext);

  const createOwner = () =>
    modalContext?.setModalContext((prev) => ({
      modalContent: <CreateOwner />,
      setModalContext: prev.setModalContext,
    }));

  return (
    <button
      onClick={() => createOwner()}
      className="p-4 bg-blue-200 hover:bg-blue-500 hover:ring-2 ring-white rounded hover:text-black"
    >
      <GroupAddIcon className="mr-2" />
      Owner
    </button>
  );
}
