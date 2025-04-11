export interface PaymentFormProps {
    onContinue: (customerData: CustomerInfo, paymentData: PaymentInfo) => void;
}

export interface PaymentSummaryProps {
    productName: string;
    productPrice: number;
    quantity: number;
    baseFee: number;
    deliveryFee: number;
    onPay: () => void;
    isLoading: boolean;
}

export interface CreditCardDisplayProps {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cardType: 'visa' | 'mastercard' | 'unknown';
}

export interface PaymentInfo {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
    cardType?: 'visa' | 'mastercard' | 'unknown';
}

export interface CustomerInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressStreet: string;
    addressCity: string;
    addressState: string;
    addressPostalCode: string;
    addressCountry: string;
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