import { useState, useEffect } from "react";
import { getProjects } from "../services/projects";
import ProjectCard from "../components/ProjectCard";
import Modal from "../components/Modal";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects();

        console.log("📊 Raw API Response:", data);

        // Handle berbagai format response
        let projectsArray = [];
        if (Array.isArray(data)) {
          projectsArray = data;
        } else if (data?.data && Array.isArray(data.data)) {
          projectsArray = data.data;
        } else if (data?.projects && Array.isArray(data.projects)) {
          projectsArray = data.projects;
        }

        console.log("📁 Projects array:", projectsArray);

        // Log setiap project
        projectsArray.forEach((p, idx) => {
          console.log(`Project ${idx}:`, {
            id: p.id,
            title: p.title,
            image: p.image,
            imageUrl: p.imageUrl,
            allFields: Object.keys(p),
          });
        });

        setProjects(projectsArray);
      } catch (err) {
        console.error("❌ Error fetching projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="px-[8%] py-20">
        <h2 className="text-4xl font-bold text-center mb-2">My Projects</h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto pl-4 border-l-4 border-gray-800">
          Portfolio of works I've created & contributed to
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading projects...</p>
            </div>
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 p-6 rounded-lg">
            <p className="text-red-700 font-semibold">❌ Error: {error}</p>
            <p className="text-red-600 text-sm mt-2">
              Check Console (F12) untuk debug info
            </p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onUnavailable={() => setModalOpen(true)}
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
