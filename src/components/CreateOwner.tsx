"use client";
import { ModalContext } from "@/contexts/modal.context";
import { Owner } from "@/models/Owner";
import { AddBox, CancelSharp } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { useContext, useState } from "react";

export default function CreateOwner() {
  const modalContext = useContext(ModalContext);
  const [owner, setOwner] = useState({} as Owner);

  const closeModal = () => {
    modalContext?.setModalContext((prev) => ({
      modalContent: null,
      setModalContext: prev.setModalContext,
    }));
  };

  const createOwner = async () => {
    try {
      invoke<Owner>("create_owner", { ownerData: owner })
        .then(console.log)
        .catch(console.error);
    } catch (e) {
      console.error(e);
      debugger;
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    camp: keyof Owner
  ) => {
    setOwner((prev) => ({ ...prev, [camp]: event.target.value }));
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className="bg-slate-200 h-full px-4 py-8 overflow-auto"
    >
      <h3 className="text-black underline underline-offset-1 font-bold text-xl">
        Owner
      </h3>
      <div className="h-fit grid grid-cols-1 gap-8 my-4">
        <TextField
          required
          margin="none"
          id="outlined-required"
          label="Name"
          onChange={(event) => handleChange(event, "name")}
          defaultValue={owner.name || null}
        />
        <TextField
          required
          margin="none"
          id="outlined-required"
          label="Last Name"
          defaultValue={owner.lastname || null}
          onChange={(event) => handleChange(event, "lastname")}
        />
        <TextField
          required
          id="outlined-required"
          margin="none"
          label="Email"
          defaultValue={owner.email || null}
          onChange={(event) => handleChange(event, "email")}
        />
        <TextField
          required
          id="outlined-required"
          margin="none"
          label="Phone"
          defaultValue={owner.phone || null}
          onChange={(event) => handleChange(event, "phone")}
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
          onClick={createOwner}
          className="p-4 bg-blue-200 hover:bg-blue-500 hover:ring-2 ring-white rounded hover:text-black"
        >
          <AddBox className="mr-2" />
          Create
        </button>
      </div>
    </Box>
  );
}
