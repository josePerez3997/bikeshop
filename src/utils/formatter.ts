/**
 * Formatea un número como moneda según el locale
 * @param amount - Cantidad a formatear
 * @param locale - Locale para el formato (default: 'es-CO')
 * @param currency - Moneda (default: 'COP')
 */
export const formatCurrency = (
    amount: number,
    locale: string = 'es-CO',
    currency: string = 'COP'
): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

/**
 * Formatea una fecha según el locale
 * @param date - Fecha a formatear
 * @param locale - Locale para el formato (default: 'es-CO')
 */
export const formatDate = (
    date: Date | string,
    locale: string = 'es-CO'
): string => {
    const dateObject = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(dateObject);
};

/**
 * Formatea un número de tarjeta añadiendo espacios cada 4 dígitos
 * @param cardNumber - Número de tarjeta sin formatear
 */
export const formatCardNumber = (cardNumber: string): string => {
    const cleanNumber = cardNumber.replace(/\s+/g, '');
    const groups = cleanNumber.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleanNumber;
};

/**
 * Formatea un número de teléfono según el formato colombiano
 * @param phoneNumber - Número de teléfono sin formatear
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
    const cleaned = phoneNumber.replace(/\D/g, '');

    if (cleaned.length === 10) {
        return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
    }

    return phoneNumber;
};

/**
 * Formatea un número de documento (cédula, NIT)
 * @param documentNumber - Número de documento
 */
export const formatDocumentNumber = (documentNumber: string): string => {
    const cleaned = documentNumber.replace(/\D/g, '');

    if (cleaned.length > 9) {
        return `${cleaned.slice(0, -1)}-${cleaned.slice(-1)}`;
    }

    return cleaned;
};

/**
 * Trunca un texto a una longitud máxima añadiendo puntos suspensivos
 * @param text - Texto a truncar
 * @param maxLength - Longitud máxima (default: 100)
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
    if (text.length <= maxLength) return text;

    return text.substring(0, maxLength - 3) + '...';
};

export default {
    formatCurrency,
    formatDate,
    formatCardNumber,
    formatPhoneNumber,
    formatDocumentNumber,
    truncateText
};