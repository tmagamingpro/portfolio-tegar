import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import SideBar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ContactsPage from './pages/ContactsPage.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {isLoggedIn && <SideBar />}

      <div className="flex-1 flex flex-col">
        {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}

        <main className="p-6 overflow-auto flex-1">
          <Routes>
            {/* LOGIN */}
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

            {/* ROOT / HOME */}
            <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />

            {/* PROTECTED PAGES */}
            <Route path="/projects" element={isLoggedIn ? <ProjectsPage /> : <Navigate to="/login" />} />
            <Route path="/contacts" element={isLoggedIn ? <ContactsPage /> : <Navigate to="/login" />} />

            {/* DEFAULT */}
            <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
