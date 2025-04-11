/**
 * Guarda un valor en localStorage
 * @param key - Clave para almacenar el valor
 * @param value - Valor a almacenar (se convertirá a JSON)
 */
export const setItem = <T>(key: string, value: T): void => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
};

/**
 * Obtiene un valor de localStorage
 * @param key - Clave del valor a obtener
 * @param defaultValue - Valor por defecto si no existe la clave
 */
export const getItem = <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) return defaultValue;
        return JSON.parse(serializedValue) as T;
    } catch (error) {
        console.error('Error al leer de localStorage:', error);
        return defaultValue;
    }
};

/**
 * Elimina un valor de localStorage
 * @param key - Clave del valor a eliminar
 */
export const removeItem = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error al eliminar de localStorage:', error);
    }
};

/**
 * Limpia todo el localStorage
 */
export const clearStorage = (): void => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error al limpiar localStorage:', error);
    }
};

/**
 * Recupera el estado de la sesión para carrito/pago
 */
export const getSessionState = () => {
    return {
        cart: getItem('cart', []),
        paymentInfo: getItem('paymentInfo', null),
        customerInfo: getItem('customerInfo', null),
        lastProductViewed: getItem('lastProductViewed', null)
    };
};

/**
 * Guarda el progreso actual del proceso de compra
 * @param checkoutState - Estado actual del proceso de checkout
 */
export const saveCheckoutProgress = (checkoutState: {
    step: number;
    cartItems?: any[];
    customerInfo?: any;
    paymentInfo?: any;
}): void => {
    setItem('checkoutProgress', {
        ...checkoutState,
        timestamp: new Date().toISOString()
    });
};

/**
 * Recupera el progreso de checkout guardado
 */
export const getCheckoutProgress = () => {
    return getItem('checkoutProgress', null);
};

export default {
    setItem,
    getItem,
    removeItem,
    clearStorage,
    getSessionState,
    saveCheckoutProgress,
    getCheckoutProgress
};