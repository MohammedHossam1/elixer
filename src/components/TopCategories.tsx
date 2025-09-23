import { Button } from "@/components/ui/button";
import p1 from "@/assets/p1.png";

const categories = [
  {
    id: 1,
    name: "CLEANSERS",
    itemCount: 12,
    image: p1,
    alt: "Gentle cleansers for all skin types including foam and gel cleansers"
  },
  {
    id: 2,
    name: "SERUMS",
    itemCount: 18,
    image: p1,
    alt: "Advanced treatment serums with active ingredients for targeted skin concerns"
  },
  {
    id: 3,
    name: "MOISTURIZERS",
    itemCount: 15,
    image: p1,
    alt: "Hydrating moisturizers for day and night skincare routines"
  }
];

const TopCategories = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-6xl mb-2">
            <span className="text-primary font-script">Best Seller</span>
          </h2>
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground uppercase tracking-wider">
            TOP Products
          </h3>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group text-center cursor-pointer transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Category Image with Circular Background */}
              <div className="relative mb-6">
                {/* Circular Background */}
                <div className="w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto rounded-full bg-gradient-to-br from-muted/30 to-muted/60 p-6 sm:p-8 transition-all duration-300 group-hover:shadow-elegant">
                  {/* Product Image Container */}
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={category.image}
                      alt={category.alt}
                      className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-primary/20 rounded-full blur-sm"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 bg-rose-gold/30 rounded-full blur-sm"></div>
              </div>

              {/* Category Info */}
              <div className="space-y-2">
                <h4 className="text-xl lg:text-2xl font-bold text-foreground uppercase tracking-wide">
                  {category.name}
                </h4>
             
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Explore our scientifically-formulated skincare range, each category designed to target specific skin concerns and deliver visible results.
          </p>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold"
          >
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopCategories;