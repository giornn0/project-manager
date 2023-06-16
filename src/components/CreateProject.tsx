import { BackdropContext } from "@/contexts/backdrop.context";
import { ModalContext } from "@/contexts/modal.context";
import { Owner } from "@/models/Owner";
import { Project } from "@/models/Project";
import { AddBox, CancelSharp } from "@mui/icons-material";
import { Box, MenuItem, TextField } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import WatchOwnerDetails from "./WatchOwnerDetails";

export interface CreateProjectProps {
  editProject?: Project;
  setUpdater?: Dispatch<SetStateAction<undefined>>;
}

export default function CreateProject({
  editProject,
  setUpdater,
}: CreateProjectProps) {
  const [project, setProject] = useState({} as Project);
  const [owners, setOwners] = useState<Array<Owner>>([]);
  const modalContext = useContext(ModalContext);
  const backdropContext = useContext(BackdropContext);

  useEffect(() => {
    backdropContext.setBackdropContext({
      state: true,
      dismisable: false,
      setBackdropContext: backdropContext.setBackdropContext,
    });
    invoke<Array<Owner>>("get_owners")
      .then((owners) => {
        setOwners(owners);
        if (editProject) setProject(editProject);
      })
      .catch(console.error)
      .finally(() =>
        backdropContext.setBackdropContext((prev) => ({
          ...prev,
          state: false,
        }))
      );
  }, []);

  const closeModal = () => {
    modalContext?.setModalContext((prev) => ({
      modalContent: null,
      setModalContext: prev.setModalContext,
    }));
  };

  const createProject = async () => {
    try {
      const invocation = editProject
        ? invoke<Project>("update_project", { projectData: project })
        : invoke<Project>("create_project", { projectData: project });

      invocation
        .then(console.log)
        .catch(console.error)
        .finally(() => {
          if (setUpdater) setUpdater(undefined);
        });
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
      className="bg-white bg-transparent h-full px-4 py-8 overflow-auto"
    >
      <h3 className="text-black underline underline-offset-1 font-bold text-xl">
        Project
      </h3>
      <div className="h-fit grid grid-cols-1 gap-8 my-4">
        {!!editProject && (
          <WatchOwnerDetails owner_id={editProject.owner_id} action={false} />
        )}
        <TextField
          required
          margin="none"
          id="outlined-required"
          label="Name"
          onChange={(event) => handleChange(event, "name")}
          defaultValue={project.name || null}
        />
        {!editProject && (
          <TextField
            required
            select
            margin="none"
            id="outlined-required"
            label="Owner"
            disabled={!!editProject && !!project.owner_id}
            defaultValue={project.owner_id || null}
            onChange={(event) => handleChange(event, "owner_id")}
          >
            {owners.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.lastname}, {option.name}
              </MenuItem>
            ))}
          </TextField>
        )}
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
          className={`p-4 ${
            !!editProject
              ? "bg-yellow-200 hover:bg-yellow-500"
              : "bg-blue-200 hover:bg-blue-500"
          } hover:ring-2 ring-white rounded hover:text-black`}
        >
          <AddBox className="mr-2" />
          {!!editProject ? "Edit" : "Create"}
        </button>
      </div>
    </Box>
  );
}
