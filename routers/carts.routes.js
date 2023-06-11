import { Router } from "express";
import ProductManager from "../src/ProductManager.js";

const productManager = new ProductManager('./files/carts.json');

const router = Router()

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getCarts();
        if (limit) {
            const limitedProducts = products.slice(0, limit);
            res.status(200).json(limitedProducts);
        } else {
            res.status(200).json(products)
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los cart' });
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await productManager.getCartsById(cid)
        console.log(cart)
        if (cart) {
            res.status(200).json(cart)
        } else {
            res.status(404).json({ error: 'La Busqueda del id de la cart no existe' });
        }

    } catch (error) {
        res.status(500).json({ error: `Error al obtener la cart` })
    }
})
export default router;