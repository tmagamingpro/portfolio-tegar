import React from "react";

export default function Sidebar({ setPage }) {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
      <button className="mb-2 hover:bg-gray-700 p-2 rounded" onClick={() => setPage("home")}>Home</button>
      <button className="mb-2 hover:bg-gray-700 p-2 rounded" onClick={() => setPage("projects")}>Projects</button>
      <button className="mb-2 hover:bg-gray-700 p-2 rounded" onClick={() => setPage("contacts")}>Contacts</button>
    </div>
  );
}
