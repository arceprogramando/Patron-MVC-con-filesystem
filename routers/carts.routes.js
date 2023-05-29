import { Router } from 'express';
import fs from 'fs';

const cartsFilePath = './files/carts.json';
let cartIdCounter = 1;

const router = Router();

function readDataFromFile() {
    try {
        const data = fs.readFileSync(cartsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed reading file', error);
        return [];
    }
}

function writeDataToFile(data) {
    try {
        fs.writeFileSync(cartsFilePath, JSON.stringify(data, null, '\t'));
    } catch (error) {
        console.error('Failed writing file', error);
    }
}

function getCartsFromStorage() {
    return readDataFromFile();
}

function saveCartsToStorage(carts) {
    writeDataToFile(carts);
}

router.get('/', (req, res) => {
    const carts = getCartsFromStorage();
    res.status(200).json(carts);
});

router.post('/', (req, res) => {
    const { products } = req.body;

    const newCart = {
        id: cartIdCounter.toString(),
        products: products || []
    };

    cartIdCounter++;

    const carts = getCartsFromStorage();
    carts.push(newCart);
    saveCartsToStorage(carts);

    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const { cid } = req.params;

    const carts = getCartsFromStorage();
    const cart = carts.find(cart => cart.id === cid);

    if (!cart) {
        res.status(404).json({ error: 'Cart not found' });
    } else {
        res.status(200).json(cart.products);
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const carts = getCartsFromStorage();
    const cart = carts.find(cart => cart.id === cid);

    if (!cart) {
        res.status(404).json({ error: 'Cart not found' });
    } else {
        const existingProduct = cart.products.find(product => product.product === pid);

        if (existingProduct) {
            existingProduct.quantity += quantity || 1;
        } else {
            cart.products.push({
                product: pid,
                quantity: quantity || 1
            });
        }

        saveCartsToStorage(carts);

        res.status(200).json(cart.products);
    }
});

export default router;