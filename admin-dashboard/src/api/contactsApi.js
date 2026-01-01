const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const BASE_URL = `${API_BASE}/api/contacts`;

export const getAllContacts = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createContact = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
