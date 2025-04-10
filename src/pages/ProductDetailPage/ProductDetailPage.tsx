import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import WhatsAppButton from '../../components/common/WhatsAppButton';
import ProductDetail from '../../components/product/ProductDetail';
import { Loading } from '../../components/common';
import './ProductDetailPage.scss';

const mockProducts = [
    {
        id: 1,
        name: 'Bicicleta Montañera Elite',
        description: 'Bicicleta de montaña con marco de aluminio, suspensión delantera y 21 velocidades. Ideal para terrenos difíciles y senderos de montaña. Incluye frenos de disco hidráulicos para mayor seguridad y control en descensos empinados. Los neumáticos tienen un dibujo agresivo para mejor tracción en terrenos variados.',
        price: 1299000,
        imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        stock: 15,
        isBestSeller: true
    },
    {
        id: 2,
        name: 'Bicicleta Urbana Clásica',
        description: 'Bicicleta urbana con estilo retro, ideal para desplazamientos diarios en la ciudad. Incluye portaequipajes y luces LED. Su diseño ergonómico permite una postura cómoda para trayectos prolongados. Cuenta con cambios integrados en el buje para un mantenimiento reducido.',
        price: 850000,
        imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        stock: 8,
        isBestSeller: false
    },
];

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            const foundProduct = mockProducts.find(p => p.id === parseInt(id || '0'));

            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                navigate('/');
            }

            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [id, navigate]);

    return (
        <div className="product-detail-page">
            <Header />

            <main className="product-detail-page__main">
                {loading ? (
                    <Loading />
                ) : product ? (
                    <ProductDetail
                        product={product}
                        onBuyClick={() => {}}
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
        </div>
    );
};

export default ProductDetailPage;