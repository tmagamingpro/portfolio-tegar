const BASE_URL = "http://localhost:3000/api/projects";

export const projects = {
    async getAll() {
        return fetch(BASE_URL).then(res => res.json());
    },
    async create(data) {
        return fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    },
    async update(id, data) {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    },
    async delete(id) {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    }
}