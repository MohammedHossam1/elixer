import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Image from "./shared/Image";
import { ITestimonial } from "@/types/Index";


const Testimonials = ({ data }: { data: ITestimonial[] }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  if (!data.length) return null
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % data.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + data.length) % data.length);
  };

  const current = data[currentTestimonial];
  return (
    <section className="py-10 lg:py-12 bg-muted/30 overflow-x-hidden">
      <div className="container mx-auto px-2 lg:px-6 ">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-lg lg:text-xl font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {t('testimonials.title')}
          </h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('testimonials.description')}
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
        <div className=" mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

            {/* Customer Photos Grid */}
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-4">
                {data.map((item, index) => (
                  <button 
                  onClick={() => setCurrentTestimonial(index)}
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-muted hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <Image
                      src={item.image}
                      alt={`Customer ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className=" flex justify-between items-center gap-6 ">
                {/* Customer Info */}
                <div className="flex items-center gap-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={current?.image}
                      key={current?.name}
                      alt={current.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-foreground">{current.name}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">{current.rate}</p>
                  </div>

                </div>
                {/* Quote Icon */}
                <div className="flex justify-start">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>
                </div>


                {/* Star Rating */}
                <div className="flex items-center justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= current.rate
                        ? 'text-yellow-400 fill-current'
                        : 'text-muted-foreground'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-base  sm:text-lg lg:text-xl text-foreground max-lg:text-center leading-relaxed">
                "{current.description}"
              </blockquote>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6">
                <Button
                  variant="ghost"
                  onClick={prevTestimonial}
                  className="flex items-center space-x-1 sm:space-x-2 text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className={`w-4 h-4 sm:w-5 sm:h-5 ${lang != "en" && "rotate-180"}`} />
                  <span className="font-semibold text-sm sm:text-base">{t('testimonials.prev')}</span>
                </Button>

                <div className="flex gap-x-2">
                  {data.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
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
                  <span className="font-semibold text-sm sm:text-base">{t('testimonials.next')}</span>
                  <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5   ${lang != "en" && "rotate-180"}`} />
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