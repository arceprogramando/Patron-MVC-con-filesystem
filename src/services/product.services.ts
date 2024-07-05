import ProductDao from '../dao/product.dao';

const filePath = './files/products.json';

class ProductService {
  productDao: ProductDao;
  constructor() {
    this.productDao = new ProductDao(filePath);
  }

  getAllProducts = async () => {
    try {
      const findProducts = await this.productDao.getAllProducts();
      return findProducts;
    } catch (error) {
      throw new Error(`Error al buscar todos los productos en el service: ${(error as Error).message}`);
    }
  };

  getProductById = async(pId:string) => {
    try {
      const getProductById = await this.productDao.getProductById(pId);
      return getProductById;
    } catch (error) {
      throw new Error(`Error al buscar todos los productos en el service ${(error as Error).message}`);
    }
  };

  createProduct = async (product:any) => {
    try {
      const createProduct = await this.productDao.createProduct(product);
      return createProduct;
    } catch (error) {
      throw new Error(`Error al crear un producto: ${(error as Error).message}`);
    }
  };

  updateProduct = async (pId:string, product:any) => {
    try {
      const updateProduct = await this.productDao.updateProduct(pId, product);
      return updateProduct;
    } catch (error) {
      throw new Error(`Error al actualizar el producto en el service ${(error as Error).message}`);
    }
  };

  deleteProduct = async (pId:string) => {
    try {
      const deleteProduct = await this.productDao.deleteProduct(pId);
      return deleteProduct;
    } catch (error) {
      throw new Error(`Error al eliminar el producto en el service ${(error as Error).message}}`);
    }
  };
}
export default ProductService;
