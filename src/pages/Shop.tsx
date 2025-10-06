
import FilteredProductsCategories from "@/components/shared/FilteredProductsCategories";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";



const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category"); 
  const { t } = useTranslation();




  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="text-start mb-12">
          <h1 className="font-script text-5xl lg:text-6xl text-primary mb-4">
            {t("shop.title")}
          </h1>
          <p className="text-muted-foreground ">
            {t("shop.description")}
          </p>
        </div>

        <FilteredProductsCategories
          params={category}
        />
      </main>
    </div>
  );
};

export default Shop;
