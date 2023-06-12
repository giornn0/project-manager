import { Owner, Project } from "@/constants/models";
import { ModalContext } from "@/contexts/modal.service";
import { AddBox, CancelSharp } from "@mui/icons-material";
import { Box, MenuItem, TextField } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { useContext, useEffect, useState } from "react";

export default function CreateProject() {
  const [project, setProject] = useState({} as Project);
  const [owners, setOwners] = useState<Array<Owner>>([]);
  const modalContext = useContext(ModalContext);

  useEffect(() => {
    invoke<Array<Owner>>("get_owners")
      .then((owners) => setOwners(owners))
      .catch(console.error);
  }, []);

  const closeModal = () => {
    modalContext?.setModalContext((prev) => ({
      modalContent: null,
      setModalContext: prev.setModalContext,
    }));
  };

  const createProject = async () => {
    try {
      invoke<Project>("create_project", { projectData: project })
        .then(console.log)
        .catch(console.error);
    } catch (e) {
      console.error(e);
      debugger;
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    camp: keyof Project
  ) => {
    setProject((prev) => ({ ...prev, [camp]: event.target.value }));
  };
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className="bg-slate-200 h-full px-4 py-8 overflow-auto"
    >
      <div className="h-fit grid grid-cols-1 gap-8 my-4">
        <TextField
          required
          margin="none"
          id="outlined-required"
          label="Name"
          onChange={(event) => handleChange(event, "name")}
          defaultValue={project.name || null}
        />
        <TextField
          required
          select
          margin="none"
          id="outlined-required"
          label="Last Name"
          defaultValue={project.owner_id || null}
          onChange={(event) => handleChange(event, "owner_id")}
        >
          {owners.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.lastname}, {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="outlined-required"
          margin="none"
          label="Url"
          defaultValue={project.url || null}
          onChange={(event) => handleChange(event, "url")}
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
          onClick={createProject}
          className="p-4 bg-blue-200 hover:bg-blue-500 hover:ring-2 ring-white rounded hover:text-black"
        >
          <AddBox className="mr-2" />
          Create
        </button>
      </div>
    </Box>
  );
}
