import { Router } from "express";
import CartManager from '../src/CartManager.js'

const cartManager = new CartManager('./files/carts.json');

const router = Router()

// Lectura
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await cartManager.getCarts();
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
        const cart = await cartManager.getCartsById(cid)
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
// Escritura

router.post('/', async (req, res) => {
    try {
        const { products } = req.body;

        // Validar si la lista de productos existe y es un array
        if (!Array.isArray(products)) {
            return res.status(400).json({ error: 'La lista de productos debe ser un array' });
        }

        // Generar un nuevo id para el carrito (puedes usar un método de generación de ids único)
        const newCartId = await cartManager.generateCartId();

        const newCart = {
            id: newCartId,
            products: products
        };

        // Guardar el nuevo carrito en el sistema de persistencia
        const createdCart = await cartManager.writeCart(newCart);

        res.status(201).json({ status: 'success', cart: createdCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;

        const updatedCart = await cartManager.updateCart(cartId, productId, quantity);

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
});
export default router;