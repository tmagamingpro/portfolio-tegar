import fs from 'fs';
import crypto from 'crypto';

const DATA_PATH = './data/contacts.json';

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
  const contacts = readData();

  const newContact = {
    id: crypto.randomUUID(),
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    createdAt: new Date()
  };

  contacts.push(newContact);
  writeData(contacts);

  res.status(201).json(newContact);
};
