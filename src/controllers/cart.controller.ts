import { Request,Response } from 'express';
import CartService from '../services/cart.services';

class CartController {
  cartService: CartService;
  constructor() {
    this.cartService = new CartService();
  }

  getAllCarts = async (req:Request, res:Response) => {
    try {
      const { limit } = req.query;
      const products = await this.cartService.getCarts();
      if (limit) {
        const limitedProducts = products.slice(0, limit);
        return res.status(200).json(limitedProducts);
      }
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  };

  getCartsById = async (req:Request, res:Response) => {
    try {
      const { cId } = req.params;
      const cart = await this.cartService.getCartsById(cId);
      if (!cart) return res.status(404).json({ error: 'La Busqueda del id de la cart no existe' });

      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener la cart' });
    }
  };

  createCart = async (req:Request, res:Response) => {
    try {
      const products = req.body;

      if (!Array.isArray(products)) return res.status(400).json({ error: 'La lista de productos debe ser un array' });

      const newCartId = await this.cartService.generateCartId();
      console.log('🚀 ~ CartController ~ createCart= ~ newCartId:', newCartId);

      const newCart = {
        id: newCartId,
        products,
      };

      const createdCart = await this.cartService.createCart(newCart);

      return res.status(201).json({ status: 'success', cart: createdCart });
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear el carrito' });
    }
  };

  addQuantityProductInCart = async (req:Request, res:Response) => {
    try {
      const { cId, pId } = req.params;
      const { quantity } = req.body;

      const updatedCart = await this.cartService.addQuantityProductInCart(cId, pId, quantity);

      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: `Error al actualizar el carrito ${(error as Error).message}` });
    }
  };
}

export default CartController;
