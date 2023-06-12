"use client";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/constants/models";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const updateProjects = (listed: Array<Project>) => setProjects(listed);
  useEffect(() => {
    invoke<Array<Project>>("get_projects")
      .then(updateProjects)
      .catch(console.error);
  }, []);

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
