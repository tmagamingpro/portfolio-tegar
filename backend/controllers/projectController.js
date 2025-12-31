import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

const DATA_PATH = './data/projects.json';
const UPLOADS_DIR = './uploads';

const readData = () =>
  JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));

const writeData = (data) =>
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// READ
export const getAll = (req, res) => {
  res.json(readData());
};

// CREATE
export const create = (req, res) => {
  try {
    console.log('Create project - headers:', req.headers);
    console.log('Create project - file:', req.file);
    console.log('Create project - body:', req.body);

    if (!req.body) {
      return res.status(400).json({ error: 'Missing request body' });
    }

    const projects = readData();

    // support both stringified tech and array
    const techField = typeof req.body.tech === 'string' ? req.body.tech : JSON.stringify(req.body.tech || "[]");

    const newProject = {
      id: crypto.randomUUID(),
      title: req.body.title || '',
      description: req.body.description || '',
      image: req.file ? `/uploads/${req.file.filename}` : '',
      tech: JSON.parse(techField || "[]"),
      githubLink: req.body.githubLink || ''
    };

    projects.push(newProject);
    writeData(projects);

    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error in create project:', err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
};

// UPDATE
export const update = (req, res) => {
  try {
    const projects = readData();

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

    // handle updated image if uploaded
    if (req.file) {
      updatedFields.image = `/uploads/${req.file.filename}`;
    }

    const updated = projects.map(p =>
      p.id === req.params.id ? { ...p, ...updatedFields } : p
    );

    writeData(updated);
    res.json(updated.find(p => p.id === req.params.id));
  } catch (err) {
    console.error('Error in update project:', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const remove = (req, res) => {
  try {
    const projects = readData();
    const toRemove = projects.find(p => p.id === req.params.id);

    const filtered = projects.filter(p => p.id !== req.params.id);

    writeData(filtered);

    // remove uploaded image file if exists and located in uploads dir
    if (toRemove && toRemove.image) {
      const imgPath = toRemove.image.startsWith('/uploads/') ? toRemove.image.replace(/^\//, '') : toRemove.image;
      const fullPath = path.join(process.cwd(), imgPath);
      try {
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          console.log('Deleted uploaded file:', fullPath);
        }
      } catch (err) {
        console.error('Failed deleting uploaded file', fullPath, err);
      }
    }

    res.sendStatus(204);
  } catch (err) {
    console.error('Error in delete project:', err);
    res.status(500).json({ error: err.message });
  }
};
