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

const shoes = [
  { name: "Sneakers", image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3" },
  { name: "Loafers", image: "https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc" },
  { name: "Oxfords", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4" },
  { name: "High Heels", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2" },
  { name: "Sandals", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306" },
  { name: "Boots", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f" },
  { name: "Espadrilles", image: "https://images.unsplash.com/photo-1560343776-97e7d202ff0e" },
  { name: "Flip-Flops", image: "https://images.unsplash.com/photo-1603487742165-fb7a447573f6" },
  { name: "Brogues", image: "https://images.unsplash.com/photo-1614252234498-45fd4a0aa157" },
  { name: "Running Shoes", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a" }
]

export default function CarouselComponent() {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [visibleItems, setVisibleItems] = useState(5)

  const scrollToNext = useCallback(() => {
    if (api) {
      api.scrollNext()
    }
  }, [api])

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [scrollToNext])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3)
      } else {
        setVisibleItems(5)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleClick = (name) => {
    // console.log(name)
  }

  return (
    <div className="w-full py-12" style={{ backgroundColor: '#eb432f' }}>
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
            <CarouselContent>
              {shoes.map((shoe, index) => (
                <CarouselItem key={index} className={`pl-4 ${
                  visibleItems === 1 ? 'basis-full' : 
                  visibleItems === 3 ? 'basis-1/3' : 
                  'basis-1/5'
                }`}>
                  <Card 
                    className="cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => handleClick(shoe.name)}
                  >
                    <CardContent className="p-0">
                      <img src={shoe.image} alt={shoe.name} className="w-full h-48 object-cover" />
                      <div className="p-4 bg-white">
                        <h3 className="text-lg font-semibold text-center">{shoe.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75">
              <ChevronLeft className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75">
              <ChevronRight className="h-6 w-6" />
            </CarouselNext>
          </Carousel>
          <div className="py-2 text-center text-sm text-white">
            Slide {current} of {count}
          </div>
        </div>
      </div>
    </div>
  )
}