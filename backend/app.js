import express from 'express';
import cors from 'cors';
import contactsRoutes from './routes/contactRoutes.js';
import projectsRoutes from './routes/projectRoutes.js';

const app = express();
const PORT = 3000;
    
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api/contacts', contactsRoutes);
app.use('/api/projects', projectsRoutes);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
