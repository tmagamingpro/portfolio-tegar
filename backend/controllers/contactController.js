import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import { supabase, supabaseEnabled } from '../lib/supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataRoot = process.env.VERCEL ? '/tmp' : path.join(__dirname, '..');
const contactsFilePath = path.join(dataRoot, 'data', 'contacts.json');
const bundledContactsPath = path.join(__dirname, '..', 'data', 'contacts.json');
const ensureContactsFile = () => {
  const dir = path.dirname(contactsFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(contactsFilePath)) {
    if (process.env.VERCEL && fs.existsSync(bundledContactsPath)) {
      const seed = fs.readFileSync(bundledContactsPath, 'utf8');
      fs.writeFileSync(contactsFilePath, seed || '[]');
    } else {
      fs.writeFileSync(contactsFilePath, '[]');
    }
  }
};

const readContacts = async () => {
  if (supabaseEnabled) {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('createdAt', { ascending: false });
    if (error) throw error;
    return data || [];
  }
  ensureContactsFile();
  return JSON.parse(fs.readFileSync(contactsFilePath, 'utf8') || '[]');
};

const writeContacts = async (contacts) => {
  if (supabaseEnabled) {
    return;
  }
  ensureContactsFile();
  fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
};

// READ
export const getAll = async (req, res) => {
  try {
    let contacts = await readContacts();
    if (!supabaseEnabled && contacts.length === 0 && fs.existsSync(bundledContactsPath)) {
      const seed = JSON.parse(fs.readFileSync(bundledContactsPath, 'utf8') || '[]');
      if (Array.isArray(seed) && seed.length > 0) {
        contacts = seed;
        await writeContacts(seed);
      }
    }
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
    const newContact = {
      id: randomUUID(),
      name: req.body.name || '',
      email: req.body.email || '',
      message: req.body.message || '',
      createdAt: new Date().toISOString()
    };

    if (supabaseEnabled) {
      const { data, error } = await supabase.from('contacts').insert(newContact).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    const contacts = await readContacts();
    contacts.push(newContact);
    await writeContacts(contacts);

    res.status(201).json(newContact);
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).json({ error: err.message });
  }
};
