import React, { useState } from "react";
import useContacts from "../hooks/useContacts.js";
import Loader from "../components/Loader.jsx";
import Toast from "../components/Toast.jsx";

export default function ContactsPage() {
  const { contacts, loading, loadContacts } = useContacts();
  const [toastMsg, setToastMsg] = useState("");

  // Optional: kalau mau refresh manual
  const handleRefresh = async () => {
    await loadContacts();
    setToastMsg("Contacts refreshed!");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Contacts</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleRefresh}>Refresh</button>
      </div>

      {loading ? <Loader /> : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c.id}>
                <td className="border px-2 py-1">{c.name}</td>
                <td className="border px-2 py-1">{c.email}</td>
                <td className="border px-2 py-1">{c.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
}
