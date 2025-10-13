"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const SearchComponent = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(isMobile);
  const { t } = useTranslation();

  // Always open search on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSearchOpen(true);
    }
  }, [isMobile]);

  // Click outside closes on desktop
  useEffect(() => {
    if (isMobile || !isSearchOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [isSearchOpen, isMobile]);

  return (
    <div className="relative" ref={searchRef}>
      <AnimatePresence initial={false} mode="wait">
        {isSearchOpen ? (
          <motion.div
            key="search-input"
            className="flex items-center gap-2 relative"
            initial={{ opacity: 0, scaleX: 0.95 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.1,
            }}
          >
            <Input
                   placeholder={t("searchPlaceholder")}
              className="w-40 lg:w-64 border-border/60 focus:border-primary/50 max-md:w-full pr-8"
            />

            {/* Close Button Inside Input */}
            {!isMobile && (
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </motion.div>
        ) : (
          // Only show the search icon on desktop
          !isMobile && (
            <motion.div
              key="search-icon"
              initial={{ opacity: 0, scaleX: 0.95 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0.95 }}
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
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchComponent;
