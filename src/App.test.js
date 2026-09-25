import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { CartProvider, useCart, makeLineId } from './context/CartContext';
import { filterProducts, filtersFromSearch, matchesCollection } from './lib/filterProducts';

const product = { name: 'Classic Sneakers', img: 'x.jpg', price: 120, company: 'Nike', brand: 'Air Max', type: 'Sneakers' };
const other = { name: 'Desert Boots', img: 'y.jpg', price: 130, company: 'Clarks', brand: 'Originals', type: 'Boots' };

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

beforeEach(() => {
  localStorage.clear();
});

describe('cart context', () => {
  test('adding the same product twice stacks quantity and count stays consistent', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(product));
    act(() => result.current.addItem(other));
    act(() => result.current.addItem(product));

    expect(result.current.items).toHaveLength(2);
    expect(result.current.count).toBe(3);
    expect(result.current.subtotal).toBe(120 * 2 + 130);
    expect(JSON.parse(localStorage.getItem('cart'))).toHaveLength(2);
  });

  test('size and color make distinct lines, remove and quantity updates work', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => result.current.addItem(product, { size: '9 US', color: 'Black' }));
    act(() => result.current.addItem(product, { size: '10 US', color: 'Black' }));
    expect(result.current.items).toHaveLength(2);

    const id = makeLineId(product, '9 US', 'Black');
    act(() => result.current.updateQty(id, 3));
    expect(result.current.count).toBe(4);

    act(() => result.current.removeItem(id));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.count).toBe(1);
  });

  test('migrates the old bare-array cart format', () => {
    localStorage.setItem('cart', JSON.stringify([product, product, other]));
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(2);
    expect(result.current.count).toBe(3);
  });

  test('placing an order empties the cart and records it', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addItem(product));
    let order;
    act(() => {
      order = result.current.placeOrder({
        customer: { name: 'A', email: 'a@b.co', phone: '1234567' },
        shippingAddress: { address: '1 St', city: 'X', state: 'Y', zip: '12345', country: 'US' },
        paymentMethod: { type: 'cod' },
      });
    });
    expect(order.items).toHaveLength(1);
    expect(order.shipping).toBe(0); // over the free-shipping threshold
    expect(result.current.items).toHaveLength(0);
    expect(result.current.orders[0].id).toBe(order.id);
  });
});

describe('product filtering', () => {
  const catalog = [
    { ...product, collectionType: 'Summer Collection', specifications: { availableSizes: { US: [6, 7], UK: [5.5, 6.5] } } },
    { ...other, collectionType: 'Sale 20%', specifications: { availableSizes: { US: [9], UK: [8.5] } } },
    { name: 'Fresh Foam', company: 'New Balance', brand: 'FF', type: 'Sneakers', collectionType: 'New Arrival', specifications: { availableSizes: { US: [8], UK: [7.5] } } },
  ];

  test('collection labels match loosely against the data', () => {
    expect(matchesCollection('New Arrival', 'New Arrivals')).toBe(true);
    expect(matchesCollection('Sale 20%', 'Flash Sale')).toBe(true);
    expect(matchesCollection('Winter Collection', 'Summer Collection')).toBe(false);
  });

  test('search text matches collections as well as names', () => {
    expect(filterProducts(catalog, { name: 'Flash Sale' }).map((p) => p.name)).toEqual(['Desert Boots']);
    expect(filterProducts(catalog, { name: 'new arrivals' }).map((p) => p.name)).toEqual(['Fresh Foam']);
    expect(filterProducts(catalog, { name: 'nike' }).map((p) => p.name)).toEqual(['Classic Sneakers']);
  });

  test('url params are parsed into filters', () => {
    const f = filtersFromSearch('?query=boots&types=Boots,Sneakers&collection=Winter%20Collection&size=9&sizeSystem=us');
    expect(f).toMatchObject({ name: 'boots', types: ['Boots', 'Sneakers'], collection: 'Winter Collection', size: 9, sizeSystem: 'us' });
    expect(filterProducts(catalog, { size: 9, sizeSystem: 'us' }).map((p) => p.name)).toEqual(['Desert Boots']);
  });
});

describe('sorting', () => {
  const { sortProducts } = require('./lib/filterProducts');
  const list = [
    { name: 'B', price: 20, rating: 4.1, totalReviews: 10, totalBought: 5 },
    { name: 'A', price: 10, rating: 4.9, totalReviews: 50, totalBought: 500 },
    { name: 'C', price: 30, rating: 4.9, totalReviews: 80, totalBought: 50 },
  ];
  test('sorts by each option without mutating the input', () => {
    expect(sortProducts(list, 'price-asc').map((p) => p.name)).toEqual(['A', 'B', 'C']);
    expect(sortProducts(list, 'price-desc').map((p) => p.name)).toEqual(['C', 'B', 'A']);
    expect(sortProducts(list, 'rating').map((p) => p.name)).toEqual(['C', 'A', 'B']);
    expect(sortProducts(list, 'popular').map((p) => p.name)).toEqual(['A', 'C', 'B']);
    expect(sortProducts(list, 'name').map((p) => p.name)).toEqual(['A', 'B', 'C']);
    expect(sortProducts(list, 'featured').map((p) => p.name)).toEqual(['B', 'A', 'C']);
    expect(list[0].name).toBe('B');
  });
  test('sort is read from and written to the URL', () => {
    const { filtersFromSearch, searchFromFilters } = require('./lib/filterProducts');
    expect(filtersFromSearch('?sort=price-desc').sort).toBe('price-desc');
    expect(filtersFromSearch('?sort=bogus').sort).toBe('featured');
    expect(searchFromFilters({ ...filtersFromSearch(''), sort: 'rating' })).toBe('sort=rating');
  });
});

describe('wishlist context', () => {
  const { WishlistProvider, useWishlist } = require('./context/WishlistContext');
  const both = ({ children }) => (
    <CartProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </CartProvider>
  );
  test('toggle adds and removes, and resolves products from the catalogue', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper: both });
    act(() => result.current.toggle({ name: 'Classic Sneakers' }));
    act(() => result.current.toggle('Desert Boots'));
    expect(result.current.count).toBe(2);
    expect(result.current.has('Desert Boots')).toBe(true);
    expect(result.current.products.map((p) => p.company)).toEqual(['Nike', 'Clarks']);
    expect(JSON.parse(localStorage.getItem('wishlist'))).toEqual(['Classic Sneakers', 'Desert Boots']);

    act(() => result.current.toggle('Desert Boots'));
    expect(result.current.count).toBe(1);
    act(() => result.current.clear());
    expect(result.current.count).toBe(0);
  });
});
