import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import productInfo from '../assets/productInfo';
import { useCart } from './CartContext';

const WISHLIST_KEY = 'wishlist';

const WishlistContext = createContext(null);

const readWishlist = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(WISHLIST_KEY));
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === 'string') : [];
  } catch {
    return [];
  }
};

// Wishlist stores product names only; the products themselves are resolved
// from the catalogue so the list never holds stale prices or images.
export function WishlistProvider({ children }) {
  const [names, setNames] = useState(readWishlist);
  const { notify } = useCart();

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(names));
  }, [names]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === WISHLIST_KEY) setNames(readWishlist());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const has = useCallback((name) => names.includes(name), [names]);

  const toggle = useCallback(
    (product) => {
      const name = typeof product === 'string' ? product : product?.name;
      if (!name) return;
      setNames((prev) => {
        if (prev.includes(name)) {
          notify(`${name} removed from wishlist`, 'info');
          return prev.filter((n) => n !== name);
        }
        notify(`${name} saved to wishlist`);
        return [...prev, name];
      });
    },
    [notify]
  );

  const remove = useCallback((name) => setNames((prev) => prev.filter((n) => n !== name)), []);
  const clear = useCallback(() => setNames([]), []);

  const products = useMemo(
    () => names.map((n) => productInfo.find((p) => p.name === n)).filter(Boolean),
    [names]
  );

  const value = useMemo(
    () => ({ names, products, count: names.length, has, toggle, remove, clear }),
    [names, products, has, toggle, remove, clear]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside a <WishlistProvider>');
  return ctx;
}
