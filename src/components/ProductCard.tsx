'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Star } from 'lucide-react';

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
                <img
                    src={product.image}
                    alt={product.name}
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
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
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