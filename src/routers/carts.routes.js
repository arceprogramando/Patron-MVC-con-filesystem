import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';
import CartManager from '../CartManager.js';

const cartController = new CartController();

const cartManager = new CartManager('./files/carts.json');

const router = Router();

router.get('/', cartController.getAllCarts);

router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartsById(cid);
    console.log(cart);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'La Busqueda del id de la cart no existe' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la cart' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'La lista de productos debe ser un array' });
    }

    const newCartId = await cartManager.generateCartId();

    const newCart = {
      id: newCartId,
      products,
    };

    const createdCart = await cartManager.writeCart(newCart);

    return res.status(201).json({ status: 'success', cart: createdCart });
  } catch (error) {
    return res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;

    const updatedCart = await cartManager.updateCart(cartId, productId, quantity);

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
});

export default router;
