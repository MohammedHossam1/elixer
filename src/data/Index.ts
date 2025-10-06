// Import product images
import productMoisturizer from "@/assets/product-moisturizer.jpg";
import { IProduct } from "@/interfaces/Index";



export const products: IProduct[] = [
    {
        id: "1",
        name: "Gentle Daily Cleanser",
        category: "Cleanser",
        category_id: "1",
        price: 19.99,

        originalPrice: 24.99,
        description: "A lightweight, buildable foundation that provides natural-looking coverage while nourishing your skin with botanical extracts.",
        ingredients: ["Hyaluronic Acid", "Vitamin E", "Botanical Extracts", "SPF 20"],
        howToUse: "Apply a small amount to clean skin using fingertips, brush, or sponge. Build coverage as needed.",
        benefits: ["Long-lasting wear", "Hydrating formula", "Natural finish", "Sun protection"],
        image: productMoisturizer,
        rating: 4.8,
        reviews: 156,
        images: [
            "/src/assets/product-foundation.jpg",
            "/src/assets/p1.png",
            "/src/assets/product-moisturizer.jpg"
        ],
        isNew: true,
        isOnSale: true,
        inStock: true,
    },
    {
        id: "2",
        name: "Vitamin C Brightening Serum",
        category: "Serum",
        category_id: "2",
        price: 34.99,

        image: productMoisturizer,
        rating: 4.6,
        reviews: 243,
        description: "A lightweight, buildable foundation that provides natural-looking coverage while nourishing your skin with botanical extracts.",
        ingredients: ["Hyaluronic Acid", "Vitamin E", "Botanical Extracts", "SPF 20"],
        howToUse: "Apply a small amount to clean skin using fingertips, brush, or sponge. Build coverage as needed.",
        benefits: ["Long-lasting wear", "Hydrating formula", "Natural finish", "Sun protection"],
        isNew: false,
        images: [
            "/src/assets/product-foundation.jpg",
            "/src/assets/p1.png",
            "/src/assets/product-moisturizer.jpg"
        ],
        isOnSale: false,
        inStock: true,
    },
    {
        id: "3",
        name: "Broad Spectrum Sunscreen SPF 50",
        category: "Sunscreen",
        category_id: "3",
        price: 22.99,

        originalPrice: 28.99,
        description: "A lightweight, buildable foundation that provides natural-looking coverage while nourishing your skin with botanical extracts.",
        ingredients: ["Hyaluronic Acid", "Vitamin E", "Botanical Extracts", "SPF 20"],
        howToUse: "Apply a small amount to clean skin using fingertips, brush, or sponge. Build coverage as needed.",
        benefits: ["Long-lasting wear", "Hydrating formula", "Natural finish", "Sun protection"],
        image: productMoisturizer,
        rating: 4.9,
        images: [
            "/src/assets/product-foundation.jpg",
            "/src/assets/p1.png",
            "/src/assets/product-moisturizer.jpg"
        ],
        reviews: 89,
        isNew: false,
        isOnSale: true,
        inStock: true,
    },
    {
        id: "4",
        name: "Hydrating Night Moisturizer",
        category: "Moisturizer",
        category_id: "1",
        price: 32.99,

        image: productMoisturizer,
        description: "A lightweight, buildable foundation that provides natural-looking coverage while nourishing your skin with botanical extracts.",
        ingredients: ["Hyaluronic Acid", "Vitamin E", "Botanical Extracts", "SPF 20"],
        howToUse: "Apply a small amount to clean skin using fingertips, brush, or sponge. Build coverage as needed.",
        benefits: ["Long-lasting wear", "Hydrating formula", "Natural finish", "Sun protection"],
        rating: 4.7,
        reviews: 134,
        isNew: true,
        images: [
            "/src/assets/product-foundation.jpg",
            "/src/assets/p1.png",
            "/src/assets/product-moisturizer.jpg"
        ],
        isOnSale: false,
        inStock: false,
    },
    {
        id: "5",
        name: "Niacinamide Pore Refining Serum",
        category: "Serum",
        category_id: "1",
        price: 29.99,

        image: productMoisturizer,
        description: "A lightweight, buildable foundation that provides natural-looking coverage while nourishing your skin with botanical extracts.",
        ingredients: ["Hyaluronic Acid", "Vitamin E", "Botanical Extracts", "SPF 20"],
        howToUse: "Apply a small amount to clean skin using fingertips, brush, or sponge. Build coverage as needed.",
        benefits: ["Long-lasting wear", "Hydrating formula", "Natural finish", "Sun protection"],
        rating: 4.5,
        reviews: 78,
        images: [
            "/src/assets/product-foundation.jpg",
            "/src/assets/p1.png",
            "/src/assets/product-moisturizer.jpg"
        ],
        isNew: false,
        isOnSale: false,
        inStock: true,
    },
    {
        id: "6",
        name: "Hydrating Daily Moisturizer",
        category: "Moisturizer",
        category_id: "1",
        price: 26.99,

        originalPrice: 32.99,
        image: productMoisturizer,
        images: [
            "/src/assets/product-foundation.jpg",
            "/src/assets/p1.png",
            "/src/assets/product-moisturizer.jpg"
        ],
        rating: 4.8,
        reviews: 201,
        isNew: false,
        isOnSale: true,
        inStock: true,
        description: "A lightweight, buildable foundation that provides natural-looking coverage while nourishing your skin with botanical extracts.",
        ingredients: ["Hyaluronic Acid", "Vitamin E", "Botanical Extracts", "SPF 20"],
        howToUse: "Apply a small amount to clean skin using fingertips, brush, or sponge. Build coverage as needed.",
        benefits: ["Long-lasting wear", "Hydrating formula", "Natural finish", "Sun protection"]
    },
];










