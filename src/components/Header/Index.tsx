"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useGetCategories } from "@/hooks/fetch-hooks";
import { ISettings } from "@/types/Index";
import clsx from "clsx";
import { Heart, Menu, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import CartDrawer from "../CartDrawer";
import WishlistDrawer from "../WishlistDrawer";
import Image from "../shared/Image";
import SearchComponent from "./Search";

const Header = ({ data: settings }: { data: ISettings }) => {
  const { totalItems } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();
  const { t, i18n } = useTranslation();
  const { data } = useGetCategories(i18n.language);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ حالة التحكم في إغلاق وفتح الـ Sheet
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.shop"), href: "/shop" },
    ...(Array.isArray(data?.data)
      ? data.data.slice(0, 4).map((cat: { id: number; name: string }) => ({
          name: cat.name.toUpperCase(),
          href: `/shop?category=${encodeURIComponent(cat.id)}`,
          categoryId: String(cat.id),
        }))
      : []),
    { name: t("nav.contact"), href: "/contact" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isActive = (item: any) => {
    if (item.href === "/" && location.pathname === "/") return true;
    if (item.href === "/contact" && location.pathname.startsWith("/contact"))
      return true;
    if (item.href === "/shop" && location.pathname.startsWith("/shop") && !activeCategory)
      return true;
    if (item.categoryId && activeCategory === item.categoryId) return true;
    return false;
  };

  return (
    <header className="fixed inset-x-0 z-40 bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95 border-b border-border/50 shadow">
      <div className="container mx-auto px-2 lg:px-6">
        <div
          className={`flex items-center justify-between ${
            isScrolled ? "h-16" : "h-20"
          } transition-all duration-300`}
        >
          {/* ✅ Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-8 w-8" />
                </Button>
              </SheetTrigger>

              <SheetContent side={i18n.language === "en" ? "left" : "right"} className="w-80">
                <SheetHeader>
                  <SheetTitle className="font-script text-3xl text-primary">
                    <Link to="/" onClick={() => setIsOpen(false)}>
                      <Image
                        src={settings?.logo}
                        alt="logo"
                        width={100}
                        height={100}
                        className="mx-auto"
                      />
                    </Link>
                  </SheetTitle>
                  <SheetDescription>{t("brand.slogan")}</SheetDescription>
                </SheetHeader>

                <div className="lg:hidden mt-8 mb-2">
                  <SearchComponent />
                </div>

                <nav className="flex flex-col gap-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={clsx(
                        "relative uppercase flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors",
                        isActive(item) && "text-primary font-bold"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-7">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  "relative flex items-center gap-3 text-sm font-semibold text-foreground hover:text-primary transition-all duration-300 group tracking-wide",
                  isActive(item) && "text-primary"
                )}
              >
                {item.name}
                <span
                  className={clsx(
                    "absolute -bottom-2 start-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300",
                    isActive(item) && "w-full"
                  )}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link to="/" className="">
            <Image
              src={settings?.logo}
              alt="logo"
              width={100}
              height={100}
              className="w-24 p-4 lg:w-32 "
            />
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-0 lg:gap-5">
            <div className="max-lg:hidden">
              <SearchComponent />
            </div>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mx-1 hover:!bg-primary/40"
                >
                  {i18n.language?.toUpperCase?.() || "EN"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={"end"}>
                <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
                  EN - {t("lang.english")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => i18n.changeLanguage("ar")}>
                  AR - {t("lang.arabic")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => i18n.changeLanguage("he")}>
                  HE - {t("lang.hebrew")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <WishlistDrawer>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:!bg-primary/40"
              >
                <Heart className="h-5 w-5 text-foreground/70 hover:text-primary transition-colors" />
                {wishlistTotal > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-black text-xs rounded-full flex items-center justify-center font-bold shadow-sm">
                    {wishlistTotal}
                  </span>
                )}
              </Button>
            </WishlistDrawer>

            {/* Shopping Cart */}
            <CartDrawer>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:!bg-primary/40"
              >
                <ShoppingBag className="h-5 w-5 text-foreground/70 hover:text-primary transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold shadow-sm">
                    {totalItems}
                  </span>
                )}
              </Button>
            </CartDrawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
