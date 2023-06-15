import { ModalContext } from "@/contexts/modal.context";
import { Project } from "@/models/Project";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { Dispatch, SetStateAction, useContext } from "react";
import { CancelSharp } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export interface DeleteProjectProps {
  project: Project;
  setUpdater: Dispatch<SetStateAction<Array<Project>>>;
}

export default function DeleteProject({
  project,
  setUpdater,
}: DeleteProjectProps) {
  const modalContext = useContext(ModalContext);

  const closeModal = () => {
    modalContext.setModalContext((prev) => ({
      ...prev,
      modalContent: null,
    }));
  };
  const successDelete = () => {
    closeModal();
  };

  const confirmation = () => {
    try {
      invoke("delete_project", { id: project.id })
        .then(successDelete)
        .catch(console.error)
        .finally(() =>
          setUpdater((prev) => prev.filter((proj) => proj.id !== project.id))
        );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete {project.name}?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this project? All payments information
          will be lost.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          className="p-2 px-4 bg-red-200 hover:bg-red-500 hover:ring-2 ring-white hover:text-red-200 rounded"
          onClick={closeModal}
        >
          <CancelSharp />
          Disagree
        </button>
        <button
          className="p-2 px-4 bg-blue-200 hover:bg-blue-500 hover:ring-2 ring-white hover:text-blue-200 rounded"
          onClick={confirmation}
          autoFocus
        >
          <CheckBoxIcon />
          Agree
        </button>
      </DialogActions>
    </Dialog>
  );
}
