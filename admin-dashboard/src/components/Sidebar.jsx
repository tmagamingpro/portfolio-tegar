import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white shadow p-4">
      <ul className="space-y-3">
        <li>
          <button onClick={() => navigate("/home")}>
            Home
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/projects")}>
            Projects
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/contacts")}>
            Contacts
          </button>
        </li>
      </ul>
    </aside>
  );
}
