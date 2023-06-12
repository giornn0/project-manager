import AddProjectButton from "@/components/AddProjectButton";
import Projects from "./projects";
import ModalService from "@/components/ModalService";
import AddOwnerButton from "@/components/AddOwnerButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 justify-around">
      <section className="w-full h-fit flex flex-row justify-evenly">
        <AddProjectButton />
        <AddOwnerButton />
      </section>
      <Projects />
      <ModalService />
    </main>
  );
}
