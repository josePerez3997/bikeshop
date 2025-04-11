import { PaymentFormProps } from './PaymentForm/PaymentForm';
import { CreditCardDisplayProps } from './CreditCardDisplay/CreditCardDisplay';
import { PaymentSummaryProps } from './PaymentSummary/PaymentSummary';

export type { PaymentFormProps, CreditCardDisplayProps, PaymentSummaryProps };

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