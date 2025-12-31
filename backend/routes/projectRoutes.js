import express from 'express';
import { getAll, create, update, remove } from '../controllers/projectController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'), 
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/', getAll);
router.post('/', upload.single('image'), create);
router.put('/:id', upload.single('image'), update);
router.delete('/:id', remove);

export default router;
