'use client';

import React, { createContext, useContext, useState } from 'react';

// Create the CartContext
const CartContext = createContext();

// CartProvider to wrap your application and provide cart state
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // If item exists, update its quantity
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      // Add new item to the cart
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== itemId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  return useContext(CartContext);
}
