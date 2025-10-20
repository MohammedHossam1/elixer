// components/shared/Pagination.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { i18n } = useTranslation();
  if (totalPages <= 1) return null;
  const lang = i18n.language
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* Prev */}
      <button
        onClick={() =>{
          onPageChange(currentPage - 1)
          scrollTo(0, 0)
        }}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft size={16} className={lang === "en" ? "" : "rotate-180"} />
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => {
            onPageChange(page)
            scrollTo(0, 0)
          }}
          className={`px-3 py-1 border rounded-lg ${currentPage === page
            ? "bg-primary text-white border-primary"
            : "hover:bg-gray-100"
            }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() =>{
          onPageChange(currentPage + 1)
          scrollTo(0, 0)
        }}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronRight size={16} className={lang === "en" ? "" : "rotate-180"}/>
      </button>
    </div>
  );
};

export default Pagination;
