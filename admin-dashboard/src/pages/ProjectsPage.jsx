import React, { useState } from "react";
import useProjects from "../hooks/useProjects.js";
import Modal from "../components/Modal.jsx";
import Loader from "../components/Loader.jsx";
import Toast from "../components/Toast.jsx";

export default function ProjectsPage() {
  const { projects, loading, addProject, removeProject, editProject, loadProjects } = useProjects();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  const handleAdd = async (data, file) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('tech', JSON.stringify(data.tech)); 
    formData.append('githubLink', data.githubLink);
    if(file) formData.append('image', file);
    try {
      const res = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        await loadProjects(); 
        setToastMsg("Project added successfully!");
      } else {
        const text = await res.text();
        console.error('Add project failed', res.status, text);
        setToastMsg("Failed to add project (see console)");
      }
    } catch (err) {
      console.error('Network error while adding project', err);
      setToastMsg("Network error while adding project");
    }
    };

  const handleEdit = async (id, data, file) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('tech', JSON.stringify(data.tech));
    formData.append('githubLink', data.githubLink);
    if(file) formData.append('image', file);

    try {
      const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: 'PUT',
        body: formData
      });

      if (res.ok) {
        await loadProjects();
        setToastMsg("Project updated successfully!");
      } else {
        const text = await res.text();
        console.error('Update project failed', res.status, text);
        setToastMsg("Failed to update project (see console)");
      }
    } catch (err) {
      console.error('Network error while updating project', err);
      setToastMsg("Network error while updating project");
    }
    };

  const handleDelete = async (id) => {
    await removeProject(id);
    setToastMsg("Project deleted successfully!");
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setModalOpen(true)}>Add Project</button>
      </div>

      {loading ? <Loader /> : (
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-4 py-3 text-left font-semibold">Tech</th>
              <th className="px-4 py-3 text-left font-semibold">Description</th>
              <th className="px-4 py-3 text-left font-semibold">Image</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {projects.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium text-gray-800">
                  {p.title}
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(p.tech) ? p.tech : JSON.parse(p.tech || "[]")).map((t, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                  {p.description}
                </td>

                <td className="px-4 py-3">
                  {p.image ? (
                    <img
                      src={`http://localhost:3000${p.image}`}
                      alt={p.title}
                      className="w-14 h-14 rounded-lg object-cover border"
                    />
                  ) : (
                    <span className="text-gray-400 italic text-xs">
                      No image
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="px-3 py-1 text-xs rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 text-xs rounded bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          onSubmit={async (data, file) => {
            if (editingProject) {
              await handleEdit(editingProject.id, data, file);
            } else {
              await handleAdd(data, file);
            }
          }}
          project={editingProject}
        />
      )}

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
}
