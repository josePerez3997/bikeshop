import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Banner from '../../components/layout/Banner';
import Footer from '../../components/layout/Footer';
import WhatsAppButton from '../../components/common/WhatsAppButton';
import ProductCard from '../../components/product/ProductCard';
import ProductFilter from '../../components/product/ProductFilter';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';
import PaymentForm from '../../components/payment/PaymentForm';
import PaymentSummary from '../../components/payment/PaymentSummary';
import { useProducts } from '../../hooks/useProduct';
import { usePayment } from '../../hooks/usePayment';
import { CustomerInfo, PaymentInfo } from '../../types/payment';
import './HomePage.scss';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { products, loading, error, loadProducts, sortProducts, loadProductById } = useProducts();
  const { processPayment, loading: paymentLoading, setCustomer, setPayment } = usePayment();

  const [sortOption, setSortOption] = useState('best-seller');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayProducts, setDisplayProducts] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'summary'>('form');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (products.length > 0) {
      let result = [...products];

      if (searchTerm) {
        result = result.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      result = sortProducts(result, sortOption);
      setDisplayProducts(result);
    }
  }, [products, searchTerm, sortOption, sortProducts]);

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleBuyClick = (productId: number) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
    setPaymentStep('form');

    loadProductById(productId);
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
    if (!selectedProductId) return;

    try {
      const success = await processPayment(selectedProductId, 1);
      setIsModalOpen(false);
      navigate('/payment/result');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);

  const renderMainContent = () => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return (
        <div className="home-page__error">
          <h2>Error al cargar los productos</h2>
          <p>{error}</p>
        </div>
      );
    }

    return (
      <>
        <form
          className="home-page__search-container"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="home-page__search-input"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="home-page__search-button"
            type="submit"
          >
            Buscar
          </button>
        </form>

        <div className="home-page__content">
          <aside className="home-page__sidebar">
            <ProductFilter
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
          </aside>

          <div className="home-page__products">
            <div className="home-page__products-header">
              <span className="home-page__products-count">
                {displayProducts.length} artículos
              </span>
            </div>

            <div className="home-page__products-grid">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onBuyClick={handleBuyClick}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="home-page">
      <Header />
      {!loading && !error && <Banner />}

      <main className="home-page__main">
        {renderMainContent()}
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

export default HomePage;