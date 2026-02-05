import { useState } from 'react';

export default function ProjectCard({ project, onProjectClick }) {
  const [imageFailed, setImageFailed] = useState(false);

  const resolveApiBase = () => {
    const raw = (import.meta.env.VITE_API_URL || '').trim();
    const runtimeOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    if (!raw || raw === runtimeOrigin) return 'https://portfolio-tegar-backend.vercel.app';
    if (!raw.startsWith('http')) return 'https://portfolio-tegar-backend.vercel.app';
    return raw;
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
    if (!imageFailed) {
      setImageFailed(true);
      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23e5e7eb" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="14" fill="%239ca3af" text-anchor="middle" dy=".3em"%3EImage not found%3C/text%3E%3C/svg%3E';
    }
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl hover:-translate-y-2 transition cursor-pointer group"
      onClick={() => onProjectClick(project)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title || 'Project'}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
            onError={handleImageError}
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
            <span className="text-gray-600 text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 group-hover:text-pink-400 transition">
          {project.title || 'Untitled Project'}
        </h3>

        {project.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {project.description}
          </p>
        )}

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <p className="text-pink-400 font-semibold text-sm group-hover:text-blue-400 transition">
          View Details →
        </p>
      </div>
    </div>
  );
}
