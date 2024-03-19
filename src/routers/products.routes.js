import { Router } from 'express';
import ProductManager from '../ProductManager.js';
import ProductController from '../controllers/product.controller.js';

const router = Router();
const productManager = new ProductManager('./files/products.json');

const productController = new ProductController();

router.get('/', productController.getAllProducts);

router.post('/', productController.createProduct);

router.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if (!title && !description && !code && !price && !stock && !category && !thumbnails) {
      return res.status(400).json({ error: 'Se debe proporcionar al menos un campo para actualizar' });
    }

    const product = await productManager.getProductById(pid);

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

    const updatedProduct = await productManager.updateProduct(pid, updatedProductData);
    return res.status(200).json({ status: 'success', product: updatedProduct });
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

    if (!product) {
      return res.status(404).json({ error: 'El producto no existe' });
    }

    await productManager.deleteProduct(pid);
    return res.status(200).json({ status: 'success', message: 'El producto ha sido eliminado' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;
