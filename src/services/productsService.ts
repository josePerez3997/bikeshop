import { Product } from '../types/product';
import api from './api';
import mockProducts from '../mock/products';

export const productsService = {
    getProducts: async (): Promise<Product[]> => {
        return Promise.resolve(mockProducts);
    },

    getProductById: async (id: number): Promise<Product> => {
        const product = mockProducts.find(p => p.id === id);

        if (!product) {
            return Promise.reject(new Error('Producto no encontrado'));
        }

        return Promise.resolve(product);
    },

    updateProductStock: async (id: number, quantity: number): Promise<Product> => {
        const productIndex = mockProducts.findIndex(p => p.id === id);
        if (productIndex === -1) {
            return Promise.reject(new Error('Producto no encontrado'));
        }

        mockProducts[productIndex] = {
            ...mockProducts[productIndex],
            stock: mockProducts[productIndex].stock - quantity
        };

        return Promise.resolve(mockProducts[productIndex]);
    }
};

export default productsService;