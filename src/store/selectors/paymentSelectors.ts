import { RootState } from '../store';

export const selectCustomerInfo = (state: RootState) => state.payment.customerInfo;
export const selectPaymentInfo = (state: RootState) => state.payment.paymentInfo;
export const selectTransaction = (state: RootState) => state.payment.transaction;
export const selectPaymentLoading = (state: RootState) => state.payment.loading;
export const selectPaymentError = (state: RootState) => state.payment.error;

export const selectPaymentStatus = (state: RootState) => 
  state.payment.transaction?.status || null;

export const selectPaymentSuccess = (state: RootState) => 
  state.payment.transaction?.status === 'APPROVED';

export const selectPaymentTotal = (state: RootState) => 
  state.payment.transaction?.totalAmount || 0;

export const selectCardType = (state: RootState) => 
  state.payment.paymentInfo?.cardType || 'unknown';