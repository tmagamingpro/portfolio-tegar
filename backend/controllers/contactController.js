import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataRoot = process.env.VERCEL ? '/tmp' : path.join(__dirname, '..');
const contactsFilePath = path.join(dataRoot, 'data', 'contacts.json');

const ensureContactsFile = () => {
  const dir = path.dirname(contactsFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(contactsFilePath)) {
    fs.writeFileSync(contactsFilePath, '[]');
  }
};

// READ
export const getAll = async (req, res) => {
  try {
    ensureContactsFile();

    const contacts = JSON.parse(fs.readFileSync(contactsFilePath, 'utf8') || '[]');
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
    ensureContactsFile();

    const contacts = JSON.parse(fs.readFileSync(contactsFilePath, 'utf8') || '[]');

    const newContact = {
      id: randomUUID(),
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
