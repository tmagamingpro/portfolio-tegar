const BASE_URL = "http://localhost:3000/api/contacts";

export const contacts = {
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
    }
}
