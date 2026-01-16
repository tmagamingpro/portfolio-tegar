import { useState, useEffect } from "react";
import { getProjects } from "../services/projects";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects();

        let projectsArray = [];
        if (Array.isArray(data)) {
          projectsArray = data;
        } else if (data?.data && Array.isArray(data.data)) {
          projectsArray = data.data;
        } else if (data?.projects && Array.isArray(data.projects)) {
          projectsArray = data.projects;
        }

        setProjects(projectsArray);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <main className="bg-white min-h-screen">
      <section className="px-[8%] py-20">
        <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          My Projects
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto pl-4 border-l-4 border-purple-400">
          Portfolio of works I've created & contributed to
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading projects...</p>
            </div>
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto bg-red-50 border-2 border-red-400 p-6 rounded-lg">
            <p className="text-red-700 font-semibold">❌ Error: {error}</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onProjectClick={handleProjectClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Belum ada project yang ditampilkan.
            </p>
          </div>
        )}
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
