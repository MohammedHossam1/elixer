import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import customer1 from "@/assets/customer-1.jpg";
import customer2 from "@/assets/customer-2.jpg";
import customer3 from "@/assets/customer-3.jpg";
import customer4 from "@/assets/customer-4.jpg";
import customer5 from "@/assets/customer-5.jpg";
import customer6 from "@/assets/customer-6.jpg";
import customer7 from "@/assets/customer-7.jpg";
import customer8 from "@/assets/customer-8.jpg";

const customerImages = [
  customer1, customer2, customer3, customer4,
  customer5, customer6, customer7, customer8
];

const testimonials = [
  {
    id: 1,
    name: "Izabel Watt",
    location: "Michigan",
    rating: 4,
    text: "I love my lash tint! I don't have extremely blonde lashes, but I do like that they can be even darker than they are. It makes my eyes stand out more and I love the way it looks! Now, I just need to add on a bit of mascara for length and I am set.",
    avatar: customer1
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "California",
    rating: 5,
    text: "The lipstick collection is absolutely amazing! The colors are so vibrant and long-lasting. I've never found products that make me feel so confident and beautiful. The quality is outstanding!",
    avatar: customer2
  },
  {
    id: 3,
    name: "Emma Davis",
    location: "New York",
    rating: 5,
    text: "This skincare routine completely transformed my skin! Within just two weeks, I noticed a significant improvement in texture and glow. I can't recommend these products enough.",
    avatar: customer3
  },
  {
    id: 4,
    name: "Sofia Martinez",
    location: "Texas",
    rating: 4,
    text: "The eyeshadow palette is incredible! The pigmentation is perfect and the colors blend so smoothly. It's become my go-to for both everyday and special occasion looks.",
    avatar: customer4
  }
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-16 lg:py-24 bg-muted/30 overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-lg lg:text-xl font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            TESTIMONIAL
          </h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What People Say?
          </h3>
          {/* Decorative wavy line */}
          <div className="flex justify-center">
            <svg width="120" height="20" viewBox="0 0 120 20" className="text-primary">
              <path 
                d="M10 10 Q30 2, 50 10 Q70 18, 90 10 Q110 2, 110 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Testimonials Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            
            {/* Customer Photos Grid */}
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-4">
                {customerImages.map((image, index) => (
                  <div 
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-muted hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={`Customer ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* Quote Icon */}
              <div className="flex justify-start">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Customer Info */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-foreground">{current.name}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">{current.location}</p>
                  </div>
                </div>
                {/* Star Rating */}
                <div className="flex items-center space-x-1 sm:ml-auto">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        star <= current.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed">
                "{current.text}"
              </blockquote>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6">
                <Button
                  variant="ghost"
                  onClick={prevTestimonial}
                  className="flex items-center space-x-1 sm:space-x-2 text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-semibold text-sm sm:text-base">PREV</span>
                </Button>

                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial 
                          ? 'bg-primary' 
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  onClick={nextTestimonial}
                  className="flex items-center space-x-1 sm:space-x-2 text-muted-foreground hover:text-foreground"
                >
                  <span className="font-semibold text-sm sm:text-base">NEXT</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;