import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/authForm.jsx';
import Home from './pages/home.jsx';
import Search from './pages/search.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import Wishlist from './pages/Wishlist.jsx';
import NotFound from './pages/NotFound.jsx';
import Cart from './components/Cart.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
      <Router>
        <Routes>
          <Route path="/signUp" element={<AuthForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:productName" element={<ProductDetails />} />
          {/* Legacy links used the bare product name as the path. */}
          <Route path="/:productName" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Cart />
      </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
