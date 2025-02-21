import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  name: string;
  quantity: number;
  rate: number;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    clearProducts(state) {
      state.products = [];
    },
  },
});

export const { addProduct, clearProducts } = productSlice.actions;
export default productSlice.reducer;
