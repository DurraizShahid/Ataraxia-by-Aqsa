import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { getOrderById, Order } from '@/lib/supabaseData';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      setLoading(true);
      const fetchedOrder = await getOrderById(orderId);
      setOrder(fetchedOrder);
      setLoading(false);
    };
    fetchOrder();
  }, [orderId]);

  // Determine what "what happens next" message to show
  const getNextStepsMessage = () => {
    if (!order) return null;
    const hasPhysicalItems = order.items.some(item => 
      item.format?.toLowerCase().includes('physical') || 
      item.format?.toLowerCase().includes('bundle')
    );
    const hasDigitalItems = order.items.some(item => 
      item.format?.toLowerCase().includes('digital')
    );

    if (hasPhysicalItems && hasDigitalItems) {
      return (
        <div className="space-y-2">
          <p>Your digital items will be sent with download instructions via email within 24 hours.</p>
          <p>Your physical items will be shipped within 3-5 business days.</p>
        </div>
      );
    } else if (hasPhysicalItems) {
      return <p>Your order will be shipped within 3-5 business days.</p>;
    } else {
      return <p>You'll receive download instructions via email within 24 hours.</p>;
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8] min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-6">
        <Card className="bg-[#111111] border-[#2A2A2A]">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-[#D4AF37]/20">
                <CheckCircle2 className="h-16 w-16 text-[#D4AF37]" />
              </div>
            </div>
            <CardTitle className="text-4xl">Thank you for your order!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {order && !loading ? (
              <>
                <div className="text-center">
                  <p className="text-[#A09880]">Order Number</p>
                  <p className="text-2xl font-mono text-[#D4AF37]">{order.id}</p>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center pb-3 border-b border-[#2A2A2A] last:border-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-[#A09880]">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#2A2A2A] text-lg font-bold">
                    <p>Total Paid</p>
                    <p className="text-[#D4AF37]">{formatCurrency(order.total)}</p>
                  </div>
                </div>

                {/* What happens next */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">What Happens Next</h3>
                  <div className="text-[#A09880]">
                    {getNextStepsMessage()}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-xl mb-4">Your order has been placed!</p>
                <p className="text-[#A09880]">Thank you for your purchase.</p>
              </div>
            )}

            {/* Buttons */}
            <div className="space-y-4 pt-4">
              <Button asChild className="w-full bg-[#D4AF37] hover:bg-[#C19E30] text-[#0A0A0A]" size="lg">
                <Link to="/journals">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full border-[#2A2A2A] text-[#A09880] hover:text-[#F5F0E8]">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmation;
