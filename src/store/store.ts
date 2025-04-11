import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import paymentReducer from './slices/paymentSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    payment: paymentReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;