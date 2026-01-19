import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import contactsRoutes from './routes/contactRoutes.js';
import projectsRoutes from './routes/projectRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';

app.get("/", (req, res) => {
  res.send("Backend is alive! 👋");
});

// Configure CORS to allow requests from the frontend origin (set CLIENT_ORIGIN in production)
const allowedOrigins = CLIENT_ORIGIN !== '*' ? [CLIENT_ORIGIN] : ['http://localhost:3000', 'http://localhost:5173', 'https://portfolio-tegar-finale.vercel.app'];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads folder
app.use('/uploads', express.static('uploads'));

app.use('/api/contacts', contactsRoutes);
app.use('/api/projects', projectsRoutes);

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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running at http://0.0.0.0:${PORT} (CLIENT_ORIGIN=${CLIENT_ORIGIN})`);
});

export default app;
