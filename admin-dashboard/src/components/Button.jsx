import React from "react";

export default function Button({ children, onClick, color = "blue" }) {
  const colors = {
    blue: "bg-blue-500 hover:bg-blue-600 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
    green: "bg-green-500 hover:bg-green-600 text-white",
    gray: "bg-gray-300 hover:bg-gray-400 text-black"
  };

  return (
    <button
      className={`px-4 py-2 rounded ${colors[color]} transition`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
