import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/supabaseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if we need to show address fields
  const showAddressFields = items.some(
    (item) => item.format.toLowerCase() === 'physical' || item.format.toLowerCase().includes('bundle')
  );

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    city: '',
    country: '',
    postalCode: '',
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // If cart is empty, redirect to journals
  useEffect(() => {
    if (items.length === 0) {
      navigate('/journals');
    }
  }, [items.length, navigate]);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';

    if (showAddressFields) {
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      const order = await createOrder({
        items: items.map((item) => ({
          type: 'journal' as const,
          id: item.journalId,
          name: item.title,
          price: item.price,
          quantity: item.quantity,
          format: item.format,
        })),
        total: total,
        customerEmail: formData.email,
        customerName: formData.name,
        customerPhone: formData.phone,
        billingAddress: showAddressFields
          ? {
              addressLine1: formData.addressLine1,
              city: formData.city,
              country: formData.country,
              postalCode: formData.postalCode,
            }
          : undefined,
      });

      if (order) {
        clearCart();
        navigate(`/order-confirmation?orderId=${order.id}`);
      } else {
        throw new Error('Failed to create order');
      }
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-20">
        <Button
          variant="ghost"
          asChild
          className="mb-8 text-[#A09880] hover:text-[#F5F0E8] px-0"
        >
          <Link to="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-12">Checkout</h1>

        {error && (
          <Alert className="mb-8 border-red-500/50 bg-red-500/10">
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Customer Info Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Customer Info Card */}
              <Card className="bg-[#111111] border-[#2A2A2A]">
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#F5F0E8]">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`bg-[#0A0A0A] border-[#2A2A2A] focus:border-[#D4AF37] ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#F5F0E8]">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`bg-[#0A0A0A] border-[#2A2A2A] focus:border-[#D4AF37] ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#F5F0E8]">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`bg-[#0A0A0A] border-[#2A2A2A] focus:border-[#D4AF37] ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Address Card (Conditional) */}
              {showAddressFields && (
                <Card className="bg-[#111111] border-[#2A2A2A]">
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                    <CardDescription className="text-[#A09880]">
                      Required for physical items or bundles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="addressLine1" className="text-[#F5F0E8]">
                        Address Line 1 *
                      </Label>
                      <Input
                        id="addressLine1"
                        value={formData.addressLine1}
                        onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                        className={`bg-[#0A0A0A] border-[#2A2A2A] focus:border-[#D4AF37] ${errors.addressLine1 ? 'border-red-500' : ''}`}
                      />
                      {errors.addressLine1 && <p className="text-red-400 text-sm">{errors.addressLine1}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-[#F5F0E8]">
                          City *
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className={`bg-[#0A0A0A] border-[#2A2A2A] focus:border-[#D4AF37] ${errors.city ? 'border-red-500' : ''}`}
                        />
                        {errors.city && <p className="text-red-400 text-sm">{errors.city}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-[#F5F0E8]">
                          Country *
                        </Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) => setFormData({ ...formData, country: value })}
                        >
                          <SelectTrigger className={`bg-[#0A0A0A] border-[#2A2A2A] focus:border-[#D4AF37] ${errors.country ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#111111] border-[#2A2A2A]">
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                            <SelectItem value="DE">Germany</SelectItem>
                            <SelectItem value="FR">France</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.country && <p className="text-red-400 text-sm">{errors.country}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-[#F5F0E8]">
                          Postal Code *
                        </Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className={`bg-[#0A0A0A] border-[#2A2A2A] focus:border-[#D4AF37] ${errors.postalCode ? 'border-red-500' : ''}`}
                        />
                        {errors.postalCode && <p className="text-red-400 text-sm">{errors.postalCode}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment Info Card (Manual) */}
              <Card className="bg-[#111111] border-[#2A2A2A]">
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                  <CardDescription className="text-[#A09880]">
                    Once you place your order, we will send you payment instructions via email.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#C19E30] text-[#0A0A0A]"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? 'Placing Order...' : 'Place Order'}
              </Button>
            </form>
          </div>

          {/* Right Column: Order Summary (Sticky) */}
          <div className="lg:col-span-1">
            <Card className="bg-[#111111] border-[#2A2A2A] sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.journalId} className="flex justify-between items-start pb-4 border-b border-[#2A2A2A]">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.featuredImage}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-[#A09880]">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-[#D4AF37]">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t border-[#2A2A2A] pt-4">
                  <div className="flex justify-between text-base">
                    <span>Subtotal</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#2A2A2A]">
                    <span>Total</span>
                    <span className="text-[#D4AF37]">{formatCurrency(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
