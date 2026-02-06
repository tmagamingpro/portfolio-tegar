const resolveApiBase = () => {
  const raw = (import.meta.env.VITE_API_URL || '').trim();
  if (!raw) {
    throw new Error('VITE_API_URL is not set');
  }
  if (!/^https?:\/\//i.test(raw)) {
    throw new Error('VITE_API_URL must be an absolute URL');
  }
  return raw.replace(/\/+$/, '');
};

const API_BASE = resolveApiBase();
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
