import fs from 'fs/promises';

type UpdatedProductFields = {
  title: string;
  description: string;
  code: string;
  price: number;
  stock: number;
  category: string;
  thumbnails: string[];
};

class ProductDao {
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async getAllProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos ');
    }
  }

  async createProduct(product: any) {
    try {
      const nextProductId = await this.generateProductId();
      const products = await this.getAllProducts();

      const updatedProduct = { id: nextProductId, ...product };
      const updatedProducts = [...products, updatedProduct];

      await fs.writeFile(this.filePath, JSON.stringify(updatedProducts, null, '\t'));
      return updatedProduct;
    } catch (error) {
      throw new Error();
    }
  }

  async getProductById(pId: string) {
    try {
      const products = await this.getAllProducts();
      const product = products.find((p: { id: number }) => p.id === Number(pId));
      return product;
    } catch (error) {
      throw new Error('Error al obtener el producto.');
    }
  }

  async generateProductId() {
    try {
      const products = await this.getAllProducts();
      const nextProductId = products.length > 0 ? products.length + 1 : 1;
      return nextProductId;
    } catch (error) {
      throw new Error('Error al generar el ID del producto');
    }
  }

  async updateProduct(pid: string, updatedFields: UpdatedProductFields) {
    try {
      const products = await this.getAllProducts();
      const index = products.findIndex((p: { id: number }) => p.id === Number(pid));

      if (index === -1) {
        throw new Error('El producto no existe');
      }

      const updatedProduct = {
        ...products[index],
        ...updatedFields,
      };

      products[index] = updatedProduct;
      await fs.writeFile(this.filePath, JSON.stringify(products, null, '\t'));
      return updatedProduct;
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }
  private filePath: string;

  async deleteProduct(pId: string) {
    try {
      const products = await this.getAllProducts();
      const index = products.findIndex((p: { id: number }) => p.id === Number(pId));

      if (index === -1) {
        throw new Error('El producto no existe');
      }

      products.splice(index, 1);
      await fs.writeFile(this.filePath, JSON.stringify(products, null, '\t'));
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
}

export default ProductDao;
