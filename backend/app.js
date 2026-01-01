import express from 'express';
import cors from 'cors';
import contactsRoutes from './routes/contactRoutes.js';
import projectsRoutes from './routes/projectRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';

// Configure CORS to allow requests from the frontend origin (set CLIENT_ORIGIN in production)
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api/contacts', contactsRoutes);
app.use('/api/projects', projectsRoutes);

app.listen(PORT, () => {
  console.log(`Backend running at http://0.0.0.0:${PORT} (CLIENT_ORIGIN=${CLIENT_ORIGIN})`);
});
