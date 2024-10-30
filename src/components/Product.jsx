import React, { useEffect, useState } from 'react'
import ProductCard from './ui/ProductCard'
import SorryPage from './SorryPage'
import Cart from './Cart'

import productInfo from "../assets/productInfo"
import { useLocation } from 'react-router-dom'


const Product = ({filterParams,setFilterParams}) => {

    const [products,setProducts] = useState(productInfo);
    const[itemCount,setItemCount] = useState(0);
    const location = useLocation();
    console.log("location",location);


const filterProducts = (products, filterChange) => {
  if(JSON.stringify(filterChange).length<84){
    return products;
  }
  return products.filter(product => {
    // console.log(filterChange)
    // Filter by type if types filter is set (if types is empty, return all)
    const typeMatch = filterChange.types.length === 0 || filterChange.types.includes(product.type);
    // Filter by type if types filter is set (if types is empty, return all)
    const nameMatch = filterChange.name === '' || 
    product.name.toLowerCase().includes(filterChange.name.toLowerCase()) ||
    product.company.toLowerCase().includes(filterChange.name.toLowerCase()) ||
    product.brand.toLowerCase().includes(filterChange.name.toLowerCase()) ||
    product.type.toLowerCase().includes(filterChange.name.toLowerCase());

    // Filter by company if companies filter is set (if companies is empty, return all)
    const companyMatch = filterChange.companies.length === 0 || filterChange.companies.includes(product.company);

    // Filter by collection if the collection filter is set (if collection is empty, return all)
    const collectionMatch = !filterChange.collection || product.collectionType.includes(filterChange.collection);

    const sizeMatch = true; // Placeholder for actual size matching logic

    // Return true if all filter conditions match
    return typeMatch && companyMatch && collectionMatch && sizeMatch && nameMatch;
  });
};



    useEffect(()=>{
      const filteredProducts = filterProducts(productInfo,filterParams);
      // console.log(filteredProducts)
      setProducts(filteredProducts);
      
    },[filterParams])

      
      
      
  return (
    <>
    
    {products.length>0 ?
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full mt-4 h-[87vh] justify-around py-3 px-2 gap-x-4 gap-y-8 overflow-y-scroll'>
      {products.map((product, index) => (
                <ProductCard setItemCount={setItemCount} key={index} product={product} index={index} />
            ))}
      </div>
      :
      <div className='flex align-middle justify-center items-center w-full'>
      <SorryPage setFilterParams={setFilterParams} />
      </div>
    }
    <Cart Count={itemCount} />
    
    </>
  )
}

export default Product
