'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>('');

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        addToCart(product, 1, selectedSize);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-48 object-cover"
                />
                {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                        Out of Stock
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-blue-600">
                        {product.price.toFixed(2)} MAD
                    </span>
                    <div className="flex items-center text-yellow-400">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-600 text-sm ml-1">(4.8)</span>
                    </div>
                </div>

                {/* Size Selection */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Size:
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-3 py-1 text-sm border rounded-md transition-colors ${selectedSize === size
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 capitalize">
                        {product.category}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        disabled={!product.inStock || !selectedSize}
                        className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${product.inStock && selectedSize
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <ShoppingCart className="h-4 w-4" />
                        <span>
                            {!product.inStock
                                ? 'Out of Stock'
                                : !selectedSize
                                    ? 'Select Size'
                                    : 'Add to Cart'
                            }
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
} 