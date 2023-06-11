import { promises as fs } from 'fs';

class ProductManager {

    constructor(filePath) {
        this.filePath = filePath;
    }

    // Lectura
    async getProducts() {

        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            throw new Error('Error al obtener los productos ')
        }
    }

    async getProductById(pid) {

        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const products = JSON.parse(data);
            const product = products.find((p) => p.id === parseInt(pid));
            return product;
        }
        catch (error) {
            throw new Error('Error al obtener los productos.')
        }
    }

    // Escritura Product
    async writeProduct(product) {
        try {
            const nextProductId = await this.generateProductId();
            const products = await this.getProducts();

            const updatedProduct = { id: nextProductId, ...product };
            const updatedProducts = [...products, updatedProduct];

            await fs.writeFile(this.filePath, JSON.stringify(updatedProducts, null, '\t'));
            return updatedProduct;
        } catch (error) {
            throw new Error('Error al escribir el producto');
        }
    }

    async generateProductId() {
        try {
            const products = await this.getProducts();
            const nextProductId = products.length > 0 ? products.length + 1 : 1;
            return nextProductId;
        } catch (error) {
            throw new Error('Error al generar el ID del producto');
        }
    }
    async updateProduct(pid, updatedFields) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex((p) => p.id === parseInt(pid));

            if (index === -1) {
                throw new Error('El producto no existe');
            }

            const updatedProduct = {
                ...products[index],
                ...updatedFields
            };

            products[index] = updatedProduct;
            await fs.writeFile(this.filePath, JSON.stringify(products, null, '\t'));
            return updatedProduct;
        } catch (error) {
            throw new Error('Error al actualizar el producto');
        }
    }

    async deleteProduct(pid) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex((p) => p.id === parseInt(pid));

            if (index === -1) {
                throw new Error('El producto no existe');
            }

            products.splice(index, 1);
            await fs.writeFile(this.filePath, JSON.stringify(products, null, '\t'));
        } catch (error) {
            throw new Error('Error al eliminar el producto');
        }
    }

    // Lectura Carts

    async getCarts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const products = JSON.parse(data)
            return products
        } catch (error) {
            throw new Error('Error al obtener las carts')
        }
    }

    async getCartsById(cid) {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            console.log(data); // Agrega esta línea para verificar la data
            const carts = JSON.parse(data);
            const cart = carts.find((c) => (c.id) === parseInt(cid));
            return cart;
        } catch (error) {
            throw new Error('Error al obtener la Cart');
        }
    }

}


export default ProductManager;