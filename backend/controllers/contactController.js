import fs from 'fs';
import crypto from 'crypto';

const DATA_PATH = './data/contacts.json';

const readData = () => {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      console.log(`Data file ${DATA_PATH} not found, creating empty array`);
      fs.writeFileSync(DATA_PATH, '[]');
      return [];
    }
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data file:', err);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing data file:', err);
    throw err;
  }
};

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
