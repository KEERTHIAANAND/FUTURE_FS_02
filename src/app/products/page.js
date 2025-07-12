'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import ProductGrid from '../../components/ProductGrid';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [cartItemCount, setCartItemCount] = useState(0);

  // Get cart count from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartItemCount(totalItems);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={cartItemCount} />
      <div className="pt-16">
        <ProductGrid />
      </div>
    </div>
  );
} 