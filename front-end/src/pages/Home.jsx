import { Link } from 'react-router-dom';



import { useState, useEffect } from 'react';



import { motion } from 'framer-motion';



import { getProjects } from '../services/projects';



import ProjectCard from '../components/ProjectCard';



import ProjectModal from '../components/ProjectModal';







export default function Home() {



  const cvUrl = import.meta.env.VITE_CV_URL;



  const [projects, setProjects] = useState([]);



  const [loading, setLoading] = useState(true);



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



        <motion.div



          initial={{ opacity: 0, y: 14 }}



          animate={{ opacity: 1, y: 0 }}



          transition={{ duration: 0.6, ease: "easeOut" }}



          className="w-full lg:max-w-[50%] text-center lg:text-left"



        >



          <motion.span



            initial={{ opacity: 0, y: 8 }}



            animate={{ opacity: 1, y: 0 }}



            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}



            className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-1.5 rounded-full text-sm font-semibold"



          >



            Welcome to my portfolio



          </motion.span>



          <motion.h1



            initial={{ opacity: 0, y: 10 }}



            animate={{ opacity: 1, y: 0 }}



            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}



            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 my-5 leading-tight"



          >



            Hi, I'm <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Tegar Mupagiwa Afrian</span>



            <br />



            Fullstack Developer



          </motion.h1>



          <motion.p



            initial={{ opacity: 0, y: 8 }}



            animate={{ opacity: 1, y: 0 }}



            transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}



            className="text-gray-600 mb-5 text-sm sm:text-base"



          >



            Halo! Aku Tegar Mupagiwa Afrian, seorang mahasiswa Informatika yang suka banget dengan dunia teknologi. Aku fokus di Web Development, sama Machine Learning. Yuk jelajahi portofolio ini untuk lihat skill dan project aku!



          </motion.p>







          <motion.div



            initial={{ opacity: 0, y: 6 }}



            animate={{ opacity: 1, y: 0 }}



            transition={{ duration: 0.6, ease: "easeOut", delay: 0.24 }}



            className="flex gap-3 mb-5 flex-wrap justify-center lg:justify-start"



          >



            <Link to="/projects" className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 text-white px-5 py-2.5 rounded-lg font-bold hover:shadow-lg hover:from-purple-500 hover:to-pink-500 transition">



              View My Work ?



            </Link>



            <Link to="/contact" className="inline-block border-2 border-purple-400 text-purple-600 px-5 py-2.5 rounded-lg font-bold hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white hover:border-transparent transition">



              Contact Me



            </Link>



            <a href={cvUrl || "/public/img/CV_GDG_Tegar.pdf"} target="_blank" rel="noreferrer" className="inline-block border-2 border-purple-400 text-purple-600 px-5 py-2.5 rounded-lg font-bold hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white hover:border-transparent transition">



              MY CV



            </a>



          </motion.div>







          <motion.div



            initial={{ opacity: 0, y: 6 }}



            animate={{ opacity: 1, y: 0 }}



            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}



            className="flex gap-4 text-2xl justify-center lg:justify-start"



          >



            <a href="https://github.com/tmagamingpro" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-purple-600 transition">



              <i className="fab fa-github"></i>



            </a>



            <a href="https://www.linkedin.com/in/tegar-mupagiwa-afrian-718b3739a/" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-purple-600 transition">



              <i className="fab fa-linkedin"></i>



            </a>



            <a href="https://www.instagram.com/tegar_mupagiwa_/" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-purple-600 transition">



              <i className="fab fa-instagram"></i>



            </a>



          </motion.div>



        </motion.div>







        <motion.div



          initial={{ opacity: 0, scale: 0.98 }}



          animate={{ opacity: 1, scale: 1 }}



          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}



          className="text-center"



        >



          <motion.img



            initial={{ opacity: 0 }}



            animate={{ opacity: 1 }}



            transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}



            src="/img/WhatsApp Image 2025-12-19 at 19.15.01_e3775ca0.jpg"



            alt="Foto Tegar"



            className="w-44 h-44 sm:w-65 sm:h-65 lg:w-64 lg:h-64 rounded-full border-4 border-purple-400 object-cover shadow-lg mx-auto"



          />



        </motion.div>



      </section>







      {/* Skills Preview */}



      <motion.section

        className="px-4 sm:px-6 md:px-[8%] py-16 sm:py-20 bg-white"

        variants={stagger}

        initial="hidden"

        whileInView="show"

        viewport={{ once: true, amount: 0.2 }}

      >

        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Skills</motion.h2>

        <motion.p variants={fadeUp} className="text-center text-gray-600 mb-8 sm:mb-10 max-w-xl mx-auto pl-4 border-l-4 border-purple-400 text-sm sm:text-base">

          Teknologi yang saya kuasai

        </motion.p>



        <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">

          <motion.div variants={fadeUp} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl hover:shadow-lg hover:-translate-y-1.5 transition border-l-4 border-purple-400">

            <h4 className="font-bold mb-3 text-purple-700">Frontend</h4>

            <div className="flex flex-wrap gap-2">

              {['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'].map(tech => (

                <span key={tech} className="inline-block bg-white text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-300">

                  {tech}

                </span>

              ))}

            </div>

          </motion.div>



          <motion.div variants={fadeUp} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl hover:shadow-lg hover:-translate-y-1.5 transition border-l-4 border-pink-400">

            <h4 className="font-bold mb-3 text-pink-700">Backend</h4>

            <div className="flex flex-wrap gap-2">

              <span className="inline-block bg-white text-pink-700 px-3 py-1 rounded-full text-sm border border-pink-300">

                Express

              </span>

            </div>

          </motion.div>



          <motion.div variants={fadeUp} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl hover:shadow-lg hover:-translate-y-1.5 transition border-l-4 border-purple-400">

            <h4 className="font-bold mb-3 text-purple-700">Tools</h4>

            <div className="flex flex-wrap gap-2">

              {['Git', 'GitHub', 'VS Code', 'Vercel'].map(tool => (

                <span key={tool} className="inline-block bg-white text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-300">

                  {tool}

                </span>

              ))}

            </div>

          </motion.div>

        </motion.div>



        <motion.div variants={fadeUp} className="text-center">

          <Link to="/skills" className="inline-block border-2 border-purple-400 text-purple-600 px-7 py-3 rounded-full font-bold hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white hover:-translate-y-0.5 transition">

            See more skills ???

          </Link>

        </motion.div>

      </motion.section>







      {/* Projects Preview */}



      <motion.section

        className="px-4 sm:px-6 md:px-[8%] py-16 sm:py-20 bg-white"

        variants={stagger}

        initial="hidden"

        whileInView="show"

        viewport={{ once: true, amount: 0.2 }}

      >

        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Projects</motion.h2>

        <motion.p variants={fadeUp} className="text-center text-gray-600 mb-8 sm:mb-10 max-w-xl mx-auto pl-4 border-l-4 border-purple-400 text-sm sm:text-base">

          Beberapa projek yang sudah saya kerjakan

        </motion.p>



        {loading ? (

          <motion.div variants={fadeIn} className="flex justify-center py-12">

            <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>

          </motion.div>

        ) : projects.length > 0 ? (

          <>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-8 max-w-6xl mx-auto">

              {projects.slice(0, 3).map(project => (

                <motion.div key={project.id} variants={fadeUp}>

                  <ProjectCard

                    project={project}

                    onProjectClick={handleProjectClick}

                  />

                </motion.div>

              ))}

            </motion.div>

            <motion.div variants={fadeUp} className="text-center">

              <Link to="/projects" className="inline-block border-2 border-purple-400 text-purple-600 px-7 py-3 rounded-full font-bold hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:text-white hover:-translate-y-0.5 transition">

                See more projects ???

              </Link>

            </motion.div>

          </>

        ) : (

          <motion.p variants={fadeIn} className="text-center text-gray-600">No projects yet. Check back soon!</motion.p>

        )}

      </motion.section>







      {/* Experience */}



      <motion.section

        className="px-4 sm:px-6 md:px-[8%] py-16 sm:py-20 bg-white"

        variants={stagger}

        initial="hidden"

        whileInView="show"

        viewport={{ once: true, amount: 0.2 }}

      >

        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Experience</motion.h2>

        <motion.p variants={fadeUp} className="text-center text-gray-600 mb-8 sm:mb-10 max-w-xl mx-auto pl-4 border-l-4 border-purple-400 text-sm sm:text-base">

          Organisasi dan posisi yang pernah saya jalani

        </motion.p>



        <motion.div variants={stagger} className="max-w-2xl mx-auto space-y-6">

          <motion.div variants={fadeUp} className="pl-6 border-l-4 border-purple-400 hover:border-pink-400 transition">

            <h4 className="font-bold text-lg text-gray-800">Staff Kewirausahaan ??? HMIF UNSRI</h4>

            <p className="text-gray-600 mt-1">Aktif berkontribusi dalam mengelola program kewirausahaan di HMIF.</p>

          </motion.div>



          <motion.div variants={fadeUp} className="pl-6 border-l-4 border-pink-400 hover:border-purple-400 transition">

            <h4 className="font-bold text-lg text-gray-800">Frontend Developer ??? LEX.DEV</h4>

            <p className="text-gray-600 mt-1">Bergabung di tim LEX.DEV sebagai Frontend Developer.</p>

          </motion.div>

        </motion.div>

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



