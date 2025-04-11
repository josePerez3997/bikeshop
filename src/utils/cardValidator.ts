export const cardValidator = {

    validateCardNumber: (cardNumber: string): boolean => {
        const sanitizedNumber = cardNumber.replace(/[\s-]/g, '');

        if (!/^\d+$/.test(sanitizedNumber)) {
            return false;
        }

        if (sanitizedNumber.length < 13 || sanitizedNumber.length > 19) {
            return false;
        }

        let sum = 0;
        let shouldDouble = false;

        for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(sanitizedNumber.charAt(i));

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return sum % 10 === 0;
    },

    getCardType: (cardNumber: string): 'visa' | 'mastercard' | 'unknown' => {
        const sanitizedNumber = cardNumber.replace(/[\s-]/g, '');

        if (/^4/.test(sanitizedNumber)) {
            return 'visa';
        }

        if (/^5[1-5]/.test(sanitizedNumber) || /^2[2-7][2-7][0-9]/.test(sanitizedNumber)) {
            return 'mastercard';
        }

        return 'unknown';
    },

    validateExpiryDate: (expiryDate: string): boolean => {
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            return false;
        }

        const [month, year] = expiryDate.split('/').map(part => parseInt(part, 10));

        if (month < 1 || month > 12) {
            return false;
        }

        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return false;
        }

        return true;
    },

    validateCVV: (cvv: string): boolean => {
        return /^\d{3,4}$/.test(cvv);
    }
};

export default cardValidator;