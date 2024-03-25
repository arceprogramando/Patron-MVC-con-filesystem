import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';

const cartController = new CartController();

const router = Router();

router.get('/', cartController.getAllCarts);

router.get('/:cId', cartController.getCartsById);

router.post('/', cartController.createCart);

router.post('/:cId/product/:pId', cartController.addQuantityProductInCart);

export default router;
