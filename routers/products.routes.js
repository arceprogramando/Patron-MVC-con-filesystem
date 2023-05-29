import { Router } from "express";
import fs from 'fs';

const productsFilePath = './files/products.json';

const router = Router();

function readDataFromFile() {
    try {
        const data = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed reading file', error);
        return { products: [] };
    }
}

function writeDataToFile(data) {
    try {
        fs.writeFileSync(productsFilePath, JSON.stringify(data, null, '\t'));
    } catch (error) {
        console.error('Failed writing file', error);
    }
}

function getProductsFromStorage() {
    return readDataFromFile();
}

function saveProductsToStorage(products) {
    const updatedProducts = products.map((product, index) => {
        return {
            ...product,
            id: index + 1
        };
    });
    writeDataToFile(updatedProducts);
}

function getNextProductId() {
    const products = getProductsFromStorage();
    if (products.length === 0) {
        return 1;
    }
    const lastProduct = products[products.length - 1];
    return lastProduct.id + 1;
}

router.get('/', (req, res) => {
    const products = getProductsFromStorage();
    res.send({ products });
});

router.get('/:pid', (req, res) => {
    const productId = req.params.pid;
    const products = getProductsFromStorage();
    const product = products.find(p => p.id === productId);
    if (product) {
        res.send({ product });
    } else {
        res.status(404).send({ error: 'Producto no encontrado' });
    }
});

router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).send({ error: 'Todos los campos obligatorios deben ser proporcionados' });
    }

    const product = {
        id: getNextProductId(),
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: thumbnails || []
    };

    const products = getProductsFromStorage();
    products.push(product);
    saveProductsToStorage(products);
    res.send({ status: 'success', product });
});

router.put('/:pid', (req, res) => {
    const productId = req.params.pid;
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    const products = getProductsFromStorage();
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.code = code || product.code;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category = category || product.category;
    product.thumbnails = thumbnails || product.thumbnails;

    saveProductsToStorage(products);
    res.send({ status: 'success', product });
});

router.delete('/:pid', (req, res) => {
    const productId = req.params.pid;
    const products = getProductsFromStorage();
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }

    products.splice(productIndex, 1);
    saveProductsToStorage(products);
    res.send({ status: 'success' });
});

export default router;