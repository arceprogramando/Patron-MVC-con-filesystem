import { Request, Response } from 'express';
import ProductService from '../services/product.services';

class ProductController {
  productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }

  getAllProducts = async (req: Request, res: Response) => {
    try {
      const { limit } = req.query;
      const products = await this.productService.getAllProducts();
      if (limit) return res.json({ products: products.slice(0, Number(limit)) });
      return res.json({ products });
    } catch (error) {
      return res.status(404).json({ error: (error as Error).message });
    }
  };

  getProductById = async (req: Request, res: Response) => {
    try {
      const { pId } = req.params;
      const getProductById = await this.productService.getProductById(pId);

      if (!getProductById) return res.status(404).json(`No se encontro el producto con el id ${pId}`);

      return res.json({ product: getProductById });
    } catch (error) {
      return res.status(404).json({ error: (error as Error).message });
    }
  };

  createProduct = async (req: Request, res: Response) => {
    try {
      const { title, description, code, price, stock, category, thumbnails } = req.body;

      if (!title) return res.status(400).json({ error: 'El título es obligatorio' });

      if (!description) return res.status(400).json({ error: 'La descripción es obligatoria' });

      if (!code) return res.status(400).json({ error: 'El código es obligatorio' });

      if (!price) return res.status(400).json({ error: 'El precio es obligatorio' });

      if (!stock) return res.status(400).json({ error: 'El stock es obligatorio' });

      if (!category) return res.status(400).json({ error: 'La categoría es obligatoria' });

      const product = {
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: thumbnails || [],
      };

      const newProduct = await this.productService.createProduct(product);
      return res.status(201).json({ status: 'success', product: newProduct });
    } catch (error) {
      return res.status(500).json({ error: 'Error al agregar el producto', message: (error as Error).message });
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      const { pId } = req.params;
      const { title, description, code, price, stock, category, thumbnails } = req.body;

      if (!title && !description && !code && !price && !stock && !category && !thumbnails) {
        return res.status(400).json({ error: 'Se debe proporcionar al menos un campo para actualizar' });
      }

      const product = await this.productService.getProductById(pId);

      if (!product) {
        return res.status(404).json({ error: 'El producto no existe' });
      }

      const updatedProductData = {
        title: title || product.title,
        description: description || product.description,
        code: code || product.code,
        price: price || product.price,
        stock: stock || product.stock,
        category: category || product.category,
        thumbnails: thumbnails || product.thumbnails,
      };
      console.log('🚀 ~ ProductController ~ updateProduct= ~ updatedProductData:', updatedProductData);

      const updatedProduct = await this.productService.updateProduct(pId, updatedProductData);
      return res.status(200).json({ status: 'success', product: updatedProduct });
    } catch (error) {
      return res.status(500).json({ error: 'No se pudo actualizar el producto', message: (error as Error).message });
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    try {
      const { pId } = req.params;
      const product = await this.productService.getProductById(pId);

      if (!product) return res.status(404).json({ error: 'El producto no existe' });

      await this.productService.deleteProduct(pId);
      return res.status(200).json({ status: 'success', message: `El producto con id ${pId} ha sido eliminado` });
    } catch (error) {
      return res.status(500).json({ error: 'No se pudo Eliminar el producto', message: (error as Error).message });
    }
  };
}

export default ProductController;
