import React, { useEffect, useState } from 'react';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_FILTERS, searchFromFilters } from '../lib/filterProducts';

export default function Sidebar({ setFilterParams, filterParams, open = false, onClose }) {
  const [filterChange, setFilterChange] = useState(filterParams);
  const location = useLocation();
  const navigate = useNavigate();

  // Local edits apply live to the product grid.
  useEffect(() => {
    setFilterParams(filterChange);
  }, [filterChange, setFilterParams]);

  // When the URL (and therefore filterParams) changes from outside, adopt it.
  useEffect(() => {
    setFilterChange((prev) => (JSON.stringify(prev) === JSON.stringify(filterParams) ? prev : filterParams));
  }, [filterParams]);

  const handleSizeSystemChange = (value) => {
    setFilterChange((prev) => {
      if (prev.sizeSystem === value) return prev;
      const newSize = value === 'uk' ? prev.size - 0.5 : prev.size + 0.5;
      return { ...prev, sizeSystem: value, size: newSize };
    });
  };

  const handleSizeChange = (value) => {
    setFilterChange((prev) => ({ ...prev, size: value[0] }));
  };

  const handleTypeChange = (type) => {
    setFilterChange((prev) => {
      const updatedTypes = prev.types.includes(type) ? prev.types.filter((t) => t !== type) : [...prev.types, type];
      return { ...prev, types: updatedTypes };
    });
  };

  const handleCompanyChange = (company) => {
    setFilterChange((prev) => {
      const updatedCompanies = prev.companies.includes(company)
        ? prev.companies.filter((c) => c !== company)
        : [...prev.companies, company];
      return { ...prev, companies: updatedCompanies };
    });
  };

  const handleCollectionChange = (value) => {
    setFilterChange((prev) => ({ ...prev, collection: value }));
  };

  const resetFilters = () => {
    setFilterChange({ ...DEFAULT_FILTERS });
    navigate(location.pathname);
    onClose?.();
  };

  const removeFilter = (type, value) => {
    setFilterChange((prev) => {
      switch (type) {
        case 'size':
          return { ...prev, size: DEFAULT_FILTERS.size };
        case 'type':
          return { ...prev, types: prev.types.filter((t) => t !== value) };
        case 'company':
          return { ...prev, companies: prev.companies.filter((c) => c !== value) };
        case 'collection':
          return { ...prev, collection: '' };
        case 'name':
          return { ...prev, name: '' };
        default:
          return prev;
      }
    });
  };

  const applyFilters = () => {
    const queryString = searchFromFilters(filterChange);
    navigate(queryString ? `${location.pathname}?${queryString}` : location.pathname);
    onClose?.();
  };

  const shoeTypes = [
    'Running Shoes',
    'Sneakers',
    'Loafers',
    'Oxfords',
    'High Heels',
    'Sandals',
    'Boots',
    'Espadrilles',
    'Flip-Flops',
    'Brogues',
  ];
  const shoeCompanies = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Converse', 'Vans', 'Clarks', 'Timberland', 'New Balance', 'Skechers'];
  const collections = ['New Arrivals', 'Summer Collection', 'Winter Collection', 'Flash Sale'];

  const badgeClass = 'bg-[#6e36aa] transition-colors duration-100 hover:bg-[#6722b0] text-white';
  const badgeBtnClass = 'text-white hover:text-[#eb7568] p-0 hover:bg-transparent ml-3';

  return (
    <aside
      aria-label="Product filters"
      className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[24rem] h-full transform transition-transform duration-300 ease-in-out ${
        open ? 'translate-x-0' : '-translate-x-full'
      } md:static md:translate-x-0 md:w-[24rem] md:h-[92vh] md:mr-4 md:flex-shrink-0 font-roboto-slab bg-[#eb432f] text-white shadow-md flex flex-col`}
    >
      <div className="p-4 flex justify-between items-center border-b border-white/20 bg-[#6e36aa]">
        <h2 className="font-bold text-xl">Filters</h2>
        <button
          type="button"
          aria-label="Close filters"
          onClick={onClose}
          className="md:hidden p-1 rounded hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <ScrollArea
        className="flex-grow"
        style={{ '--scrollbar-thumb': '#6e36aa', '--scrollbar-track': 'rgba(255, 255, 255, 0.1)' }}
      >
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
            <p className="text-sm mt-2">
              Selected size: {filterChange.size} {filterChange.sizeSystem.toUpperCase()}
            </p>
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
                    <Label htmlFor={`type-${type}`} className="cursor-pointer">
                      {type}
                    </Label>
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
                    <Label htmlFor={`company-${company}`} className="cursor-pointer">
                      {company}
                    </Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="collection" className="border-white/20">
              <AccordionTrigger className="hover:no-underline text-lg">Collection</AccordionTrigger>
              <AccordionContent>
                <RadioGroup value={filterChange.collection} onValueChange={handleCollectionChange}>
                  {collections.map((col) => (
                    <div key={col} className="flex items-center space-x-2 mb-4">
                      <RadioGroupItem value={col} id={`collection-${col}`} className="border-white text-white" />
                      <Label htmlFor={`collection-${col}`} className="cursor-pointer">
                        {col}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div>
            <h3 className="font-semibold mb-2">Active Filters</h3>
            <div className="flex flex-wrap gap-x-1 gap-y-1">
              {filterChange.name && (
                <Badge variant="secondary" className={badgeClass}>
                  Search: {filterChange.name}
                  <Button variant="ghost" size="sm" onClick={() => removeFilter('name')} aria-label="Clear search text" className={badgeBtnClass}>
                    <X className="h-4 w-4 cursor-pointer" />
                  </Button>
                </Badge>
              )}
              {filterChange.size !== DEFAULT_FILTERS.size && (
                <Badge variant="secondary" className={badgeClass}>
                  Size: {filterChange.size} {filterChange.sizeSystem.toUpperCase()}
                  <Button variant="ghost" size="sm" onClick={() => removeFilter('size')} aria-label="Remove size filter" className={badgeBtnClass}>
                    <X className="h-4 w-4 cursor-pointer" />
                  </Button>
                </Badge>
              )}
              {filterChange.types.map((type) => (
                <Badge key={type} variant="secondary" className={badgeClass}>
                  {type}
                  <Button variant="ghost" size="sm" onClick={() => removeFilter('type', type)} aria-label={`Remove ${type} filter`} className={badgeBtnClass}>
                    <X className="h-4 w-4 cursor-pointer" />
                  </Button>
                </Badge>
              ))}
              {filterChange.companies.map((company) => (
                <Badge key={company} variant="secondary" className={badgeClass}>
                  {company}
                  <Button variant="ghost" size="sm" onClick={() => removeFilter('company', company)} aria-label={`Remove ${company} filter`} className={badgeBtnClass}>
                    <X className="h-4 w-4 cursor-pointer" />
                  </Button>
                </Badge>
              ))}
              {filterChange.collection && (
                <Badge variant="secondary" className={badgeClass}>
                  {filterChange.collection}
                  <Button variant="ghost" size="sm" onClick={() => removeFilter('collection')} aria-label="Remove collection filter" className={badgeBtnClass}>
                    <X className="h-4 w-4 cursor-pointer" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>
          <Button className="w-full mt-auto bg-[#6e36aa] hover:bg-[#6e36aa]/80 text-white" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button className="w-full mt-auto bg-[#6e36aa] hover:bg-[#6e36aa]/80 text-white" onClick={resetFilters}>
            Reset All Filters
          </Button>
        </div>
      </ScrollArea>
    </aside>
  );
}
