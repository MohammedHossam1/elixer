import ProductCard from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import productFoundation from "@/assets/product-foundation.jpg";
import productKajal from "@/assets/product-kajal.jpg";
import productLipstick from "@/assets/product-lipstick.jpg";
import productMoisturizer from "@/assets/product-moisturizer.jpg";
import { Carousel } from "@/components/ui/carousel";
import { CarouselContent } from "@/components/ui/carousel";
import { CarouselItem } from "@/components/ui/carousel";

const products = [
  {
    id: "1",
    name: "Hydrating Daily Moisturizer",
    category: "MOISTURIZERS",
    price: 45.00,
    originalPrice: 60.00,
    image: productMoisturizer,
    rating: 4.8,
    reviews: 234,
    isNew: true,
    isOnSale: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Vitamin C Brightening Serum",
    category: "SERUMS",
    price: 68.00,
    image: productFoundation,
    rating: 4.9,
    reviews: 456,
    isNew: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Gentle Foaming Cleanser",
    category: "CLEANSERS",
    price: 32.00,
    image: productLipstick,
    rating: 4.7,
    reviews: 189,
    inStock: true,
  },
  {
    id: "4",
    name: "SPF 50 Sunscreen",
    category: "SUNSCREEN",
    price: 38.00,
    originalPrice: 45.00,
    image: productKajal,
    rating: 4.6,
    reviews: 312,
    isOnSale: true,
    inStock: true,
  },
  {
    id: "5",
    name: "Retinol Night Cream",
    category: "MOISTURIZERS",
    price: 75.00,
    image: productMoisturizer,
    rating: 4.9,
    reviews: 567,
    isNew: true,
    inStock: true,
  },
  {
    id: "6",
    name: "Hyaluronic Acid Serum",
    category: "SERUMS",
    price: 55.00,
    image: productFoundation,
    rating: 4.8,
    reviews: 423,
    inStock: true,
  },
  {
    id: "7",
    name: "Micellar Water Cleanser",
    category: "CLEANSERS",
    price: 28.00,
    image: productLipstick,
    rating: 4.5,
    reviews: 234,
    inStock: false,
  },
  {
    id: "8",
    name: "Mineral Sunscreen SPF 30",
    category: "SUNSCREEN",
    price: 42.00,
    image: productKajal,
    rating: 4.7,
    reviews: 289,
    inStock: true,
  },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  const categories = [
    { name: "All Products", value: "all", count: products.length },
    { name: "Cleansers", value: "CLEANSERS", count: products.filter(p => p.category === "CLEANSERS").length },
    { name: "Serums", value: "SERUMS", count: products.filter(p => p.category === "SERUMS").length },
    { name: "Sunscreen", value: "SUNSCREEN", count: products.filter(p => p.category === "SUNSCREEN").length },
    { name: "Moisturizers", value: "MOISTURIZERS", count: products.filter(p => p.category === "MOISTURIZERS").length },
  ];

  const getFilteredProducts = (category: string) => {
    if (category === "all") return products;
    return products.filter((product) => product.category === category);
  };

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    setSearchParams(value === "all" ? {} : { category: value });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="text-start mb-12">
          <h1 className="font-script text-5xl lg:text-6xl text-primary mb-4">
            Shop Our Collection
          </h1>
          <p className="text-muted-foreground ">
            Discover our premium skincare products crafted with the finest ingredients
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
          <TabsList className="bg-muted/50 h-auto block max-w-4xl  sm:w-fit mb-5">
            <Carousel opts={{ align: "start" }}>
              <CarouselContent className="pl-3">
                {categories.map((category) => (
                  <CarouselItem key={category.value} className="basis-auto pl-1">
                    <TabsTrigger
                      value={category.value}
                      className="text-xs sm:text-sm border font-medium data-[state=active]:bg-primary data-[state=active]:text-white px-2 py-3 sm:px-4"
                    >
                      <span className="">{category.name}</span>
                      <span className="ml-1 text-xs hidden sm:inline">
                        ({category.value})
                      </span>
                    </TabsTrigger>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </TabsList>
          {/* Product Tabs */}


            {categories.map((category) => (
              <TabsContent key={category.value} value={category.value} className="mt-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-4">
                  {getFilteredProducts(category.value).map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
      </main>
    </div>
  );
};

export default Shop;
