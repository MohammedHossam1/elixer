import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
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
import { Heart, Menu, ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CartDrawer from "../CartDrawer";
import WishlistDrawer from "../WishlistDrawer";
import SearchComponent from "./Search";

const Header = () => {
    const { totalItems } = useCart();
    const { totalItems: wishlistTotal } = useWishlist();
    const { t, i18n } = useTranslation();
    const navigationItems = [
        { name: t('nav.home'), href: "/" },
        { name: t('nav.shop'), href: "/shop" },
        { name: t('nav.cleansers'), href: "/shop?category=CLEANSERS" },
        { name: t('nav.serums'), href: "/shop?category=SERUMS" },
        { name: t('nav.moisturizers'), href: "/shop?category=MOISTURIZERS" },
        { name: t('nav.contact'), href: "/contact" },
    ];


    return (
        <header className=" bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95 border-b border-border/50">
            <div className="container mx-auto px-2 lg:px-6 ">
                <div className="flex items-center justify-between h-20 ">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet >
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-80">
                                <SheetHeader>
                                    <SheetTitle className="font-script text-3xl text-primary">{t('brand.name')}</SheetTitle>
                                    <SheetDescription>{t('brand.slogan')}</SheetDescription>
                                </SheetHeader>
                                <div className="lg:hidden mt-8 mb-2">
                                    <SearchComponent />
                                </div>
                                <nav className="flex flex-col gap-4 ">
                                    {navigationItems.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="relative flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors"
                                        >
                                            {item.name}

                                        </a>
                                    ))}
                                </nav>

                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-7">
                        {navigationItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="relative flex items-center gap-3 text-sm font-semibold text-foreground hover:text-primary transition-all duration-300 group tracking-wide"
                            >
                                {item.name}

                                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
                            </a>
                        ))}
                    </nav>

                    {/* Logo */}
                    <Link to="/" className="">
                        <h1 className="!font-script text-4xl lg:text-5xl text-primary font-bold tracking-wider">
                            {t('brand.name')}
                        </h1>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-0 lg:gap-5">
                        <div className="max-lg:hidden">
                            <SearchComponent />
                        </div>
                        {/* Language Switcher */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="mx-1">
                                    {i18n.language?.toUpperCase?.() || 'EN'}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align={"end"}>
                                <DropdownMenuLabel className="hidden">{t('lang.english')}/{t('lang.arabic')}/{t('lang.hebrew')}</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => i18n.changeLanguage('en')}>EN - {t('lang.english')}</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => i18n.changeLanguage('ar')}>AR - {t('lang.arabic')}</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => i18n.changeLanguage('he')}>HE - {t('lang.hebrew')}</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* favorite */}
                        {/* Wishlist */}
                        <WishlistDrawer>
                            <Button variant="ghost" size="icon" className="relative hover:bg-accent">
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
                            <Button variant="ghost" size="icon" className="relative hover:bg-accent">
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