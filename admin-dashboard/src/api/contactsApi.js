// src/api/contacts.js
const API_BASE = (import.meta.env.VITE_API_URL || '').trim();
if (!API_BASE) {
  throw new Error('VITE_API_URL is not set');
}
if (!/^https?:\/\//i.test(API_BASE)) {
  throw new Error('VITE_API_URL must be an absolute URL');
}
const BASE_URL = `${API_BASE.replace(/\/+$/, '')}/api/contacts`;

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
