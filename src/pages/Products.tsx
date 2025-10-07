import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/shared/Pagination";
import { useGetProducts } from "@/hooks/fetch-hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { i18n } = useTranslation();
  const [page, setPage] = useState(1);

  const { data } = useGetProducts(i18n.language, page);

  const products = data?.data.items ?? [];
  const pagination = data?.data.meta.pagination;


  return (
    <div className="container min-h-[calc(100dvh-80px)] mx-auto px-4">
      {/* Products grid */}
      <div className="py-5 lg:py-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination */}
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.total_pages}
          onPageChange={setPage}
        />
    </div>
  );
};

export default Products;
