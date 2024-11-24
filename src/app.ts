import express from 'express';
import path from 'path';
import productsRouter from './routers/products.routes';
import cartsRouter from './routers/carts.routes';
import __dirname from './utils';
import uploadImageRouter from './services/uploader';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;
app.listen(PORT, () => console.log(`"http://localhost:${PORT}/"`));

const viewRouter = express.static(path.join(__dirname, 'public'));

app.use('/upload', uploadImageRouter);
app.use('/', viewRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
