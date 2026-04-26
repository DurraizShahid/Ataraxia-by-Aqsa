import { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus, Order } from '@/lib/supabaseData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    const data = await getOrders();
    setOrders(data);
    setIsLoading(false);
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    const success = await updateOrderStatus(orderId, newStatus);
    if (success) {
      await fetchOrders();
      toast({
        title: 'Success',
        description: 'Order status updated',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive',
      });
    }
  };

  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-accent/20 text-accent';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage customer orders</p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No orders yet</p>
            </CardContent>
          </Card>
        ) : (
          sortedOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Customer:</strong> {order.customerName}</p>
                      <p><strong>Email:</strong> {order.customerEmail}</p>
                      <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm font-semibold mb-2">Items:</p>
                      <ul className="text-sm space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index} className="text-muted-foreground">
                            {item.name} ({item.type}) - ${item.price} x {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    {order.status !== 'completed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(order.id, 'completed')}
                      >
                        Mark Completed
                      </Button>
                    )}
                    {order.status !== 'failed' && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusChange(order.id, 'failed')}
                      >
                        Mark Failed
                      </Button>
                    )}
                    {order.status !== 'pending' && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleStatusChange(order.id, 'pending')}
                      >
                        Mark Pending
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;

