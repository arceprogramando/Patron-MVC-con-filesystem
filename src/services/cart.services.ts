import CartDao from '../dao/cart.dao';

const filePath = './files/carts.json';

class CartService {
  cartDao: any;
  constructor() {
    this.cartDao = new CartDao(filePath);
  }

  getCarts = async () => {
    try {
      const getCarts = await this.cartDao.getAllCarts();
      return getCarts;
    } catch (error) {
      throw new Error(`Error al buscar las carts en el service: ${error}`);
    }
  };

  getCartsById = async (cId:string) => {
    try {
      const getCartsById = await this.cartDao.getCartsById(cId);
      return getCartsById;
    } catch (error) {
      throw new Error(`Error al buscar las carts con id ${cId} en el service: ${(error as Error).message}`);
    }
  };

  generateCartId = async () => {
    try {
      const generateCartId = await this.cartDao.generateCartId();
      return generateCartId;
    } catch (error) {
      throw new Error(`Error al generar la nueva  id  en el service: ${(error as Error).message}`);
    }
  };

  createCart = async (cart:any) => {
    try {
      const createCart = await this.cartDao.createCart(cart);
      return createCart;
    } catch (error) {
      throw new Error(`Error al crear la cart  en el service: ${(error as Error).message}`);
    }
  };

  addQuantityProductInCart = async (cId:string, pId:string, quantity:number) => {
    try {
      const addQuantity = await this.cartDao.addQuantityProductInCart(cId, pId, quantity);
      return addQuantity;
    } catch (error) {
      throw new Error(`Error al crear la crear el tipo de producto ${pId} en la cart ${cId} en el service: ${(error as Error).message}`);
    }
  };
}
export default CartService;
