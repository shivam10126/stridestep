import nikeAIRMax from "./nikeAIRMax.jpg"
import nikeAIRMax1 from "./nikeAIRMax1.jpg"
import nikeAIRMax2 from "./nikeAIRMax2.jpg"
import nikeAIRMax3 from "./nikeAIRMax3.jpg"
import nikeAIRMax4 from "./nikeAIRMax4.jpg"

import addidasUltra from "./addidasUltra.jpg"
import addidasUltra1 from "./addidasUltra1.jpg"
import addidasUltra2 from "./addidasUltra2.jpg"
import addidasUltra3 from "./addidasUltra3.jpg"
import addidasUltra4 from "./addidasUltra4.jpg"

import RSXSneakers from "./RS-XSneakers.jpg"
import RSXSneakers1 from "./RSXSneakers1.jpg"
import RSXSneakers2 from "./RSXSneakers2.jpg"
import RSXSneakers3 from "./RSXSneakers3.jpg"
import RSXSneakers4 from "./RSXSneakers4.jpg"

import reebokLeather from "./reebokLeather.jpg"
import reebokLeather1 from "./reebokLeather1.jpg"
import reebokLeather2 from "./reebokLeather2.jpg"
import reebokLeather3 from "./reebokLeather3.jpg"
import reebokLeather4 from "./reebokLeather4.jpg"

import converse from "./converse.jpeg"
import converse1 from "./converse1.jpeg"
import converse2 from "./converse2.jpeg"
import converse3 from "./converse3.jpeg"
import converse4 from "./converse4.jpeg"

import sneakersVans from "./SneakersVans.jpg"
import sneakersVans1 from "./SneakersVans1.jpg"
import sneakersVans2 from "./SneakersVans2.jpg"
import sneakersVans3 from "./SneakersVans3.jpg"
import sneakersVans4 from "./SneakersVans4.jpg"

import clarkDesertBoots from "./clarkDesertBoots.jpeg"
import clarkDesertBoots1 from "./clarkDesertBoots1.jpeg"
import clarkDesertBoots2 from "./clarkDesertBoots2.jpeg"
import clarkDesertBoots3 from "./clarkDesertBoots3.jpeg"
import clarkDesertBoots4 from "./clarkDesertBoots4.jpeg"

import TimberlandBoots from "./TimberlandBoots.jpg"
import TimberlandBoots1 from "./TimberlandBoots1.jpg"
import TimberlandBoots2 from "./TimberlandBoots2.jpg"
import TimberlandBoots3 from "./TimberlandBoots3.jpg"
import TimberlandBoots4 from "./TimberlandBoots4.jpg"

import FreshFoamSneakers from "./FreshFoamSneakers.jpg"
import FreshFoamSneakers1 from "./FreshFoamSneakers1.jpg"
import FreshFoamSneakers2 from "./FreshFoamSneakers2.jpg"
import FreshFoamSneakers3 from "./FreshFoamSneakers3.jpg"
import FreshFoamSneakers4 from "./FreshFoamSneakers4.jpg"

import GoWalkMax from "./GoWalkMax.jpg"
import GoWalkMax1 from "./GoWalkMax1.jpg"
import GoWalkMax2 from "./GoWalkMax2.jpg"
import GoWalkMax3 from "./GoWalkMax3.jpg"
import GoWalkMax4 from "./GoWalkMax4.jpg"

