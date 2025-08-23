import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WooCommerceProduct } from '@/lib/woocommerce';
import { toast } from 'sonner';

interface CartItem extends WooCommerceProduct {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: WooCommerceProduct, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initialize cart from localStorage
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('ataraxia_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('ataraxia_cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product: WooCommerceProduct, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
        toast.success(`${quantity} more "${product.name}" added to cart!`);
        return updatedItems;
      } else {
        toast.success(`"${product.name}" added to cart!`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => {
      const removedItem = prevItems.find(item => item.id === productId);
      if (removedItem) {
        toast.info(`"${removedItem.name}" removed from cart.`);
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart cleared!");
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.sale_price || item.price);
    return total + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};