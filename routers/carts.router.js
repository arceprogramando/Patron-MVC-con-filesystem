import { Router } from 'express';
import fs from 'fs';

const router = Router();
const pathProducts = '../files/products.json';
const pathCarts = '../files/carts.json';

router.get('/', async (req, res) => {
    try {
        const data = await fs.promises.readFile(pathCarts, 'utf-8');
        const carts = JSON.parse(data);
        res.send(carts);
    } catch (error) {
        console.error('Failed reading file', error);
        res.status(500).json({ error: 'Failed reading file' });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const data = await fs.promises.readFile(pathCarts, 'utf-8');
        const carts = JSON.parse(data);
        const { cid } = req.params;
        const cartById = carts.find((cart) => cart.id == cid);
        if (cartById) return res.json(cartById.products);
        res.status(404).json({ error: "Cart not found" });
    } catch (error) {
        console.error('Failed reading file', error);
        res.status(500).json({ error: 'Failed reading file' });
    }
});

router.post("/", async (req, res) => {
    try {
        const data = await fs.promises.readFile(pathCarts, 'utf-8');
        const carts = JSON.parse(data);
        const { products = [] } = req.body;
        const ids = carts.map(cart => cart.id);
        const id = Math.max(...ids, 0) + 1;
        const cartProducts = products.map(({ id, quantity }) => ({ id, quantity }));
        const cart = { id, products: cartProducts };
        carts.push(cart);
        await fs.promises.writeFile(pathCarts, JSON.stringify(carts, null, '\t'))
        res.status(201).json(cart);
    } catch (error) {
        console.error('Failed reading file', error);
        res.status(500).json({ error: 'Failed reading file' });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const dataCarts = await fs.promises.readFile(pathCarts, 'utf-8');
        const carts = JSON.parse(dataCarts);
        const dataProducts = await fs.promises.readFile(pathProducts, 'utf-8');
        const products = JSON.parse(dataProducts);

        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cartById = carts.find((cart) => cart.id == cid);
        if (cartById) {
            const productById = products.find((product) => product.id == pid);
            if (productById) {
                const { id } = productById;

                const productNew = { id, quantity };
                const productExist = cartById.products.find((product) => product.id == id);

                if (productExist) {
                    productExist.quantity = productExist.quantity + productNew.quantity;
                    await fs.promises.writeFile(pathCarts, JSON.stringify(carts, null, '\t'))
                    return res.status(201).json(cartById);
                } else {
                    cartById.products.push(productNew);
                    await fs.promises.writeFile(pathCarts, JSON.stringify(carts, null, '\t'))
                    return res.status(201).json(cartById);
                }
            }
        }
        res.status(404).json({ error: "Cart or Product not found" });
    } catch (error) {
        console.error('Failed reading file/s', error);
        res.status(500).json({ error: 'Failed reading file/s' });
    }
});

export default router;