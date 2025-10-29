
import FilteredProductsCategories from "@/components/shared/FilteredProductsCategories";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import Pagination from "@/components/shared/Pagination";
import { useEffect, useState } from "react";
import { useGetProducts } from "@/hooks/fetch-hooks";


const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(category || "0");

  const { data: productsRes, isLoading } = useGetProducts(i18n.language, page, activeCategory == "0" ? "" : activeCategory);
  const products = productsRes?.data?.items;
  const pagination = productsRes?.data?.meta.pagination;

  useEffect(() => {
    if (category) setActiveCategory(category);
  }, [category]);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-2 lg:px-6 pb-10 pt-32">
        <div className="text-start mb-12">
          <h1 className="font-script text-5xl lg:text-6xl text-primary mb-4">
            {t("shop.title")}
          </h1>
          <p className="text-muted-foreground ">
            {t("shop.description")}
          </p>
        </div>

        <FilteredProductsCategories
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          products={products || []}
          isLoading={isLoading}
          currentPage={page}
          onPageChange={setPage}
        />
        {/* Pagination */}
        {pagination && (
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            onPageChange={setPage}
          />
        )}
      </main>
    </div>
  );
};

export default Shop;
