import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import productReducer from './Slices/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
