import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerInfo, PaymentInfo, Transaction } from '../../types/payment';

interface PaymentState {
    customerInfo: CustomerInfo | null;
    paymentInfo: PaymentInfo | null;
    transaction: Transaction | null;
    loading: boolean;
    error: string | null;
}

const initialState: PaymentState = {
    customerInfo: null,
    paymentInfo: null,
    transaction: null,
    loading: false,
    error: null
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setCustomerInfo: (state, action: PayloadAction<CustomerInfo>) => {
            state.customerInfo = action.payload;
        },
        setPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
            state.paymentInfo = action.payload;
        },
        processPaymentStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        processPaymentSuccess: (state, action: PayloadAction<Transaction>) => {
            state.transaction = action.payload;
            state.loading = false;
        },
        processPaymentFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetPayment: (state) => {
            state.customerInfo = null;
            state.paymentInfo = null;
            state.transaction = null;
            state.error = null;
        }
    }
});

export const {
    setCustomerInfo,
    setPaymentInfo,
    processPaymentStart,
    processPaymentSuccess,
    processPaymentFailure,
    resetPayment
} = paymentSlice.actions;

export default paymentSlice.reducer;