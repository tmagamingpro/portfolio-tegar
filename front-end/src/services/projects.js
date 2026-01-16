const API_BASE = import.meta.env.VITE_API_URL || 'https://portfolio-tegar-production-bed1.up.railway.app';
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
