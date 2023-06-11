import express from 'express';
import productsRouter from '../routers/products.routes.js'
import cartsRouter from '../routers/carts.routes.js'
const app = express();

app.use('/api', express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter)

const PORT = 8080;
app.listen(PORT, () => console.log(`Levantando el servidor en \n "http://localhost:${PORT}/api"`))