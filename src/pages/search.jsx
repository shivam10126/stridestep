import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/filterSidebar';
import Product from '../components/Product';
import { useLocation } from 'react-router-dom';
import { filtersFromSearch } from '../lib/filterProducts';

const Search = () => {
  const location = useLocation();
  const [filterParams, setFilterParams] = useState(() => filtersFromSearch(location.search));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // The URL is the source of truth: navbar searches, hero/collection links and
  // "Apply Filters" all update it, and this keeps the filter state in step.
  useEffect(() => {
    setFilterParams(filtersFromSearch(location.search));
    setDrawerOpen(false);
  }, [location.search]);

  // Lock page scroll while the mobile drawer is open, and close it on Escape.
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setDrawerOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen]);

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        {drawerOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            aria-hidden="true"
            onClick={() => setDrawerOpen(false)}
          />
        )}
        <Sidebar
          setFilterParams={setFilterParams}
          filterParams={filterParams}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
        <Product
          setFilterParams={setFilterParams}
          filterParams={filterParams}
          onOpenFilters={() => setDrawerOpen(true)}
        />
      </div>
    </>
  );
};

export default Search;
