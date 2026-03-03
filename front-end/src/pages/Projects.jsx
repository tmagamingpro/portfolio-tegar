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
  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = ["html", "react", "java", "javascript", "figma", "php"];

  const normalizeTech = (tech) => {
    if (!tech) return "";
    const normalized = tech.toString().trim().toLowerCase();
    if (normalized.includes("react")) return "react";
    if (normalized.includes("javascript")) return "javascript";
    if (normalized === "js") return "javascript";
    if (normalized.includes("html")) return "html";
    if (normalized.includes("java") && !normalized.includes("javascript")) return "java";
    if (normalized.includes("figma")) return "figma";
    if (normalized.includes("php")) return "php";
    return normalized;
  };

  const getProjectTechs = (project) => {
    const source = Array.isArray(project?.technologies)
      ? project.technologies
      : Array.isArray(project?.tech)
      ? project.tech
      : [];
    return source.map(normalizeTech);
  };

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

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => getProjectTechs(project).includes(activeFilter));

  const getFilterCount = (filter) => {
    if (filter === "all") return projects.length;
    return projects.filter((project) => getProjectTechs(project).includes(filter)).length;
  };

  return (
    <main className="bg-white min-h-screen">
      <section className="px-4 sm:px-6 md:px-[8%] py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          My Projects
        </h2>
        <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-xl mx-auto pl-4 border-l-4 border-purple-400 text-sm sm:text-base">
          Beberapa projek pribadi dan grup untuk portofolio yang sudah saya kerjakan 
        </p>

        {!loading && !error && projects.length > 0 && (
          <div className="mb-6 sm:mb-7 max-w-3xl mx-auto">
            <div className="border-purple-100 rounded-xl p-3 sm:p-3.5">
              <div className="flex items-center justify-between gap-2 mb-3">
                {/* <p className="text-xs sm:text-sm font-semibold text-gray-700 tracking-wide uppercase">
                
                </p>
                <span className="text-[11px] sm:text-xs text-gray-600 bg-white border border-purple-100 px-2.5 py-0.5 rounded-full">
                  {filteredProjects.length} project
                  {filteredProjects.length !== 1 ? "s" : ""}
                </span> */}
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {["all", ...filterOptions].map((filter) => {
                  const isActive = activeFilter === filter;
                  const count = getFilterCount(filter);

                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white border-transparent shadow-md shadow-purple-200"
                          : "bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:text-purple-600 hover:shadow-sm"
                      }`}
                    >
                      <span className={`${filter === "all" ? "" : "capitalize"}`}>
                        {filter}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-600 group-hover:bg-purple-50 group-hover:text-purple-600"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl px-6 py-5 shadow-sm">
              <div className="w-8 h-8 border-2 border-purple-300 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600 text-sm font-semibold">
                Loading projects
                <span className="inline-flex items-center gap-1 ml-2 align-middle">
                  <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '120ms' }}></span>
                  <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '240ms' }}></span>
                </span>
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto bg-red-50 border-2 border-red-400 p-6 rounded-lg">
            <p className="text-red-700 font-semibold text-sm sm:text-base">Error: {error}</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
            {filteredProjects.map((project) => (
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
              Tidak ada project untuk filter ini.
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
