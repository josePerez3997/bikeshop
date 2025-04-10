import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Banner from '../../components/layout/Banner';
import Footer from '../../components/layout/Footer';
import WhatsAppButton from '../../components/common/WhatsAppButton';
import ProductCard from '../../components/product/ProductCard';
import ProductFilter from '../../components/product/ProductFilter';
import './HomePage.scss';

const mockProducts = [
  {
    id: 1,
    name: 'Bicicleta Montañera Elite',
    description: 'Bicicleta de montaña con marco de aluminio, suspensión delantera y 21 velocidades.',
    price: 1299000,
    imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    stock: 15,
    isBestSeller: true
  },
  {
    id: 2,
    name: 'Bicicleta Urbana Clásica',
    description: 'Bicicleta urbana con estilo retro, ideal para desplazamientos diarios en la ciudad.',
    price: 850000,
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    stock: 8,
    isBestSeller: false
  },
  {
    id: 3,
    name: 'Bicicleta Plegable Compacta',
    description: 'Bicicleta plegable ligera y compacta, perfecta para combinar con transporte público.',
    price: 750000,
    imageUrl: 'https://images.unsplash.com/photo-1583087253076-6de06c243071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    stock: 12,
    isBestSeller: true
  },
  {
    id: 4,
    name: 'Bicicleta de Ruta Profesional',
    description: 'Bicicleta de carretera con marco de carbono, grupos Shimano Ultegra y ruedas aerodinámicas.',
    price: 3200000,
    imageUrl: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    stock: 5,
    isBestSeller: false
  },
];

const HomePage: React.FC = () => {
  const [products, setProducts] = useState(mockProducts);
  const [sortOption, setSortOption] = useState('best-seller');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedProducts = () => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case 'best-seller':
        result = result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'a-z':
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-high-low':
        result = result.sort((a, b) => b.price - a.price);
        break;
      case 'price-low-high':
        result = result.sort((a, b) => a.price - b.price);
        break;
    }

    return result;
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const displayProducts = filteredAndSortedProducts();

  return (
    <div className="home-page">
      <Header />
      <Banner />

      <main className="home-page__main">
        <div className="home-page__search-container">
          <input
            type="text"
            className="home-page__search-input"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="home-page__search-button">Buscar</button>
        </div>

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
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;