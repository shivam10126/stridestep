import React, { useState } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import Slider from 'react-slick';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const saved = has(product.name);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname + location.search;

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 800,
    arrows: false,
  };

  const renderStars = (rating) =>
    Array(5)
      .fill()
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ));

  const openDetails = () => {
    navigate(`/product/${encodeURIComponent(product.name)}`, { state: { product, from } });
  };

  const addToCart = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1600);
    addItem(product);
  };

  return (
    <div
      className="w-[17rem] min-h-[30rem] hover:h-fit hover:z-auto border-2 border-[#6e36aa] rounded-lg shadow-lg bg-[#eb432f] text-white font-roboto-slab transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-t-[6px] bg-white relative">
        {isHovered ? (
          <Slider {...settings}>
            {product.carousel.map((image, index) => (
              <div key={index} className="w-full h-52 flex rounded-t-[6px] justify-center align-middle">
                <img
                  src={image}
                  alt={`${product.company} shoe ${index + 1}`}
                  className="w-full rounded-t-[6px] h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <img src={product.img} alt={product.name} className="w-full h-52 rounded-t-[6px] object-cover" />
        )}
        <div className="absolute top-0 right-0 bg-[#6e36aa] text-white text-xs font-bold px-2 py-1 m-2 rounded">
          {product.collectionType}
        </div>
        <button
          type="button"
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          onClick={() => toggle(product)}
          className="absolute top-0 left-0 m-2 p-1.5 rounded-full bg-white/90 shadow hover:scale-110 transition-transform"
        >
          <Heart className={`w-5 h-5 ${saved ? 'text-[#eb432f] fill-[#eb432f]' : 'text-[#6e36aa]'}`} />
        </button>
      </div>
      <div>
        <div className="bg-[#6e36aa] px-6 py-4">
          <button
            type="button"
            className={`font-bold text-left text-xl ${
              isHovered ? 'underline cursor-pointer underline-offset-2' : 'whitespace-nowrap overflow-hidden'
            } w-[14rem] mb-2`}
            onClick={openDetails}
          >
            {product.name}
          </button>
          <p className="text-white text-base mb-2">
            {product.company} - {product.brand}
          </p>
        </div>
        <div className="px-6 py-4">
          <p className="text-white text-sm mb-2">{product.type}</p>
          <div className="flex items-center mb-2">
            <div className="flex mr-2">{renderStars(product.rating)}</div>
            <span className="text-white text-sm">
              {product.rating} ({product.totalReviews} reviews)
            </span>
          </div>
          <p className="text-white text-sm mb-4">{product.totalBought} sold</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-white">${product.price}</span>
            {animate ? (
              <button
                type="button"
                aria-label="Adding to cart"
                className="bg-[#6e36aa] w-[141.26px] h-[40px] hover:bg-[#5902b6] text-white font-bold py-2 px-4 rounded-full flex items-center overflow-hidden transition-colors duration-300"
              >
                <ShoppingCart className="w-4 h-4 animate-move-right mr-auto" />
              </button>
            ) : (
              <button
                type="button"
                className="bg-[#6e36aa] hover:bg-[#5902b6] text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-300"
                onClick={addToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
