import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  selectProduct,
} from '../store/slices/productSlice';
import {
  selectProducts,
  selectSelectedProduct,
  selectProductsLoading,
  selectProductsError
} from '../store/selectors/productSelectors';
import productsService from '../services/productsService';
import { Product } from '../types/product';

export const useProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const selectedProduct = useSelector(selectSelectedProduct);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const loadProducts = useCallback(async () => {
    console.log('Iniciando carga de productos');
    try {
      dispatch(fetchProductsStart());
      const data = await productsService.getProducts();
      console.log(`Productos cargados con éxito: ${data.length} productos`);
      dispatch(fetchProductsSuccess(data));
    } catch (error) {
      console.error('Error al cargar productos:', error);
      dispatch(fetchProductsFailure(error instanceof Error ? error.message : 'Failed to load products'));
    }
  }, [dispatch]);

  const loadProductById = useCallback(async (productId: number) => {
    console.log(`Iniciando carga del producto con ID: ${productId}`);
    try {
      dispatch(fetchProductsStart());
      const product = await productsService.getProductById(productId);
      console.log('Producto cargado con éxito:', product);
      dispatch(selectProduct(product));
      return product;
    } catch (error) {
      console.error('Error al cargar producto por ID:', error);
      dispatch(fetchProductsFailure(error instanceof Error ? error.message : 'Failed to load product'));
      throw error;
    }
  }, [dispatch]);

  const filterProducts = useCallback((searchTerm: string) => {
    if (!searchTerm) return products;

    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products]);

  const sortProducts = useCallback((productsToSort: Product[], criteria: string) => {
    console.log(`Ordenando ${productsToSort.length} productos por criterio: ${criteria}`);
    switch (criteria) {
      case 'best-seller':
        return [...productsToSort].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      case 'a-z':
        return [...productsToSort].sort((a, b) => a.name.localeCompare(b.name));
      case 'price-high-low':
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case 'price-low-high':
        return [...productsToSort].sort((a, b) => a.price - b.price);
      default:
        return productsToSort;
    }
  }, []);

  return {
    products,
    selectedProduct,
    loading,
    error,
    loadProducts,
    loadProductById,
    filterProducts,
    sortProducts
  };
};

export default useProducts;