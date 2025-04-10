import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';

export interface ProductCardProps {
    product: {
        id: number;
        name: string;
        price: number;
        imageUrl: string;
        stock: number;
        isBestSeller?: boolean;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="product-card">
            {product.isBestSeller && (
                <div className="product-card__badge">Más vendido</div>
            )}

            <Link
                to={`/product/${product.id}`}
                className="product-card__link"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="product-card__image-container">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="product-card__image"
                        title='Ver detalle del producto'
                    />

                    <div className={`product-card__hover-container ${isHovered ? 'product-card__hover-container--active' : ''}`}>
                        <button className="product-card__button">
                            Pagar
                        </button>
                    </div>
                </div>

                <div className="product-card__info">
                    <h3 className="product-card__name">{product.name}</h3>
                    <div className="product-card__details">
                        <p className="product-card__price">${product.price.toLocaleString()}</p>
                        <p className="product-card__stock">Stock: {product.stock}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;