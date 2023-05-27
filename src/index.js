import express from 'express';
import cartRouter from '../routers/carts.router.js';
import productsRouter from '../routers/products.router.js';
import { uploader } from '../middlewares/upload/utils.js';

const app = express();

// Solo es necesario cuando los datos se envían por formulario
app.use('/public', express.static('public'));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);

app.post('/upload', uploader.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ status: 'error' });
    }
    res.send('File uploaded');
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Levantando el servidor en http://localhost:${PORT}`));