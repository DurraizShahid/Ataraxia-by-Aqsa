import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, ArrowLeft, ShoppingCart } from "lucide-react";
import DOMPurify from 'dompurify';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

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
                <Button asChild size="lg" className="w-full">
                  {/* This button would ideally lead to a WooCommerce checkout link with pre-filled items.
                      For a simple frontend, we'll just link to the main shop page for now.
                      A more advanced integration would involve creating an order via WooCommerce API. */}
                  <a href="https://wp.ataraxiabyaqsa.com/shop/" target="_blank" rel="noopener noreferrer">
                    Proceed to Checkout
                  </a>
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