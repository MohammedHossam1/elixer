"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetProductsSearch } from "@/hooks/fetch-hooks";
import { useIsMobile } from "@/hooks/use-mobile";
import { IProduct } from "@/types/Index";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const SearchComponent = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(isMobile);
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<IProduct[]>([]);
  const { t, i18n } = useTranslation();
  const { data: searchData, isLoading } = useGetProductsSearch(i18n.language, 1, query);
  // Always open search on mobile
  useEffect(() => {
    if (isMobile) setIsSearchOpen(true);
  }, [isMobile]);
 
  // Close search on click outside (desktop)

  useEffect(() => {
    if (searchData?.data?.items) {
      setFilteredResults(searchData.data.items);
    }
  }, [searchData]);


  return (
    <div className="relative" ref={searchRef}>
      <AnimatePresence initial={false} mode="wait">
        {isSearchOpen ? (
          <motion.div
            key="search-input"
            className="flex items-center gap-2 relative"
          >
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="border-border/60 focus:border-primary/50 w-full lg:w-64"
            />
            {!isMobile && (
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setFilteredResults([]);
                }}
                className="absolute end-1 text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* ✅ Popup results */}
          {query && 
            <motion.ul
              key="results"
              className={clsx(
                "absolute top-full  mt-2 left-0 w-full lg:w-64 bg-background border border-border rounded-xl shadow-xl z-50  max-h-64 overflow-auto"
              )}
            >
              {filteredResults.length > 0 && query ?
                filteredResults.map((item) => (
                  <li key={item.id} className="">
                    <Link
                      to={`/product/${item.slug}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setFilteredResults([]);
                        setQuery("");
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-primary/10 transition-colors"
                    >
                      <img
                        src={item.image || item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm text-foreground">
                          {item.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.price ? `$${item.price}` : ""}
                        </span>
                      </div>
                    </Link>
                  </li>
                )) : isLoading ? <div className="flex items-center  py-5 px-4"> <LoaderCircle className="w-7 animate-spin" /></div> :
                  query &&
                  <li className="py-5 px-4"  >
                    {t("noResults") || "No results found"}
                  </li>

              }
            </motion.ul>
            }
          </motion.div>
        ) : (
          !isMobile && (
            <motion.div
              key="search-icon"
              initial={{ opacity: 0, scaleX: 0.95 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0.95 }}
              className="w-fit"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.2,
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover:!bg-primary/40"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div >
  );
};

export default SearchComponent;
