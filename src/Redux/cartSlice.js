'use client'
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
        state.push({...action.payload, quantity:1});
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.find((item) => item.id === id);

      if (item) {
        item.quantity += 1;
       
      }
    },
    decreaseQuantity: (state, action) => {
        const { id } = action.payload;
        const item = state.find((item) => item.id === id);
  
        if (item ) {
            item.quantity -= 1;
          }
      },
    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart,increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;