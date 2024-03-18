import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const router = Router();

const productManager = new ProductManager('./files/products.json');

router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.status(200).json(limitedProducts);
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'El producto no existe' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto con el id solicitado' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
    }

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

    const newProduct = await productManager.writeProduct(product);
    return res.status(201).json({ status: 'success', product: newProduct });
  } catch (error) {
    return res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

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
