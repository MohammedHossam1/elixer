import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/contexts/WishlistContext";
import { useTranslation } from "react-i18next";
import { IProduct } from "@/types/Index";
import Image from "./shared/Image";
import { useAddToCart } from "@/hooks/useAddToCart";
import toast from "react-hot-toast";

const ProductCard = ({
  id,
  name,
  category,
  price,
  discount,
  slug,
  image,
  rate_count,
  price_after_discount,
  quantity,
}: IProduct) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useAddToCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(id);
  const { t } = useTranslation();
  console.log("rate_count", rate_count);
  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(id);
      toast.error(`${name} has been removed from your wishlist.`,
        { duration: 3000 });
    } else {
      addToWishlist({ id, name, price, image, category, slug, quantity ,price_after_discount});
      toast.success(`${name} has been added to your wishlist.`, { duration: 3000 });
    }
  };

  const finalPrice = (price - (price * Number(discount)) / 100).toFixed(2);

  return (
    <div
      className="group card-elegant rounded-xl overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 🏷️ Badges */}
      <div className="absolute top-3 start-3 z-10 flex flex-col gap-2">
        {Number(discount) > 0 && (
          <Badge className="bg-primary text-primary-foreground font-semibold w-fit text-[10px]">
            {t("sale")}
          </Badge>
        )}
        {quantity === 0 && (
          <Badge variant="secondary" className="font-semibold text-[10px]">
            {t("outOfStock")}
          </Badge>
        )}
      </div>

      {/* ❤️ Wishlist */}
      <button
        className={`absolute rounded-xl p-2 flex items-center justify-center top-3 end-3 z-50 w-8 h-8 bg-white/80 hover:bg-white transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
        onClick={handleToggleWishlist}
      >
        <Heart
          className={`h-4 w-4 transition-colors ${isWishlisted ? "fill-primary text-primary" : "text-muted-foreground"
            }`}
        />
      </button>

      {/* 🖼️ Product Image */}
      <Link
        to={`/product/${slug}`}
        className="block relative aspect-square overflow-hidden bg-gradient-to-br from-muted/20 to-muted/5"
      >
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div
          className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
            }`}
        ></div>
      </Link>

      {/* ℹ️ Info */}
      <div className="p-3 lg:p-4 space-y-2 flex flex-col justify-between">
        <div className="text-[9px] lg:text-xs uppercase tracking-wide text-rose-gold font-semibold">
          {category.name}
        </div>

        <Link
          to={`/product/${slug}`}
          className="font-semibold hover:text-primary text-foreground line-clamp-1 leading-tight"
        >
          {name}
        </Link>

        {/* ⭐ Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.floor(rate_count)
                ? "fill-rose-gold text-rose-gold"
                : "text-muted"
                }`}
            />
          ))}
        </div>

        {/* 💰 Price */}
        <div className="flex items-center gap-2">
          <span className="text-base lg:text-lg font-bold text-foreground">
            ${finalPrice}
          </span>
          {Number(discount) > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              ${Number(price).toFixed(2)}
            </span>
          )}
        </div>

        <Button
          onClick={() => addToCart({ id, name, price, image, slug, quantity ,price_after_discount})}
          disabled={quantity === 0}
          className={`w-full transition-all duration-300 ${quantity === 0
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "btn-gradient text-white hover:shadow-glow"
            }`}
        >
          <ShoppingBag className="size-4 mr-2" />
          {quantity === 0 ? t("outOfStock") : t("addToCart")}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
