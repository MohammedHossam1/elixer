import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import product images
import productLipstick from "@/assets/product-lipstick.jpg";
import productFoundation from "@/assets/product-foundation.jpg";
import productKajal from "@/assets/product-kajal.jpg";
import productMoisturizer from "@/assets/product-moisturizer.jpg";

const ProductShowcase = () => {
  const products = [
    {
      id: "1",
      name: "Gentle Daily Cleanser",
      category: "Cleanser",
      price: 19.99,
      originalPrice: 24.99,
      image: productMoisturizer,
      rating: 4.8,
      reviews: 156,
      isNew: true,
      isOnSale: true,
      inStock: true,
    },
    {
      id: "2", 
      name: "Vitamin C Brightening Serum",
      category: "Serum",
      price: 34.99,
      image: productMoisturizer,
      rating: 4.6,
      reviews: 243,
      isNew: false,
      isOnSale: false,
      inStock: true,
    },
    {
      id: "3",
      name: "Broad Spectrum Sunscreen SPF 50",
      category: "Sunscreen", 
      price: 22.99,
      originalPrice: 28.99,
      image: productMoisturizer,
      rating: 4.9,
      reviews: 89,
      isNew: false,
      isOnSale: true,
      inStock: true,
    },
    {
      id: "4",
      name: "Hydrating Night Moisturizer",
      category: "Moisturizer",
      price: 32.99,
      image: productMoisturizer,
      rating: 4.7,
      reviews: 134,
      isNew: true,
      isOnSale: false,
      inStock: false,
    },
    {
      id: "5",
      name: "Niacinamide Pore Refining Serum",
      category: "Serum",
      price: 29.99,
      image: productMoisturizer,
      rating: 4.5,
      reviews: 78,
      isNew: false,
      isOnSale: false,
      inStock: true,
    },
    {
      id: "6",
      name: "Hydrating Daily Moisturizer",
      category: "Moisturizer",
      price: 26.99,
      originalPrice: 32.99,
      image: productMoisturizer,
      rating: 4.8,
      reviews: 201,
      isNew: false,
      isOnSale: true,
      inStock: true,
    },
  ];

  const categories = [
    { id: "all", name: "All Products", count: products.length },
    { id: "cleanser", name: "Cleanser", count: products.filter(p => p.category === "Cleanser").length },
    { id: "serum", name: "Serum", count: products.filter(p => p.category === "Serum").length },
    { id: "sunscreen", name: "Sunscreen", count: products.filter(p => p.category === "Sunscreen").length },
    { id: "moisturizer", name: "Moisturizer", count: products.filter(p => p.category === "Moisturizer").length },
  ];

  const getFilteredProducts = (category: string) => {
    if (category === "all") return products;
    return products.filter(product => product.category.toLowerCase() === category);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-primary font-script">Products</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our complete skincare collection, scientifically formulated to address all your skin concerns
          </p>
        </div>

        {/* Product Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-12 bg-muted/50 h-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-xs sm:text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2 py-3 sm:px-4"
              >
                <span className="truncate">{category.name}</span>
                <span className="ml-1 text-xs hidden sm:inline">({category.count})</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {getFilteredProducts(category.id).map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;