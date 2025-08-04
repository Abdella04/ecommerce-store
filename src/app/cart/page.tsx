'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    const handleQuantityChange = (productId: string, newQuantity: number, size: string) => {
        setIsUpdating(`${productId}-${size}`);
        updateQuantity(productId, newQuantity, size);
        setTimeout(() => setIsUpdating(null), 300);
    };

    // Safety check for cart data
    const safeCart = cart.filter(item => item && item.product && item.product.id);
    const safeTotalPrice = (() => {
        try {
            return getTotalPrice();
        } catch (error) {
            console.error('Error calculating total price:', error);
            return 0;
        }
    })();

    if (safeCart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-12">
                        <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
                        <Link
                            href="/products"
                            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Continue Shopping</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">Review your items and proceed to checkout</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="p-6 border-b">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Cart Items ({safeCart.length})
                                </h2>
                            </div>

                            <div className="divide-y">
                                {safeCart.map((item) => (
                                    <div key={`${item.product.id}-${item.size}`} className="p-6">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />

                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm">
                                                    {item.product.description}
                                                </p>
                                                <div className="flex items-center space-x-4 mt-1">
                                                    <p className="text-blue-600 font-semibold">
                                                        {item.product.price.toFixed(2)} MAD
                                                    </p>
                                                    <span className="text-sm text-gray-500">
                                                        Size: {item.size}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1, item.size)}
                                                    disabled={isUpdating === `${item.product.id}-${item.size}`}
                                                    className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>

                                                <span className="w-12 text-center font-semibold">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1, item.size)}
                                                    disabled={isUpdating === `${item.product.id}-${item.size}`}
                                                    className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {(item.product.price * item.quantity).toFixed(2)} MAD
                                                </p>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id, item.size)}
                                                    className="text-red-500 hover:text-red-700 mt-1"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 border-t">
                                <button
                                    onClick={clearCart}
                                    className="text-red-600 hover:text-red-800 font-medium"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">{safeTotalPrice.toFixed(2)} MAD</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold text-gray-500">
                                        Calculated at checkout
                                    </span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold text-gray-900">Subtotal</span>
                                        <span className="text-lg font-semibold text-gray-900">
                                            {safeTotalPrice.toFixed(2)} MAD
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                                <p className="text-sm text-blue-800">
                                    🚚 <strong>Shipping:</strong> 20 MAD for Casablanca, 30 MAD for other cities
                                </p>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                            >
                                Proceed to Checkout
                            </Link>

                            <Link
                                href="/products"
                                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center block mt-3"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 