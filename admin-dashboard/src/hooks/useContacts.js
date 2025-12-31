import { useState, useEffect } from "react";
import { getAllContacts } from "../api/contactsApi.js";

export default function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    const data = await getAllContacts();
    setContacts(data);
    setLoading(false);
  };

  return { contacts, loading, loadContacts };
}
