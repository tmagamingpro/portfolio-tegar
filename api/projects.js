import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsFilePath = path.join(__dirname, 'backend', 'data', 'projects.json');

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    // Ensure projects.json exists
    if (!fs.existsSync(projectsFilePath)) {
      fs.writeFileSync(projectsFilePath, '[]');
    }

    if (method === 'GET') {
      const projects = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8'));
      // Sort by created_at if exists, otherwise return as is
      const sortedProjects = projects.sort((a, b) => {
        if (a.created_at && b.created_at) {
          return new Date(b.created_at) - new Date(a.created_at);
        }
        return 0;
      });
      res.status(200).json(sortedProjects);
    } else if (method === 'POST') {
      const projects = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8'));

      let imageUrl = '';
      if (req.body.image) {
        // For Vercel, we'll store images in a public directory
        // For now, assume images are handled differently or use base64
        imageUrl = req.body.image; // This might be a base64 string or URL
      }

      const newProject = {
        id: `proj-${Date.now()}`,
        title: req.body.title || '',
        description: req.body.description || '',
        image: imageUrl,
        tech: Array.isArray(req.body.tech) ? req.body.tech : JSON.parse(req.body.tech || '[]'),
        github_link: req.body.githubLink || '',
        created_at: new Date().toISOString()
      };

      projects.push(newProject);
      fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));

      res.status(201).json(newProject);
    } else if (method === 'PUT' && id) {
      const projects = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8'));
      const projectIndex = projects.findIndex(p => p.id === id);

      if (projectIndex === -1) {
        return res.status(404).json({ error: 'Project not found' });
      }

      let imageUrl = projects[projectIndex].image;
      if (req.body.image) {
        imageUrl = req.body.image; // Update image if provided
      }

      const updateData = {};
      if (req.body.title !== undefined) updateData.title = req.body.title;
      if (req.body.description !== undefined) updateData.description = req.body.description;
      if (imageUrl !== undefined) updateData.image = imageUrl;
      if (req.body.tech !== undefined) {
        updateData.tech = Array.isArray(req.body.tech) ? req.body.tech : JSON.parse(req.body.tech || '[]');
      }
      if (req.body.githubLink !== undefined) updateData.github_link = req.body.githubLink;

      Object.assign(projects[projectIndex], updateData);
      fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));

      res.status(200).json(projects[projectIndex]);
    } else if (method === 'DELETE' && id) {
      const projects = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8'));
      const filteredProjects = projects.filter(p => p.id !== id);

      if (filteredProjects.length === projects.length) {
        return res.status(404).json({ error: 'Project not found' });
      }

      fs.writeFileSync(projectsFilePath, JSON.stringify(filteredProjects, null, 2));
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
