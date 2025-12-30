import fs from 'fs';
import crypto from 'crypto';

const DATA_PATH = './data/projects.json';

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
  const projects = readData();

  const newProject = {
    id: crypto.randomUUID(),
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    tech: req.body.tech,
    githubLink: req.body.githubLink
  };

  projects.push(newProject);
  writeData(projects);

  res.status(201).json(newProject);
};

// UPDATE
export const update = (req, res) => {
  const projects = readData();

  const updated = projects.map(p =>
    p.id === req.params.id ? { ...p, ...req.body } : p
  );

  writeData(updated);
  res.json(updated.find(p => p.id === req.params.id));
};

// DELETE
export const remove = (req, res) => {
  const projects = readData();
  const filtered = projects.filter(p => p.id !== req.params.id);

  writeData(filtered);
  res.sendStatus(204);
};
