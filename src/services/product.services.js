import ProductDao from '../dao/product.dao.js';

const filePath = './files/products.json';

class ProductService {
  constructor() {
    this.productDao = new ProductDao(filePath);
  }

  getAllProducts = async () => {
    try {
      const findProducts = await this.productDao.getAllProducts();
      return findProducts;
    } catch (error) {
      throw new Error(`Error al buscar todos los productos en el service: ${error.message}`);
    }
  };

  getProductById = async (pId) => {
    try {
      const getProductById = await this.productDao.getProductById(pId);
      return getProductById;
    } catch (error) {
      throw new Error(`Error al buscar todos los productos en el service ${error.message}`);
    }
  };

  createProduct = async (product) => {
    try {
      const createProduct = await this.productDao.createProduct(product);
      return createProduct;
    } catch (error) {
      throw new Error(`Error al crear un producto: ${error.message}`);
    }
  };

  updateProduct = async (pId, product) => {
    try {
      const updateProduct = await this.productDao.updateProduct(pId, product);
      return updateProduct;
    } catch (error) {
      throw new Error(`Error al actualizar el producto en el service ${error.message}`);
    }
  };

  deleteProduct = async (pId) => {
    try {
      const deleteProduct = await this.productDao.deleteProduct(pId);
      return deleteProduct;
    } catch (error) {
      throw new Error(`Error al eliminar el producto en el service ${error.message}}`);
    }
  };
}
export default ProductService;
