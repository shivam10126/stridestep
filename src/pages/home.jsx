import React from 'react'
import  Navbar from "../components/navbar"
import HeroSection from '../components/heroSection'
import CarouselComponent from "../components/shoeCarousel"
import ShoeCollections from "../components/saleCards";
import NewsLetter from '../components/newLetter';
import Footer from '../components/Footer';


const home = () => {
  return (
    <>
<Navbar />
<HeroSection />
<CarouselComponent />
<ShoeCollections />
<NewsLetter />
<Footer />
    </>
  )
}

export default home
