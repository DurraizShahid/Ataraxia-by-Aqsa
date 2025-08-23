import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, ArrowLeft, ShoppingCart, Loader2 } from "lucide-react"; // Added Loader2 icon
import DOMPurify from 'dompurify';
import { createWooCommerceOrder } from "@/lib/woocommerce"; // Import the new function
import { toast } from "sonner"; // Import toast for notifications
import { useState } from "react"; // Import useState for loading state

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  const handleProceedToCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items before checking out.");
      return;
    }

    setIsProcessingCheckout(true);
    try {
      const { payment_url } = await createWooCommerceOrder(cartItems);
      toast.success("Order created successfully! Redirecting to payment...");
      clearCart(); // Clear cart after order is successfully created
      window.location.href = payment_url; // Redirect to WooCommerce payment page
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(`Checkout failed: ${error instanceof Error ? error.message : "An unknown error occurred."}`);
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-bold font-serif text-center mb-12">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
          <p className="text-xl text-muted-foreground mb-8">Your cart is empty.</p>
          <Button asChild size="lg">
            <Link to="/journals">
              <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <Card key={item.id} className="flex items-center p-4 shadow-sm">
                {item.images && item.images.length > 0 && (
                  <img
                    src={item.images[0].src}
                    alt={item.images[0].alt || item.name}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                )}
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.name) }} />
                  <p className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.short_description || '') }} />
                  <p className="text-primary font-bold mt-1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`$${(parseFloat(item.sale_price || item.price) * item.quantity).toFixed(2)}`) }} />
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
                Clear Cart
              </Button>
              <Button asChild variant="link">
                <Link to="/journals">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 shadow-lg sticky top-28">
              <CardContent className="p-0">
                <h2 className="text-2xl font-serif mb-4">Cart Summary</h2>
                <div className="flex justify-between text-lg font-semibold mb-4">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleProceedToCheckout}
                  disabled={isProcessingCheckout || cartItems.length === 0}
                >
                  {isProcessingCheckout ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </Button>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  You will be redirected to our secure WooCommerce store to complete your purchase.
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