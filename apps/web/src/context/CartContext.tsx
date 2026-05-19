import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  productId: string;
  quantity: number;
  spicyLevel?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number, spicyLevel?: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  updateSpicyLevel: (productId: string, spicyLevel: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('satri_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('satri_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (productId: string, quantity: number = 1, spicyLevel: number = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity, spicyLevel }
            : item
        );
      }
      return [...prev, { productId, quantity, spicyLevel }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems(prev => {
      return prev.map(item => {
        if (item.productId === productId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const updateSpicyLevel = (productId: string, spicyLevel: number) => {
    setItems(prev => prev.map(item => 
      item.productId === productId ? { ...item, spicyLevel } : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, updateSpicyLevel, removeFromCart, clearCart, totalItems }}>
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
