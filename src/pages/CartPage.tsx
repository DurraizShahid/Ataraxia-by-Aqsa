import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, ArrowLeft, ShoppingCart } from "lucide-react";
import { getSiteContent } from "@/lib/siteContent";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const content = getSiteContent();

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-serif text-center mb-12">{content.cart.title}</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
          <p className="text-xl text-muted-foreground mb-8">{content.cart.emptyState}</p>
          <Button asChild size="lg">
            <Link to="/journals">
              <ArrowLeft className="mr-2 h-4 w-4" /> {content.cart.continueButton}
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <Card key={item.id} className="flex items-center p-4 shadow-sm">
                <div className="w-24 h-24 bg-gray-200 rounded-md mr-4 flex items-center justify-center">
                  <ShoppingCart className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-primary font-bold mt-1">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-20 text-center"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-5 w-5 text-destructive" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              </Card>
            ))}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={clearCart}>
                {content.cart.clearButton}
              </Button>
              <Button asChild variant="link">
                <Link to="/journals">
                  <ArrowLeft className="mr-2 h-4 w-4" /> {content.cart.continueButton}
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 shadow-lg sticky top-28">
              <CardContent className="p-0">
                <h2 className="text-2xl font-serif mb-4">{content.cart.summaryTitle}</h2>
                <div className="flex justify-between text-lg font-semibold mb-4">
                  <span>{content.cart.totalLabel}</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleProceedToCheckout}
                  disabled={cartItems.length === 0}
                >
                  {content.cart.checkoutButton}
                </Button>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  {content.cart.checkoutNote}
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