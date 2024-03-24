import { Router } from 'express';
import ProductManager from '../ProductManager.js';
import ProductController from '../controllers/product.controller.js';

const router = Router();
const productManager = new ProductManager('./files/products.json');

const productController = new ProductController();

router.get('/', productController.getAllProducts);

router.post('/', productController.createProduct);

router.get('/:pId', productController.getProductById);

router.put('/:pId', productController.updateProduct);

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
