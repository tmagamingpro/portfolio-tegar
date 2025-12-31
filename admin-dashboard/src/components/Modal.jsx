import React, { useState } from "react";

export default function Modal({ isOpen, onClose, onSubmit, project }) {
  const [title, setTitle] = useState(project?.title || "");
  const normalizeTechToString = (t) => {
    if (Array.isArray(t)) return t.join(', ');
    if (typeof t === 'string') {
      const s = t.trim();
      if (s.startsWith('[') && s.endsWith(']')) {
        try {
          const parsed = JSON.parse(s);
          if (Array.isArray(parsed)) return parsed.join(', ');
        } catch (e) {
          // fallthrough to return cleaned string
          return s.replace(/^\[|\]$/g, '').replace(/^["']|["']$/g, '');
        }
      }
      return s;
    }
    return '';
  };
  const [tech, setTech] = useState(normalizeTechToString(project?.tech));
  const [description, setDescription] = useState(project?.description || "");
  const [githubLink, setGithubLink] = useState(project?.githubLink || "");
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

 const handleSubmit = () => {
    const raw = (tech || '').trim();
    let techArray = [];

    if (raw.startsWith('[') && raw.endsWith(']')) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) techArray = parsed.map(String).map(s => s.trim()).filter(Boolean);
        else techArray = [String(parsed).trim()].filter(Boolean);
      } catch (e) {
        // fallback: strip brackets and split
        techArray = raw.replace(/^\[|\]$/g, '').split(',').map(s => s.replace(/^\"|\"$/g, '').trim()).filter(Boolean);
      }
    } else {
      techArray = raw.split(',').map(t => t.trim()).filter(Boolean);
    }

    onSubmit({ title, description, githubLink, tech: techArray }, file);
    onClose();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-lg font-bold mb-4">{project ? "Edit Project" : "Add Project"}</h3>
        <input 
        className="border w-full mb-2 p-1" 
        placeholder="Image" 
        type="file" 
        name="image" 
        onChange={handleFileChange} 
        />
        <input 
        className="border w-full mb-2 p-1" 
        placeholder="Title" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        />
        <input 
        className="border w-full mb-2 p-1" 
        placeholder="Tech (pisahkan dengan koma)" 
        value={tech} 
        onChange={e => setTech(e.target.value)} 
        />
        <input 
        className="border w-full mb-2 p-1" 
        placeholder="Description" 
        value={description} 
        onChange={e => setDescription(e.target.value)} 
        />
        <input 
        className="border w-full mb-2 p-1" 
        placeholder="GitHub Link" 
        value={githubLink} 
        onChange={e => setGithubLink(e.target.value)} 
        />
        <div className="flex justify-end mt-4 gap-2">
          <button className="bg-gray-300 px-3 py-1 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}
