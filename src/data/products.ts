export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    inStock: boolean;
    sizes: string[];
}

export const products: Product[] = [
    {
        id: "1",
        name: "Classic Cotton T-Shirt",
        price: 89.99,
        description: "Comfortable and breathable cotton t-shirt perfect for everyday wear. Available in multiple colors and sizes.",
        image: "/images/another.jpg",  // Updated path
        category: "T-Shirts",
        inStock: true,
        sizes: ["L", "XL"],
    }
];