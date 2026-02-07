import { useState } from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const [showWaifuModal, setShowWaifuModal] = useState(false);
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
      <motion.section
        className="px-4 sm:px-6 md:px-[8%] py-16 sm:py-20"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Perjalanan Saya
        </motion.h2>
        
        <motion.div variants={stagger} className="max-w-2xl mx-auto">
          {timeline.map((item, idx) => (
            <motion.div key={idx} variants={fadeUp} className="flex gap-4 sm:gap-6 mb-8 relative">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                {idx !== timeline.length - 1 && (
                  <div className="w-1 bg-gradient-to-b from-purple-300 to-pink-300 h-20"></div>
                )}
              </div>
              <div>
                <p className="font-bold text-purple-500 text-sm sm:text-base">{item.year}</p>
                <h4 className="text-base sm:text-lg font-bold text-gray-800">{item.title}</h4>
                <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* About Cards */}
      <motion.section
        className="px-4 sm:px-6 md:px-[8%] py-16 sm:py-20 bg-white"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Tentang Saya
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-600 mb-8 sm:mb-12 max-w-xl mx-auto pl-4 border-l-4 border-purple-400 text-sm sm:text-base">
          Kenali lebih jauh siapa aku dan apa yang bisa aku kontribusikan
        </motion.p>

        <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {aboutCards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="bg-white p-6 rounded-xl hover:shadow-lg hover:-translate-y-1 transition border-l-4 border-purple-400 hover:border-pink-400 shadow-md"
            >
              <div className="text-3xl sm:text-4xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-800">{card.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* My Waifu Card */}
      <motion.section
        className="px-4 sm:px-6 md:px-[8%] py-16 sm:py-20 bg-white"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Special Someone
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-600 mb-8 sm:mb-12 max-w-xl mx-auto pl-4 border-l-4 border-purple-400 text-sm sm:text-base">
          Orang istimewa dalam hidup saya
        </motion.p>

        <motion.div variants={fadeUp} className="max-w-md mx-auto">
          <motion.div
            variants={fadeIn}
            className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition cursor-pointer group border-2 border-purple-200 hover:border-pink-400"
            onClick={() => setShowWaifuModal(true)}
          >
            {/* Image */}
            <div className="relative overflow-hidden h-64 sm:h-72 bg-gradient-to-br from-purple-200 to-pink-200">
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
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                My Waifu ❤️
              </h3>

              <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
                Yang selalu menemani kehidupan saya dan telah menjadi istri sah
              </p>

              <p className="text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-semibold text-sm group-hover:from-purple-400 group-hover:to-pink-400 transition">
                Click untuk lihat lebih →
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Waifu Modal */}
      {showWaifuModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={fadeIn}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowWaifuModal(false)}
              className="fixed top-6 right-6 text-gray-500 hover:text-gray-700 text-2xl font-bold z-20 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-pink-50 transition"
            >
              ✕
            </button>

            {/* Image */}
            <div className="relative w-full h-72 sm:h-80 lg:h-96 bg-gradient-to-br from-purple-200 to-pink-200 overflow-hidden">
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
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                My Waifu ❤️
              </h2>

              <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
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
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
