import { RootState } from '../store';

export const selectProducts = (state: RootState) => state.products.products;
export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;

export const selectBestSellerProducts = (state: RootState) => 
  state.products.products.filter(product => product.isBestSeller);

export const selectProductById = (state: RootState, productId: number) => 
  state.products.products.find(product => product.id === productId);

export const selectInStockProducts = (state: RootState) => 
  state.products.products.filter(product => product.stock > 0);