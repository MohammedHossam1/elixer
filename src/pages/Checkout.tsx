import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { toast } = useToast();
  const [orderComplete, setOrderComplete] = useState(false);

  const cartItems = JSON.parse(localStorage.getItem("cart_items")) || []

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 8.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    setOrderComplete(true);
    toast({
      title: "Order placed successfully!",
      description: "You will receive a confirmation email shortly.",
    });
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your order. We'll send you a confirmation email with tracking details shortly.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full btn-gradient text-white">
                <Link to="/">Continue Shopping</Link>
              </Button>
              <Button variant="outline" className="w-full">
                Track Your Order
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shopping
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-rose-gold" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter street address" />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter city" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="Enter state" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="Enter ZIP" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-rose-gold" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="Enter name as shown on card" />
                    </div>
                  </TabsContent>

                  <TabsContent value="paypal" className="mt-4">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        You will be redirected to PayPal to complete your payment.
                      </p>
                      <Button variant="outline" className="w-full">
                        Continue with PayPal
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Shield className="h-5 w-5 text-rose-gold" />
              <div>
                <p className="font-semibold">Secure Checkout</p>
                <p className="text-sm text-muted-foreground">
                  Your payment information is encrypted and secure.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="card-elegant sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
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
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  className="w-full btn-gradient text-white hover:shadow-glow"
                  size="lg"
                >
                  Place Order
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