import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => {

  const sliderMessages = [
    "Los mejores descuentos en bicicletas",
    "Envío gratis en compras superiores a $500.000"
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => 
        prevIndex === sliderMessages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <div className="header__slider">
        <div className="header__slider-content">
          {sliderMessages[currentMessageIndex]}
        </div>
      </div>
      
      <div className="header__main">
        <Link to="/" className="header__logo-container">
          <div className="header__logo">BikeShop</div>
        </Link>
      </div>
    </header>
  );
};

export default Header;