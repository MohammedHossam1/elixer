import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SearchComponent = () => {
    const searchRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const [isSearchOpen, setIsSearchOpen] = useState(!isMobile);

    // Always open search on mobile, otherwise use toggle logic
    useEffect(() => {
        if (isMobile) {
            setIsSearchOpen(true);
        }
    }, [isMobile]);

    // Only add click outside logic on desktop
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
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, scaleX: 0.95 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.1 }}
                    >
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="w-40 lg:w-64 border-border/60 focus:border-primary/50"
                            autoFocus
                            // Only close on blur if not mobile
                            onBlur={() => { if (!isMobile) setIsSearchOpen(false); }}
                        />
                    </motion.div>
                ) : (
                    // Only show the search icon button on desktop
                    !isMobile && (
                        <motion.div
                            key="search-icon"
                            initial={{ opacity: 0, scaleX: 0.95 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            exit={{ opacity: 0, scaleX: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.2 }}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <Search className="h-2 w-2" />
                            </Button>
                        </motion.div>
                    )
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchComponent;