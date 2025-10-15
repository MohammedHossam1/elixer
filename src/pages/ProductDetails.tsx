import Image from "@/components/shared/Image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWishlist } from "@/contexts/WishlistContext";
import { useGetSingleProduct } from "@/hooks/fetch-hooks";
import { useToast } from "@/hooks/use-toast";
import { useAddToCart } from "@/hooks/useAddToCart";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { slug } = useParams();
  const { i18n, t } = useTranslation();
  const { toast } = useToast();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { data } = useGetSingleProduct(slug, i18n.language);
  const product = data?.data
  const isWishlisted = isInWishlist(product?.id);
  const isArOrHe = i18n.language === 'ar' || i18n.language === 'he';
  const [quantity, setQuantity] = useState(1);

  const galleryImages = [
    ...(product?.image
      ? [{ file_path: product?.image, file_name: product.name || "Main Image" }]
      : []),
    ...(Array.isArray(product.attachments) ? product.attachments : []),
  ];
  const { addToCart } = useAddToCart();

  const [selectedImage, setSelectedImage] = useState(0);


  const handleAddToCart = () => {
    if (product.quantity == 0) return;
    addToCart(
      product?.id,
      product.name,
      Number(product.price),
      product?.image,
      product.quantity,
      quantity
    );

  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast({
        title: t("removedFromWishlist"),
        description: `${product.name} ${t("removedFromWishlistDesc")}`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        category: product.category,
      });
      toast({
        title: t("addedToWishlist"),
        description: `${product.name} ${t("addedToWishlistDesc")}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-6xl mx-auto ">
      <main className="container mx-auto px-2 lg:px-6  py-32">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className={`h-4 w-4 ${isArOrHe && "rotate-180"}`} />
            {t("back")}
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 x ">
          {/* Product Images */}
          <div className="flex gap-4 max-lg:flex-col">
            <div className=" overflow-hidden h-[500px]   rounded-xl  bg-gradient-to-br from-muted/20 to-muted/5">
              <Image
                src={galleryImages[selectedImage]?.file_path}
                alt={product.name}
                key={galleryImages[selectedImage]?.file_path}
                className="w-full h-full object-contain bg-accent"
              />
            </div>
            {/* Image Thumbnails */}
            <div className="flex gap-3 lg:flex-col">
              {galleryImages.length > 0 &&
                galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? "border-primary" : "border-muted"
                      }`}
                  >
                    <Image
                      src={image.file_path}
                      alt={`${image.file_name || product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
            </div>
          </div>
          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {Number(product.discount) > 0 && (
                <Badge className="bg-primary text-primary-foreground">{t("sale")}</Badge>
              )}
            </div>
            {/* Category */}
            <div className="text-sm uppercase tracking-wide text-rose-gold font-semibold">
              {product.category.name}
            </div>
            <div className="flex gap-6 items-center ">
              {/* Name */}
              <h1 className="text-3xl font-bold text-foreground">
                {product.name}
              </h1>
              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating)
                        ? "fill-rose-gold text-rose-gold"
                        : "text-muted "
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-base lg:text-lg font-bold text-foreground">
                ${((product.price - (product.price * Number(product.discount) / 100))).toFixed(2)}
              </span>
              {product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  ${Number(product.price).toFixed(2)}
                </span>
              )}
            </div>
            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold">{t("quantity")}:</span>
                <div className="flex items-center border border-input rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 btn-gradient text-white hover:shadow-glow"
                  size="lg"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {t("addToCart")} - ${(Number(product.price) * quantity).toFixed(2)}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleWishlist}
                  className={isWishlisted ? "border-primary text-primary" : ""}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details" className="w-full ">
            <TabsList className="grid lg:w-1/2 grid-cols-2 ">
              <TabsTrigger value="details" className="w-full">{t("details")}</TabsTrigger>
              <TabsTrigger value="howto" className="w-full">How to Use</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <div className="card-elegant rounded-xl p-6">
                <h3 className="font-semibold mb-4">Product Benefits</h3>
                {/* <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-rose-gold rounded-full"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul> */}
              </div>
            </TabsContent>
            {/* howToUse */}
            <TabsContent value="howto" className="mt-6">
              <div className="card-elegant rounded-xl p-6">
                <h3 className="font-semibold mb-4">How to Use</h3>
                {/* <p className="text-muted-foreground leading-relaxed">
                  {product.howToUse}
                </p> */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};
export default ProductDetail;