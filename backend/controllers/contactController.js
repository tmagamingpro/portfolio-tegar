import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'uuid';
const { v4: uuidv4 } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsFilePath = path.join(process.env.VERCEL ? '/tmp' : __dirname, '..', 'data', 'contacts.json');

// READ
export const getAll = async (req, res) => {
  try {
    if (!fs.existsSync(contactsFilePath)) {
      fs.writeFileSync(contactsFilePath, '[]');
    }

    const contacts = JSON.parse(fs.readFileSync(contactsFilePath, 'utf8'));
    // Sort by createdAt descending
    const sortedContacts = contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(sortedContacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE
export const create = async (req, res) => {
  try {
    if (!fs.existsSync(contactsFilePath)) {
      fs.writeFileSync(contactsFilePath, '[]');
    }

    const contacts = JSON.parse(fs.readFileSync(contactsFilePath, 'utf8'));

    const newContact = {
      id: uuidv4(),
      name: req.body.name || '',
      email: req.body.email || '',
      message: req.body.message || '',
      createdAt: new Date().toISOString()
    };

    contacts.push(newContact);
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));

    res.status(201).json(newContact);
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).json({ error: err.message });
  }
};
