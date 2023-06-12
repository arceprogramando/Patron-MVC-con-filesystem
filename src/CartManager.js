import { promises as fs } from 'fs';

class cartManager {

    constructor(filePath) {
        this.filePath = filePath;
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
            console.log(data);
            const carts = JSON.parse(data);
            const cart = carts.find((c) => (c.id) === parseInt(cid));
            return cart;
        } catch (error) {
            throw new Error('Error al obtener la Cart');
        }
    }

    //Escritura Carts

    async generateCartId() {
        try {

            const carts = await this.getCarts();
            const NextCartId = carts.length > 0 ? carts.length + 1 : 1;
            return NextCartId;
        } catch (error) {
            throw new Error('Error al generar el ID del producto');
        }
    }
    async writeCart(cart) {
        try {
            const NextCartId = await this.generateCartId();
            const carts = await this.getCarts();

            const updatedCart = {
                id: NextCartId,
                ...cart
            };
            const updatedCarts = [...carts, updatedCart];

            await fs.writeFile(this.filePath, JSON.stringify(updatedCarts, null, '\t'));

            return updatedCart
        }
        catch (error) {
        }
    }
    async updateCart(cartId, productId, quantity) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find((c) => c.id === parseInt(cartId));

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const existingProduct = cart.products.find((p) => p.product === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            await fs.writeFile(this.filePath, JSON.stringify(carts, null, '\t'));

            return cart;
        } catch (error) {
            throw new Error('Error al actualizar el carrito');
        }
    }
}

export default cartManager;