import React from 'react';
import Header from '../../components/layout/Header';
import Banner from '../../components/layout/Banner';
import Footer from '../../components/layout/Footer';
import WhatsAppButton from '../../components/common/WhatsAppButton';
import './HomePage.scss';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <Banner />

      <main className="home-page__main">
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;