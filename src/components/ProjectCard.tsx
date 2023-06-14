"use client";
import { useContext } from "react";
import { ModalContext } from "@/contexts/modal.context";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PaymentsIcon from "@mui/icons-material/Payments";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Link from "next/link";
import { Tooltip } from "@mui/material";
import dynamic from "next/dynamic";
import { Project } from "@/models/Project";

export interface ProjectCardProps {
  project: Project;
}

const WatchOwnerDetails = dynamic(
  () => import("../components/WatchOwnerDetails"),
  {
    ssr: false,
  }
);
const WatchPayments = dynamic(() => import("../components/WatchPayments"), {
  ssr: false,
});

const CreateProject = dynamic(() => import("../components/CreateProject"), {
  ssr: false,
});
const CreatePayment = dynamic(() => import("../components/CreatePayment"), {
  ssr: false,
});

export default function ProjectCard({ project }: ProjectCardProps) {
  const modalContext = useContext(ModalContext);
  const chargePayment = () => {
    modalContext.setModalContext((prev) => ({
      modalContent: <CreatePayment project={project} />,
      setModalContext: prev.setModalContext,
    }));
  };
  const watchPayments = () => {
    modalContext.setModalContext((prev) => ({
      modalContent: <WatchPayments project={project} />,
      setModalContext: prev.setModalContext,
    }));
  };
  const watchOwnerDetails = () => {
    modalContext.setModalContext((prev) => ({
      modalContent: <WatchOwnerDetails owner_id={project.owner_id} />,
      setModalContext: prev.setModalContext,
    }));
  };

  const updateProject = () => {
    modalContext.setModalContext((prev) => ({
      modalContent: <CreateProject editProject={project} />,
      setModalContext: prev.setModalContext,
    }));
  };

  return (
    <>
      <section className="w-full h-full grid grid-cols-3 md:grid-cols-4  p-2  hover:bg-white hover:ring-2 ring-blue-100 hover:text-black rounded hover:cursor-pointer">
        <Link
          className="col-span-1 h-full flex items-center md:col-span-2"
          href={project.url}
        >
          <p className="font-bold text-lg">{project.name}</p>
        </Link>
        <div className=" col-span-2 md:col-span-2 gap-2 w-full flex flex-row justify-end">
          <Tooltip title="Owner details">
            <button
              onClick={watchOwnerDetails}
              className="p-2 rounded-lg bg-blue-200 hover:bg-blue-500 hover:ring-2 ring-white hover:text-black "
            >
              <AssignmentIndIcon />
            </button>
          </Tooltip>
          <Tooltip title="Charge payment">
            <button
              onClick={chargePayment}
              className="p-2 rounded-lg bg-blue-200 hover:bg-blue-500 hover:ring-2 ring-white hover:text-black "
            >
              <PaymentsIcon />
            </button>
          </Tooltip>

          <Tooltip title="Watch payments">
            <button
              onClick={watchPayments}
              className="p-2 rounded-lg bg-blue-200 hover:bg-blue-500 hover:ring-2 ring-white hover:text-black "
            >
              <MonetizationOnIcon />
            </button>
          </Tooltip>

          <Tooltip title="Update">
            <button
              onClick={updateProject}
              className="p-2 rounded-lg text-yellow-200 bg-blue-200 hover:bg-yellow-500 hover:ring-2 ring-white hover:text-black "
            >
              <BorderColorIcon />
            </button>
          </Tooltip>
          <Tooltip title="Delete">
            <button
              onClick={watchPayments}
              className="p-2 rounded-lg text-red-300 bg-blue-200 hover:bg-red-500 hover:ring-2 ring-white hover:text-black "
            >
              <DeleteForeverIcon />
            </button>
          </Tooltip>
        </div>
      </section>
    </>
  );
}
