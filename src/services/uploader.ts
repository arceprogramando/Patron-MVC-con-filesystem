import { Router,Request,Response } from 'express';
import uploadMiddleware from '../middlewares/multerUploader';

const router = Router();

router.post('/', uploadMiddleware, (req:Request, res:Response) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded');

    return res.json('Upload Complete');
  } catch (error) {
    return res.status(404).json({ error: (error as Error).message });
  }
});

export default router;
