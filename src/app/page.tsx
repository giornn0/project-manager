"use client";
import AddProjectButton from "@/components/AddProjectButton";
import ModalService from "@/components/ModalService";
import AddOwnerButton from "@/components/AddOwnerButton";
import { IModalContext, ModalContext } from "@/contexts/modal.service";
import { useState } from "react";
import dynamic from "next/dynamic";

const ListProjects = dynamic(() => import("../components/ListProjects"), {
  ssr: false,
});

export default function Home() {
  const [modalContext, setModalContext] = useState<IModalContext>(
    {} as IModalContext
  );
  return (
    <ModalContext.Provider
      value={{ modalContent: modalContext.modalContent, setModalContext }}
    >
      <main className="flex min-h-screen flex-col p-24 justify-around">
        <section className="w-full h-fit flex flex-row justify-evenly">
          <AddProjectButton />
          <AddOwnerButton />
        </section>
        <ListProjects />
        <ModalService />
      </main>
    </ModalContext.Provider>
  );
}
