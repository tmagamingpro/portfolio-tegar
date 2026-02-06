import { useState } from 'react';

export default function ProjectModal({ project, isOpen, onClose }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!isOpen || !project) return null;

  const resolveApiBase = () => {
    const raw = (import.meta.env.VITE_API_URL || '').trim();
    if (!raw) {
      throw new Error('VITE_API_URL is not set');
    }
    if (!/^https?:\/\//i.test(raw)) {
      throw new Error('VITE_API_URL must be an absolute URL');
    }
    return raw.replace(/\/+$/, '');
  };
  const API_BASE = resolveApiBase();

  const getImageUrl = (imageField) => {
    if (!imageField) return null;
    if (imageField.startsWith('http')) return imageField;
    return `${API_BASE}${imageField}`;
  };

  const imageUrl = getImageUrl(project.image);
  const technologies = (() => {
    if (Array.isArray(project.technologies)) return project.technologies;
    if (Array.isArray(project.tech)) return project.tech;
    if (typeof project.technologies === 'string') {
      try {
        return JSON.parse(project.technologies);
      } catch {
        return [project.technologies];
      }
    }
    if (typeof project.tech === 'string') {
      try {
        return JSON.parse(project.tech);
      } catch {
        return [project.tech];
      }
    }
    return [];
  })();

  const handleImageError = (e) => {
    setImageFailed(true);
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="16" fill="%239ca3af" text-anchor="middle" dy=".3em"%3EImage not found%3C/text%3E%3C/svg%3E';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative w-full h-80 bg-gray-200 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
              <span className="text-gray-600">No image available</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            {project.title}
          </h2>

          {/* Description */}
          {project.description && (
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {project.description}
            </p>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Technologies:</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-gradient-to-r from-pink-100 to-blue-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold border border-pink-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            {(project.githubLink || project.github_link) && (
              <a
                href={project.githubLink || project.github_link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition text-center"
              >
                Cek Project →
              </a>
            )}
            <button
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
