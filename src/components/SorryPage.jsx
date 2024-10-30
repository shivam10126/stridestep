import React, { useState, useEffect } from 'react'
import { ShoppingBag, RefreshCw, Sliders, Smile } from "lucide-react"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"

const jokes = [
  "Looks like your perfect shoes are playing hide and seek. Let's make the search easier!",
  "Our products seem to be on a coffee break. Want to wake them up with broader filters?",
  "Oops! The items you're after are doing a disappearing act. Let's try a different magic word!",
  "It appears your dream products are socially distancing. Let's bring them closer with adjusted filters!",
  "Houston, we have a problem finding those items. Shall we explore a different galaxy of products?"
]

const tips = [
  "Try using more general keywords in your search",
  "Remove some filters to see more results",
  "Check for any typos in your search terms",
  "Explore different categories that might have similar items",
  "Consider alternative products that might meet your needs"
]

export default function SorryPage({setFilterParams}) {
  const [joke, setJoke] = useState(jokes[0])
  const [tip, setTip] = useState(tips[0])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          getNewJoke()
          return 0
        }
        return Math.min(oldProgress + 10, 100)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getNewJoke = () => {
    const newJoke = jokes[Math.floor(Math.random() * jokes.length)]
    setJoke(newJoke)
    setTip(tips[Math.floor(Math.random() * tips.length)])
  }

  return (
    <div className="flex font-roboto-slab w-full mt-5 h-min flex-col items-center justify-center p-8 text-center  max-w-3xl mx-auto">
      <div className="animate-bounce">
        <Smile className="w-24 h-24 text-[#6e36aa] mb-6" />
      </div>
      <h2 className="text-3xl font-bold text-[#eb432f] mb-4">Whoopsie-daisy!</h2>
      <p className="text-xl text-[#eb432f] mb-6">{joke}</p>
      <div className="bg-[#6e36aa] p-4 rounded-md shadow-md mb-6 w-full">
        <h3 className="text-xl font-semibold text-white mb-2">Helpful Tip:</h3>
        <p className="text-white">{tip}</p>
      </div>
      <Progress value={progress}  className="w-full mb-6" />
      <div className="flex flex-wrap justify-center gap-4">
        <Button variant="default" className="bg-[#eb432f] hover:bg-[#6e36aa] text-white" onClick={() => window.location.href = '/search'}>
          <ShoppingBag className="w-4 h-4 mr-2" />
          Browse All Products
        </Button>
        
          <Button variant="secondary" className="bg-[#6e36aa] hover:bg-[#eb432f] text-white" onClick={() => {setFilterParams({
    sizeSystem: 'uk',
    size: 8,
    types: [],
    companies: [],
    collection: ''
  })}}>
            <Sliders className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
      </div>
    </div>
  )
}