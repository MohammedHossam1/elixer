import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/hooks/use-toast";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "./shared/Image";
import { useAddToCart } from "@/hooks/useAddToCart"; // تأكد إن المسار صح

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: {
    id: number;
    name: string;
  };
  quantity?: number; // في حالة كانت متوفرة
}
interface WishlistDrawerProps {
  children: React.ReactNode;
}

const WishlistDrawer = ({ children }: WishlistDrawerProps) => {
  const { items, removeItem } = useWishlist();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const { addToCart } = useAddToCart();

  const handleAddToCart = (item: WishlistItem) => {
    // 👇 نمرر الكمية (أو 1 لو غير محددة)
    const quantity = item.quantity ?? 1;

    // نحاول نضيف للسلة
    const result = addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      slug: item.category.name,
      quantity,
    });

    // addToCart ممكن ترجّع true/false عشان نعرف العملية تمت ولا لأ
    if (result) {
      removeItem(item.id);
      toast({
        title: t("addedToCart", { name: item.name }),
        description: t("addedToCartDescription", { name: item.name }),
        className: "border-2 border-green-500",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={i18n.language === "en" ? "right" : "left"}
        className="w-full sm:w-96"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            {t("wishlistTitle")}
          </SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? t("wishlistEmpty")
              : t("wishlistCount", { count: items.length })}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Heart className="h-16 w-16 text-muted mb-4" />
              <p className="text-muted-foreground">{t("wishlistEmpty")}</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-lg border border-border bg-card"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.category?.name}
                      </p>
                      <p className="text-primary font-bold mt-2">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleAddToCart(item)}
                        className="h-8 w-8"
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <SheetClose className="w-full">
                <div className="pt-4 border-t">
                  <Button className="w-full btn-gradient">
                    {t("continueShopping")}
                  </Button>
                </div>
              </SheetClose>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WishlistDrawer;
