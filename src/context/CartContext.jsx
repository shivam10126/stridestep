import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const CART_KEY = 'cart';
const ORDERS_KEY = 'orders';

const CartContext = createContext(null);

// Builds a stable id so the same shoe in the same size/color stacks as one line.
export const makeLineId = (product, size, color) =>
  `${product.name}|${size ?? ''}|${color ?? ''}`;

// Older versions of the app stored a bare array of product objects with no quantity
// (one entry per click). Convert that to the line-item format used here.
const normaliseStored = (raw) => {
  if (!Array.isArray(raw)) return [];
  const lines = new Map();
  raw.forEach((entry) => {
    if (!entry || !entry.name) return;
    const size = entry.size ?? null;
    const color = entry.color ?? null;
    const id = entry.id || makeLineId(entry, size, color);
    const existing = lines.get(id);
    const qty = Number(entry.qty) > 0 ? Number(entry.qty) : 1;
    if (existing) {
      existing.qty += qty;
    } else {
      lines.set(id, {
        id,
        name: entry.name,
        img: entry.img,
        price: Number(entry.price) || 0,
        company: entry.company || '',
        brand: entry.brand || '',
        type: entry.type || '',
        size,
        color,
        qty,
      });
    }
  });
  return Array.from(lines.values());
};

const readCart = () => {
  try {
    return normaliseStored(JSON.parse(localStorage.getItem(CART_KEY)));
  } catch {
    return [];
  }
};

const readOrders = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(ORDERS_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const FREE_SHIPPING_THRESHOLD = 50;
export const SHIPPING_FEE = 5.99;
export const TAX_RATE = 0.08;
export const PROMO_CODES = { WELCOME10: 0.1 };

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);
  const [orders, setOrders] = useState(readOrders);
  const [notice, setNotice] = useState(null);
  const noticeTimer = useRef(null);

  // Persist whenever the cart changes.
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  // Keep multiple open tabs in sync.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === CART_KEY) setItems(readCart());
      if (e.key === ORDERS_KEY) setOrders(readOrders());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const notify = useCallback((message, tone = 'success') => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    setNotice({ message, tone, at: Date.now() });
    noticeTimer.current = setTimeout(() => setNotice(null), 2200);
  }, []);

  useEffect(() => () => noticeTimer.current && clearTimeout(noticeTimer.current), []);

  const addItem = useCallback((product, { size = null, color = null, qty = 1 } = {}) => {
    const id = makeLineId(product, size, color);
    setItems((prev) => {
      const idx = prev.findIndex((l) => l.id === id);
      if (idx === -1) {
        return [
          ...prev,
          {
            id,
            name: product.name,
            img: product.img,
            price: Number(product.price) || 0,
            company: product.company || '',
            brand: product.brand || '',
            type: product.type || '',
            size,
            color,
            qty,
          },
        ];
      }
      const next = [...prev];
      next[idx] = { ...next[idx], qty: next[idx].qty + qty };
      return next;
    });
    notify(`${product.name} added to cart`);
  }, [notify]);

  const removeItem = useCallback((id) => {
    setItems((prev) => {
      const line = prev.find((l) => l.id === id);
      if (line) notify(`${line.name} removed from cart`, 'info');
      return prev.filter((l) => l.id !== id);
    });
  }, [notify]);

  const updateQty = useCallback((id, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((l) => l.id !== id);
      return prev.map((l) => (l.id === id ? { ...l, qty } : l));
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totals = useMemo(() => {
    const count = items.reduce((n, l) => n + l.qty, 0);
    const subtotal = items.reduce((sum, l) => sum + l.price * l.qty, 0);
    return { count, subtotal };
  }, [items]);

  const placeOrder = useCallback((details) => {
    const { subtotal } = totals;
    const discount = details.promo ? subtotal * (PROMO_CODES[details.promo] || 0) : 0;
    const shipping = subtotal - discount >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
    const tax = (subtotal - discount) * TAX_RATE;
    const total = subtotal - discount + shipping + tax;
    const order = {
      id: `SS-${Date.now().toString(36).toUpperCase()}`,
      placedAt: new Date().toISOString(),
      status: 'Processing',
      items,
      subtotal,
      discount,
      shipping,
      tax,
      total,
      promo: details.promo || null,
      customer: details.customer,
      shippingAddress: details.shippingAddress,
      paymentMethod: details.paymentMethod,
    };
    setOrders((prev) => [order, ...prev]);
    setItems([]);
    return order;
  }, [items, totals]);

  const value = useMemo(
    () => ({
      items,
      orders,
      count: totals.count,
      subtotal: totals.subtotal,
      notice,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      placeOrder,
      notify,
    }),
    [items, orders, totals, notice, addItem, removeItem, updateQty, clearCart, placeOrder, notify]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside a <CartProvider>');
  }
  return ctx;
}

export const formatPrice = (n) => `$${(Number(n) || 0).toFixed(2)}`;
