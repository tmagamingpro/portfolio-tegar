import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ setIsLoggedIn, setPage }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <div>
        {/* kalau mau nambahin gambar dll, next time saja */}
      </div>
      <button
        onClick={() => {
          setIsLoggedIn(false);
          navigate("/login");
        }}
        className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </header>
  );
}
