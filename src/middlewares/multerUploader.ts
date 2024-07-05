import multer from 'multer';
import path from 'path';
import __dirname from '../utils';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, `${__dirname}/public/upload`);
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 4000000 },
  fileFilter: (_req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|PNG|webp/;
    const mimeTypes = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (!(mimeTypes && extname)) return cb(new Error('Solo se permiten imagenes'));
    return cb(null, true);
  },
}).single('image');

export default uploadMiddleware;
