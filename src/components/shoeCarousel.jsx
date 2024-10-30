import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent } from "./ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
import { useNavigate } from 'react-router-dom'

const shoes = [
  { name: "Running Shoes",image:Running },
  { name: "Sneakers",image:Sneakers },
  { name: "Loafers",image:Loafers },
  { name: "Oxfords",image:Oxfords },
  { name: "High Heels",image:Heels },
  { name: "Sandals",image:Sandals },
  { name: "Boots",image:Boots },
  { name: "Espadrilles",image:Espadrilles },
  { name: "Flip-Flops",image:Flops },
  { name: "Brogues",image:Brogues }
]

export default function CarouselComponent() {
  const [api, setApi] = useState(null);

  const navigate = useNavigate(); 

  const handleClick = (param) => {
    navigate(`./search?query=${param}&type=${param}`);
  }

  const scrollToNext = useCallback(() => {
    if (api) {
      api.scrollNext()
    }
  }, [api])

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToNext()
    }, 7000)

    return () => clearInterval(interval)
  }, [scrollToNext])



  return (
    <div className="w-full py-12 px-6 font-roboto-slab" style={{ backgroundColor: '#eb432f' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Browse Our Shoes</h2>
        <div className="relative">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4" >
              {shoes.map((shoe, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/5">
                  <Card 
                    className="cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => handleClick(shoe.name)}
                  >
                    <CardContent className="p-0">
                      <div className="w-full h-48 bg-gray-200 rounded-t-lg  overflow-hidden flex items-center justify-center">
                        <img src={shoe.image} className="text-gray-500 h-fit w-fit text-lg"></img>
                      </div>
                      <div className="p-4 bg-[#6e36aa] relative rounded-b-lg text-white ">
                        <h3 className="text-lg font-semibold text-center">{shoe.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#9078a9] rounded-full p-2 shadow-md hover:bg-[#8667a6] transition-colors text-white"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </CarouselPrevious>
            <CarouselNext 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#9078a9] rounded-full p-2 shadow-md hover:bg-[#8667a6] transition-colors text-white"
              aria-label="Next slide"
            >
              <ChevronRight stroke='white' className="h-6 w-6 " />
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </div>
  )
}