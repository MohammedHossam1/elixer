export interface IProduct {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    description: string;
    ingredients: string[];
    howToUse: string;
    benefits: string[];
    image: string;
    rating: number;
    reviews: number;
    images: string[];
    isNew: boolean;
    isOnSale: boolean;
    inStock: boolean;
}