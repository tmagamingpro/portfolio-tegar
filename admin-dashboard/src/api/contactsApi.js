// src/api/contacts.js
const API_BASE = import.meta.env.VITE_API_URL || 'https://portfolio-tegar-production-bed1.up.railway.app';
const BASE_URL = `${API_BASE}/api/contacts`;

// READ
export const getAllContacts = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// CREATE
export const createContact = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
