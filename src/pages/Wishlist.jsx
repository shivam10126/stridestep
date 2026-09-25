import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Navbar from '../components/navbar';
import ProductCard from '../components/ui/ProductCard';
import { Button } from '../components/ui/button';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { products, count, clear } = useWishlist();
  const { addItem } = useCart();

  const addAll = () => products.forEach((p) => addItem(p));

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 font-roboto-slab text-gray-900">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-[#eb432f] flex items-center gap-3">
            <Heart className="w-8 h-8 text-[#6e36aa] fill-[#6e36aa]" /> Wishlist
            <span className="text-lg font-normal text-gray-500">
              ({count} {count === 1 ? 'item' : 'items'})
            </span>
          </h1>
          {count > 0 && (
            <div className="flex gap-3">
              <Button className="bg-[#6e36aa] hover:bg-[#5b2b8f] text-white" onClick={addAll}>
                <ShoppingCart className="w-4 h-4 mr-2" /> Add all to cart
              </Button>
              <Button variant="outline" className="border-[#eb432f] text-[#eb432f] hover:bg-[#eb432f] hover:text-white" onClick={clear}>
                <Trash2 className="w-4 h-4 mr-2" /> Clear
              </Button>
            </div>
          )}
        </div>

        {count === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-[#6e36aa] mx-auto mb-4" />
            <p className="text-lg text-gray-600 mb-2">Your wishlist is empty.</p>
            <p className="text-gray-500 mb-6">Tap the heart on any shoe to save it here for later.</p>
            <Link to="/search" className="bg-[#eb432f] hover:bg-[#d13a2b] text-white font-bold px-6 py-3 rounded-md transition-colors">
              Browse shoes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] justify-items-center gap-x-4 gap-y-8 py-3">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
