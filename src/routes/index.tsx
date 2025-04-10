import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductDetailPage from '../pages/ProductDetailPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
    );
};

export default AppRoutes;