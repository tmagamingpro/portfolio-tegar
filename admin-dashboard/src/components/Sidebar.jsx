import React from "react";

export default function Sidebar({ setPage }) {
  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8 text-blue-600">
        Admin Panel
      </h1>

      <nav className="space-y-4">
        <a className="block text-gray-700 hover:text-blue-500 font-medium" onClick={() => setPage("home")}>
          Dashboard
        </a>
        <a className="block text-gray-700 hover:text-blue-500 font-medium" onClick={() => setPage("projects")}>
          Projects
        </a>
        <a className="block text-gray-700 hover:text-blue-500 font-medium" onClick={() => setPage("contacts")}>
          Contacts
        </a>
      </nav>
    </aside>
  );
}
