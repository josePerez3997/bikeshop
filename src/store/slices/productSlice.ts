import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../../types/product';

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.loading = false;
        },
        fetchProductsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        selectProduct: (state, action: PayloadAction<Product>) => {
            state.selectedProduct = action.payload;
            state.loading = false;
        },
        updateProductStock: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
            const { productId, quantity } = action.payload;
            const product = state.products.find(p => p.id === productId);
            if (product) {
                product.stock = Math.max(0, product.stock - quantity);
            }
            if (state.selectedProduct?.id === productId) {
                state.selectedProduct.stock = Math.max(0, state.selectedProduct.stock - quantity);
            }
        }
    }
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    selectProduct,
    updateProductStock
} = productSlice.actions;

export default productSlice.reducer;