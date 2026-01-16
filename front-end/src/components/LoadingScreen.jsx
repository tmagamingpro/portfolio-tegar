import { useEffect, useState } from "react";

export default function LoadingScreen({ visible }) {
  const adminUrl = import.meta.env.VITE_ADMIN_URL || 'https://admin-dashboard.vercel.app';

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-pink-400 border-t-blue-400 rounded-full animate-spin mb-6"></div>
      <p className="text-gray-700 text-lg font-semibold">Sedang memuat portofolio...</p>
      <a
        href={adminUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        Masuk ke Admin Dashboard
      </a>
    </div>
  );
}
