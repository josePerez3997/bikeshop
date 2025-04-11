import { ProductCardProps } from './ProductCard/ProductCard';
import { ProductDetailProps } from './ProductDetail/ProductDetail';
import { ProductFilterProps } from './ProductFilter/ProductFilter';

export type { ProductCardProps, ProductDetailProps, ProductFilterProps };

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    isBestSeller?: boolean;
}