const BASE_URL = "http://localhost:3000/api/projects";

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
