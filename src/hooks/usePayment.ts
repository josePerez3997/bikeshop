import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import {
    setCustomerInfo,
    setPaymentInfo,
    processPaymentStart,
    processPaymentSuccess,
    processPaymentFailure,
    resetPayment
} from '../store/slices/paymentSlice';
import { updateProductStock } from '../store/slices/productSlice';
import paymentService from '../services/paymentService';
import { CustomerInfo, PaymentInfo } from '../types/payment';

export const usePayment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { customerInfo, paymentInfo, transaction, loading, error } = useSelector((state: RootState) => state.payment);

    const setCustomer = (data: CustomerInfo) => {
        dispatch(setCustomerInfo(data));
    };

    const setPayment = (data: PaymentInfo) => {
        dispatch(setPaymentInfo(data));
    };

    const processPayment = async (productId: number, quantity: number) => {
        if (!customerInfo || !paymentInfo) {
            throw new Error('Customer and payment information are required');
        }

        try {
            dispatch(processPaymentStart());

            const newTransaction = await paymentService.createTransaction(
                productId,
                quantity,
                customerInfo,
                paymentInfo
            );

            const processedTransaction = await paymentService.processPayment(newTransaction.id!);

            dispatch(processPaymentSuccess(processedTransaction));

            if (processedTransaction.status === 'APPROVED') {
                dispatch(updateProductStock({ productId, quantity }));
            }

            navigate('/payment/result');

            return processedTransaction;
        } catch (error) {
            dispatch(processPaymentFailure(error instanceof Error ? error.message : 'Payment failed'));
            throw error;
        }
    };

    const reset = () => {
        dispatch(resetPayment());
    };

    return {
        customerInfo,
        paymentInfo,
        transaction,
        loading,
        error,
        setCustomer,
        setPayment,
        processPayment,
        reset
    };
};

export default usePayment;