import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';

const router = Router();

const productController = new ProductController();

router.get('/', productController.getAllProducts);

router.post('/', productController.createProduct);

router.get('/:pId', productController.getProductById);

router.put('/:pId', productController.updateProduct);

router.delete('/:pId', productController.deleteProduct);

export default router;
