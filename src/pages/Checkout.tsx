import CouponCheck from "@/components/Checkout/CouponCheck";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useGetAdresses, usePostCheckout } from "@/hooks/fetch-hooks";
import { checkoutSchema } from "@/schemas";
import { IAdrress } from "@/types/Index";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle, Shield, Truck } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import z from "zod";
const Checkout = () => {
  const { t, i18n } = useTranslation();
  const { clearCart, items } = useCart();
  const [coupon, setCoupon] = useState<number | null>(null);
  const [cityPrice, setCityPrice] = useState<number>(0);
  const subtotal = items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  const total = subtotal + cityPrice - coupon;
  const { data } = useGetAdresses(i18n.language);
  const schema = checkoutSchema(t);
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentType, setpaymentType] = useState<"cash" | "visa">("cash");


  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      deliveryType: "delivery",
    },

  });
  const { register, handleSubmit, formState: { errors } } = form;

  const { mutateAsync, isPending } = usePostCheckout();

  const handlePlaceOrder = async (data: z.infer<typeof schema>) => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
      const formData = new FormData();
      formData.append("first_name", data.firstName);
      formData.append("last_name", data.lastName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      if (deliveryType === "delivery") formData.append("region_id", data.region_id);
      if (deliveryType === "delivery") formData.append("address", data.address);
      formData.append("delivery_method", deliveryType);
      formData.append("payment_method", paymentType);
      if (coupon) formData.append("coupon", String(coupon));
      formData.append("read_conditions", "1");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cartItems.forEach((item: any, index: number) => {
        formData.append(`item[${index}][product_id]`, item.id);
        formData.append(`item[${index}][quantity]`, item.quantity);
      });
      await mutateAsync(formData);
      toast.success(t("orderPlacedDesc"), { duration: 3000 });
      setOrderPlaced(true);
      scrollTo(0, 0);
      clearCart()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || t("somethingWentWrong"));
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background py-32">
        <main className="container mx-auto px-2 lg:px-6  py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">{t("orderConfirmed")}</h1>
            <p className="text-muted-foreground">
              {t("orderConfirmedDescription")}
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full btn-gradient text-white">
                <Link to="/shop">{t("continueShopping")}</Link>
              </Button>
              <Button variant="outline" className="w-full">
                {t("trackOrder")}
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-2 lg:px-6  py-32">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className={`h-4 w-4 ${i18n.language != "en" && "rotate-180"}`} />
            {t("backToShop")}
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-8">{t("checkout")}</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <form id="checkout-form" onSubmit={handleSubmit(handlePlaceOrder)}>
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-rose-gold" />
                    {t("shippingInformation")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t("firstName")}</Label>
                      <Input id="firstName" {...register("firstName")} placeholder={t("enterFirstName")} />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t("lastName")}</Label>
                      <Input id="lastName" {...register("lastName")} placeholder={t("enterLastName")} />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>


                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input id="email" type="email" {...register("email")} placeholder={t("enterEmail")} />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("phone")}</Label>
                      <Input id="phone" {...register("phone")} placeholder={t("enterphone")} />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                  {/* Delivery Type */}
                  <div className="flex gap-2 items-center">
                    <Label>{t("deliveryType")}{" : "}</Label>
                    <RadioGroup
                      defaultValue="delivery"
                      onValueChange={(value: "delivery" | "pickup") => {
                        setDeliveryType(value);
                        form.setValue("deliveryType", value);
                      }}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery">{t("delivery")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup">{t("pickupFromShop")}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {deliveryType === "delivery" && (

                    <div className="grid md:grid-cols-2 gap-4">
                      <Controller
                        name="region_id"
                        control={form.control}
                        render={({ field }) => (
                          <div className="space-y-2">
                            <Label htmlFor="region_id">{t("region")}</Label>
                            <Select
                              value={field.value}
                              onValueChange={(value) => {
                                field.onChange(value);
                                const selectedCity = data?.data?.find((c: IAdrress) => String(c.id) === value);
                                setCityPrice(selectedCity ? Number(selectedCity.price) : 0);
                              }}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={t("selectRegion")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {data?.data?.map((city: IAdrress) => (
                                    <SelectItem key={city.id} value={String(city.id)} className="capitalize">
                                      {city.title} {" : "} {city.price}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {errors.region_id && (
                              <p className="text-red-500 text-sm">{errors.region_id.message}</p>
                            )}
                          </div>
                        )}
                      />

                      {/* Address */}
                      <div className="space-y-2">
                        <Label htmlFor="address">{t("address")}</Label>
                        <Input id="address" {...register("address")} placeholder={t("enterAddress")} />
                        {errors.address && (
                          <p className="text-red-500 text-sm">{errors.address.message}</p>
                        )}
                      </div>
                    </div>
                  )}
                  {/* Delivery Type */}
                  <div className=" flex gap-2 items-center mt-5">
                    <Label>{t("paymentType")}{" : "}</Label>
                    <RadioGroup
                      defaultValue="cash"
                      onValueChange={(value: "cash" | "visa") => setpaymentType(value)}
                      className="flex gap-6"
                    >

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">{t("cash")}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="visa" disabled id="visa" />
                        <Label htmlFor="visa">{t("visa")}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </form>

            {/* Security Notice */}
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Shield className="h-5 w-5 text-rose-gold" />
              <div>
                <p className="font-semibold">{t("securityNotice")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("securityNoticeDescription")}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">

            <CouponCheck setCoupon={setCoupon} />
            <Card className="card-elegant sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-16 h-16 rounded-lg object-cover bg-muted"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                        <p className="font-semibold">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />
                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("subtotal")}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>{t("shipping")}</span>
                    <span>${cityPrice.toFixed(2)}</span>
                  </div>
                  {coupon > 0 &&
                    <div className="flex justify-between">
                      <span>{t("coupon")}</span>
                      <span>{" - "}{coupon}</span>
                    </div>
                  }
                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>{t("total")}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  form="checkout-form"
                  type="submit"
                  disabled={items.length === 0 || isPending}
                  className="w-full btn-gradient text-white hover:shadow-glow"
                  size="lg"
                >
                  {isPending ? t("loading") : t("placeOrder")}
                </Button>

                {/* Shipping Info */}
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Free shipping on orders over $75</p>
                  <p>• Estimated delivery: 3-5 business days</p>
                  <p>• 30-day return policy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Checkout;