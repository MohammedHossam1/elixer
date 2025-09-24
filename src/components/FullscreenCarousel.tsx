import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import images
import heroModel from "@/assets/banner1.jpg";
import heroMode2 from "@/assets/banner2.jpg";

const carouselImages = [
  {
    src: heroModel,
    title: "Discover Your Natural Beauty",
    subtitle: "Premium cosmetics crafted with love",
  },
  {
    src: heroMode2,
    title: "Enhance Your Radiance",
    subtitle: "Professional makeup for every occasion",
  }
];

const FullscreenCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[calc(100dvh-80px)] overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-full">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
        <div className="container mx-auto px-4 sm:px-6 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 font-script leading-tight">
            {carouselImages[currentIndex].title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto px-4">
            {carouselImages[currentIndex].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button 
              size="lg" 
              className="btn-gradient text-white font-semibold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg hover-scale"
            >
              Shop Collection
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-black hover:bg-white hover:text-primary px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg hover-scale"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4  lg:left-8 max-lg:bottom-0 lg:top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 z-20"
        onClick={goToPrevious}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 lg:right-8 max-lg:bottom-0 lg:top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 z-20"
        onClick={goToNext}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

 
    </section>
  );
};

export default FullscreenCarousel;