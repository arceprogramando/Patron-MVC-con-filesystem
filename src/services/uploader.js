import { Router } from "express";
import multer from "multer";
import __dirname from '../utils.js'
import path from 'path';

const router = Router()

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/upload')
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploadMiddleware = multer({
    storage,
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|PNG/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true)
        }
        cb('Error al archivo no es una imagen');
    }
}).single('image');

router.post('/upload', uploadMiddleware, (req, res) => {
    if (!req.file) {
        res.status(400).send('No file uploaded');
        return;
    }
    res.send('Uploader')
})

export default router;