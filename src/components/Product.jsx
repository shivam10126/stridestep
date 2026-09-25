import React, { useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import ProductCard from './ui/ProductCard';
import SorryPage from './SorryPage';
import productInfo from '../assets/productInfo';
import { filterProducts, sortProducts, SORT_OPTIONS, DEFAULT_FILTERS } from '../lib/filterProducts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const Product = ({ filterParams, setFilterParams, onOpenFilters }) => {
  const products = useMemo(
    () => sortProducts(filterProducts(productInfo, filterParams), filterParams?.sort),
    [filterParams]
  );
  const sort = filterParams?.sort || DEFAULT_FILTERS.sort;

  const activeFilterCount =
    (filterParams?.types?.length || 0) +
    (filterParams?.companies?.length || 0) +
    (filterParams?.collection ? 1 : 0) +
    (filterParams?.name ? 1 : 0) +
    (filterParams?.size !== DEFAULT_FILTERS.size ? 1 : 0);

  const handleSort = (value) => setFilterParams((prev) => ({ ...prev, sort: value }));

  return (
    <div className="flex flex-col w-full min-w-0 font-roboto-slab">
      <div className="flex items-center justify-between gap-3 px-3 pt-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenFilters}
            className="md:hidden inline-flex items-center gap-2 bg-[#6e36aa] hover:bg-[#5b2b8f] text-white font-semibold px-3 py-2 rounded-md transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-[#eb432f] text-white rounded-full min-w-[1.25rem] h-5 px-1 flex items-center justify-center text-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
          <p className="text-sm text-gray-600 hidden sm:block">
            {products.length} {products.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-[#6e36aa] hidden sm:block" />
          <Select value={sort} onValueChange={handleSort}>
            <SelectTrigger aria-label="Sort products" className="w-[11.5rem] bg-white border-[#6e36aa] text-[#6e36aa] font-semibold focus:ring-0">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value} className="text-[#6e36aa] cursor-pointer">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] w-full mt-3 h-[82vh] justify-items-center py-3 px-2 gap-x-4 gap-y-8 overflow-y-auto overflow-x-hidden">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex align-middle justify-center items-center w-full">
          <SorryPage setFilterParams={setFilterParams} />
        </div>
      )}
    </div>
  );
};

export default Product;
