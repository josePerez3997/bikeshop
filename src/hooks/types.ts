import { CustomerInfo, PaymentInfo, Transaction } from '../types/payment';
import { Product } from '../types/product';

export interface UseCartHook {
    cartItems: Array<{
        productId: number;
        quantity: number;
        product?: Product;
        subtotal: number;
    }>;
    totalAmount: number;
    addItem: (productId: number, quantity?: number) => void;
    removeItem: (productId: number) => void;
    clearItems: () => void;
    loading: boolean;
    error: string | null;
}

export interface UsePaymentHook {
    customerInfo: CustomerInfo | null;
    paymentInfo: PaymentInfo | null;
    transaction: Transaction | null;
    loading: boolean;
    error: string | null;
    setCustomer: (data: CustomerInfo) => void;
    setPayment: (data: PaymentInfo) => void;
    processPayment: (productId: number, quantity: number) => Promise<Transaction>;
    reset: () => void;
}

export interface UseProductsHook {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: string | null;
    loadProducts: () => Promise<void>;
    loadProductById: (productId: number) => Promise<Product>;
    filterProducts: (searchTerm: string) => Product[];
    sortProducts: (products: Product[], criteria: string) => Product[];
}