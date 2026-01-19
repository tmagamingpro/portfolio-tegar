import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsFilePath = path.join(__dirname, 'backend', 'data', 'contacts.json');

export default async function handler(req, res) {
  const { method } = req;

  try {
    // Ensure contacts.json exists
    if (!fs.existsSync(contactsFilePath)) {
      fs.writeFileSync(contactsFilePath, '[]');
    }

    if (method === 'GET') {
      const contacts = JSON.parse(fs.readFileSync(contactsFilePath, 'utf8'));
      // Sort by createdAt descending
      const sortedContacts = contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      res.status(200).json(sortedContacts);
    } else if (method === 'POST') {
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
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
