// Shared product filtering used by the search page.

const norm = (s) => (s || '').toString().trim().toLowerCase();

// Collection labels in the UI ("New Arrivals", "Flash Sale") do not match the
// data exactly ("New Arrival", "Sale 20%"), so compare loosely.
export const matchesCollection = (productCollection, wanted) => {
  const have = norm(productCollection);
  const want = norm(wanted);
  if (!want) return true;
  if (!have) return false;
  if (want.includes('sale')) return have.includes('sale');
  const strip = (s) => s.replace(/\s+collection$/, '').replace(/s$/, '');
  return strip(have) === strip(want) || have.includes(want) || want.includes(have);
};

export const DEFAULT_FILTERS = {
  name: '',
  sizeSystem: 'uk',
  size: 8,
  types: [],
  companies: [],
  collection: '',
  sort: 'featured',
};

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'popular', label: 'Most popular' },
  { value: 'name', label: 'Name: A to Z' },
];

const isSort = (v) => SORT_OPTIONS.some((o) => o.value === v);

export const sortProducts = (products, sort = 'featured') => {
  const list = [...products];
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating || b.totalReviews - a.totalReviews);
    case 'popular':
      return list.sort((a, b) => b.totalBought - a.totalBought);
    case 'name':
      return list.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return list;
  }
};

export const filterProducts = (products, filters = {}) => {
  const f = { ...DEFAULT_FILTERS, ...filters };
  const q = norm(f.name);
  const types = Array.isArray(f.types) ? f.types : [];
  const companies = Array.isArray(f.companies) ? f.companies : [];

  return products.filter((product) => {
    const typeMatch = types.length === 0 || types.includes(product.type);
    const companyMatch = companies.length === 0 || companies.includes(product.company);
    const collectionMatch = !f.collection || matchesCollection(product.collectionType, f.collection);

    const nameMatch =
      !q ||
      norm(product.name).includes(q) ||
      norm(product.company).includes(q) ||
      norm(product.brand).includes(q) ||
      norm(product.type).includes(q) ||
      matchesCollection(product.collectionType, q);

    const sizes = product.specifications?.availableSizes;
    const sizeList = sizes ? sizes[(f.sizeSystem || 'uk').toUpperCase()] : null;
    // Only enforce size when the user moved it off the default.
    const sizeMatch =
      f.size === DEFAULT_FILTERS.size ||
      !Array.isArray(sizeList) ||
      sizeList.some((s) => Math.abs(Number(s) - Number(f.size)) <= 0.5);

    return typeMatch && companyMatch && collectionMatch && nameMatch && sizeMatch;
  });
};

// Read filters out of a search URL such as ?query=boots&types=Boots,Sneakers&collection=Winter%20Collection
export const filtersFromSearch = (search) => {
  const params = new URLSearchParams(search);
  const list = (key) =>
    (params.get(key) || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  const types = [...new Set([...list('types'), ...list('type')])];
  const companies = [...new Set([...list('companies'), ...list('company')])];
  const sizeSystem = (params.get('sizeSystem') || DEFAULT_FILTERS.sizeSystem).toLowerCase() === 'us' ? 'us' : 'uk';
  const sizeRaw = Number(params.get('size'));
  const sort = params.get('sort') || DEFAULT_FILTERS.sort;
  return {
    ...DEFAULT_FILTERS,
    name: params.get('query') || '',
    types,
    companies,
    collection: params.get('collection') || '',
    sizeSystem,
    size: Number.isFinite(sizeRaw) && sizeRaw > 0 ? sizeRaw : DEFAULT_FILTERS.size,
    sort: isSort(sort) ? sort : DEFAULT_FILTERS.sort,
  };
};

export const searchFromFilters = (f) => {
  const query = new URLSearchParams();
  if (f.name) query.set('query', f.name);
  if (f.types?.length) query.set('types', f.types.join(','));
  if (f.companies?.length) query.set('companies', f.companies.join(','));
  if (f.collection) query.set('collection', f.collection);
  if (f.size && f.size !== DEFAULT_FILTERS.size) {
    query.set('size', String(f.size));
    query.set('sizeSystem', f.sizeSystem || DEFAULT_FILTERS.sizeSystem);
  }
  if (f.sort && f.sort !== DEFAULT_FILTERS.sort) query.set('sort', f.sort);
  return query.toString();
};
