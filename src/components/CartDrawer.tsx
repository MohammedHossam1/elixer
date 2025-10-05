import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useTranslation } from 'react-i18next';

interface CartDrawerProps {
  children: React.ReactNode;
}

const CartDrawer = ({ children }: CartDrawerProps) => {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } = useCart();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
      variant: "destructive",
    });
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };
  const { i18n } = useTranslation();


  return (
    <Sheet open={isOpen}  onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side={i18n.language === "en" ? "right" : "left"} className="w-full sm:w-96 p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col justify-between  h-full">
          {/* Cart Items */}
          <div className=" overflow-y-auto px-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Button 
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-muted"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        ${item.price.toFixed(2)} each
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <p className="font-bold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="border-t  mb-16 backdrop-blur p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <Button 
                  asChild
                  className="w-full btn-gradient text-white hover:shadow-glow"
                  size="lg"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/checkout">
                    Checkout
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;