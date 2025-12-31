import { useState } from "react";
import SideBar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ContactsPage from './pages/ContactsPage.jsx';
import './index.css';

function App() {
  const [page, setPage] = useState("home"); 

  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar setPage={setPage} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 overflow-auto flex-1">
          {page === "home" && <HomePage />}
          {page === "projects" && <ProjectsPage />}
          {page === "contacts" && <ContactsPage />}
        </main>
      </div>
    </div>
  );
}

export default App;
