const API_BASE = window.__API_URL__ || 'https://portfolio-tegar-production.up.railway.app';
const BASE_URL = `${API_BASE}/api/projects`;

const projects = {
    async getAll() {
        const res = await fetch(BASE_URL);
        return res.json();
    },
    async create(data) {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            body: data 
        });
        return res.json();
    },
    async update(id, data) {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            body: data 
        });
        return res.json();
    },
    async delete(id) {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        return res.status === 204 ? true : res.json();
    }
};

window.projectsApi = projects;

export default projects;