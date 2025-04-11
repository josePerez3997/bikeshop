import React from 'react';
import Button from '../../common/Button';
import './PaymentSummary.scss';

export interface PaymentSummaryProps {
    productName: string;
    productPrice: number;
    quantity: number;
    baseFee: number;
    deliveryFee: number;
    onPay: () => void;
    isLoading: boolean;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
    productName,
    productPrice,
    quantity,
    baseFee,
    deliveryFee,
    onPay,
    isLoading
}) => {
    const subtotal = productPrice * quantity;
    const total = subtotal + baseFee + deliveryFee;

    return (
        <div className="payment-summary">
            <h2 className="payment-summary__title">Resumen del Pedido</h2>

            <div className="payment-summary__product">
                <span className="payment-summary__product-name">{productName}</span>
                <span className="payment-summary__product-quantity">x {quantity}</span>
                <span className="payment-summary__product-price">${productPrice.toFixed(2)}</span>
            </div>

            <div className="payment-summary__costs">
                <div className="payment-summary__row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="payment-summary__row">
                    <span>Tarifa base</span>
                    <span>${baseFee.toFixed(2)}</span>
                </div>

                <div className="payment-summary__row">
                    <span>Envío</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                </div>

                <div className="payment-summary__row payment-summary__row--total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            <div className="payment-summary__action">
                <Button
                    onClick={onPay}
                    fullWidth
                    size="lg"
                    disabled={isLoading}
                >
                    {isLoading ? 'Procesando...' : 'Pagar'}
                </Button>
            </div>
        </div>
    );
};

export default PaymentSummary;