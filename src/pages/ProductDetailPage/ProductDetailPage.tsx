import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import WhatsAppButton from '../../components/common/WhatsAppButton';
import ProductDetail from '../../components/product/ProductDetail';
import Modal from '../../components/common/Modal';
import PaymentForm from '../../components/payment/PaymentForm';
import PaymentSummary from '../../components/payment/PaymentSummary';
import Loading from '../../components/common/Loading';
import { useProducts } from '../../hooks/useProduct';
import { usePayment } from '../../hooks/usePayment';
import './ProductDetailPage.scss';
import { CustomerInfo, PaymentInfo } from '../../types';


const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { selectedProduct, loading, error, loadProductById } = useProducts();
    const {
        processPayment,
        loading: paymentLoading,
        setCustomer,
        setPayment
    } = usePayment();

    useEffect(() => {
        if (id) {
            loadProductById(parseInt(id));
        }
    }, [id, loadProductById]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentStep, setPaymentStep] = useState<'form' | 'summary'>('form');

    const handleBuyClick = () => {
        setIsModalOpen(true);
        setPaymentStep('form');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleContinueToSummary = (customerData: CustomerInfo, paymentData: PaymentInfo) => {
        setCustomer(customerData);
        setPayment(paymentData);
        setPaymentStep('summary');
    };

    const handleProcessPayment = async () => {
        if (!selectedProduct) return;

        try {
            const success = await processPayment(selectedProduct.id, selectedProduct.price);
            setIsModalOpen(false);
            navigate('/payment/result');
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };

    return (
        <div className="product-detail-page">
            <Header />

            <main className="product-detail-page__main">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <div className="product-detail-page__error">
                        <h2>Error al cargar el producto</h2>
                        <p>{error}</p>
                        <button
                            className="product-detail-page__back-button"
                            onClick={() => navigate('/')}
                        >
                            Volver a la tienda
                        </button>
                    </div>
                ) : selectedProduct ? (
                    <ProductDetail
                        product={selectedProduct}
                        onBuyClick={handleBuyClick}
                    />
                ) : (
                    <div className="product-detail-page__error">
                        <h2>Producto no encontrado</h2>
                        <p>El producto que buscas no está disponible.</p>
                        <button
                            className="product-detail-page__back-button"
                            onClick={() => navigate('/')}
                        >
                            Volver a la tienda
                        </button>
                    </div>
                )}
            </main>

            <Footer />
            <WhatsAppButton />

            {selectedProduct && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title={paymentStep === 'form' ? "Información de Pago" : "Resumen de Pago"}
                    size="lg"
                >
                    {paymentStep === 'form' ? (
                        <PaymentForm
                            onContinue={(customerData, paymentData) => handleContinueToSummary(customerData, paymentData)}
                        />
                    ) : (
                        <PaymentSummary
                            productName={selectedProduct.name}
                            productPrice={selectedProduct.price}
                            quantity={1}
                            baseFee={5000}
                            deliveryFee={10000}
                            onPay={handleProcessPayment}
                            isLoading={paymentLoading}
                        />
                    )}
                </Modal>
            )}
        </div>
    );
};

export default ProductDetailPage;