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
const BASE_URL = `${API_BASE}/api/projects`;

export const getProjects = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const createProject = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    body: data
  });
  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
};

export const updateProject = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: data
  });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  return res.status === 204;
};
