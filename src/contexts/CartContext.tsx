'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/data/products';

interface CartItem {
    product: Product;
    quantity: number;
    size: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number, size?: string) => void;
    removeFromCart: (productId: string, size?: string) => void;
    updateQuantity: (productId: string, quantity: number, size?: string) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Helper function to validate cart item
const isValidCartItem = (item: unknown): item is CartItem => {
    return (
        item !== null &&
        typeof item === 'object' &&
        'product' in item &&
        'quantity' in item &&
        'size' in item &&
        typeof (item as CartItem).product === 'object' &&
        typeof (item as CartItem).product.id === 'string' &&
        typeof (item as CartItem).product.name === 'string' &&
        typeof (item as CartItem).product.price === 'number' &&
        typeof (item as CartItem).product.description === 'string' &&
        typeof (item as CartItem).product.image === 'string' &&
        typeof (item as CartItem).product.category === 'string' &&
        typeof (item as CartItem).product.inStock === 'boolean' &&
        Array.isArray((item as CartItem).product.sizes) &&
        typeof (item as CartItem).quantity === 'number' &&
        (item as CartItem).quantity > 0 &&
        typeof (item as CartItem).size === 'string'
    );
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                // Validate and filter out invalid items
                if (Array.isArray(parsedCart)) {
                    const validCart = parsedCart.filter(isValidCartItem);
                    setCart(validCart);

                    // If some items were invalid, update localStorage
                    if (validCart.length !== parsedCart.length) {
                        localStorage.setItem('cart', JSON.stringify(validCart));
                    }
                }
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
                // Clear invalid cart data
                localStorage.removeItem('cart');
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, quantity: number = 1, size: string = 'M') => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item =>
                item.product.id === product.id && item.size === size
            );

            if (existingItem) {
                return prevCart.map(item =>
                    item.product.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevCart, { product, quantity, size }];
            }
        });
    };

    const removeFromCart = (productId: string, size?: string) => {
        setCart(prevCart => {
            if (size) {
                return prevCart.filter(item =>
                    !(item.product.id === productId && item.size === size)
                );
            }
            return prevCart.filter(item => item.product.id !== productId);
        });
    };

    const updateQuantity = (productId: string, quantity: number, size?: string) => {
        if (quantity <= 0) {
            removeFromCart(productId, size);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item => {
                if (size) {
                    return item.product.id === productId && item.size === size
                        ? { ...item, quantity }
                        : item;
                }
                return item.product.id === productId
                    ? { ...item, quantity }
                    : item;
            })
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const value: CartContextType = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}; 