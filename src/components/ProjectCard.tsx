import { Project } from "@/constants/models";
import { ModalContext } from "@/contexts/modal.service";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useContext } from "react";
import CreatePayment from "./CreatePayment";
import WatchPayments from "./WatchPayments";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { Tooltip } from "@mui/material";
import WatchOwnerDetails from "./WatchOwnerDetails";
import Link from "next/link";
export interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const modalContext = useContext(ModalContext);
  const chargePayment = () => {
    modalContext.setModalContext((prev) => ({
      modalContent: <CreatePayment project_id={project.id} />,
      setModalContext: prev.setModalContext,
    }));
  };
  const watchPayments = () => {
    modalContext.setModalContext((prev) => ({
      modalContent: <WatchPayments project_id={project.id} />,
      setModalContext: prev.setModalContext,
    }));
  };
  const watchOwnerDetails = () => {
    modalContext.setModalContext((prev) => ({
      modalContent: <WatchOwnerDetails owner_id={project.owner_id} />,
      setModalContext: prev.setModalContext,
    }));
  };

  return (
    <>
      <section className="w-full p-2 flex flex-row items-center justify-between gap-4 hover:bg-white hover:ring-2 ring-blue-100 hover:text-black rounded hover:cursor-pointer">
        <Link href={project.url}>
          <p>
            {project.id} - {project.name}
          </p>
        </Link>
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
      </section>
    </>
  );
}
