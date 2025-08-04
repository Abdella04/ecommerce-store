'use client';

import Link from 'next/link';
import { ShoppingCart, Home, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
    const { getTotalItems } = useCart();

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Package className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">ShopStore</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <Link
                            href="/"
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Home className="h-4 w-4" />
                            <span>Home</span>
                        </Link>
                        <Link
                            href="/products"
                            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Package className="h-4 w-4" />
                            <span>Products</span>
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Link href="/cart" className="relative">
                            <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600 transition-colors" />
                            {(() => {
                                try {
                                    const totalItems = getTotalItems();
                                    return totalItems > 0 ? (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    ) : null;
                                } catch (error) {
                                    console.error('Error getting total items:', error);
                                    return null;
                                }
                            })()}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
} 