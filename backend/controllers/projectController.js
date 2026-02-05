import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase, supabaseEnabled } from '../lib/supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataRoot = process.env.VERCEL ? '/tmp' : path.join(__dirname, '..');
const projectsFilePath = path.join(dataRoot, 'data', 'projects.json');
const bundledProjectsPath = path.join(__dirname, '..', 'data', 'projects.json');
const ensureProjectsFile = () => {
  const dir = path.dirname(projectsFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(projectsFilePath)) {
    if (process.env.VERCEL && fs.existsSync(bundledProjectsPath)) {
      const seed = fs.readFileSync(bundledProjectsPath, 'utf8');
      fs.writeFileSync(projectsFilePath, seed || '[]');
    } else {
      fs.writeFileSync(projectsFilePath, '[]');
    }
  }
};

const readProjects = async () => {
  if (supabaseEnabled) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
  ensureProjectsFile();
  return JSON.parse(fs.readFileSync(projectsFilePath, 'utf8') || '[]');
};

const writeProjects = async (projects) => {
  if (supabaseEnabled) {
    // No bulk write for Supabase; handled in create/update/delete
    return;
  }
  ensureProjectsFile();
  fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
};

// READ
export const getAll = async (req, res) => {
  try {
    let projects = await readProjects();
    if (!supabaseEnabled && projects.length === 0 && fs.existsSync(bundledProjectsPath)) {
      const seed = JSON.parse(fs.readFileSync(bundledProjectsPath, 'utf8') || '[]');
      if (Array.isArray(seed) && seed.length > 0) {
        projects = seed;
        await writeProjects(seed);
      }
    }
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

    if (supabaseEnabled) {
      const { data, error } = await supabase.from('projects').insert(newProject).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    const projects = await readProjects();
    projects.push(newProject);
    await writeProjects(projects);

    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error in create project:', err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const update = async (req, res) => {
  try {
    if (supabaseEnabled) {
      const updatedFields = { ...req.body };
      if (updatedFields.tech !== undefined) {
        try {
          if (typeof updatedFields.tech === 'string') {
            const s = updatedFields.tech.trim();
            if (s.startsWith('[') && s.endsWith(']')) {
              updatedFields.tech = JSON.parse(s);
            } else {
              updatedFields.tech = s === '' ? [] : s.split(',').map(t => t.trim()).filter(Boolean);
            }
          }
        } catch (err) {
          console.error('Failed to parse tech on update, leaving as original string', err);
        }
      }

      const dbFields = {
        title: updatedFields.title,
        description: updatedFields.description,
        image: req.file ? `/uploads/${req.file.filename}` : updatedFields.image,
        tech: updatedFields.tech,
        github_link: updatedFields.githubLink
      };

      const { data, error } = await supabase
        .from('projects')
        .update(dbFields)
        .eq('id', req.params.id)
        .select()
        .single();
      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Project not found' });
        }
        throw error;
      }
      return res.json(data);
    }

    const projects = await readProjects();
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
    await writeProjects(projects);

    res.json(projects[projectIndex]);
  } catch (err) {
    console.error('Error in update project:', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const remove = async (req, res) => {
  try {
    if (supabaseEnabled) {
      const { data, error } = await supabase
        .from('projects')
        .delete()
        .eq('id', req.params.id)
        .select();
      if (error) throw error;
      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.sendStatus(204);
    }

    const projects = await readProjects();
    const filteredProjects = projects.filter(p => p.id !== req.params.id);

    if (filteredProjects.length === projects.length) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await writeProjects(filteredProjects);
    res.sendStatus(204);
  } catch (err) {
    console.error('Error in delete project:', err);
    res.status(500).json({ error: err.message });
  }
};
