export default function About() {
  const timeline = [
    { year: '2023', title: 'Mulai Belajar Web Development', desc: 'Memulai journey di dunia programming' },
    { year: '2024', title: 'Bergabung LEX.DEV', desc: 'Menjadi Frontend Developer di tim LEX.DEV' },
    { year: '2025', title: 'Ekspansi Skills', desc: 'Belajar Backend & Machine Learning' }
  ];

  const aboutCards = [
    {
      icon: '🎓',
      title: 'Pendidikan',
      desc: 'Mahasiswa Informatika di Universitas Sriwijaya, fokus pada Web Development & Machine Learning'
    },
    {
      icon: '💻',
      title: 'Keahlian',
      desc: 'Menguasai React, Tailwind CSS, Express.js, dan berbagai teknologi modern lainnya'
    },
    {
      icon: '🏢',
      title: 'Pengalaman',
      desc: 'Staff Kewirausahaan di HMIF UNSRI dan Frontend Developer di LEX.DEV'
    },
    {
      icon: '🎯',
      title: 'Visi',
      desc: 'Menciptakan solusi teknologi yang berdampak positif untuk masyarakat'
    },
    {
      icon: '🌱',
      title: 'Pembelajaran',
      desc: 'Terus belajar dan mengikuti perkembangan teknologi terkini'
    },
    {
      icon: '⚡',
      title: 'Kecepatan',
      desc: 'Mengerjakan project dengan cepat, rapi, scalable, dan kece 😎'
    },
    {
      icon: '🤝',
      title: 'Kolaborasi',
      desc: 'Suka bekerja dalam tim dan berbagi pengetahuan dengan orang lain'
    },
    {
      icon: '🎨',
      title: 'Hobi',
      desc: 'Gaming, coding, design, dan ngopi bareng teman-teman'
    }
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Timeline */}
      <section className="px-[8%] py-20">
        <h2 className="text-4xl font-bold text-center mb-10">Perjalanan Saya</h2>
        
        <div className="max-w-2xl mx-auto">
          {timeline.map((item, idx) => (
            <div key={idx} className="flex gap-6 mb-8 relative">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
                {idx !== timeline.length - 1 && (
                  <div className="w-1 bg-pink-200 h-20"></div>
                )}
              </div>
              <div>
                <p className="font-bold text-pink-400">{item.year}</p>
                <h4 className="text-lg font-bold">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Cards */}
      <section className="px-[8%] py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-2">Tentang Saya</h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto pl-4 border-l-4 border-gray-800">
          Kenali lebih jauh siapa aku dan apa yang bisa aku kontribusikan
        </p>

        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {aboutCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-xl hover:shadow-lg hover:-translate-y-1 transition border-l-4 border-pink-400"
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-lg mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
