import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Sidebar from '../components/filterSidebar'
import Product from '../components/Product'
import { useLocation } from 'react-router-dom'
const Search = () => {

  const [filterParams,setFilterParams]= useState({
    name:'',
    sizeSystem: 'uk',
    size: 8,
    types: [],
    companies: [],
    collection: ''
  });

  const location = useLocation();
  

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('query') || "";
    setFilterParams({
      ...filterParams,
      name:searchParam
    });
    
  }, [location]);
  // console.log(filterParams,JSON.stringify(filterParams).length)


  return (
    <>
      <Navbar setFilterParams={setFilterParams} />
      <div className='flex flex-row'>
      <Sidebar setFilterParams={setFilterParams} filterParams={filterParams}  />
      <Product  setFilterParams={setFilterParams} filterParams={filterParams} />

      </div>
    </>
  )
}

export default Search
