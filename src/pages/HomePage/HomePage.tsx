import React from 'react';
import Header from '../../components/layout/Header';
import Banner from '../../components/layout/Banner';
import './HomePage.scss';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <Banner />
    </div>
  );
};

export default HomePage;