'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { products, categories } from '../data/products';

export default function ProductGrid() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const defaultSubCategory = 't-shirts';

  useEffect(() => {
    let filtered = products;

    // Filter by subcategory
    const filterCategory = selectedSubCategory || defaultSubCategory;
    if (filterCategory) {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [selectedSubCategory, searchQuery, sortBy]);

  // Helper to close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.category-dropdown')) {
        setSelectedMainCategory(null);
      }
    };
    if (selectedMainCategory) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [selectedMainCategory]);

  const handleAddToCart = (product) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart with same size and color
    const existingItemIndex = existingCart.findIndex(item => 
      item.id === product.id && 
      item.selectedSize === product.selectedSize && 
      item.selectedColor === product.selectedColor
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      existingCart[existingItemIndex].quantity += product.quantity;
    } else {
      // Add new item to cart
      existingCart.push(product);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show success message (you could add a toast notification here)
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8">
      {/* Filters and Search */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row w-full items-stretch sm:items-center gap-3 sm:gap-4">
          {/* Search */}
          <div className="max-w-xs w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-[400px] px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* Category Dropdowns Centered */}
          <div className="flex-1 flex justify-center">
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
              {categories.map((cat) => {
                return (
                  <div key={cat.id} className="relative category-dropdown">
                    <button
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white`}
                      onClick={() => setSelectedMainCategory(selectedMainCategory === cat.id ? null : cat.id)}
                      type="button"
                    >
                      {cat.name}
                    </button>
                    {/* Dropdown */}
                    {selectedMainCategory === cat.id && (
                      <div className="absolute left-0 mt-2 w-44 bg-white rounded-md shadow-lg border border-gray-100 z-20">
                        {cat.subcategories.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setSelectedSubCategory(sub.id);
                              setSelectedMainCategory(null);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                              selectedSubCategory === sub.id
                                ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
                            }`}
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Sort By */}
          <div>
            <label className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch justify-items-center">
          {filteredProducts.map((product) => (
            <div className="flex flex-col h-full w-full items-center justify-center">
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
} 