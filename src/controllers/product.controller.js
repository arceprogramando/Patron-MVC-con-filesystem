import ProductService from '../services/product.services.js';

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  getAllProducts = async (req, res) => {
    try {
      const { limit } = req.query;
      const products = await this.productService.getAllProducts();
      if (limit) return res.json({ products: products.slice(0, Number(limit)) });
      return res.json({ products });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };

  createProduct = async (req, res) => {
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
      return res.status(500).json({ error: 'Error al agregar el producto', message: error.message });
    }
  };
}

export default ProductController;
