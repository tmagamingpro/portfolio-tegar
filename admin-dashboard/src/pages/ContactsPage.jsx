import React, { useState } from "react";
import useContacts from "../hooks/useContacts.js";
import Loader from "../components/Loader.jsx";
import Toast from "../components/Toast.jsx";
import { useNavigate } from "react-router-dom"; 

export default function ContactsPage() {
  const navigate = useNavigate();
  const { contacts, loading, loadContacts } = useContacts();
  const [toastMsg, setToastMsg] = useState("");

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
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-left font-semibold">Message</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {contacts.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-6 text-center text-gray-400 italic"
                >
                  No contacts yet 
                </td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {c.name}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {c.email}
                  </td>

                  <td className="px-4 py-3 text-gray-600 max-w-md truncate">
                    {c.message}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      )}

      {/* TOAST */}
      {toastMsg && (
        <Toast message={toastMsg} onClose={() => setToastMsg("")} />
      )}
    </div>
  );
}
