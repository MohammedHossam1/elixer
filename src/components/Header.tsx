import { useState } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);

  const navigationItems = [
    { name: "HOME", href: "#"},
    { name: "CLEANSERS", href: "#cleansers"},
    { name: "SERUMS", href: "#serums"},
    { name: "SUNSCREEN", href: "#sunscreen"},
    { name: "MOISTURIZERS", href: "#moisturizers"},
    { name: "MORE", href: "#more"},
  ];

  return (
    <header className=" bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95 border-b border-border/50">
      <div className="container mx-auto px-2 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle className="font-script text-3xl text-primary">ELIXIR</SheetTitle>
                <SheetDescription>Professional Skincare Solutions</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
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
          <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none">
              <h1 className="font-script text-4xl lg:text-5xl text-primary font-bold tracking-wider">
                ELIXIR
              </h1>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-0 lg:gap-5">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-40 lg:w-64 border-border/60 focus:border-primary/50"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* User Account */}
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <User className="h-5 w-5 text-foreground/70 hover:text-primary transition-colors" />
            </Button>

            {/* Shopping Cart */}
            <Button variant="ghost" size="icon" className="relative hover:bg-accent">
              <ShoppingBag className="h-5 w-5 text-foreground/70 hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;