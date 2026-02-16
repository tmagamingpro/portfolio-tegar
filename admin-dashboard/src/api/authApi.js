const API_BASE = (import.meta.env.VITE_API_URL || '').trim();
if (!API_BASE) {
  throw new Error('VITE_API_URL is not set');
}
if (!/^https?:\/\//i.test(API_BASE)) {
  throw new Error('VITE_API_URL must be an absolute URL');
}

const BASE_URL = `${API_BASE.replace(/\/+$/, '')}/api/auth`;

export const loginApi = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(payload?.error || 'Login gagal');
  }
  return payload;
};

export const meApi = async (token) => {
  const res = await fetch(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(payload?.error || 'Token tidak valid');
  }
  return payload;
};
