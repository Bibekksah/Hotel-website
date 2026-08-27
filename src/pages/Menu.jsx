import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaSlidersH, FaSyncAlt } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';

export default function Menu({ products, onOpenProduct }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(2100); // max price in catalog is 2100 (Badam Barfi)
  const [sortBy, setSortBy] = useState('popular'); // popular, rating, price-low, price-high, new
  const [showFilters, setShowFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const categories = useMemo(() => [
    { id: 'all', name: 'All Boutique Items', tagline: 'The complete collection of gourmet traditional delicacies.' },
    { id: 'sweets', name: 'Sweets', tagline: 'Traditional sugar confections deep-fried in pure desi ghee and glazed in aromatic syrup.' },
    { id: 'khuwa', name: 'Khuwa Items', tagline: 'Decadent condensed milk solid fudges slow-cooked and infused with cardamom and saffron.' },
    { id: 'snacks', name: 'Snacks', tagline: 'Piping hot Indo-Chinese savory snacks, fluffy Puris, and crispy street chaats.' },
    { id: 'milk', name: 'Milk Items', tagline: 'Fresh cottage cheese paneer, traditional curds, and rich saffron-infused hot teas.' },
    { id: 'drinks', name: 'Cold Drinks', tagline: 'Chilled energy boosters, soft juices, mineral water, and refreshing sodas.' }
  ], []);

  // Sync category from URL parameter if present (e.g. /menu?cat=sweets)
  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const currentCategoryTagline = useMemo(() => {
    const match = categories.find(c => c.id === activeCategory);
    return match ? match.tagline : '';
  }, [activeCategory, categories]);

  // Generate instant search suggestions as user types
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchSuggestions([]);
      return;
    }
    const matches = products
      .filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .slice(0, 5);
    setSearchSuggestions(matches);
  }, [searchQuery, products]);

  // Filtered and Sorted products
  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // 2. Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.ingredients.some(ing => ing.toLowerCase().includes(q))
      );
    }

    // 3. Filter by Price Range (Check the lowest price option of the product)
    result = result.filter(p => {
      const lowestPrice = Math.min(...p.priceOptions.map(o => o.price));
      return lowestPrice <= priceRange;
    });

    // 4. Sorting logic
    if (sortBy === 'popular') {
      result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => {
        const pA = Math.min(...a.priceOptions.map(o => o.price));
        const pB = Math.min(...b.priceOptions.map(o => o.price));
        return pA - pB;
      });
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => {
        const pA = Math.min(...a.priceOptions.map(o => o.price));
        const pB = Math.min(...b.priceOptions.map(o => o.price));
        return pB - pA;
      });
    } else if (sortBy === 'new') {
      result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
    }

    return result;
  }, [products, activeCategory, searchQuery, priceRange, sortBy]);

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setSearchParams(catId === 'all' ? {} : { cat: catId });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setPriceRange(2100);
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* ================= CATEGORY TOP BANNER ================= */}
      <div className="bg-gradient-to-r from-[#2C1810] to-[#161616] border border-gold/25 p-8 sm:p-12 rounded-3xl text-center space-y-4 mb-10 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-luxury-bg-pattern opacity-5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_80%)] pointer-events-none" />
        
        <span className="font-sans text-[10px] tracking-[0.25em] text-gold uppercase font-bold bg-charcoal/50 border border-gold/20 px-4 py-1.5 rounded-full inline-block">
          Luxury Sweet Boutique
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-cream font-semibold tracking-wide">
          {categories.find(c => c.id === activeCategory)?.name || 'Boutique Menu'}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-cream/70 max-w-2xl mx-auto leading-relaxed">
          {currentCategoryTagline}
        </p>
      </div>

      {/* ================= SEARCH & CONTROLS DASHBOARD ================= */}
      <div className="bg-cream border border-gold/15 p-5 rounded-2xl shadow-sm mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          
          {/* Advanced Search bar with Suggestions dropdown */}
          <div className="relative w-full md:max-w-md">
            <FaSearch className="absolute left-3.5 top-3.5 text-chocolate/40 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sweets, ingredients, or snacks..."
              className="w-full bg-white border border-gold/25 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors text-coffee"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-xs text-chocolate/40 hover:text-gold"
              >
                Clear
              </button>
            )}

            {/* Instant suggestions list */}
            {searchSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-cream border border-gold/30 rounded-xl shadow-xl z-30 divide-y divide-gold/10 overflow-hidden">
                {searchSuggestions.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSearchQuery(s.name);
                      setSearchSuggestions([]);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-gold/5 text-xs font-sans text-chocolate font-medium flex items-center justify-between"
                  >
                    <span>{s.name} ({s.category})</span>
                    <span className="text-[10px] text-chocolate/40">Rs. {s.priceOptions[0].price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Toggle advanced filters & sorting */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 border border-gold/30 px-4 py-3 rounded-xl text-xs tracking-wider uppercase font-semibold transition-all duration-300 ${
                showFilters ? 'bg-gold text-charcoal' : 'bg-white hover:bg-gold/5 text-chocolate'
              }`}
            >
              <FaSlidersH />
              <span>Filters</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gold/30 rounded-xl px-4 py-3 text-xs font-sans tracking-wider uppercase font-semibold text-chocolate focus:outline-none focus:border-gold cursor-pointer"
            >
              <option value="popular">Popular Choice</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="new">New Delicacies</option>
            </select>
          </div>
        </div>

        {/* Collapsible Advanced Filters Drawer */}
        {showFilters && (
          <div className="pt-4 border-t border-gold/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-sans">
            {/* Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs tracking-wider uppercase text-chocolate/60 font-semibold">
                <span>Maximum Price Limit</span>
                <span className="text-gold font-bold text-sm">Rs. {priceRange}</span>
              </div>
              <input
                type="range"
                min="15"
                max="2100"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-gold h-1.5 bg-beige rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-chocolate/40 font-medium">
                <span>Min: Rs. 15</span>
                <span>Max: Rs. 2100</span>
              </div>
            </div>

            {/* Filter Reset Button */}
            <div className="flex items-end justify-end">
              <button
                onClick={handleResetFilters}
                className="flex items-center space-x-1.5 text-xs text-chocolate/50 hover:text-gold transition-colors font-bold uppercase tracking-wider focus:outline-none"
              >
                <FaSyncAlt className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= CATEGORY TAB SELECTOR ================= */}
      <div className="flex overflow-x-auto pb-4 space-x-2 Scrollbar-hide mb-8">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => handleCategorySelect(c.id)}
            className={`px-6 py-3 rounded-full text-xs font-sans tracking-widest uppercase font-semibold transition-all duration-300 border whitespace-nowrap shrink-0 ${
              activeCategory === c.id
                ? 'bg-gradient-to-r from-coffee to-chocolate text-cream border-gold/30 shadow-md'
                : 'bg-white hover:bg-gold/5 border-gold/10 text-chocolate'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* ================= PRODUCT DISPLAY MASONRY GRID ================= */}
      {processedProducts.length === 0 ? (
        <div className="bg-cream border border-gold/10 p-12 text-center rounded-3xl space-y-4">
          <p className="font-serif italic text-lg text-chocolate/60">No delicacies match your selection.</p>
          <button
            onClick={handleResetFilters}
            className="bg-chocolate hover:bg-gold hover:text-coffee text-cream border border-gold/20 px-6 py-2 rounded-xl transition-all duration-300 text-xs tracking-wider uppercase font-bold"
          >
            Clear Search & Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {processedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onOpenDetails={onOpenProduct} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
