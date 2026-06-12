import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, ArrowLeft, ShoppingCart } from "lucide-react";

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart, itemCount } = useCart();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8] max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-20">
      <h1 className="text-4xl font-bold mb-12">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingCart className="mx-auto h-24 w-24 text-[#A09880] mb-6" />
          <p className="text-xl text-[#A09880] mb-8">Your cart is empty</p>
          <Button asChild size="lg">
            <Link to="/journals">
              <ArrowLeft className="mr-2 h-4 w-4" /> Browse Journals
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.journalId} className="flex items-center p-5 bg-[#111111] border-[#2A2A2A]">
                <div className="w-24 h-24 rounded-lg overflow-hidden mr-5 flex-shrink-0">
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[#D4AF37] font-bold">
                      {formatCurrency(item.price)}
                    </span>
                    {item.onSale && (
                      <span className="text-[#A09880] line-through text-sm">
                        {formatCurrency(item.regularPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.journalId, parseInt(e.target.value))}
                    className="w-20 text-center bg-[#0A0A0A] border-[#2A2A2A]"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.journalId)}
                    className="text-[#D4AF37] hover:bg-[#2A2A2A]"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            ))}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={clearCart} className="border-[#2A2A2A] text-[#A09880]">
                Clear Cart
              </Button>
              <Button asChild variant="link" className="text-[#D4AF37]">
                <Link to="/journals">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 bg-[#111111] border-[#2A2A2A] sticky top-20">
              <CardContent className="p-0">
                <h2 className="text-2xl mb-4">Order Summary</h2>
                <div className="text-sm text-[#A09880] mb-4">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </div>
                <div className="flex justify-between text-lg font-bold mb-6 pb-4 border-b border-[#2A2A2A]">
                  <span>Total</span>
                  <span className="text-[#D4AF37]">{formatCurrency(total)}</span>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-[#D4AF37] hover:bg-[#C19E30] text-[#0A0A0A]"
                  onClick={handleProceedToCheckout}
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </Button>
                <p className="text-xs text-[#A09880] mt-4 text-center">
                  Secure payment processing
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
