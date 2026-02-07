import { useState, useEffect } from "react";

import { motion } from "framer-motion";

import { getProjects } from "../services/projects";

import ProjectCard from "../components/ProjectCard";

import ProjectModal from "../components/ProjectModal";



export default function Projects() {

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [selectedProject, setSelectedProject] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const fadeUp = {

    hidden: { opacity: 0, y: 12 },

    show: { opacity: 1, y: 0 }

  };

  const fadeIn = {

    hidden: { opacity: 0 },

    show: { opacity: 1 }

  };

  const stagger = {

    show: { transition: { staggerChildren: 0.08 } }

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



  return (

    <main className="bg-white min-h-screen">

      <motion.section

        className="px-4 sm:px-6 md:px-[8%] py-16 sm:py-20"

        variants={stagger}

        initial="hidden"

        whileInView="show"

        viewport={{ once: true, amount: 0.2 }}

      >

        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">

          My Projects

        </motion.h2>

        <motion.p variants={fadeUp} className="text-center text-gray-600 mb-8 sm:mb-12 max-w-xl mx-auto pl-4 border-l-4 border-purple-400 text-sm sm:text-base">

          Beberapa projek pribadi dan grup untuk portofolio yang sudah saya kerjakan 

        </motion.p>



        {loading ? (

          <motion.div variants={fadeIn} className="flex justify-center items-center h-64">

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

          </motion.div>

        ) : error ? (

          <motion.div variants={fadeIn} className="max-w-2xl mx-auto bg-red-50 border-2 border-red-400 p-6 rounded-lg">

            <p className="text-red-700 font-semibold text-sm sm:text-base">Error: {error}</p>

          </motion.div>

        ) : projects.length > 0 ? (

          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">

            {projects.map((project) => (

              <motion.div key={project.id} variants={fadeUp}>

                <ProjectCard

                  project={project}

                  onProjectClick={handleProjectClick}

                />

              </motion.div>

            ))}

          </motion.div>

        ) : (

          <motion.div variants={fadeIn} className="text-center py-12">

            <p className="text-gray-600 text-lg">

              Belum ada project yang ditampilkan.

            </p>

          </motion.div>

        )}

      </motion.section>



      {/* Project Modal */}

      <ProjectModal

        project={selectedProject}

        isOpen={modalOpen}

        onClose={handleCloseModal}

      />

    </main>

  );

}

