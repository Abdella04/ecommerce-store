'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;  // Use the Product interface we imported
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
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover-card-effect border border-gray-200">
            <div className="relative h-[300px] overflow-hidden group">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                />
                {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                        {product.price.toFixed(2)} MAD
                    </span>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Size:
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                                    selectedSize === size
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                } button-effect`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || !selectedSize}
                    className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all ${product.inStock && selectedSize
                        ? 'bg-blue-600 text-white hover:bg-blue-700 button-effect'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    <ShoppingCart className="h-5 w-5" />
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
    );
}