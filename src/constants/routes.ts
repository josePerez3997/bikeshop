export const ROUTES = {
    HOME: '/',
    PRODUCT_DETAIL: '/product/:id',

    CHECKOUT: '/checkout',
    PAYMENT_RESULT: '/payment/result',

    NOT_FOUND: '*',
};

export const getProductDetailPath = (productId: number | string): string => {
    return `/product/${productId}`;
};

export const API_ROUTES = {
    BASE: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',

    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/products/:id',

    TRANSACTIONS: '/transactions',
    TRANSACTION_DETAIL: '/transactions/:id',
    PROCESS_PAYMENT: '/transactions/:id/process',

    WOMPI_BASE: process.env.REACT_APP_WOMPI_API_URL || 'https://api-sandbox.co.uat.wompi.dev/v1',
};

export const getApiRoute = (path: string, params?: Record<string, string | number>): string => {
    let finalPath = path;

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            finalPath = finalPath.replace(`:${key}`, String(value));
        });
    }

    return finalPath;
};

export default {
    ROUTES,
    API_ROUTES,
    getProductDetailPath,
    getApiRoute
};