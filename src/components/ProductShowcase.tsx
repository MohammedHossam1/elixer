import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FilteredProductsCategories from "./shared/FilteredProductsCategories";
import { Link } from "react-router-dom";
// Define IProductShowCase interface


const ProductShowcase = () => {
  const { t, i18n } = useTranslation();
  const isArOrHe = i18n.language === 'ar' || i18n.language === 'he';



  return (
    <section className="py-10 lg:py-12 bg-background overflow-x-hidden">
      <div className="container mx-auto px-2 lg:px-6 ">
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
        <FilteredProductsCategories params="0" centered />

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Link to="/products" className="mt-5 block"> 
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-base"
            >
              {t("productShowcase.cta")}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;