"use client"

import React, { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Star, ChevronLeft,MoveLeftIcon, ShoppingCart, Plus, Minus } from 'lucide-react'
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const ProductDetail = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const { product } = location.state || {}; 
  const { query } = location.state || ""; 
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [reviews, setReviews] = useState(product.reviews)
  const [newReview, setNewReview] = useState({ name: '', rating: 0, review: '' })
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [sizeSystem, setSizeSystem] = useState('US')
  // console.log('link',query);

  

  const handleAddReview = (e) => {
    e.preventDefault()
    if (newReview.name && newReview.rating && newReview.review) {
      setReviews([...reviews, newReview])
      setNewReview({ name: '', rating: 0, review: '' })
      setShowReviewForm(false)
    }
  }



  if (!product) {
    return <div>Product not found!</div>;
  }
  return (
    <div className="container font-roboto-slab w-[80%] mx-auto px-4 py-8">
      <div className='absolute top-20 bg-main-1 w-fit border cursor-pointer hover:bg-main-1/90 border-slate-600 px-4 py-2 rounded-lg text-white left-10 transition-all duration-200 flex gap-x-3' onClick={()=>Navigate(`${query}`)}>
       <MoveLeftIcon />
      </div>
      <div className="grid md:grid-cols-2 gap-8">
      <div className="relative">
          <Carousel className="w-full ">
            <CarouselContent>
              {product.carousel.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square">
                    <img
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-[40rem] object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
        <div>
          <h1 className="text-3xl text-main-2 font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-[#6e36aa] mb-4">{product.company} {product.brand}</p>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-main-2 fill-main-2'
                      : 'text-main-1 stroke-main-1'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              ({product.totalReviews} reviews)
            </span>
          </div>
          <p className="text-2xl text-main-2 font-bold mb-4">${product.price}</p>
          <p className="mb-4 text-main-1">{product.totalBought} bought</p>
          <p className="mb-4 text-main-2"> <span className='text-main-1'>Type:</span> {product.type}</p>
          <p className="mb-4 text-main-2"><span className='text-main-1'>Collection:</span> {product.collectionType}</p>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-main-1">Select Size:</h3>
              <Select value={sizeSystem} onValueChange={(value) => setSizeSystem(value)}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Size system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US" className="text-main-2">US</SelectItem>
                  <SelectItem value="UK" className="text-main-2">UK</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <RadioGroup value={selectedSize?.toString()} onValueChange={(value) => setSelectedSize(Number(value))}>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {product.specifications.availableSizes[sizeSystem].map((size) => (
                  <div key={size}>
                    <RadioGroupItem value={size.toString()} id={`size-${size}`} className="peer sr-only" />
                    <Label
                      htmlFor={`size-${size}`}
                      className="flex items-center text-white  justify-center rounded-md border-2 border-main-2 bg-main-2 p-2 hover:bg-main-1 cursor-pointer peer-data-[state=checked]:border-[#eb432f] peer-data-[state=checked]:bg-[#6e36aa] peer-data-[state=checked]:text-white transition-all"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-main-1 mb-2">Select Color:</h3>
            <RadioGroup value={selectedColor || ''} onValueChange={setSelectedColor}>
              <div className="flex flex-wrap gap-2">
                {product.specifications.colorOptions.map((color) => (
                  <div key={color.name}>
                    <RadioGroupItem value={color.name} id={`color-${color.name}`} className="peer sr-only" />
                    <Label
                      htmlFor={`color-${color.name}`}
                      className="flex items-center justify-center rounded-md border-2 border-main-2 bg-main-2 p-2 hover:bg-main-1 text-white peer-data-[state=checked]:border-[#eb432f] peer-data-[state=checked]:bg-[#6e36aa] peer-data-[state=checked]:text-primary-foreground transition-all"
                    >
                      <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color.hex }}></span>
                      {color.name}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <Button className="w-full bg-[#6e36aa] hover:bg-[#5305a7] transition-colors duration-100 mb-4">
            <ShoppingCart className="mr-2  h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>

      <Accordion type="single" collapsible className="mt-8">
        <AccordionItem value="specifications" >
          <AccordionTrigger className="bg-main-1 px-7 text-white">Specifications</AccordionTrigger>
          <AccordionContent className="bg-main-2 px-6 text-white py-4">
            <ul className="list-disc pl-5 space-y-2">
              <li>Weight: {product.specifications.weight}</li>
              <li>Material: {product.specifications.material}</li>
              <li>Dimensions: {product.specifications.dimensions}</li>
              <li>Care Instructions: {product.specifications.careInstructions}</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping" className="">
          <AccordionTrigger className="bg-main-1 px-7 text-white">Shipping Information</AccordionTrigger>
          <AccordionContent className="bg-main-2  px-6 text-white py-4">
            <ul className="list-disc pl-5 space-y-2">
              <li>{product.shippingInfo.shippingCost}</li>
              <li>Estimated Delivery: {product.shippingInfo.estimatedDelivery}</li>
              <li>{product.shippingInfo.returnPolicy}</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq">
          <AccordionTrigger className="bg-main-1 px-7 text-white">FAQ</AccordionTrigger>
          <AccordionContent className="bg-main-2  px-6 text-white py-4" >
            {product.faq.map((item, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold">{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-main-2 font-bold">Customer Reviews</h2>
          <Button className="bg-main-2 hover:bg-[#e81902]" onClick={() => setShowReviewForm(!showReviewForm)}>
            {showReviewForm ? (
              <>
                <Minus className="mr-2 h-4 w-4" /> Hide Review Form
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add Review
              </>
            )}
          </Button>
        </div>
        
        {showReviewForm && (
          <Card className="mb-8 bg-main-2 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Write a Review</h3>
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="ml-2">Name</Label>
                  <Input
                    id="name"
                    value={newReview.name}
                    className="bg-transparent mt-1"
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rating" className="ml-2">Rating</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        type="button"
                        variant={newReview.rating >= rating ? 'default' : 'outline'}
                        size="sm"
                        className="bg-main-1 mt-1 hover:text-white hover:bg-[#5302a9]"
                        onClick={() => setNewReview({ ...newReview, rating })}
                      >
                        <Star className={newReview.rating >= rating ? 'fill-white' : ''} />
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="review" className="ml-2">Review</Label>
                  <Textarea
                    id="review"
                    value={newReview.review}
                    className="bg-transparent mt-1"
                    onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="bg-main-1 hover:bg-[#5202a7]">Submit Review</Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-main-1 text-white">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <span className="font-semibold mr-2">{review.name}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-main-2 fill-main-2' : 'text-white stroke-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p>{review.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
