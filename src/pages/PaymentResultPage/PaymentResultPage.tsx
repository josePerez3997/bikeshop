import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';
import { resetPayment } from '../../store/slices/paymentSlice';
import { updateProductStock } from '../../store/slices/productSlice';
import './PaymentResultPage.scss';

const PaymentResultPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { transaction } = useSelector((state: RootState) => state.payment);

    useEffect(() => {
        if (!transaction) {
            navigate('/');
        }

        if (transaction && transaction.status === 'APPROVED') {
            dispatch(updateProductStock({ productId: 1, quantity: 1 }));
        }
    }, [transaction, navigate, dispatch]);

    const handleContinueShopping = () => {
        dispatch(resetPayment());
        navigate('/');
    };

    return (
        <div className="payment-result">
            <Header />

            <main className="payment-result__main">
                <div className="payment-result__container">
                    {transaction ? (
                        <>
                            {transaction.status === 'APPROVED' ? (
                                <div className="payment-result__success">
                                    <div className="payment-result__icon payment-result__icon--success">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                        </svg>
                                    </div>
                                    <h2 className="payment-result__title">¡Pago Exitoso!</h2>
                                    <p className="payment-result__message">
                                        Tu pago se ha procesado correctamente. Recibirás un correo electrónico con los detalles de tu compra.
                                    </p>
                                    <div className="payment-result__transaction">
                                        <p>ID de Transacción: {transaction.wompiTransactionId || 'N/A'}</p>
                                        <p>Total: ${transaction.totalAmount.toFixed(2)}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="payment-result__error">
                                    <div className="payment-result__icon payment-result__icon--error">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                                        </svg>
                                    </div>
                                    <h2 className="payment-result__title">Error en el Pago</h2>
                                    <p className="payment-result__message">
                                        Lo sentimos, ha ocurrido un error al procesar tu pago. Por favor, intenta nuevamente.
                                    </p>
                                    <div className="payment-result__transaction">
                                        <p>Estado: {transaction.status}</p>
                                        {transaction.status === 'ERROR' && <p>Error: No se pudo conectar con el procesador de pagos.</p>}
                                        {transaction.status === 'DECLINED' && <p>Motivo: La tarjeta fue rechazada por el banco emisor.</p>}
                                    </div>
                                </div>
                            )}

                            <div className="payment-result__actions">
                                <Button onClick={handleContinueShopping} size="lg">
                                    Continuar Comprando
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="payment-result__error">
                            <h2 className="payment-result__title">No hay información de pago</h2>
                            <p className="payment-result__message">
                                No se encontró información de pago. Por favor, regresa a la tienda.
                            </p>
                            <div className="payment-result__actions">
                                <Button onClick={handleContinueShopping} size="lg">
                                    Ir a la Tienda
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PaymentResultPage;