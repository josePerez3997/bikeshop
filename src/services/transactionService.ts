import api from './api';
import { API_ROUTES, getApiRoute } from '../constants/routes';
import { Transaction, CustomerInfo, PaymentInfo } from '../types/payment';
import { PAYMENT_CONSTANTS } from '../constants/paymentConstants';

export const transactionService = {
    createTransaction: async (data: {
        productId: number;
        quantity: number;
        customerId?: number;
        amount: number;
        baseFee: number;
        deliveryFee: number;
        paymentMethod: string;
        customerInfo: CustomerInfo;
    }): Promise<Transaction> => {
        try {
            const response = await api.post(API_ROUTES.TRANSACTIONS, {
                ...data,
                status: 'PENDING',
                totalAmount: data.amount + data.baseFee + data.deliveryFee,
            });
            return response.data;
        } catch (error) {
            console.error('Error creating transaction:', error);
            throw error;
        }
    },

    getTransactionById: async (id: number): Promise<Transaction> => {
        try {
            const response = await api.get(getApiRoute(API_ROUTES.TRANSACTION_DETAIL, { id }));
            return response.data;
        } catch (error) {
            console.error('Error fetching transaction:', error);
            throw error;
        }
    },

    updateTransactionStatus: async (
        id: number,
        status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'ERROR',
        wompiTransactionId?: string
    ): Promise<Transaction> => {
        try {
            const response = await api.patch(getApiRoute(API_ROUTES.TRANSACTION_DETAIL, { id }), {
                status,
                wompiTransactionId
            });
            return response.data;
        } catch (error) {
            console.error('Error updating transaction status:', error);
            throw error;
        }
    },

    getTransactionsByCustomerId: async (customerId: number): Promise<Transaction[]> => {
        try {
            const response = await api.get(`/customers/${customerId}/transactions`);
            return response.data;
        } catch (error) {
            console.error('Error fetching customer transactions:', error);
            throw error;
        }
    },

    processWompiPayment: async (
        transactionId: number,
        paymentInfo: PaymentInfo,
        customerInfo: CustomerInfo,
        amount: number
    ): Promise<Transaction> => {
        try {
            const paymentData = {
                amount_in_cents: Math.round(amount * 100),
                currency: "COP",
                acceptance_token: "WMP_TOKEN",
                reference: `TX-${transactionId}`,
                payment_method: {
                    type: "CARD",
                    installments: 1,
                    token: "WMP_CARD_TOKEN",
                    customer_email: customerInfo.email
                }
            };

            const mockWompiResponse = {
                data: {
                    id: `WMP-${Date.now()}`,
                    created_at: new Date().toISOString(),
                    amount_in_cents: paymentData.amount_in_cents,
                    status: "APPROVED",
                    reference: paymentData.reference
                }
            };

            const response = await api.post(
                getApiRoute(API_ROUTES.PROCESS_PAYMENT, { id: transactionId }),
                {
                    paymentInfo,
                    wompiResponse: mockWompiResponse.data
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error processing payment with Wompi:', error);

            await transactionService.updateTransactionStatus(transactionId, 'ERROR');
            throw error;
        }
    },

    processTransaction: async (
        transactionId: number,
        paymentInfo: PaymentInfo
    ): Promise<Transaction> => {
        try {
            const transaction = await transactionService.getTransactionById(transactionId);

            if (transaction.status !== 'PENDING') {
                throw new Error('La transacción ya fue procesada');
            }

            const response = await api.post(
                getApiRoute(API_ROUTES.PROCESS_PAYMENT, { id: transactionId }),
                { paymentInfo }
            );

            return response.data;
        } catch (error) {
            console.error('Error processing transaction:', error);
            throw error;
        }
    },

    getTransactionReceipt: async (transactionId: number): Promise<Blob> => {
        try {
            const response = await api.get(
                `/transactions/${transactionId}/receipt`,
                { responseType: 'blob' }
            );
            return response.data;
        } catch (error) {
            console.error('Error getting transaction receipt:', error);
            throw error;
        }
    }
};

export default transactionService;