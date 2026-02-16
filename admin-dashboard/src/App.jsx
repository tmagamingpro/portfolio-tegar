import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ContactsPage from './pages/ContactsPage.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import { meApi } from './api/authApi.js';
import './index.css';

const TOKEN_KEY = 'admin_token';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        setCheckingAuth(false);
        return;
      }

      try {
        await meApi(token);
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setIsLoggedIn(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    validateToken();
  }, []);

  if (checkingAuth) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {isLoggedIn && <SideBar />}

      <div className="flex-1 flex flex-col">
        {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} tokenKey={TOKEN_KEY} />}

        <main className="p-6 overflow-auto flex-1">
          <Routes>
            {/* LOGIN */}
            <Route
              path="/login"
              element={
                isLoggedIn
                  ? <Navigate to="/home" replace />
                  : <LoginPage setIsLoggedIn={setIsLoggedIn} tokenKey={TOKEN_KEY} />
              }
            />

            {/* ROOT / HOME */}
            <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />} />
            <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />} />

            {/* PROTECTED PAGES */}
            <Route path="/projects" element={isLoggedIn ? <ProjectsPage /> : <Navigate to="/login" replace />} />
            <Route path="/contacts" element={isLoggedIn ? <ContactsPage /> : <Navigate to="/login" replace />} />

            {/* DEFAULT */}
            <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
