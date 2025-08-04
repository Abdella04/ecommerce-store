'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Truck, CheckCircle } from 'lucide-react';

interface CheckoutForm {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
}

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, getTotalPrice, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const [formData, setFormData] = useState<CheckoutForm>({
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Clear cart and show success
        clearCart();
        setOrderComplete(true);
        setIsSubmitting(false);
    };

    // Safety checks for cart data
    const safeCart = cart.filter(item => item && item.product && item.product.id);
    const subtotal = (() => {
        try {
            return getTotalPrice();
        } catch (error) {
            console.error('Error calculating total price:', error);
            return 0;
        }
    })();

    // Calculate shipping based on city selection
    const getShippingCost = () => {
        if (formData.city === 'casablanca') {
            return 20;
        } else if (formData.city === 'other') {
            return 30;
        }
        return 0; // No city selected yet
    };

    const shipping = getShippingCost();
    const total = subtotal + shipping;

    // Handle navigation when cart is empty
    useEffect(() => {
        if (safeCart.length === 0 && !orderComplete) {
            router.push('/cart');
        }
    }, [safeCart.length, orderComplete, router]);

    if (safeCart.length === 0 && !orderComplete) {
        return null;
    }

    if (orderComplete) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
                        <p className="text-gray-600 mb-6">
                            Thank you for your purchase. Your order has been successfully placed and will be delivered to your address.
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                            Order ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-500 mb-8">
                            Payment: Cash on Delivery
                        </p>
                        <button
                            onClick={() => router.push('/')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
                    <p className="text-gray-600">Complete your purchase with cash on delivery</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-1">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Delivery Information */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex items-center mb-4">
                                    <Truck className="h-5 w-5 text-blue-600 mr-2" />
                                    <h2 className="text-lg font-semibold text-gray-900">Delivery Information</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your phone number"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            City *
                                        </label>
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                                        >
                                            <option value="">Select your city</option>
                                            <option value="casablanca">Casablanca</option>
                                            <option value="other">Other Cities</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Shipping Info */}
                                {formData.city && (
                                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-sm text-blue-800">
                                            🚚 <strong>Shipping to {formData.city === 'casablanca' ? 'Casablanca' : 'Other Cities'}:</strong> {shipping} MAD
                                            {formData.city === 'casablanca' && (
                                                <span className="text-green-600 ml-2">(Local delivery - faster!)</span>
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
                                <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <CheckCircle className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Cash on Delivery</p>
                                        <p className="text-sm text-gray-600">Pay when you receive your order</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Processing...' : `Place Order - ${total.toFixed(2)} MAD (Cash on Delivery)`}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                {safeCart.map((item) => (
                                    <div key={`${item.product.id}-${item.size}`} className="flex justify-between items-center">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">{item.product.name}</p>
                                                <p className="text-sm text-gray-600">Qty: {item.quantity} | Size: {item.size}</p>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-gray-900">
                                            {(item.product.price * item.quantity).toFixed(2)} MAD
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">{subtotal.toFixed(2)} MAD</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold">
                                        {formData.city ? `${shipping.toFixed(2)} MAD` : 'Select city'}
                                    </span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold text-gray-900">Total</span>
                                        <span className="text-lg font-semibold text-gray-900">
                                            {formData.city ? total.toFixed(2) : subtotal.toFixed(2)} MAD
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    💳 <strong>Cash on Delivery:</strong> Pay the total amount when your order arrives.
                                </p>
                                {formData.city && (
                                    <p className="text-sm text-blue-800 mt-1">
                                        📍 <strong>Shipping:</strong> {formData.city === 'casablanca' ? '20 MAD (Local)' : '30 MAD (Other cities)'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 