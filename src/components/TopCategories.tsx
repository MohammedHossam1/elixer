"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import { useState } from "react";

import p1 from "@/assets/p1.png";

const categories = [
  {
    id: 1,
    name: "CLEANSERS",
    itemCount: 12,
    image: p1,
    alt: "Gentle cleansers for all skin types including foam and gel cleansers",
  },
  {
    id: 2,
    name: "SERUMS",
    itemCount: 18,
    image: p1,
    alt: "Advanced treatment serums with active ingredients for targeted skin concerns",
  },
  {
    id: 3,
    name: "MOISTURIZERS",
    itemCount: 15,
    image: p1,
    alt: "Hydrating moisturizers for day and night skincare routines",
  },
];

const TopCategories = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // 🔹 sync carousel state
  const handleApi = (api: CarouselApi) => {
    setApi(api);
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-backgroun overflow-x-hiddend">
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

        {/* Categories Carousel */}
        <Carousel
          setApi={handleApi}
          opts={{ align: "start", loop: false }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="basis-1/2 md:basis-1/3 py-10"
              >
                <div className="group text-center cursor-pointer transition-all duration-300 hover:scale-105">
                  {/* Circle Image */}
                  <div className="relative mb-6">
                    <div className="w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 mx-auto rounded-full bg-gradient-to-br from-muted/30 to-muted/60 p-6 sm:p-8 transition-all duration-300 group-hover:shadow-elegant">
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={category.image}
                          alt={category.alt}
                          className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    {/* Decoration */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-primary/20 rounded-full blur-sm"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 bg-rose-gold/30 rounded-full blur-sm"></div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <h4 className="text-xl lg:text-2xl font-bold text-foreground uppercase tracking-wide ">
                      {category.name}
                    </h4>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

        </Carousel>

        {/* 🔹 Dots Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                current === index ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Explore our scientifically-formulated skincare range, each category
            designed to target specific skin concerns and deliver visible
            results.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
