const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const BASE_URL = `${API_BASE}/api/projects`;

// READ
export const getAllProjects = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// CREATE
export const createProject = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// UPDATE
export const updateProject = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// DELETE
export const deleteProject = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
