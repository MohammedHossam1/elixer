import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories, products } from "@/data/Index";
import { cubicBezier, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

// Define IProductShowCase interface


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: cubicBezier(0.16, 1, 0.3, 1) },
  },
};

const ProductShowcase = () => {
  const { t, i18n } = useTranslation();
  const isArOrHe = i18n.language === 'ar' || i18n.language === 'he';
  const getFilteredProducts = (category: string) => {
    if (category === "all") return products;
    return products.filter(
      (product) => product.category.toLowerCase() === category
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-background overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            {t("productShowcase.heading.title")}{" "}
            <span className={`text-primary ${!isArOrHe && "font-script"}`}>{t("productShowcase.heading.brand")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("productShowcase.description")}
          </p>
        </motion.div>

        {/* Product Tabs */}
        <Tabs defaultValue="all" dir={isArOrHe ? "rtl" : "ltr"} className="w-full">
          <TabsList className="bg-muted/50 h-auto block max-w-4xl mx-auto sm:w-fit mb-5">
            <Carousel opts={{ align: "start" }}>
              <CarouselContent className="pl-3">
                {categories.map((category) => (
                  <CarouselItem key={category.id} className="basis-auto pl-1">
                    <TabsTrigger
                      value={category.id}
                      className="text-xs sm:text-sm border font-medium data-[state=active]:bg-primary data-[state=active]:text-white px-2 py-3 sm:px-4"
                    >
                      <span className="">{t(`productShowcase.tabs.${category.id}`)}</span>
                      <span className="ms-1 text-xs hidden sm:inline">
                        ({category.count})
                      </span>
                    </TabsTrigger>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
              >
                {getFilteredProducts(category.id).map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
          >
            {t("productShowcase.cta")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;