// src/api/projects.js
const API_BASE = (import.meta.env.VITE_API_URL || '').trim();
if (!API_BASE) {
  throw new Error('VITE_API_URL is not set');
}
if (!/^https?:\/\//i.test(API_BASE)) {
  throw new Error('VITE_API_URL must be an absolute URL');
}
const BASE_URL = `${API_BASE.replace(/\/+$/, '')}/api/projects`;

// READ
export const getAllProjects = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// CREATE
export const createProject = async (data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('tech', JSON.stringify(data.tech));
  formData.append('githubLink', data.githubLink);
  if(data.image) formData.append('image', data.image);

  const res = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
  });
  return res.json();
};

// UPDATE
export const updateProject = async (id, data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('tech', JSON.stringify(data.tech));
  formData.append('githubLink', data.githubLink);
  if(data.image) formData.append('image', data.image);

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });
  return res.json();
};

// DELETE
export const deleteProject = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
