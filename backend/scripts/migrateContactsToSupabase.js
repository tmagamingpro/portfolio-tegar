import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
});

const contactsPath = path.join(__dirname, '..', 'data', 'contacts.json');

if (!fs.existsSync(contactsPath)) {
  console.error('contacts.json not found at', contactsPath);
  process.exit(1);
}

const raw = fs.readFileSync(contactsPath, 'utf8') || '[]';
let contacts = [];
try {
  contacts = JSON.parse(raw);
} catch (e) {
  console.error('Invalid JSON in contacts.json');
  process.exit(1);
}

if (!Array.isArray(contacts) || contacts.length === 0) {
  console.log('No contacts to migrate.');
  process.exit(0);
}

const normalized = contacts.map((c) => ({
  id: c.id,
  name: c.name || '',
  email: c.email || '',
  message: c.message || '',
  createdAt: c.createdAt || new Date().toISOString()
}));

const { error } = await supabase.from('contacts').upsert(normalized, {
  onConflict: 'id'
});

if (error) {
  console.error('Migration failed:', error);
  process.exit(1);
}

console.log(`Migrated ${normalized.length} contacts.`);
