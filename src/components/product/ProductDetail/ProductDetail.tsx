import React, { useState } from 'react';
import Button from '../../common/Button';
import './ProductDetail.scss';

export interface ProductDetailProps {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        stock: number;
        isBestSeller?: boolean;
    };
    onBuyClick: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBuyClick }) => {
    const [isImageZoomed, setIsImageZoomed] = useState(false);

    const handleImageClick = () => {
        setIsImageZoomed(!isImageZoomed);
    };

    return (
        <div className="product-detail">
            <div className="product-detail__image-container">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={`product-detail__image ${isImageZoomed ? 'product-detail__image--zoomed' : ''}`}
                    onClick={handleImageClick}
                />
                {isImageZoomed &&
                    <div className="product-detail__zoom-instruction">
                        Haz clic para reducir la imagen
                    </div>
                }
            </div>

            <div className="product-detail__info">
                <h1 className="product-detail__name">{product.name}</h1>
                <p className="product-detail__price">${product.price.toLocaleString()}</p>

                <div className="product-detail__stock">
                    <span className="product-detail__stock-label">Disponibilidad:</span>
                    <span className={`product-detail__stock-value ${product.stock > 0 ? 'product-detail__stock-value--in-stock' : 'product-detail__stock-value--out-of-stock'}`}>
                        {product.stock > 0 ? `${product.stock} unidades disponibles` : 'Agotado'}
                    </span>
                </div>

                <div className="product-detail__actions">
                    <Button
                        onClick={onBuyClick}
                        size="lg"
                        fullWidth
                        disabled={product.stock <= 0}
                    >
                        {product.stock > 0 ? 'Comprar ahora' : 'Agotado'}
                    </Button>
                </div>

                <div className="product-detail__shipping">
                    <p className="product-detail__shipping-title">Información de envío</p>
                    <p className="product-detail__shipping-text">
                        Entrega estimada: 3-5 días hábiles
                    </p>
                </div>

                <div className="product-detail__description">
                    <h2 className="product-detail__description-title">Descripción</h2>
                    <p className="product-detail__description-text">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;