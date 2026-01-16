import { useState } from 'react';
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
    <main className="bg-gray-50 min-h-screen">
      <section className="px-[8%] py-20">
        <h2 className="text-4xl font-bold text-center mb-2">Contact Me</h2>
        <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto pl-4 border-l-4 border-gray-800">
          Hubungi saya untuk diskusi atau project collaboration
        </p>

        <div className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                <i className="fas fa-envelope text-pink-400"></i> Email
              </h4>
              <a href="mailto:tegarafrian2006@email.com" className="text-blue-500 hover:underline">
                tegarafrian2006@email.com
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                <i className="fas fa-location-dot text-pink-400"></i> Location
              </h4>
              <p className="text-gray-600">Indonesia</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-semibold mb-2">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Nama kamu"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Email kamu"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Subjek pesan"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Pesan</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                  placeholder="Tulis pesan kamu di sini..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-300 to-blue-300 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? 'Mengirim...' : 'Kirim Pesan'}
              </button>

              {message && (
                <div className={`p-4 rounded-lg text-center font-semibold ${
                  message.includes('berhasil')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
