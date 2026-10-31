
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // Add or remove a product from the wishlist
  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const alreadyExists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return currentWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentWishlist, product];
    });
  };

  // Add a product to the cart
  // If it already exists, increase its quantity
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        { ...product, quantity: 1 },
      ];
    });
  };

  // Update the quantity of a cart item
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Remove an item from the cart
  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  // Empty the entire cart
  const clearCart = () => {
    setCart([]);
  };

  const value = useMemo(
    () => ({
      wishlist,
      cart,
      toggleWishlist,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [wishlist, cart]
  );

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

// Custom hook to access shopping state
export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error(
      'useShop must be used inside a ShopProvider'
    );
  }

  return context;
}
