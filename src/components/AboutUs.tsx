"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl lg:text-5xl font-bold text-foreground mb-4"
          >
            About <span className="text-primary font-script">ELIXIR</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-lg text-primary font-medium"
          >
            مجموعة منتجات متكاملة للعناية بجمالك
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-base text-primary font-medium"
          >
            Advanced Rituals. Visible Results ✨
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6 origin-center"
          >
            <svg
              width="120"
              height="20"
              viewBox="0 0 120 20"
              className="text-primary"
            >
              <path
                d="M10 10 Q30 2, 50 10 Q70 18, 90 10 Q110 2, 110 10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                Complete Skincare System
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-base lg:text-lg">
                  ELIXIR provides a comprehensive skincare system for healthy,
                  radiant skin. Our collection includes gentle cleansers (غسول),
                  hydrating moisturizers (مرطب), broad-spectrum sunscreens (واقي
                  شمس), and targeted treatment serums.
                </p>
                <p className="text-base lg:text-lg">
                  Each product addresses specific skin concerns including acne,
                  dark spots, fine lines, and dryness. Our
                  dermatologist-approved formulas show measurable improvements
                  that customers see within the first week of use.
                </p>
                <p className="text-base lg:text-lg">
                  With convenient delivery nationwide and personalized skincare
                  consultation via Instagram, we make professional-grade
                  skincare accessible for achieving your healthiest skin goals.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="btn-gradient text-white font-semibold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg"
                >
                  Shop Skincare Range
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg"
                >
                  See Skin Results
                </Button>
              </div>
            </motion.div>

            {/* Stats & Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center card-elegant p-6 rounded-2xl">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    5K+
                  </div>
                  <div className="text-sm lg:text-base text-muted-foreground">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center card-elegant p-6 rounded-2xl">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    50+
                  </div>
                  <div className="text-sm lg:text-base text-muted-foreground">
                    Premium Products
                  </div>
                </div>
                <div className="text-center card-elegant p-6 rounded-2xl">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    3+
                  </div>
                  <div className="text-sm lg:text-base text-muted-foreground">
                    Years of Excellence
                  </div>
                </div>
                <div className="text-center card-elegant p-6 rounded-2xl">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    100%
                  </div>
                  <div className="text-sm lg:text-base text-muted-foreground">
                    Cruelty-Free
                  </div>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="card-elegant p-6 lg:p-8 rounded-2xl">
                <h4 className="text-xl font-bold text-foreground mb-4">
                  Our Mission
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  "To deliver professional-grade skincare solutions that
                  transform skin health, providing visible results through
                  scientifically-backed formulas and personalized care
                  routines."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
