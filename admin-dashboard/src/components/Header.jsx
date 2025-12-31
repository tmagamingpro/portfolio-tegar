import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <div>
        {/* Bisa ditambah user avatar, dropdown, atau logout button */}
      </div>
    </header>
  );
}
