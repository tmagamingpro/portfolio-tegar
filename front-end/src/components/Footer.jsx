import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-pink-300 to-blue-300 text-gray-200 font-bold">
      <div className="px-4 sm:px-6 md:px-[8%] py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2 justify-center sm:justify-start">
            <i className="fas fa-code"></i> Tegar Afrian
          </h3>
          <p className="text-pink-100 mb-4 text-sm sm:text-base">
            Mahasiswa Informatika yang fokus di Web Development & Machine Learning. Suka bikin project yang rapi, scalable, dan kece 😎
          </p>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="font-bold text-base sm:text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-pink-100 text-sm sm:text-base">
            <li><Link to="/" className="hover:text-white transition font-semibold">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition font-semibold">About</Link></li>
            <li><Link to="/projects" className="hover:text-white transition font-semibold">Projects</Link></li>
            <li><Link to="/skills" className="hover:text-white transition font-semibold">Skills</Link></li>
            <li><Link to="/contact" className="hover:text-white transition font-semibold">Contact</Link></li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="font-bold text-base sm:text-lg mb-4">Contact</h4>
          <p className="text-pink-100 mb-2 text-sm sm:text-base">
            <i className="fas fa-envelope mr-2"></i>
            <a href="mailto:tegarafrian2006@email.com" className="hover:text-white transition font-semibold break-all">
              tegarafrian2006@email.com
            </a>
          </p>
          <p className="text-pink-100 mb-4 text-sm sm:text-base">
            <i className="fas fa-location-dot mr-2"></i> Indonesia
          </p>

          <div className="flex gap-4 text-xl justify-center sm:justify-start">
            <a href="https://github.com/tmagamingpro" target="_blank" rel="noreferrer" className="hover:text-pink-200 transition">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/tegar-mupagiwa-afrian-718b3739a/" target="_blank" rel="noreferrer" className="hover:text-pink-200 transition">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/tegar_mupagiwa_/" target="_blank" rel="noreferrer" className="hover:text-pink-200 transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-pink-300 px-4 sm:px-6 md:px-[8%] py-6 text-center text-pink-100 text-xs sm:text-sm">
        © {currentYear} Portfolio by Tegar Mupagiwa Afrian. All Rights Reserved.
      </div>
    </footer>
  );
}
