import { useState } from 'react';
import { motion } from 'framer-motion';
import { createContact } from '../services/contacts';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createContact(formData);
      setMessage('Pesan berhasil dikirim! Terima kasih telah menghubungi saya 😊');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Gagal mengirim pesan. Coba lagi nanti.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white min-h-screen">
      <motion.section
        className="px-4 sm:px-6 md:px-[8%] py-16 sm:py-20"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Contact Me</motion.h2>
        <motion.p variants={fadeUp} className="text-center text-gray-600 mb-8 sm:mb-10 max-w-xl mx-auto pl-4 border-l-4 border-purple-400 text-sm sm:text-base">
          Hubungi saya untuk diskusi atau project collaboration
        </motion.p>

        <motion.div variants={stagger} className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 sm:mb-10">
            <motion.div variants={fadeUp} className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 sm:p-6 rounded-xl shadow hover:shadow-lg transition border-l-4 border-purple-400">
              <h4 className="font-bold text-base sm:text-lg mb-2 flex items-center gap-2 text-purple-700">
                <i className="fas fa-envelope"></i> Email
              </h4>
              <a href="mailto:tegarafrian2006@email.com" className="text-purple-600 hover:text-pink-600 hover:underline font-semibold transition text-sm sm:text-base break-all">
                tegarafrian2006@email.com
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 sm:p-6 rounded-xl shadow hover:shadow-lg transition border-l-4 border-pink-400">
              <h4 className="font-bold text-base sm:text-lg mb-2 flex items-center gap-2 text-pink-700">
                <i className="fas fa-location-dot"></i> Location
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">Indonesia</p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeUp} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-2 border-purple-200">
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div variants={fadeUp}>
                <label className="block font-semibold mb-2 text-gray-800 text-sm sm:text-base">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-purple-300 rounded-lg px-4 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Nama kamu"
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block font-semibold mb-2 text-gray-800 text-sm sm:text-base">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-purple-300 rounded-lg px-4 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Email kamu"
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block font-semibold mb-2 text-gray-800 text-sm sm:text-base">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-purple-300 rounded-lg px-4 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Subjek pesan"
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block font-semibold mb-2 text-gray-800 text-sm sm:text-base">Pesan</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full border-2 border-purple-300 rounded-lg px-4 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition"
                  placeholder="Tulis pesan kamu di sini..."
                ></textarea>
              </motion.div>

              <motion.button
                variants={fadeUp}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:from-purple-500 hover:to-pink-500 transition disabled:opacity-50"
              >
                {loading ? 'Mengirim...' : 'Kirim Pesan'}
              </motion.button>

              {message && (
                <motion.div variants={fadeIn} className={`p-4 rounded-lg text-center font-semibold ${
                  message.includes('berhasil')
                    ? 'bg-green-100 text-green-700 border-2 border-green-400'
                    : 'bg-red-100 text-red-700 border-2 border-red-400'
                }`}>
                  {message}
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
}
