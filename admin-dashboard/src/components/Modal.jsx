import React, { useState } from "react";

export default function Modal({ isOpen, onClose, onSubmit, project }) {
  const [title, setTitle] = useState(project?.title || "");
  const normalizeTechToString = (t) => {
    if (Array.isArray(t)) return t.join(", ");
    if (typeof t === "string") {
      const s = t.trim();
      if (s.startsWith("[") && s.endsWith("]")) {
        try {
          const parsed = JSON.parse(s);
          if (Array.isArray(parsed)) return parsed.join(", ");
        } catch {}
      }
      return s;
    }
    return "";
  };

  const [tech, setTech] = useState(normalizeTechToString(project?.tech));
  const [description, setDescription] = useState(project?.description || "");
  const [githubLink, setGithubLink] = useState(project?.githubLink || "");
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const techArray = tech
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    onSubmit({ title, description, githubLink, tech: techArray }, file);
    onClose();
  };

  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 animate-fade-in">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            {project ? "Edit Project " : "Add Project "}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <div>
            <label className="block">
              <span className="text-sm font-medium text-gray-600">Project Image</span>

              <label className="
                mt-2 flex flex-col items-center justify-center
                border-2 border-dashed rounded-xl p-4
                cursor-pointer hover:border-blue-400 transition
              ">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-32 object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <span className="text-3xl">🖼️</span>
                    <span className="text-sm text-gray-500 mt-2">
                      Click to upload image
                    </span>
                  </>
                )}

                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </label>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Tech Stack</label>
            <input
              className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="React, Tailwind, Supabase"
              value={tech}
              onChange={(e) => setTech(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Description</label>
            <textarea
              className="mt-1 w-full rounded border px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Short project description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">GitHub Link</label>
            <input
              className="mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="https://github.com/..."
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
