export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    isBestSeller?: boolean;
}

export interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: string | null;
}

export interface ProductCardProps {
    product: Product;
    onBuyClick?: (productId: number) => void;
}

export interface ProductDetailProps {
    product: Product;
    onBuyClick?: () => void;
}

export interface ProductFilterProps {
    sortOption: string;
    onSortChange: (option: string) => void;
    className?: string;
}