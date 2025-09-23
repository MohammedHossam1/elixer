import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    "Customer Care": [
      { name: "Contact Us", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Shipping & Returns", href: "#" },
      { name: "Size Guide", href: "#" },
      { name: "Track Your Order", href: "#" },
    ],
    "About Shades": [
      { name: "Our Story", href: "#" },
      { name: "Sustainability", href: "#" },
      { name: "Press", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Reviews", href: "#" },
    ],
    "Quick Links": [
      { name: "New Arrivals", href: "#" },
      { name: "Best Sellers", href: "#" },
      { name: "Sale", href: "#" },
      { name: "Gift Cards", href: "#" },
      { name: "Loyalty Program", href: "#" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="font-script text-4xl text-primary font-bold mb-2">
                ELIXIR
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Discover your natural beauty with our premium cosmetics collection.
                Crafted with love and the finest ingredients for your radiant glow.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-rose-gold flex-shrink-0" />
                <span className="text-muted-foreground">123 Beauty Street, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-rose-gold flex-shrink-0" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-rose-gold flex-shrink-0" />
                <span className="text-muted-foreground">hello@ELIXIR.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="font-semibold text-lg text-foreground">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h4 className="font-semibold text-lg text-foreground mb-2">
                Stay in the loop
              </h4>
              <p className="text-muted-foreground">
                Subscribe for exclusive offers and beauty tips
              </p>
            </div>

            <div className="flex w-full lg:w-auto max-w-sm gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1"
              />
              <Button className="btn-gradient text-white px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              Made with  <Heart className="h-4 w-4 text-rose-gold fill-rose-gold" />by

              <Link to="https://qadi-tech.com" target="_blank">Qadi-tech</Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

          <div className="text-center mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © 2025 Qadi-tech . All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;