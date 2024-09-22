"use client"

import React from 'react'
import Slider from 'react-slick'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

import Sneakers from "../assets/Sneakers.jpg"
import Running from "../assets/Running Shoes.jpg"
import Loafers from "../assets/Loafers.jpg"
import Oxfords from "../assets/Oxfords.jpg"
import Heels from "../assets/Heels.jpg"
import Sandals from "../assets/Sandals.jpg"
import Boots from "../assets/Boots.jpg"
import Espadrilles from "../assets/Espadrilles.jpg"
import Flops from "../assets/Flops.jpg"
import Brogues from "../assets/Brogues.jpg"

import summer1 from "../assets/summer1.jpg"
import summer2 from "../assets/summer2.jpg"
import summer3 from "../assets/summer3.jpg"
import summer4 from "../assets/summer4.jpg"

import winter1 from "../assets/winter1.jpg"
import winter2 from "../assets/winter2.jpg"
import winter3 from "../assets/winter3.jpg"
import winter4 from "../assets/winter4.jpg"

// Import slick carousel styles
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Placeholder images (replace with your actual shoe images)
const placeholderImages1 = [Sneakers,Running,Loafers,Oxfords]
const placeholderImages2 = [summer1,summer2,summer3,summer4]
const placeholderImages3 = [winter1,winter2,winter3,winter4]
const placeholderImages4 = [Boots,Espadrilles,Flops,Brogues,Heels,Sandals]

const Collection = ({ title, images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  }

  return (
    <Card className="w-full max-w-sm mx-auto bg-[#eb432f] border-4 border-[#6e36aa] font-roboto-slab">
      <CardHeader style={{background:'#6e36aa', color:"white"}} classname='bg-[#6e36aa] text-white'>
        <CardTitle >{title}</CardTitle>
      </CardHeader>
      <CardContent style={{padding:0}}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="w-full h-64 flex justify-center align-middle">
              <img
                src={image}
                alt={`${title} shoe ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </CardContent>
    </Card>
  )
}

export default function ShoeCollections() {
  const collections = [
    { title: "New Arrivals", images: placeholderImages1 },
    { title: "Summer Collection", images: placeholderImages2 },
    { title: "Winter Collection", images: placeholderImages3 },
    { title: "Flash Sale", images: placeholderImages4 },
  ]

  return (
    <div className="container mx-auto py-8 px-8 bg-[#ee2e19]">
      <h1 className="text-3xl font-bold text-center mb-8 font-roboto-slab text-[white]">Stride Step Collections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {collections.map((collection, index) => (
          <Collection key={index} title={collection.title} images={collection.images} />
        ))}
      </div>
    </div>
  )
}