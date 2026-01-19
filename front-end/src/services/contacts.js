const API_BASE = import.meta.env.VITE_API_URL || 'https://portfolio-tegar-backend.vercel.app';
const BASE_URL = `${API_BASE}/api/contacts`;

export const createContact = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
};

export const getContacts = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch contacts');
    return res.json();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
};
