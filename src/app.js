import express from 'express';
import path from 'path';
import productsRouter from './routers/products.routes.js';
import cartsRouter from './routers/carts.routes.js';
import __dirname from './utils.js';
import appRouter from './services/uploader.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;
app.listen(PORT, () => console.log(`Levantando el servidor en \n "http://localhost:${PORT}/api"`));

const viewRouter = express.static(path.join(__dirname, 'public'));
app.use('/', appRouter);
app.use('/api', viewRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
