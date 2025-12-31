const BASE_URL = "http://localhost:3000/api/contacts";

const contacts = {
    async getAll() {
        const res = await fetch(BASE_URL);
        return res.json();
    },
    async create(data) {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return res.json();
    }
};

window.contactsApi = contacts;

export default contacts;
