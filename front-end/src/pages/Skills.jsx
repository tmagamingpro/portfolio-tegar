import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../services/projects';

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState([]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [loading, setLoading] = useState(true);
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
  const experienceStart = new Date(2024, 7, 1);
  const now = new Date();
  const experienceYears = (() => {
    let years = now.getFullYear() - experienceStart.getFullYear();
    const beforeAnniversary =
      now.getMonth() < experienceStart.getMonth() ||
      (now.getMonth() === experienceStart.getMonth() && now.getDate() < experienceStart.getDate());
    if (beforeAnniversary) years -= 1;
    return Math.max(0, years);
  })();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects untuk menghitung total dan tech stack
        const projectsData = await getProjects();
        const projectsArray = Array.isArray(projectsData) ? projectsData : projectsData?.data || projectsData?.projects || [];
        
        setProjectsCount(projectsArray.length);

        // Normalisasi function untuk tech names
        const normalizeTech = (tech) => {
          return tech.toLowerCase().trim();
        };

        // Hitung percentage dari tech yang digunakan
        const techCount = {};
        projectsArray.forEach(project => {
          let technologies = [];
          
          // Parse tech field (bisa string JSON atau array)
          if (project.tech) {
            if (typeof project.tech === 'string') {
              try {
                technologies = JSON.parse(project.tech);
              } catch (e) {
                technologies = [project.tech];
              }
            } else if (Array.isArray(project.tech)) {
              technologies = project.tech;
            }
          }
          
          // Jika masih ada technologies field (fallback)
          if (!technologies.length && project.technologies) {
            if (typeof project.technologies === 'string') {
              try {
                technologies = JSON.parse(project.technologies);
              } catch (e) {
                technologies = [project.technologies];
              }
            } else if (Array.isArray(project.technologies)) {
              technologies = project.technologies;
            }
          }

          // Count technologies
          technologies.forEach(tech => {
            const normalizedTech = normalizeTech(tech);
            techCount[normalizedTech] = (techCount[normalizedTech] || 0) + 1;
          });
        });

        console.log('Tech Count:', techCount);
        console.log('Projects:', projectsArray);

        const totalProjects = projectsArray.length || 1;
        
        // Helper function untuk get percentage
        const getPercentage = (techNames) => {
          const count = techNames.reduce((acc, name) => {
            return acc + (techCount[normalizeTech(name)] || 0);
          }, 0);
          return Math.round(count / totalProjects * 100) || 0;
        };

        // Setup skill categories dengan data dari projects
        const categories = [
          {
            category: 'Frontend',
            skills: [
              { name: 'HTML', level: getPercentage(['HTML', 'Html', 'html']) },
              { name: 'CSS', level: getPercentage(['CSS', 'Css', 'css']) },
              { name: 'JavaScript', level: getPercentage(['JavaScript', 'javascript', 'js', 'JS']) },
              { name: 'React', level: getPercentage(['React', 'react', 'ReactJS', 'reactjs']) },
              { name: 'Tailwind CSS', level: getPercentage(['Tailwind CSS', 'tailwind css', 'TailwindCSS', 'tailwindcss', 'Tailwind', 'tailwind']) }
            ]
          },
          {
            category: 'Backend',
            skills: [
              { name: 'Node.js', level: getPercentage(['Node.js', 'node.js', 'NodeJS', 'nodejs', 'Node', 'node']) },
              { name: 'Express.js', level: getPercentage(['Express.js', 'express.js', 'ExpressJS', 'expressjs', 'Express', 'express']) },
              { name: 'SupaBase', level: getPercentage(['SupaBase', 'supabase', 'Supabase']) },
              { name: 'REST API', level: 85 },
              { name: 'Database Design', level: 75 }
            ]
          },
          {
            category: 'Tools & Platforms',
            skills: [
              { name: 'Git & GitHub', level: 88 },
              { name: 'VS Code', level: 90 },
              { name: 'Figma', level: 20 },
              { name: 'Vercel', level: 80 },
              { name: 'Railway', level: 20 }
            ]
          },
          {
            category: 'Other Skills',
            skills: [
              { name: 'Problem Solving', level: 87 },
              { name: 'UI/UX Design', level: 80 },
              { name: 'Project Management', level: 33 },
              { name: 'Communication', level: 50 },
              { name: 'Responsive Design', level: 88 }
            ]
          }
        ];

        setSkillCategories(categories);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set default data jika error
        setSkillCategories([
          {
            category: 'Frontend',
            skills: [
              { name: 'HTML', level: 0 },
              { name: 'CSS', level: 0 },
              { name: 'JavaScript', level: 0 },
              { name: 'React', level: 0 },
              { name: 'Tailwind CSS', level: 0 }
            ]
          },
          {
            category: 'Backend',
            skills: [
              { name: 'Node.js', level: 0 },
              { name: 'Express.js', level: 0 },
              { name: 'REST API', level: 85 },
              { name: 'Database Design', level: 75 }
            ]
          },
          {
            category: 'Tools & Platforms',
            skills: [
              { name: 'Git & GitHub', level: 88 },
              { name: 'VS Code', level: 90 },
              { name: 'Figma', level: 75 },
              { name: 'Vercel', level: 85 },
              { name: 'Railway', level: 80 }
            ]
          },
          {
            category: 'Other Skills',
            skills: [
              { name: 'Problem Solving', level: 87 },
              { name: 'UI/UX Design', level: 80 },
              { name: 'Project Management', level: 78 },
              { name: 'Communication', level: 85 },
              { name: 'Responsive Design', level: 88 }
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading skills...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <motion.section
        className="px-4 sm:px-6 md:px-[8%] py-16 sm:py-20"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Skills & Expertise</motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-600 mb-8 sm:mb-12 max-w-xl mx-auto pl-4 border-l-4 border-purple-400 text-sm sm:text-base">
          Teknologi dan keahlian yang saya kuasai
        </motion.p>

        <motion.div variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 max-w-5xl mx-auto">
          {skillCategories.map((cat, idx) => (
            <motion.div key={idx} variants={fadeUp} className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 sm:p-6 rounded-xl shadow hover:shadow-lg transition border-l-4 border-purple-400 hover:border-pink-400">
              <motion.h3 variants={fadeIn} className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{cat.category}</motion.h3>
              
              <motion.div variants={stagger} className="space-y-5">
                {cat.skills.map((skill, sidx) => (
                  <motion.div key={sidx} variants={fadeUp}>
                    {(() => {
                      const safeLevel = Math.max(0, Math.min(100, Number(skill.level) || 0));
                      return (
                        <>
                    <div className="flex justify-between mb-1.5">
                      <span className="font-semibold text-gray-800 text-sm sm:text-base">{skill.name}</span>
                      <span className="text-xs sm:text-sm font-semibold text-purple-600">{safeLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-2.5 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${safeLevel}%` }}
                      ></div>
                    </div>
                        </>
                      );
                    })()}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info - Integrated with Admin Dashboard */}
        <motion.div variants={stagger} className="max-w-4xl mx-auto mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <motion.div variants={fadeUp} className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 sm:p-6 rounded-xl shadow hover:shadow-lg transition border-l-4 border-purple-400 text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">{projectsCount}+</div>
            <p className="text-gray-700 font-semibold text-sm sm:text-base">Projects Completed</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 sm:p-6 rounded-xl shadow hover:shadow-lg transition border-l-4 border-pink-400 text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">{experienceYears}+</div>
            <p className="text-gray-700 font-semibold text-sm sm:text-base">Years Experience</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 sm:p-6 rounded-xl shadow hover:shadow-lg transition border-l-4 border-purple-400 text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">100%</div>
            <p className="text-gray-700 font-semibold text-sm sm:text-base">Dedication</p>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
}
