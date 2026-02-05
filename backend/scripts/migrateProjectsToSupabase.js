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

const projectsPath = path.join(__dirname, '..', 'data', 'projects.json');

if (!fs.existsSync(projectsPath)) {
  console.error('projects.json not found at', projectsPath);
  process.exit(1);
}

const raw = fs.readFileSync(projectsPath, 'utf8') || '[]';
let projects = [];
try {
  projects = JSON.parse(raw);
} catch (e) {
  console.error('Invalid JSON in projects.json');
  process.exit(1);
}

if (!Array.isArray(projects) || projects.length === 0) {
  console.log('No projects to migrate.');
  process.exit(0);
}

const normalized = projects.map((p) => ({
  id: p.id || `proj-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title: p.title || '',
  description: p.description || '',
  image: p.image || '',
  tech: Array.isArray(p.tech)
    ? p.tech
    : typeof p.tech === 'string'
      ? (() => {
          try { return JSON.parse(p.tech); } catch { return [p.tech]; }
        })()
      : [],
  github_link: p.github_link || p.githubLink || '',
  created_at: p.created_at || new Date().toISOString()
}));

const { data, error } = await supabase.from('projects').upsert(normalized, {
  onConflict: 'id'
});

if (error) {
  console.error('Migration failed:', error);
  process.exit(1);
}

console.log(`Migrated ${normalized.length} projects.`);
