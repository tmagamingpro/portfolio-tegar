const skills = {
  Frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
  Backend: ["Express"],
  Tools: ["Git", "GitHub", "VS Code", "Vercel"]
};

export default function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'HTML', level: 95 },
        { name: 'CSS', level: 90 },
        { name: 'JavaScript', level: 88 },
        { name: 'React', level: 85 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Responsive Design', level: 88 }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Express.js', level: 82 },
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
        { name: 'Communication', level: 85 }
      ]
    }
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="px-[8%] py-20">
        <h2 className="text-4xl font-bold text-center mb-2">Skills & Expertise</h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto pl-4 border-l-4 border-gray-800">
          Teknologi dan keahlian yang saya kuasai
        </p>

        <div className="grid grid-cols-2 gap-10 max-w-5xl mx-auto">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-6 text-pink-400">{cat.category}</h3>
              
              <div className="space-y-5">
                {cat.skills.map((skill, sidx) => (
                  <div key={sidx}>
                    <div className="flex justify-between mb-1.5">
                      <span className="font-semibold text-gray-800">{skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-pink-400 to-blue-400 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition">
            <div className="text-4xl font-bold text-pink-400 mb-2">5+</div>
            <p className="text-gray-600 font-semibold">Projects Completed</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition">
            <div className="text-4xl font-bold text-pink-400 mb-2">2+</div>
            <p className="text-gray-600 font-semibold">Years Experience</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition">
            <div className="text-4xl font-bold text-pink-400 mb-2">100%</div>
            <p className="text-gray-600 font-semibold">Dedication</p>
          </div>
        </div>
      </section>
    </main>
  );
}
