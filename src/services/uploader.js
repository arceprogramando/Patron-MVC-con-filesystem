import { Router } from 'express';
import uploadMiddleware from '../middlewares/multerUploader.js';

const router = Router();

router.post('/', uploadMiddleware, (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded');

    return res.json('Upload Complete');
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

export default router;
