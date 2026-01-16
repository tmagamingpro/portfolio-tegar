export default function ProjectCard({ project, onUnavailable }) {
  const getImageUrl = (project) => {
    if (!project) return '/img/project/default.jpg';

    console.log('Project image field:', project.image);

    // Jika image adalah URL lengkap (http/https)
    if (project.image && (project.image.startsWith('http://') || project.image.startsWith('https://'))) {
      return project.image;
    }

    // Jika image dimulai dengan /
    if (project.image && project.image.startsWith('/')) {
      return project.image;
    }

    // Jika hanya nama file, tambahkan path /img/project/
    if (project.image) {
      return `/img/project/${project.image}`;
    }

    // Fallback
    return '/img/project/default.jpg';
  };

  const imageUrl = getImageUrl(project);
  console.log('Final image URL:', imageUrl);

  const handleImageError = (e) => {
    console.error('Image failed to load:', imageUrl);
    e.target.src = '/img/project/default.jpg';
    e.target.alt = 'Project image not found';
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl hover:-translate-y-2 transition cursor-pointer group"
      onClick={onUnavailable}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 bg-gray-200">
        <img
          src={imageUrl}
          alt={project.title || 'Project'}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          onError={handleImageError}
          onLoad={() => console.log('✅ Image loaded:', imageUrl)}
        />
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

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-pink-400 font-semibold hover:text-blue-400 transition"
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  );
}
