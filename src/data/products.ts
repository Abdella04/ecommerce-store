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
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        category: "T-Shirts",
        inStock: true,
        sizes: ["L", "XL"],
    },
    {
        id: "2",
        name: "Premium V-Neck T-Shirt",
        price: 129.99,
        description: "Elegant v-neck design with premium cotton blend. Perfect for casual and semi-formal occasions.",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
        category: "T-Shirts",
        inStock: false,
        sizes: ["L","XL"],
    },
    {
        id: "3",
        name: "Graphic Print T-Shirt",
        price: 149.99,
        description: "Stylish t-shirt with unique graphic designs. Made from soft cotton with vibrant, long-lasting prints.",
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
        category: "T-Shirts",
        inStock: true,
        sizes: ["L", "XL"],
    },
   
]; 