'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState('all');

  const offers = [
    {
      id: 1,
      title: "Summer Sale - Up to 50% Off",
      description: "Get ready for summer with our biggest sale of the season. Up to 50% off on selected items.",
      discount: "50% OFF",
      category: "sale",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      validUntil: "2024-08-31",
      code: "SUMMER50"
    },
    {
      id: 2,
      title: "New Customer Discount",
      description: "First time shopping with us? Get 20% off your first order with code NEW20.",
      discount: "20% OFF",
      category: "new-customer",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      validUntil: "2024-12-31",
      code: "NEW20"
    },
    {
      id: 3,
      title: "Free Shipping on Orders Over $50",
      description: "No minimum purchase required for free shipping on all orders over $50.",
      discount: "FREE SHIPPING",
      category: "shipping",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      validUntil: "2024-12-31",
      code: "FREESHIP50"
    },
    {
      id: 4,
      title: "Buy 2 Get 1 Free on T-Shirts",
      description: "Purchase any 2 t-shirts and get the third one absolutely free!",
      discount: "BUY 2 GET 1 FREE",
      category: "bogo",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
      validUntil: "2024-07-15",
      code: "BOGO3"
    },
    {
      id: 5,
      title: "Student Discount - 15% Off",
      description: "Valid student ID required. Get 15% off on your entire purchase.",
      discount: "15% OFF",
      category: "student",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      validUntil: "2024-12-31",
      code: "STUDENT15"
    },
    {
      id: 6,
      title: "Flash Sale - 30% Off Jeans",
      description: "Limited time offer! Get 30% off on all jeans. Hurry, offer ends soon!",
      discount: "30% OFF",
      category: "flash",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
      validUntil: "2024-06-30",
      code: "FLASH30"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Offers' },
    { id: 'sale', name: 'Sales' },
    { id: 'new-customer', name: 'New Customer' },
    { id: 'shipping', name: 'Shipping' },
    { id: 'bogo', name: 'Buy One Get One' },
    { id: 'student', name: 'Student' },
    { id: 'flash', name: 'Flash Sales' }
  ];

  const filteredOffers = activeTab === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === activeTab);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Special Offers & Deals</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover amazing deals and exclusive offers on premium men's fashion. 
              Don't miss out on these limited-time promotions!
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  activeTab === category.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Offer Image */}
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {offer.discount}
                  </div>
                </div>

                {/* Offer Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  
                  {/* Promo Code */}
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Promo Code:</span>
                      <code className="bg-white px-3 py-1 rounded border font-mono text-purple-600 font-bold">
                        {offer.code}
                      </code>
                    </div>
                  </div>

                  {/* Valid Until */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Valid until:</span>
                    <span className="font-medium">{formatDate(offer.validUntil)}</span>
                  </div>

                  {/* Action Button */}
                  <Link
                    href="/products"
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium text-center block"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Offers Message */}
          {filteredOffers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No offers available</h3>
              <p className="text-gray-600">Check back later for new promotions!</p>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Latest Offers</h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about exclusive deals, 
              new arrivals, and special promotions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 