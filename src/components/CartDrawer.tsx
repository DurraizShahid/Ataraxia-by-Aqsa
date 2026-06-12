import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const CartDrawer = () => {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, itemCount } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-[#F5F0E8] hover:bg-transparent">
          <ShoppingCart className="h-6 w-6" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#0A0A0A] h-6 w-6 flex items-center justify-center rounded-full text-xs font-bold">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] max-w-[90vw] bg-[#0A0A0A] border-[#2A2A2A] text-[#F5F0E8] p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-[#2A2A2A] flex flex-row items-center justify-between">
          <SheetTitle className="text-2xl font-bold">Your Cart</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="text-[#F5F0E8]">
              <X className="h-6 w-6" />
            </Button>
          </SheetClose>
        </SheetHeader>
        
        <div className="flex-grow overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-16 w-16 text-[#A09880] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-[#A09880] mb-6">Add some journals to get started</p>
              <SheetClose asChild>
                <Button asChild className="bg-[#D4AF37] hover:bg-[#C19E30] text-[#0A0A0A]">
                  <Link to="/journals">
                    Browse Journals
                  </Link>
                </Button>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.journalId} className="flex gap-4 items-start">
                  <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.featuredImage}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-base font-semibold truncate">{item.title}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#A09880] hover:text-[#D4AF37] h-8 w-8 -mt-1 -mr-2"
                        onClick={() => removeFromCart(item.journalId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Badge variant="secondary" className="mt-1 bg-[#2A2A2A] text-[#F5F0E8] text-xs">
                      {item.format}
                    </Badge>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 border border-[#2A2A2A] rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-[#A09880] hover:text-[#F5F0E8]"
                          onClick={() => updateQuantity(item.journalId, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-[#A09880] hover:text-[#F5F0E8]"
                          onClick={() => updateQuantity(item.journalId, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <div className="text-[#D4AF37] font-bold">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                        <div className="text-xs text-[#A09880]">
                          {formatCurrency(item.price)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-6 border-t border-[#2A2A2A] sticky bottom-0 bg-[#0A0A0A]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">Subtotal</span>
              <span className="text-xl font-bold text-[#D4AF37]">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <SheetClose asChild>
              <Button
                asChild
                className="w-full bg-[#D4AF37] hover:bg-[#C19E30] text-[#0A0A0A] font-semibold mb-3"
              >
                <Link to="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="secondary" className="w-full border-[#2A2A2A] text-[#A09880] hover:text-[#F5F0E8] hover:bg-[#2A2A2A]">
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
