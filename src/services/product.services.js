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

  createProduct = async (product) => {
    try {
      const createProduct = await this.productDao.createProduct(product);
      return createProduct;
    } catch (error) {
      throw new Error(`Error al crear un producto: ${error.message}`);
    }
  };
}
export default ProductService;