const products = [
    {
      "name": "Classic Sneakers",
      "img":nikeAIRMax,
      "carousel":[nikeAIRMax,nikeAIRMax1,nikeAIRMax2,nikeAIRMax3,nikeAIRMax4],
      "company": "Nike",
      "brand": "Air Max",
      "type": "Sneakers",
      "rating": 4.5,
      "totalBought": 1500,
      "totalReviews": 320,
      "collectionType": "Summer Collection",
      "price": 120,
       reviews: [
      {
        name: "John Doe",
        rating: 5,
        review: "Super comfortable and stylish! Perfect for casual wear."
      },
      {
        name: "Jane Smith",
        rating: 4,
        review: "Great shoes, but I wish they had more color options."
      },
      {
        name: "Alex Johnson",
        rating: 3,
        review: "Good shoes, but the sole started wearing out after a few months."
      },
      {
        name: "Lily Brown",
        rating: 5,
        review: "Love these shoes! Lightweight and fashionable. Definitely recommend!"
      }
    ],
    specifications: {
      weight: "1.2 lbs",
      material: "Synthetic Leather",
      colorOptions: [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Red", hex: "#FF0000" }
      ],
      availableSizes: {
        US: [6, 7, 8, 9, 10, 11],
        UK: [5.5, 6.5, 7.5, 8.5, 9.5, 10.5]
      },
      dimensions: "12 x 8 x 4 inches",
      careInstructions: "Hand wash with mild detergent, air dry"
    },
    shippingInfo: {
      shippingCost: "Free shipping on orders over $50",
      estimatedDelivery: "3-5 business days",
      returnPolicy: "30-day returns with free shipping"
    },
    faq: [
      {
        question: "Are these shoes true to size?",
        answer: "Yes, these shoes fit true to size, but we recommend ordering half a size up for wider feet."
      },
      {
        question: "Can I use these shoes for running?",
        answer: "While designed for casual wear, they provide decent support for light jogging."
      },
      {
        question: "What is the best way to clean these shoes?",
        answer: "We recommend hand washing with a mild detergent and air drying to avoid damage."
      },
      {
        question: "Do these shoes come in half sizes?",
        answer: "Yes, these sneakers are available in half sizes for both US and UK sizing."
      },
      {
        question: "Are they suitable for people with flat feet?",
        answer: "These shoes provide moderate arch support, but those with flat feet might need additional insoles."
      }
    ]
  },
    {
      "name": "Ultra Boost Running Shoes",
      "company": "Adidas",
      "img":addidasUltra,
      "carousel":[addidasUltra,addidasUltra1,addidasUltra2,addidasUltra3,addidasUltra4],
      "brand": "Ultraboost",
      "type": "Running Shoes",
      "rating": 4.7,
      "totalBought": 1800,
      "totalReviews": 400,
      "collectionType": "New Arrival",
      "price": 150,
       reviews: [
      {
        name: "John Doe",
        rating: 5,
        review: "Super comfortable and stylish! Perfect for casual wear."
      },
      {
        name: "Jane Smith",
        rating: 4,
        review: "Great shoes, but I wish they had more color options."
      },
      {
        name: "Alex Johnson",
        rating: 3,
        review: "Good shoes, but the sole started wearing out after a few months."
      },
      {
        name: "Lily Brown",
        rating: 5,
        review: "Love these shoes! Lightweight and fashionable. Definitely recommend!"
      }
    ],
    specifications: {
      weight: "1.2 lbs",
      material: "Synthetic Leather",
      colorOptions: [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Red", hex: "#FF0000" }
      ],
      availableSizes: {
        US: [6, 7, 8, 9, 10, 11],
        UK: [5.5, 6.5, 7.5, 8.5, 9.5, 10.5]
      },
      dimensions: "12 x 8 x 4 inches",
      careInstructions: "Hand wash with mild detergent, air dry"
    },
    shippingInfo: {
      shippingCost: "Free shipping on orders over $50",
      estimatedDelivery: "3-5 business days",
      returnPolicy: "30-day returns with free shipping"
    },
    faq: [
      {
        question: "Are these shoes true to size?",
        answer: "Yes, these shoes fit true to size, but we recommend ordering half a size up for wider feet."
      },
      {
        question: "Can I use these shoes for running?",
        answer: "While designed for casual wear, they provide decent support for light jogging."
      },
      {
        question: "What is the best way to clean these shoes?",
        answer: "We recommend hand washing with a mild detergent and air drying to avoid damage."
      },
      {
        question: "Do these shoes come in half sizes?",
        answer: "Yes, these sneakers are available in half sizes for both US and UK sizing."
      },
      {
        question: "Are they suitable for people with flat feet?",
        answer: "These shoes provide moderate arch support, but those with flat feet might need additional insoles."
      }
    ]
  },
    {
      "name": "RS-X Sneakers",
      "company": "Puma",
      "img":RSXSneakers,
      "carousel":[RSXSneakers,RSXSneakers1,RSXSneakers2,RSXSneakers3,RSXSneakers4],
      "brand": "RS-X",
      "type": "Sneakers",
      "rating": 4.4,
      "totalBought": 1200,
      "totalReviews": 280,
      "collectionType": "Sale 20%",
      "price": 110,
       reviews: [
      {
        name: "John Doe",
        rating: 5,
        review: "Super comfortable and stylish! Perfect for casual wear."
      },
      {
        name: "Jane Smith",
        rating: 4,
        review: "Great shoes, but I wish they had more color options."
      },
      {
        name: "Alex Johnson",
        rating: 3,
        review: "Good shoes, but the sole started wearing out after a few months."
      },
      {
        name: "Lily Brown",
        rating: 5,
        review: "Love these shoes! Lightweight and fashionable. Definitely recommend!"
      }
    ],
    specifications: {
      weight: "1.2 lbs",
      material: "Synthetic Leather",
      colorOptions: [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Red", hex: "#FF0000" }
      ],
      availableSizes: {
        US: [6, 7, 8, 9, 10, 11],
        UK: [5.5, 6.5, 7.5, 8.5, 9.5, 10.5]
      },
      dimensions: "12 x 8 x 4 inches",
      careInstructions: "Hand wash with mild detergent, air dry"
    },
    shippingInfo: {
      shippingCost: "Free shipping on orders over $50",
      estimatedDelivery: "3-5 business days",
      returnPolicy: "30-day returns with free shipping"
    },
    faq: [
      {
        question: "Are these shoes true to size?",
        answer: "Yes, these shoes fit true to size, but we recommend ordering half a size up for wider feet."
      },
      {
        question: "Can I use these shoes for running?",
        answer: "While designed for casual wear, they provide decent support for light jogging."
      },
      {
        question: "What is the best way to clean these shoes?",
        answer: "We recommend hand washing with a mild detergent and air drying to avoid damage."
      },
      {
        question: "Do these shoes come in half sizes?",
        answer: "Yes, these sneakers are available in half sizes for both US and UK sizing."
      },
      {
        question: "Are they suitable for people with flat feet?",
        answer: "These shoes provide moderate arch support, but those with flat feet might need additional insoles."
      }
    ]
  },
    {
      "name": "Classic Leather Shoes",
      "company": "Reebok",
      "img":reebokLeather,
      "carousel":[reebokLeather,reebokLeather1,reebokLeather2,reebokLeather3,reebokLeather4],
      "brand": "Classic",
      "type": "Loafers",
      "rating": 4.6,
      "totalBought": 1000,
      "totalReviews": 220,
      "collectionType": "Winter Collection",
      "price": 130,
       reviews: [
      {
        name: "John Doe",
        rating: 5,
        review: "Super comfortable and stylish! Perfect for casual wear."
      },
      {
        name: "Jane Smith",
        rating: 4,
        review: "Great shoes, but I wish they had more color options."
      },
      {
        name: "Alex Johnson",
        rating: 3,
        review: "Good shoes, but the sole started wearing out after a few months."
      },
      {
        name: "Lily Brown",
        rating: 5,
        review: "Love these shoes! Lightweight and fashionable. Definitely recommend!"
      }
    ],
    specifications: {
      weight: "1.2 lbs",
      material: "Synthetic Leather",
      colorOptions: [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Red", hex: "#FF0000" }
      ],
      availableSizes: {
        US: [6, 7, 8, 9, 10, 11],
        UK: [5.5, 6.5, 7.5, 8.5, 9.5, 10.5]
      },
      dimensions: "12 x 8 x 4 inches",
      careInstructions: "Hand wash with mild detergent, air dry"
    },
    shippingInfo: {
      shippingCost: "Free shipping on orders over $50",
      estimatedDelivery: "3-5 business days",
      returnPolicy: "30-day returns with free shipping"
    },
    faq: [
      {
        question: "Are these shoes true to size?",
        answer: "Yes, these shoes fit true to size, but we recommend ordering half a size up for wider feet."
      },
      {
        question: "Can I use these shoes for running?",
        answer: "While designed for casual wear, they provide decent support for light jogging."
      },
      {
        question: "What is the best way to clean these shoes?",
        answer: "We recommend hand washing with a mild detergent and air drying to avoid damage."
      },
      {
        question: "Do these shoes come in half sizes?",
        answer: "Yes, these sneakers are available in half sizes for both US and UK sizing."
      },
      {
        question: "Are they suitable for people with flat feet?",
        answer: "These shoes provide moderate arch support, but those with flat feet might need additional insoles."
      }
    ]
  },
    {
      "name": "Chuck Taylor All Star",
      "company": "Converse",
      "img":converse,
      "carousel":[converse,converse1,converse2,converse3,converse4],
      "brand": "All Star",
      "type": "Sneakers",
      "rating": 4.8,
      "totalBought": 2500,
      "totalReviews": 600,
      "collectionType": "New Arrival",
      "price": 85,
       reviews: [
      {
        name: "John Doe",
        rating: 5,
        review: "Super comfortable and stylish! Perfect for casual wear."
      },
      {
        name: "Jane Smith",
        rating: 4,
        review: "Great shoes, but I wish they had more color options."
      },
      {
        name: "Alex Johnson",
        rating: 3,
        review: "Good shoes, but the sole started wearing out after a few months."
      },
      {
        name: "Lily Brown",
        rating: 5,
        review: "Love these shoes! Lightweight and fashionable. Definitely recommend!"
      }
    ],
    specifications: {
      weight: "1.2 lbs",
      material: "Synthetic Leather",
      colorOptions: [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Red", hex: "#FF0000" }
      ],
      availableSizes: {
        US: [6, 7, 8, 9, 10, 11],
        UK: [5.5, 6.5, 7.5, 8.5, 9.5, 10.5]
      },
      dimensions: "12 x 8 x 4 inches",
      careInstructions: "Hand wash with mild detergent, air dry"
    },
    shippingInfo: {
      shippingCost: "Free shipping on orders over $50",
      estimatedDelivery: "3-5 business days",
      returnPolicy: "30-day returns with free shipping"
    },
    faq: [
      {
        question: "Are these shoes true to size?",
        answer: "Yes, these shoes fit true to size, but we recommend ordering half a size up for wider feet."
      },
      {
        question: "Can I use these shoes for running?",
        answer: "While designed for casual wear, they provide decent support for light jogging."
      },
      {
        question: "What is the best way to clean these shoes?",
        answer: "We recommend hand washing with a mild detergent and air drying to avoid damage."
      },
      {
        question: "Do these shoes come in half sizes?",
        answer: "Yes, these sneakers are available in half sizes for both US and UK sizing."
      },
      {
        question: "Are they suitable for people with flat feet?",
        answer: "These shoes provide moderate arch support, but those with flat feet might need additional insoles."
      }
    ]
  },
    {
      "name": "Old Skool Sneakers",
      "company": "Vans",
      "img": sneakersVans,
      "carousel":[sneakersVans,sneakersVans1,sneakersVans2,sneakersVans3,sneakersVans4],
      "brand": "Old Skool",
      "type": "Sneakers",
      "rating": 4.5,
      "totalBought": 1400,
      "totalReviews": 320,
      "collectionType": "Sale 15%",
      "price": 70,
       reviews: [
      {
        name: "John Doe",
        rating: 5,
        review: "Super comfortable and stylish! Perfect for casual wear."
      },
      {
        name: "Jane Smith",
        rating: 4,
        review: "Great shoes, but I wish they had more color options."
      },
      {
        name: "Alex Johnson",
        rating: 3,
        review: "Good shoes, but the sole started wearing out after a few months."
      },
      {
        name: "Lily Brown",
        rating: 5,
        review: "Love these shoes! Lightweight and fashionable. Definitely recommend!"
      }
    ],
    specifications: {
      weight: "1.2 lbs",
      material: "Synthetic Leather",
      colorOptions: [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Red", hex: "#FF0000" }
      ],
      availableSizes: {
        US: [6, 7, 8, 9, 10, 11],
        UK: [5.5, 6.5, 7.5, 8.5, 9.5, 10.5]
      },
      dimensions: "12 x 8 x 4 inches",
      careInstructions: "Hand wash with mild detergent, air dry"
    },
    shippingInfo: {
      shippingCost: "Free shipping on orders over $50",
      estimatedDelivery: "3-5 business days",
      returnPolicy: "30-day returns with free shipping"
    },
    faq: [
      {
        question: "Are these shoes true to size?",
        answer: "Yes, these shoes fit true to size, but we recommend ordering half a size up for wider feet."
      },
      {
        question: "Can I use these shoes for running?",
        answer: "While designed for casual wear, they provide decent support for light jogging."
      },
      {
        question: "What is the best way to clean these shoes?",
        answer: "We recommend hand washing with a mild detergent and air drying to avoid damage."
      },
      {
        question: "Do these shoes come in half sizes?",
        answer: "Yes, these sneakers are available in half sizes for both US and UK sizing."
      },
      {
        question: "Are they suitable for people with flat feet?",
        answer: "These shoes provide moderate arch support, but those with flat feet might need additional insoles."
      }
    ]
  },
    {
      "name": "Desert Boots",
      "company": "Clarks",
      "img": clarkDesertBoots,
      "carousel":[clarkDesertBoots,clarkDesertBoots1,clarkDesertBoots2,clarkDesertBoots3,clarkDesertBoots4],
      "brand": "Desert Boot",
      "type": "Boots",
      "rating": 4.7,
      "totalBought": 900,
      "totalReviews": 200,
      "collectionType": "Winter Collection",
      "price": 150,
       reviews: [
      {
        name: "John Doe",
        rating: 5,
        review: "Super comfortable and stylish! Perfect for casual wear."
      },
      {
        name: "Jane Smith",
        rating: 4,
        review: "Great shoes, but I wish they had more color options."
      },
      {
        name: "Alex Johnson",
        rating: 3,
        review: "Good shoes, but the sole started wearing out after a few months."
      },
      {
        name: "Lily Brown",
        rating: 5,
        review: "Love these shoes! Lightweight and fashionable. Definitely recommend!"
      }
    ],
    specifications: {
      weight: "1.2 lbs",
      material: "Synthetic Leather",
      colorOptions: [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Red", hex: "#FF0000" }
      ],
      availableSizes: {
        US: [6, 7, 8, 9, 10, 11],
        UK: [5.5, 6.5, 7.5, 8.5, 9.5, 10.5]
      },
      dimensions: "12 x 8 x 4 inches",
      careInstructions: "Hand wash with mild detergent, air dry"
    },
    shippingInfo: {
      shippingCost: "Free shipping on orders over $50",
      estimatedDelivery: "3-5 business days",
      returnPolicy: "30-day returns with free shipping"
    },
    faq: [
      {
        question: "Are these shoes true to size?",
        answer: "Yes, these shoes fit true to size, but we recommend ordering half a size up for wider feet."
      },
      {
        question: "Can I use these shoes for running?",
        answer: "While designed for casual wear, they provide decent support for light jogging."
      },
      {
        question: "What is the best way to clean these shoes?",
        answer: "We recommend hand washing with a mild detergent and air drying to avoid damage."
      },
      {
        question: "Do these shoes come in half sizes?",
        answer: "Yes, these sneakers are available in half sizes for both US and UK sizing."
      },
      {
        question: "Are they suitable for people with flat feet?",
        answer: "These shoes provide moderate arch support, but those with flat feet might need additional insoles."
      }
    ]
  },
    {
      "name": "Premium Timberland Boots",
      "company": "Timberland",
      "brand": "Premium",
      "img": TimberlandBoots,
      "carousel":[TimberlandBoots,TimberlandBoots1,TimberlandBoots2,TimberlandBoots3,TimberlandBoots4],
      "type": "Boots",
      "rating": 4.9,
      "totalBought": 3000,
      "totalReviews": 700,
      "collectionType": "Winter Collection",
      "price": 180,
       reviews: [
      {
        name: "John Doe",
        rating: 5,
        review: "Super comfortable and stylish! Perfect for casual wear."
      },
      {
        name: "Jane Smith",
        rating: 4,
        review: "Great shoes, but I wish they had more color options."
      },
      {
        name: "Alex Johnson",
        rating: 3,
        review: "Good shoes, but the sole started wearing out after a few months."
      },
      {
        name: "Lily Brown",
        rating: 5,
        review: "Love these shoes! Lightweight and fashionable. Definitely recommend!"
      }
    ],
    specifications: {
      weight: "1.2 lbs",
      material: "Synthetic Leather",
      colorOptions: [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Red", hex: "#FF0000" }
      ],
      availableSizes: {
        US: [6, 7, 8, 9, 10, 11],
        UK: [5.5, 6.5, 7.5, 8.5, 9.5, 10.5]
      },
      dimensions: "12 x 8 x 4 inches",
      careInstructions: "Hand wash with mild detergent, air dry"
    },
    shippingInfo: {
      shippingCost: "Free shipping on orders over $50",
      estimatedDelivery: "3-5 business days",
      returnPolicy: "30-day returns with free shipping"
    },
    faq: [
      {
        question: "Are these shoes true to size?",
        answer: "Yes, these shoes fit true to size, but we recommend ordering half a size up for wider feet."
      },
      {
        question: "Can I use these shoes for running?",
        answer: "While designed for casual wear, they provide decent support for light jogging."
      },
      {
        question: "What is the best way to clean these shoes?",
        answer: "We recommend hand washing with a mild detergent and air drying to avoid damage."
      },
      {
        question: "Do these shoes come in half sizes?",
        answer: "Yes, these sneakers are available in half sizes for both US and UK sizing."
      },
      {
        question: "Are they suitable for people with flat feet?",
        answer: "These shoes provide moderate arch support, but those with flat feet might need additional insoles."
      }
    ]
  },
    {
      "name": "Fresh Foam Sneakers",
      "company": "New Balance",
      "img": FreshFoamSneakers,
      "carousel":[FreshFoamSneakers,FreshFoamSneakers1,FreshFoamSneakers2,FreshFoamSneakers3,FreshFoamSneakers4],
      "brand": "Fresh Foam",
      "type": "Running Shoes",
      "rating": 4.6,
      "totalBought": 1700,
      "totalReviews": 380,
      "collectionType": "New Arrival",
      "price": 130,
       reviews: [
      {
        name: "John Doe",
        rating: 5,
        review: "Super comfortable and stylish! Perfect for casual wear."
      },
      {
        name: "Jane Smith",
        rating: 4,
        review: "Great shoes, but I wish they had more color options."
      },
      {
        name: "Alex Johnson",
        rating: 3,
        review: "Good shoes, but the sole started wearing out after a few months."
      },
      {
        name: "Lily Brown",
        rating: 5,
        review: "Love these shoes! Lightweight and fashionable. Definitely recommend!"
      }
    ],
    specifications: {
      weight: "1.2 lbs",
      material: "Synthetic Leather",
      colorOptions: [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Red", hex: "#FF0000" }
      ],
      availableSizes: {
        US: [6, 7, 8, 9, 10, 11],
        UK: [5.5, 6.5, 7.5, 8.5, 9.5, 10.5]
      },
      dimensions: "12 x 8 x 4 inches",
      careInstructions: "Hand wash with mild detergent, air dry"
    },
    shippingInfo: {
      shippingCost: "Free shipping on orders over $50",
      estimatedDelivery: "3-5 business days",
      returnPolicy: "30-day returns with free shipping"
    },
    faq: [
      {
        question: "Are these shoes true to size?",
        answer: "Yes, these shoes fit true to size, but we recommend ordering half a size up for wider feet."
      },
      {
        question: "Can I use these shoes for running?",
        answer: "While designed for casual wear, they provide decent support for light jogging."
      },
      {
        question: "What is the best way to clean these shoes?",
        answer: "We recommend hand washing with a mild detergent and air drying to avoid damage."
      },
      {
        question: "Do these shoes come in half sizes?",
        answer: "Yes, these sneakers are available in half sizes for both US and UK sizing."
      },
      {
        question: "Are they suitable for people with flat feet?",
        answer: "These shoes provide moderate arch support, but those with flat feet might need additional insoles."
      }
    ]
  },
    {
      "name": "Go Walk Max",
      "company": "Skechers",
      "img": GoWalkMax,
      "carousel":[GoWalkMax,GoWalkMax1,GoWalkMax2,GoWalkMax3,GoWalkMax4],
      "brand": "Go Walk",
      "type": "Walking Shoes",
      "rating": 4.3,
      "totalBought": 2200,
      "totalReviews": 500,
      "collectionType": "Sale 25%",
      "price": 75,
       reviews: [
      {
        name: "John Doe",
        rating: 5,
        review: "Super comfortable and stylish! Perfect for casual wear."
      },
      {
        name: "Jane Smith",
        rating: 4,
        review: "Great shoes, but I wish they had more color options."
      },
      {
        name: "Alex Johnson",
        rating: 3,
        review: "Good shoes, but the sole started wearing out after a few months."
      },
      {
        name: "Lily Brown",
        rating: 5,
        review: "Love these shoes! Lightweight and fashionable. Definitely recommend!"
      }
    ],
    specifications: {
      weight: "1.2 lbs",
      material: "Synthetic Leather",
      colorOptions: [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Red", hex: "#FF0000" }
      ],
      availableSizes: {
        US: [6, 7, 8, 9, 10, 11],
        UK: [5.5, 6.5, 7.5, 8.5, 9.5, 10.5]
      },
      dimensions: "12 x 8 x 4 inches",
      careInstructions: "Hand wash with mild detergent, air dry"
    },
    shippingInfo: {
      shippingCost: "Free shipping on orders over $50",
      estimatedDelivery: "3-5 business days",
      returnPolicy: "30-day returns with free shipping"
    },
    faq: [
      {
        question: "Are these shoes true to size?",
        answer: "Yes, these shoes fit true to size, but we recommend ordering half a size up for wider feet."
      },
      {
        question: "Can I use these shoes for running?",
        answer: "While designed for casual wear, they provide decent support for light jogging."
      },
      {
        question: "What is the best way to clean these shoes?",
        answer: "We recommend hand washing with a mild detergent and air drying to avoid damage."
      },
      {
        question: "Do these shoes come in half sizes?",
        answer: "Yes, these sneakers are available in half sizes for both US and UK sizing."
      },
      {
        question: "Are they suitable for people with flat feet?",
        answer: "These shoes provide moderate arch support, but those with flat feet might need additional insoles."
      }
    ]
  },
  ];

  export default products;