import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProjects } from '../services/projects';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const adminUrl = import.meta.env.VITE_ADMIN_URL || 'https://admin-dashboard.vercel.app';

  useEffect(() => {
    getProjects()
      .then(data => {
        const projectsArray = Array.isArray(data) ? data : data?.data || data?.projects || [];
        setProjects(projectsArray);
      })
      .catch(err => {
        console.error(err);
        setProjects([]);
      })
      .finally(() => setLoading(false));
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
    <main className="bg-white">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row justify-between items-center gap-10 px-4 sm:px-6 md:px-[8%] py-12 sm:py-16 bg-white">
        <div className="w-full lg:max-w-[50%] text-center lg:text-left">
          <span className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
            Welcome to my portfolio
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 my-5 leading-tight">
            Hi, I'm <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Tegar Mupagiwa Afrian</span>
            <br />
            Fullstack Developer
          </h1>
          <p className="text-gray-600 mb-5 text-sm sm:text-base">
            Halo! Aku Tegar Mupagiwa Afrian, seorang mahasiswa Informatika yang suka banget dengan dunia teknologi. Aku fokus di Web Development, sama Machine Learning. Yuk jelajahi portofolio ini untuk lihat skill dan project aku!
          </p>

          <div className="flex gap-3 mb-5 flex-wrap justify-center lg:justify-start">
            <Link to="/projects" className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 text-white px-5 py-2.5 rounded-lg font-bold hover:shadow-lg hover:from-purple-500 hover:to-pink-500 transition">
              View My Work →
            </Link>
            <a href="mailto:tegarafrian2006@email.com" className="inline-block border-2 border-purple-400 text-purple-600 px-5 py-2.5 rounded-lg font-bold hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white hover:border-transparent transition">
              Contact Me
            </a>
            <a href={adminUrl} target="_blank" rel="noreferrer" className="inline-block border-2 border-purple-400 text-purple-600 px-5 py-2.5 rounded-lg font-bold hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white hover:border-transparent transition">
              Admin Panel
            </a>
          </div>

          <div className="flex gap-4 text-2xl justify-center lg:justify-start">
            <a href="https://github.com/tmagamingpro" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-purple-600 transition">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/tegar-mupagiwa-afrian-718b3739a/" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-purple-600 transition">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/tegar_mupagiwa_/" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-purple-600 transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="text-center">
          <img src="/img/WhatsApp Image 2025-12-19 at 19.15.01_e3775ca0.jpg" alt="Foto Tegar" className="w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full border-4 border-purple-400 object-cover shadow-lg mx-auto" />
        </div>
      </section>

      {/* Skills Preview */}
      <section className="px-4 sm:px-6 md:px-[8%] py-16 sm:py-20 bg-white">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Skills</h2>
        <p className="text-center text-gray-600 mb-8 sm:mb-10 max-w-xl mx-auto pl-4 border-l-4 border-purple-400 text-sm sm:text-base">
          Technologies I mostly work with
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl hover:shadow-lg hover:-translate-y-1.5 transition border-l-4 border-purple-400">
            <h4 className="font-bold mb-3 text-purple-700">Frontend</h4>
            <div className="flex flex-wrap gap-2">
              {['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'].map(tech => (
                <span key={tech} className="inline-block bg-white text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl hover:shadow-lg hover:-translate-y-1.5 transition border-l-4 border-pink-400">
            <h4 className="font-bold mb-3 text-pink-700">Backend</h4>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block bg-white text-pink-700 px-3 py-1 rounded-full text-sm border border-pink-300">
                Express
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl hover:shadow-lg hover:-translate-y-1.5 transition border-l-4 border-purple-400">
            <h4 className="font-bold mb-3 text-purple-700">Tools</h4>
            <div className="flex flex-wrap gap-2">
              {['Git', 'GitHub', 'VS Code', 'Vercel'].map(tool => (
                <span key={tool} className="inline-block bg-white text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-300">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/skills" className="inline-block border-2 border-purple-400 text-purple-600 px-7 py-3 rounded-full font-bold hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white hover:-translate-y-0.5 transition">
            See more skills →
          </Link>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="px-4 sm:px-6 md:px-[8%] py-16 sm:py-20 bg-white">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Projects</h2>
        <p className="text-center text-gray-600 mb-8 sm:mb-10 max-w-xl mx-auto pl-4 border-l-4 border-purple-400 text-sm sm:text-base">
          Works I've built
        </p>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-8 max-w-6xl mx-auto">
              {projects.slice(0, 3).map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onProjectClick={handleProjectClick}
                />
              ))}
            </div>
            <div className="text-center">
              <Link to="/projects" className="inline-block border-2 border-purple-400 text-purple-600 px-7 py-3 rounded-full font-bold hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white hover:-translate-y-0.5 transition">
                See more projects →
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">No projects yet. Check back soon!</p>
        )}
      </section>

      {/* Experience */}
      <section className="px-4 sm:px-6 md:px-[8%] py-16 sm:py-20 bg-white">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Experience</h2>
        <p className="text-center text-gray-600 mb-8 sm:mb-10 max-w-xl mx-auto pl-4 border-l-4 border-purple-400 text-sm sm:text-base">
          Organization & activities
        </p>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="pl-6 border-l-4 border-purple-400 hover:border-pink-400 transition">
            <h4 className="font-bold text-lg text-gray-800">Staff Kewirausahaan — HMIF UNSRI</h4>
            <p className="text-gray-600 mt-1">Aktif berkontribusi dalam mengelola program kewirausahaan di HMIF.</p>
          </div>

          <div className="pl-6 border-l-4 border-pink-400 hover:border-purple-400 transition">
            <h4 className="font-bold text-lg text-gray-800">Frontend Developer — LEX.DEV</h4>
            <p className="text-gray-600 mt-1">Bergabung di tim LEX.DEV sebagai Frontend Developer.</p>
          </div>
        </div>
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
