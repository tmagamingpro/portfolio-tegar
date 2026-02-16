import { supabase, supabaseEnabled } from '../lib/supabase.js';

const getAllowedAdmins = () =>
  (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

const isAllowedAdmin = (email) => {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const allowedAdmins = getAllowedAdmins();
  if (allowedAdmins.length === 0) return false;
  return allowedAdmins.includes(normalizedEmail);
};

export const login = async (req, res) => {
  try {
    if (!supabaseEnabled || !supabase) {
      return res.status(500).json({ error: 'Auth service is not configured on server' });
    }

    const email = (req.body.email || '').trim().toLowerCase();
    const password = req.body.password || '';

    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data?.session?.access_token) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }
    if (!isAllowedAdmin(data.user?.email || email)) {
      return res.status(403).json({ error: 'Akun ini bukan admin' });
    }

    return res.json({
      token: data.session.access_token,
      user: {
        id: data.user?.id,
        email: data.user?.email || email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Gagal login' });
  }
};

export const me = async (req, res) => {
  try {
    if (!supabaseEnabled || !supabase) {
      return res.status(500).json({ error: 'Auth service is not configured on server' });
    }

    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

    if (!token) {
      return res.status(401).json({ error: 'Token tidak ditemukan' });
    }

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return res.status(401).json({ error: 'Token tidak valid atau expired' });
    }
    if (!isAllowedAdmin(data.user.email)) {
      return res.status(403).json({ error: 'Akun ini bukan admin' });
    }

    return res.json({
      user: {
        id: data.user.id,
        email: data.user.email
      }
    });
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(500).json({ error: 'Gagal verifikasi token' });
  }
};
