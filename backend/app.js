// import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import contactsRoutes from './routes/contactRoutes.js';
import projectsRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('Starting backend server...');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';
const IS_VERCEL = Boolean(process.env.VERCEL);
const allowedOrigins = CLIENT_ORIGIN.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.send("Backend is alive! 👋");
});

// Configure CORS to allow requests from the frontend origin (set CLIENT_ORIGIN in production)
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/favicon.png', (req, res) => res.status(204).end());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0 || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    }
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads folder
const uploadPath = process.env.VERCEL ? '/tmp/uploads' : path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadPath));
// Fallback to bundled uploads in deployment (for seeded images)
if (process.env.VERCEL) {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
}

app.use('/api/contacts', contactsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/auth', authRoutes);

//error handling middleware
app.use((err, req, res, next) => {
  console.error('error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Log unhandled errors to help debugging on hosting platforms
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    storage: 'JSON files'
  });
});

// Bind explicitly to 0.0.0.0 to ensure the server listens on all interfaces
if (!IS_VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend running at http://0.0.0.0:${PORT} (CLIENT_ORIGIN=${CLIENT_ORIGIN})`);
  });
}

export default app;
