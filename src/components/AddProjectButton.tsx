"use client";
import { ModalContext } from "@/contexts/modal.service";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { useContext } from "react";
import dynamic from "next/dynamic";

const CreateProject = dynamic(() => import("../components/CreateProject"), {
  ssr: false,
});

export default function AddProjectButton() {
  const modalContext = useContext(ModalContext);

  const createProject = () =>
    modalContext?.setModalContext((prev) => ({
      modalContent: <CreateProject />,
      setModalContext: prev.setModalContext,
    }));

  return (
    <button
      onClick={() => createProject()}
      className="p-4 bg-blue-200 hover:bg-blue-500 hover:ring-2 ring-white rounded hover:text-black"
    >
      <CreateNewFolderIcon className="mr-2" />
      Project
    </button>
  );
}
