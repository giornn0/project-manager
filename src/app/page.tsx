"use client";
import AddProjectButton from "@/components/AddProjectButton";
import AddOwnerButton from "@/components/AddOwnerButton";
import { IModalContext, ModalContext } from "@/contexts/modal.context";
import { useState } from "react";
import dynamic from "next/dynamic";
import ModalService from "@/services/ModalService";
import { BackdropContext, IBackdropContext } from "@/contexts/backdrop.context";

const ListProjects = dynamic(() => import("../components/ListProjects"), {
  ssr: false,
});

export default function Home() {
  const [modalContext, setModalContext] = useState<IModalContext>(
    {} as IModalContext
  );
  const [backdropContext, setBackdropContext] = useState<IBackdropContext>(
    {} as IBackdropContext
  );
  return (
    <ModalContext.Provider
      value={{ modalContent: modalContext.modalContent, setModalContext }}
    >
      <BackdropContext.Provider
        value={{ state: backdropContext.state, setBackdropContext }}
      >
        <main className="flex min-h-screen flex-col p-24 justify-around">
          <section className="w-full h-fit flex flex-row justify-evenly">
            <AddProjectButton />
            <AddOwnerButton />
          </section>
          <ListProjects />
          <ModalService />
        </main>
      </BackdropContext.Provider>
    </ModalContext.Provider>
  );
}
