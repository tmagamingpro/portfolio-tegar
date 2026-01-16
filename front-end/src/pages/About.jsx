import { useState } from 'react';

export default function About() {
  const [showWaifuModal, setShowWaifuModal] = useState(false);

  const timeline = [
    { year: '2024', title: 'Mulai Belajar Java dasar', desc: 'Memulai journey di dunia programming' },
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
    <main className="bg-white min-h-screen">
      {/* Timeline */}
      <section className="px-[8%] py-20">
        <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Perjalanan Saya
        </h2>
        
        <div className="max-w-2xl mx-auto">
          {timeline.map((item, idx) => (
            <div key={idx} className="flex gap-6 mb-8 relative">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                {idx !== timeline.length - 1 && (
                  <div className="w-1 bg-gradient-to-b from-purple-300 to-pink-300 h-20"></div>
                )}
              </div>
              <div>
                <p className="font-bold text-purple-500">{item.year}</p>
                <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Cards */}
      <section className="px-[8%] py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Tentang Saya
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto pl-4 border-l-4 border-purple-400">
          Kenali lebih jauh siapa aku dan apa yang bisa aku kontribusikan
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {aboutCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl hover:shadow-lg hover:-translate-y-1 transition border-l-4 border-purple-400 hover:border-pink-400 shadow-md"
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* My Waifu Card */}
      <section className="px-[8%] py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Special Someone
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto pl-4 border-l-4 border-purple-400">
          Orang istimewa dalam hidup saya
        </p>

        <div className="max-w-md mx-auto">
          <div
            className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition cursor-pointer group border-2 border-purple-200 hover:border-pink-400"
            onClick={() => setShowWaifuModal(true)}
          >
            {/* Image */}
            <div className="relative overflow-hidden h-80 bg-gradient-to-br from-purple-200 to-pink-200">
              <img
                src="/img/WhatsApp Image 2025-10-02 at 13.58.35_bc62ec3b.jpg"
                alt="My Waifu"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23f3f4f6" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" font-size="16" fill="%239ca3af" text-anchor="middle" dy=".3em"%3EImage not found%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                My Waifu ❤️
              </h3>

              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Yang selalu menemani kehidupan saya dan telah menjadi istri sah
              </p>

              <p className="text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-semibold text-sm group-hover:from-purple-400 group-hover:to-pink-400 transition">
                Click untuk lihat lebih →
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waifu Modal */}
      {showWaifuModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setShowWaifuModal(false)}
              className="fixed top-6 right-6 text-gray-500 hover:text-gray-700 text-2xl font-bold z-20 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-pink-50 transition"
            >
              ✕
            </button>

            {/* Image */}
            <div className="relative w-full h-96 bg-gradient-to-br from-purple-200 to-pink-200 overflow-hidden">
              <img
                src="/img/WhatsApp Image 2025-10-02 at 13.58.35_bc62ec3b.jpg"
                alt="My Waifu"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23f3f4f6" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" font-size="16" fill="%239ca3af" text-anchor="middle" dy=".3em"%3EImage not found%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                My Waifu ❤️
              </h2>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Yang selalu menemani kehidupan saya dan telah menjadi istri sah
              </p>

              <div className="bg-white p-6 rounded-xl mb-6 border border-purple-200 shadow-md">
                <h3 className="font-bold text-purple-700 mb-2">Cerita Kami:</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Bersama kamu adalah keputusan terbaik dalam hidup saya. Terima kasih telah menjadi support system terbaik, partner dalam segala hal, dan istri sah yang luar biasa. Aku janji akan terus bekerja keras, grow bersama, dan memberikan yang terbaik untuk masa depan kita. I love you! 💕
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowWaifuModal(false)}
                  className="flex-1 border-2 border-purple-300 text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-purple-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
