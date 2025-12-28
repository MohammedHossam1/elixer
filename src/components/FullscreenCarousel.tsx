import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

// Import images
import { IHeroSlider } from "@/types/Index";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import placeholder from "../assets/banner1.jpg";
import Image from "./shared/Image";


const FullscreenCarousel = ({ data }: { data: IHeroSlider[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t } = useTranslation();
  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying && data.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);
  const finalData = data.length > 0 ? data : [
    {
      image: placeholder,
      title: "",
      description: "",
      link: ""
    }
  ]
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? finalData.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === finalData.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative w-full  h-[70vh] sm:h-[calc(100dvh)] pt-20 overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-full">
        {finalData.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentIndex
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
              }`}
          >
            <Image
              src={image.image}
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
        <div className="container mx-auto px-2 lg:px-6  sm:px-6 animate-fade-in lg:space-y-10">
          <h1 className="text-2xl sm:text-4xl  lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 font-script leading-tight">
            {finalData[currentIndex]?.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto px-4">
            {finalData[currentIndex]?.description}
          </p>
          <div className="flex  gap-3 sm:gap-4 justify-center px-4 ">
            <Link to="/shop">
              <Button
                size="lg"
                className="btn-gradient text-white font-semibold px-6 sm:px-8 py-4 sm:py-6  text-base sm:text-lg "
              >
                {t("shopCollection")}
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-black  px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg "
              >
                {t("contactUs")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4  lg:left-8 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-8 h-8 z-20 rounded-lg flex items-center justify-center"
        onClick={goToPrevious}
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-8 h-8 z-20 rounded-lg flex items-center justify-center"
        onClick={goToNext}
        aria-label="Next Slide"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-20  left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {finalData.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
              ? 'bg-white scale-125'
              : 'bg-white/50 hover:bg-white/75'
              }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Wave Shape at Bottom */}
      <div className="absolute -bottom-1  left-0 w-full z-10">
        <svg
          className="w-full h-auto block"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,96L48,90.7C96,85,192,75,288,69.3C384,64,480,64,576,69.3C672,75,768,85,864,85.3C960,85,1056,75,1152,69.3C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="white"
            className="transition-all duration-1000"
            aria-label="Wave Shape at Bottom"
          />
        </svg>
      </div>

    </section>
  );
};

export default FullscreenCarousel;