import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataRoot = process.env.VERCEL ? '/tmp' : path.join(__dirname, '..');
const projectsFilePath = path.join(dataRoot, 'data', 'projects.json');

const ensureProjectsFile = () => {
  const dir = path.dirname(projectsFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(projectsFilePath)) {
    fs.writeFileSync(projectsFilePath, '[]');
  }
};

// READ
export const getAll = async (req, res) => {
  try {
    ensureProjectsFile();

    const projects = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8') || '[]');
    // Sort by created_at if exists, otherwise return as is
    const sortedProjects = projects.sort((a, b) => {
      if (a.created_at && b.created_at) {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
    });

    res.json(sortedProjects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE
export const create = async (req, res) => {
  try {
    console.log('Create project - headers:', req.headers);
    console.log('Create project - file:', req.file);
    console.log('Create project - body:', req.body);

    if (!req.body) {
      return res.status(400).json({ error: 'Missing request body' });
    }

    ensureProjectsFile();

    const projects = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8') || '[]');

    // support both stringified tech and array
    const techField = typeof req.body.tech === 'string' ? req.body.tech : JSON.stringify(req.body.tech || "[]");

    const newProject = {
      id: `proj-${Date.now()}`,
      title: req.body.title || '',
      description: req.body.description || '',
      image: req.file ? `/uploads/${req.file.filename}` : '',
      tech: JSON.parse(techField || "[]"),
      github_link: req.body.githubLink || '',
      created_at: new Date().toISOString()
    };

    projects.push(newProject);
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));

    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error in create project:', err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const update = async (req, res) => {
  try {
    ensureProjectsFile();

    const projects = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8') || '[]');
    const projectIndex = projects.findIndex(p => p.id === req.params.id);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // prepare updated fields
    const updatedFields = { ...req.body };

    // parse tech if present (support JSON-stringified or array)
    if (updatedFields.tech !== undefined) {
      try {
        if (typeof updatedFields.tech === 'string') {
          const s = updatedFields.tech.trim();
          if (s.startsWith('[') && s.endsWith(']')) {
            updatedFields.tech = JSON.parse(s);
          } else {
            // comma separated
            updatedFields.tech = s === '' ? [] : s.split(',').map(t => t.trim()).filter(Boolean);
          }
        }
      } catch (err) {
        console.error('Failed to parse tech on update, leaving as original string', err);
      }
    }

    // map field names to database columns
    const dbFields = {
      title: updatedFields.title,
      description: updatedFields.description,
      image: req.file ? `/uploads/${req.file.filename}` : updatedFields.image,
      tech: updatedFields.tech,
      github_link: updatedFields.githubLink
    };

    Object.assign(projects[projectIndex], dbFields);
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));

    res.json(projects[projectIndex]);
  } catch (err) {
    console.error('Error in update project:', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const remove = async (req, res) => {
  try {
    ensureProjectsFile();

    const projects = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8') || '[]');
    const filteredProjects = projects.filter(p => p.id !== req.params.id);

    if (filteredProjects.length === projects.length) {
      return res.status(404).json({ error: 'Project not found' });
    }

    fs.writeFileSync(projectsFilePath, JSON.stringify(filteredProjects, null, 2));
    res.sendStatus(204);
  } catch (err) {
    console.error('Error in delete project:', err);
    res.status(500).json({ error: err.message });
  }
};
