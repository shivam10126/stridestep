import React, { useEffect, useState } from 'react'
import { Slider } from "./ui/slider"
import { Checkbox } from "./ui/checkbox"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Badge } from "./ui/badge"
import { ScrollArea } from "./ui/scroll-area"
import { X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Sidebar({setFilterParams,filterParams}) {
  
  const [filterChange, setFilterChange] = useState(filterParams)
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const searchParam = params.get('query');
  //   setFilterParams({
  //     ...filterChange,
  //     name:searchParam
  //   });
  //   console.log(searchParam)
    
  // }, [location]);


  

  useEffect(()=>{
    setFilterParams(filterChange)
    // console.log(filterChange)
  },[filterChange] );

  // useEffect(()=>{
  //   if(JSON.stringify(filterParams))
  //   if(JSON.stringify(filterParams)===JSON.stringify(filterChange))
  //     return;
  //   setFilterChange(filterParams)
    
  // },[filterParams] );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    const collection = params.get('collection');
    if (type) {
        if (filterChange.types.includes(type)===false)
            filterChange.types.push(type);
    }
    if (collection) {
        filterChange.collection=collection;
    }
  }, [location]);

  const handleSizeSystemChange = (value) => {
    const newSize = value === 'uk' ? Math.round(filterChange.size - 0.5) : Math.round(filterChange.size + 0.5)
    setFilterChange(prev => ({
      ...prev,
      sizeSystem: value,
      size: newSize
    }))
  }

  const handleSizeChange = (value) => {
    setFilterChange(prev => ({
      ...prev,
      size: value[0]
    }))
  }

  const handleTypeChange = (type) => {
    setFilterChange(prev => {
      const updatedTypes = prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
      return {
        ...prev,
        types: updatedTypes
      }
    })
  }

  const handleCompanyChange = (company) => {
    setFilterChange(prev => {
      const updatedCompanies = prev.companies.includes(company)
        ? prev.companies.filter(c => c !== company)
        : [...prev.companies, company]
      return {
        ...prev,
        companies: updatedCompanies
      }
    })
  }

  const handleCollectionChange = (value) => {
    setFilterChange(prev => ({
      ...prev,
      collection: value
    }))
  }

  const resetFilters = () => {
    setFilterChange({
      sizeSystem: 'uk',
      size: 8,
      types: [],
      companies: [],
      collection: '',
      name:''
    })
    navigate("")
  }

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const searchParam = params.get('query');
    
    
  // }, [location]);

  const removeFilter = (type, value) => {
    setFilterChange(prev => {
      switch (type) {
        case 'size':
          return { ...prev, size: 8 }
        case 'type':
          return { ...prev, types: prev.types.filter(t => t !== value) }
        case 'company':
          return { ...prev, companies: prev.companies.filter(c => c !== value) }
        case 'collection':
          return { ...prev, collection: '' }
        default:
          return prev
      }
    })
  }


  const createQueryString = (params) => {
    const query = new URLSearchParams();
    console.log("params",params)

    if (params.size) query.set('size', params.size);
    if (params.name) query.set('query', params.name);
    if (params.sizeSystem) query.set('sizeSystem', params.sizeSystem);
    if (params.types.length) query.set('types', params.types.join(','));
    if (params.companies.length) query.set('companies', params.companies.join(','));
    if (params.collection) query.set('collection', params.collection);

    return query.toString();
  }

  const applyFilters = () => {
    const queryString = createQueryString(filterChange);
    const productUrl =location.pathname+'?'+queryString
    console.log(filterChange)
    navigate(productUrl,{state: filterChange});
  }

  // console.log(location)

  const shoeTypes = ['Running Shoes', 'Sneakers', 'Loafers', 'Oxfords', 'High Heels', 'Sandals', 'Boots', 'Espadrilles', 'Flip-Flops', 'Brogues']
  const shoeCompanies = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Converse', 'Vans', 'Clarks', 'Timberland', 'New Balance', 'Skechers']
  const collections = ['New Arrivals', 'Summer Collection', 'Winter Collection', 'Flash Sale']

  return (
    <aside className="w-[24rem]  mr-4 h-[92vh]  font-roboto-slab bg-[#eb432f] text-white shadow-md flex flex-col">
      <div className="p-4 flex justify-between items-center border-b border-white/20 bg-[#6e36aa]">
        <h2 className="font-bold text-xl">Filters</h2>
      </div>
      <ScrollArea className="flex-grow " style={{ '--scrollbar-thumb': '#6e36aa', '--scrollbar-track': 'rgba(255, 255, 255, 0.1)' }}>
        <div className="p-4 space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-3">Shoe Size</h3>
            <RadioGroup value={filterChange.sizeSystem} onValueChange={handleSizeSystemChange} className="flex space-x-4 mb-2">
              <div className="flex items-center mb-2 space-x-2">
                <RadioGroupItem value="uk" id="uk-size" className="border-white text-white" />
                <Label htmlFor="uk-size">UK</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="us" id="us-size" className="border-white text-white" />
                <Label htmlFor="us-size">US</Label>
              </div>
            </RadioGroup>
            <Slider
              min={filterChange.sizeSystem === 'uk' ? 3 : 4}
              max={filterChange.sizeSystem === 'uk' ? 13 : 14}
              step={0.5}
              value={[filterChange.size]}
              onValueChange={handleSizeChange}
              aria-label={`Shoe size (${filterChange.sizeSystem.toUpperCase()})`}
              className="[&_[role=slider]]:bg-[#6e36aa]"
            />
            <p className="text-sm mt-2">Selected size: {filterChange.size} {filterChange.sizeSystem.toUpperCase()}</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="shoe-type" className="border-white/20">
              <AccordionTrigger className="hover:no-underline text-lg">Shoe Type</AccordionTrigger>
              <AccordionContent>
                {shoeTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2 mb-4">
                    <Checkbox
                      id={`type-${type}`}
                      checked={filterChange.types.includes(type)}
                      onCheckedChange={() => handleTypeChange(type)}
                      className="border-white data-[state=checked]:bg-[#6e36aa] data-[state=checked]:border-[#6e36aa]"
                    />
                    <Label htmlFor={`type-${type}`} className='cursor-pointer'>{type}</Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="company-name" className="border-white/20">
              <AccordionTrigger className="hover:no-underline text-lg">Company Name</AccordionTrigger>
              <AccordionContent>
                {shoeCompanies.map((company) => (
                  <div key={company} className="flex items-center space-x-2 mb-4">
                    <Checkbox
                      id={`company-${company}`}
                      checked={filterChange.companies.includes(company)}
                      onCheckedChange={() => handleCompanyChange(company)}
                      className="border-white data-[state=checked]:bg-[#6e36aa] data-[state=checked]:border-[#6e36aa]"
                    />
                    <Label htmlFor={`company-${company}`}>{company}</Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="collection" className="border-white/20">
              <AccordionTrigger className="hover:no-underline text-lg">
                Collection
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup value={filterChange.collection} onValueChange={handleCollectionChange}>
                  {collections.map((col) => (
                    <div key={col} className="flex items-center space-x-2 mb-4">
                      <RadioGroupItem value={col} id={`collection-${col}`} className="border-white text-white" />
                      <Label htmlFor={`collection-${col}`}>{col}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div>
            <h3 className="font-semibold mb-2">Active Filters</h3>
            <div className="flex flex-wrap  gap-x-1 gap-y-1">
              {filterChange.size !== 8 && (
                <Badge variant="secondary" className="bg-[#6e36aa] mx-auto transition-colors duration-100 hover:bg-[#6722b0] text-white">
                  Size: {filterChange.size} {filterChange.sizeSystem.toUpperCase()}
                  <Button variant="ghost" size="sm" onClick={() => removeFilter('size')} aria-label="Remove size filter" className="text-white hover:text-[#eb7568] p-0 hover:bg-transparent ml-3">
                    <X className="h-4 w-4 cursor-pointer hover:bg-transparent" />
                  </Button>
                </Badge>
              )}
              {filterChange.types.map((type) => (
                <Badge key={type} variant="secondary" className="bg-[#6e36aa] transition-colors duration-100 hover:bg-[#6722b0] text-white">
                  {type}
                  <Button variant="ghost" size="sm" onClick={() => removeFilter('type', type)} aria-label={`Remove ${type} filter`} className="text-white hover:text-[#eb7568] p-0 hover:bg-transparent ml-3">
                    <X className="h-4 w-4 cursor-pointer" />
                  </Button>
                </Badge>
              ))}
              {filterChange.companies.map((company) => (
                <Badge key={company} variant="secondary" className="bg-[#6e36aa] transition-colors duration-100 hover:bg-[#6722b0] text-white">
                  {company}
                  <Button variant="ghost" size="sm" onClick={() => removeFilter('company', company)} aria-label={`Remove ${company} filter`} className="text-white hover:text-[#eb7568] p-0 hover:bg-transparent ml-3">
                    <X className="h-4 w-4 cursor-pointer" />
                  </Button>
                </Badge>
              ))}
              {filterChange.collection && (
                <Badge variant="secondary" className="bg-[#6e36aa] transition-colors duration-100 hover:bg-[#6722b0] text-white">
                  {filterChange.collection}
                  <Button variant="ghost" size="sm" onClick={() => removeFilter('collection')} aria-label="Remove collection filter" className="text-white hover:text-[#eb7568] p-0 hover:bg-transparent ml-3">
                    <X className="h-4 w-4 cursor-pointer" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>
          <Button className="w-full mt-auto bg-[#6e36aa] hover:bg-[#6e36aa]/80 text-white" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button className="w-full mt-auto bg-[#6e36aa] hover:bg-[#6e36aa]/80 text-white" onClick={resetFilters}>Reset All Filters</Button>
        </div>
      </ScrollArea>
    </aside>
  )
}