export const categories = [
    { id: "all", name: "All Products", count: products.length },
    { id: "cleanser", name: "Cleanser", count: products.filter(p => p.category === "Cleanser").length },
    { id: "serum", name: "Serum", count: products.filter(p => p.category === "Serum").length },
    { id: "sunscreen", name: "Sunscreen", count: products.filter(p => p.category === "Sunscreen").length },
    { id: "moisturizer", name: "Moisturizer", count: products.filter(p => p.category === "Moisturizer").length },
];
export const footerLinks = {
    "Customer Care": [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQ", href: "/faq" },
        { name: "Shipping", href: "#" },
    ],
    "About Shades": [
        { name: "Our Story", href: "#" },
        { name: "Sustainability", href: "#" },
        { name: "Press", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Reviews", href: "#" },
    ],
    "Quick Links": [
        { name: "New Arrivals", href: "#" },
        { name: "Best Sellers", href: "#" },
        { name: "Sale", href: "#" },
        { name: "Gift Cards", href: "#" },
        { name: "Loyalty Program", href: "#" },
    ],
};
// Import existing images for now - in production you'd have actual before/after images
import customer1 from "@/assets/res1.jpg";
import customer2 from "@/assets/res2.jpg";
import customer3 from "@/assets/res3.jpg";
import customer4 from "@/assets/res4.jpg";
export const results = [
    {
        id: 1,
        title: "Acne Scar Treatment",
        beforeImage: customer1,
        afterImage: customer2,
        duration: "4 weeks",
        concern: "Acne Scars",
        improvement: "85% reduction",
        products: ["Vitamin C Serum", "Niacinamide Serum", "Moisturizer"],
        rating: 5,
        testimonial: "Amazing results! My acne scars have significantly faded and my skin looks so much smoother."
    },
    {
        id: 2,
        title: "Dark Spots & Pigmentation",
        beforeImage: customer3,
        afterImage: customer4,
        duration: "6 weeks",
        concern: "Pigmentation",
        improvement: "90% brighter",
        products: ["Brightening Serum", "Sunscreen SPF 50", "Night Moisturizer"],
        rating: 5,
        testimonial: "The dark spots are almost completely gone. I can't believe the transformation!"
    }
];