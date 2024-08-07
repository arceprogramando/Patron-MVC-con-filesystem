import fs from 'fs/promises';

type filePath = string;

class CartManager {
  filePath: string;
  constructor(filePath: filePath) {
    this.filePath = filePath;
  }

  async getAllCarts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      throw new Error('Error al obtener las carts');
    }
  }

  async getCartsById(cId: string) {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const carts = JSON.parse(data);
      const cart = carts.find((c: { id: number }) => c.id === Number(cId));
      return cart;
    } catch (error) {
      throw new Error('Error al obtener la Cart');
    }
  }

  async generateCartId() {
    try {
      const carts = await this.getAllCarts();
      const NextCartId = carts.length > 0 ? carts.length + 1 : 1;
      return NextCartId;
    } catch (error) {
      throw new Error('Error al generar el ID del producto');
    }
  }

  async createCart(cart: any) {
    try {
      const NextCartId = await this.generateCartId();
      const carts = await this.getAllCarts();

      const updatedCart = {
        id: NextCartId,
        ...cart,
      };
      const updatedCarts = [...carts, updatedCart];

      await fs.writeFile(this.filePath, JSON.stringify(updatedCarts, null, '\t'));

      return updatedCart;
    } catch (error) {
      throw new Error('Error al actualizar el carrito');
    }
  }

  async addQuantityProductInCart(cId: string, pId: string, quantity: number) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find((c: { id: number }) => c.id === Number(cId));

      if (!cart) throw new Error('Carrito no encontrado');

      const existingProduct = cart.products.find((p: { product: string; id: number }) => p.product === pId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: pId, quantity });
      }

      await fs.writeFile(this.filePath, JSON.stringify(carts, null, '\t'));

      return cart;
    } catch (error) {
      throw new Error('Error al actualizar el carrito');
    }
  }
}

export default CartManager;
