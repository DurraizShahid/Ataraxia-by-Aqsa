import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Journal } from '@/lib/supabaseData';
import { CartItem } from '@/types/cart';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[]
  itemCount: number
  subtotal: number
  total: number
  addToCart: (journal: Journal, quantity?: number) => void
  removeFromCart: (journalId: string) => void
  updateQuantity: (journalId: string, quantity: number) => void
  clearCart: () => void
  isInCart: (journalId: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('ataraxia_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Save cart to localStorage on every change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ataraxia_cart', JSON.stringify(items));
    }
  }, [items]);

  // Calculate derived values
  const itemCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const total = subtotal;

  const addToCart = (journal: Journal, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item.journalId === journal.id);

      if (existingItem) {
        // Update quantity
        const updatedItems = prevItems.map(item =>
          item.journalId === journal.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast.success(`${quantity} more "${journal.name}" added to cart!`);
        return updatedItems;
      } else {
        // Create new cart item
        const price = journal.onSale && journal.salePrice ? journal.salePrice : journal.price; // Wait, looking at Journal type: has price, regularPrice, salePrice
        const newItem: CartItem = {
          journalId: journal.id,
          title: journal.name,
          price: price,
          regularPrice: journal.regularPrice,
          salePrice: journal.salePrice,
          onSale: journal.onSale,
          quantity: quantity,
          featuredImage: journal.featuredImage,
          format: journal.format
        };
        toast.success(`"${journal.name}" added to cart!`);
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (journalId: string) => {
    setItems((prevItems) => {
      const removedItem = prevItems.find(item => item.journalId === journalId);
      if (removedItem) {
        toast.info(`"${removedItem.title}" removed from cart.`);
      }
      return prevItems.filter(item => item.journalId !== journalId);
    });
  };

  const updateQuantity = (journalId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(journalId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map(item =>
        item.journalId === journalId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared!");
  };

  const isInCart = (journalId: string): boolean => {
    return items.some(item => item.journalId === journalId);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
