export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface PaginatedApiResponse<T> {
    success: boolean;
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    message?: string;
}

export interface ErrorResponse {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
}

export interface ProductService {
    getProducts(): Promise<Product[]>;
    getProductById(id: number): Promise<Product>;
    updateProductStock(id: number, quantity: number): Promise<Product>;
}

export interface TransactionService {
    createTransaction(data: any): Promise<Transaction>;
    getTransactionById(id: number): Promise<Transaction>;
    updateTransactionStatus(id: number, status: string, wompiTransactionId?: string): Promise<Transaction>;
    getTransactionsByCustomerId(customerId: number): Promise<Transaction[]>;
    processWompiPayment(transactionId: number, paymentInfo: any): Promise<Transaction>;
}

export interface PaymentService {
    createTransaction(productId: number, quantity: number, customerInfo: any, paymentInfo: any): Promise<Transaction>;
    processPayment(transactionId: number): Promise<Transaction>;
    getTransactionById(id: number): Promise<Transaction>;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    isBestSeller?: boolean;
}

export interface Transaction {
    id?: number;
    status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'ERROR';
    amount: number;
    baseFee: number;
    deliveryFee: number;
    totalAmount: number;
    paymentMethod: string;
    wompiTransactionId?: string;
    createdAt?: string;
}