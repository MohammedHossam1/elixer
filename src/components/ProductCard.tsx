import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isOnSale?: boolean;
  inStock?: boolean;
  quantity?: number;
}

const ProductCard = ({
  id,
  name,
  category,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  isOnSale = false,
  inStock = true,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const isWishlisted = isInWishlist(id);
  const { t } = useTranslation('')
  const handleAddToCart = () => {
    if (!inStock) return;

    addItem({
      id,
      name,
      price,
      image
    });

    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(id);
      toast({
        title: "Removed from wishlist",
        description: `${name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({ id, name, price, image, category });
      toast({
        title: "Added to wishlist",
        description: `${name} has been added to your wishlist.`,
      });
    }
  };

  return (
    <div
      className="group card-elegant rounded-xl overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 start-3 z-10 flex flex-col gap-2">
        {isOnSale && (
          <Badge className="bg-primary max-lg:text-[9px text-primary-foreground font-semibold w-fit">
            SALE
          </Badge>
        )}
        {!inStock && (
          <Badge variant="secondary" className="font-semibold max-lg:text-[9px]">
            OUT OF STOCK
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        className={`absolute rounded-xl p-2 flex items-center justify-center  top-3 end-3 z-50 w-8 h-8 bg-white/80 hover:bg-white transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
        onClick={handleToggleWishlist}
      >
        <Heart
          className={`h-4 w-4 transition-colors ${isWishlisted ? "fill-primary text-primary" : "text-muted-foreground"
            }`}
        />
      </button>

      {/* Product Image */}
      <Link to={`/product/${id}`} className="block relative aspect-square overflow-hidden bg-gradient-to-br from-muted/20 to-muted/5">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
          }`}></div>
      </Link>

      {/* Product Info */}
      <div className="p-2 lg:p-4 space-y-1 lg:space-y-3 flex flex-col justify-between ">
        {/* Category */}
        <div className="text-[9px] lg:text-xs uppercase tracking-wide text-rose-gold font-semibold">
          {category}
        </div>

        {/* Name */}
        <h3 className="font-semibold text-foreground line-clamp-1 leading-tight">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(rating)
                    ? "fill-rose-gold text-rose-gold"
                    : "text-muted"
                  }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-base lg:text-lg font-bold text-foreground">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full transition-all  duration-300  ${inStock
              ? "btn-gradient text-white hover:shadow-glow"
              : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
        >
          <ShoppingBag className="size-4 mr-2" />
          {inStock ? t("addToCart") : t("outOfStock")}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;