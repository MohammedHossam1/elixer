import { Button } from "@/components/ui/button";
import heroModel from "@/assets/hero-model.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] overflow-hidden bg-gradient-hero">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-rose-gold/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-primary/20 rounded-full"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-rose-gold/10 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 h-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] lg:min-h-[80vh]">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Discover Your
                <span className="block text-primary font-script text-5xl lg:text-7xl">
                  Natural Beauty
                </span>
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Premium cosmetics crafted with love and the finest ingredients to enhance your natural radiance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="btn-gradient text-white font-semibold px-8 py-6 text-lg"
              >
                Shop Collection
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-primary !text-black hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-rose-gold">200+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl transform scale-110"></div>
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src={heroModel}
                  alt="Beautiful model showcasing premium cosmetics with rose gold makeup"
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-rose-gold/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 lg:h-20 fill-background"
        >
          <path d="M1200 120L0 16.48V120z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;