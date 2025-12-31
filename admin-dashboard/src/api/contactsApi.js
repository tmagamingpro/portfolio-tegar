const BASE_URL = "http://localhost:3000/api/contacts";

export const getAllContacts = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createContact = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
