import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: "https://imgix.bustle.com/uploads/image/2020/6/1/c3acd77b-4e10-4d40-b8d0-a24b499349ba-shoes.png?w=400&h=300&fit=crop&crop=focalpoint&q=50&dpr=2&fp-x=0.47137150466045274&fp-y=0.4652777777777778",
    heading: "Step into Comfort with Stride Step",
    subheading: "Your Journey Begins with the Perfect Fit"
  },
  {
    image: "https://images.unsplash.com/photo-1695073621086-aa692bc32a3d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmlrZSUyMHNob2V8ZW58MHx8MHx8fDA%3D",
    heading: "Flash Sale!",
    subheading: "Up to 50% Off on Selected Styles"
  },
  {
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?cs=srgb&dl=pexels-mnzoutfits-1598505.jpg&fm=jpg",
    heading: "New Winter Collection",
    subheading: "Stay Warm and Stylish This Season"
  },
  {
    image: "https://wallpapercave.com/wp/wp9637105.jpg",
    heading: "Free Delivery",
    subheading: "On Orders Over ₹5000"
  }
];

function Button({ className, onClick, children }) {
  return (
    <button
      className={`${className} px-4 py-2 rounded-full`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[92vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: '#eb432f' }}>
              {slide.heading}
            </h1>
            <p className="text-xl md:text-2xl mb-8" style={{ color: '#9e92aa' }}>
              {slide.subheading}
            </p>
            <Button 
              className="text-white bg-[#d13a2b] px-8 py-3 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
              onClick={() => console.log('Shop Now clicked')}
            >
              Shop Now
            </Button>
          </div>
        </div>
      ))}
      <Button
        className="absolute rounded-sm top-1/2 left-4 transform -translate-y-1/2 bg-transparent hover:bg-white/10 text-white/50 focus:outline-none"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </Button>
      <Button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent hover:bg-white/10 text-white/50 focus:outline-none"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </Button>
    </div>
  );
}