import api from './api';
import { CustomerInfo, PaymentInfo, Transaction } from '../types/payment';

export const paymentService = {
    createTransaction: async (
        productId: number,
        quantity: number,
        customerInfo: CustomerInfo,
        paymentInfo: PaymentInfo
    ): Promise<Transaction> => {
        const response = await api.post('/transactions', {
            productId,
            quantity,
            customerInfo,
            paymentInfo
        });
        return response.data;
    },

    processPayment: async (transactionId: number): Promise<Transaction> => {
        const response = await api.post(`/transactions/${transactionId}/process`);
        return response.data;
    },

    getTransactionById: async (id: number): Promise<Transaction> => {
        const response = await api.get(`/transactions/${id}`);
        return response.data;
    }
};

export default paymentService;