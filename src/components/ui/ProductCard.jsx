import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import Slider from 'react-slick';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ProductCard({setItemCount, product, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [cart, setCart] = useState([]); // Initialize cart state
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.pathname;
  


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

  const renderStars = (rating) => {
    return Array(5).fill().map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleClick = () => {
    const productUrl = `/${product.name}?company=${product.company}&brand=${product.brand}&type=${product.type}`;
    navigate(productUrl, { state: { product ,query:query}});
  };

  const addToCart = () => {
    // Animate the button
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1600);

    // Add product to the cart
    const updatedCart = [...cart, product];
    setItemCount(updatedCart.length)
    // console.log(updatedCart.length)

    // Update state and localStorage
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div
      className="w-[17rem] min-h-[30rem] hover:h-fit hover:z-auto border-2 border-[#6e36aa]  rounded-lg shadow-lg bg-[#eb432f] text-white font-roboto-slab transition-all  duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
      index={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-t-[6px] bg-white">
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
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-52 rounded-t-[6px] object-cover"
          />
        )}
        <div className="absolute top-0 right-0 bg-[#6e36aa] text-white text-xs font-bold px-2 py-1 m-2 rounded">
          {product.collectionType}
        </div>
      </div>
      <div>
        <div className="bg-[#6e36aa] px-6 py-4">
          <div
            className={`font-bold  text-xl ${isHovered ? ' underline cursor-pointer underline-offset-2' : 'whitespace-nowrap overflow-hidden'} w-[14rem] mb-2`}
            onClick={handleClick}
          >
            {product.name}
          </div>
          <p className="text-white text-base mb-2">
            {product.company} - {product.brand}
          </p>
        </div>
        <div className="px-6 py-4">
          <p className="text-white text-sm mb-2">{product.type}</p>
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {renderStars(product.rating)}
            </div>
            <span className="text-white text-sm">{product.rating} ({product.totalReviews} reviews)</span>
          </div>
          <p className="text-white text-sm mb-4">
            {product.totalBought} sold
          </p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-white">${product.price}</span>
            {animate ? (
              <button className="bg-[#6e36aa] w-[141.26px] h-[40px] hover:bg-[#5902b6] text-white font-bold py-2 px-4 rounded-full flex items-center overflow-hidden transition-colors duration-300">
                <ShoppingCart className="w-4 h-4 animate-move-right mr-auto" />
              </button>
            ) : (
              <button className="bg-[#6e36aa] hover:bg-[#5902b6] text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-300" onClick={addToCart}>
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
