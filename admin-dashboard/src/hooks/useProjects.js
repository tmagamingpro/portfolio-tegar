import { useState, useEffect } from "react";
import { getAllProjects, createProject, deleteProject, updateProject } from "../api/projectsApi.js";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await getAllProjects();
    setProjects(data);
    setLoading(false);
  };

  const addProject = async (project) => {
    await createProject(project);
    loadProjects();
  };

  const removeProject = async (id) => {
    await deleteProject(id);
    loadProjects();
  };

  const editProject = async (id, project) => {
    await updateProject(id, project);
    loadProjects();
  };

  return { projects, loading, addProject, removeProject, editProject, loadProjects };
}
