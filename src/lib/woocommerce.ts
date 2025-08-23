import { useQuery } from "@tanstack/react-query";

// WARNING: Hardcoding API keys directly in client-side code is not secure for production.
// For a production environment, these keys should be stored securely on a server
// and accessed via a backend API or serverless function.
const WOOCOMMERCE_API_BASE_URL = "https://wp.ataraxiabyaqsa.com/wp-json/wc/v3";
const WOOCOMMERCE_CONSUMER_KEY = "ck_ca07c2b95005409fd8f48d6d62a1403b58e96eda";
const WOOCOMMERCE_CONSUMER_SECRET = "cs_cbf4b916b5601c07ca391d578da9ea44b848a619";

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: any[]; // You might want to define a more specific type for downloads
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  stock_status: string;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  images: Array<{
    id: number;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    src: string;
    name: string;
    alt: string;
  }>;
  attributes: any[]; // You might want to define a more specific type for attributes
  default_attributes: any[];
  variations: number[];
  grouped_products: number[];
  menu_order: number;
  price_html: string;
  related_ids: number[];
  meta_data: Array<{
    id: number;
    key: string;
    value: string;
  }>;
  // Add any other fields you expect from your WooCommerce products
}

// Define a type for cart items that includes quantity
export interface CartItem extends WooCommerceProduct {
  quantity: number;
}

// Helper to construct the authentication string
const getAuthParams = () => `consumer_key=${WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${WOOCOMMERCE_CONSUMER_SECRET}`;

export async function getProducts(): Promise<WooCommerceProduct[]> {
  const response = await fetch(`${WOOCOMMERCE_API_BASE_URL}/products?${getAuthParams()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function getProductBySlug(slug: string): Promise<WooCommerceProduct | null> {
  const response = await fetch(`${WOOCOMMERCE_API_BASE_URL}/products?slug=${slug}&${getAuthParams()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with slug: ${slug}`);
  }
  const products: WooCommerceProduct[] = await response.json();
  return products.length > 0 ? products[0] : null;
}

export async function createWooCommerceOrder(cartItems: CartItem[]): Promise<{ payment_url: string }> {
  if (cartItems.length === 0) {
    throw new Error("Cart is empty, cannot create an order.");
  }

  const line_items = cartItems.map(item => ({
    product_id: item.id,
    quantity: item.quantity,
  }));

  // Placeholder billing and shipping information.
  // In a real application, you would collect this from the user via a form.
  const orderPayload = {
    payment_method: "bacs", // Example: Direct Bank Transfer. You might need to adjust this based on your WooCommerce setup.
    payment_method_title: "Direct Bank Transfer",
    set_paid: false,
    billing: {
      first_name: "Guest",
      last_name: "User",
      address_1: "123 Placeholder St",
      address_2: "",
      city: "Anytown",
      state: "CA",
      postcode: "90210",
      country: "US",
      email: "guest@example.com", // Consider making this dynamic if you have user auth
      phone: "555-123-4567"
    },
    shipping: {
      first_name: "Guest",
      last_name: "User",
      address_1: "123 Placeholder St",
      address_2: "",
      city: "Anytown",
      state: "CA",
      postcode: "90210",
      country: "US"
    },
    line_items: line_items,
    // You can add shipping_lines, coupon_lines, etc. if needed
  };

  const response = await fetch(`${WOOCOMMERCE_API_BASE_URL}/orders?${getAuthParams()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderPayload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("WooCommerce Order Creation Error:", errorData);
    throw new Error(errorData.message || "Failed to create order on WooCommerce.");
  }

  const order = await response.json();
  return { payment_url: order.payment_url };
}


export const useProducts = () => {
  return useQuery<WooCommerceProduct[], Error>({
    queryKey: ["woocommerceProducts"],
    queryFn: getProducts,
  });
};

export const useProduct = (slug: string) => {
  return useQuery<WooCommerceProduct | null, Error>({
    queryKey: ["woocommerceProduct", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug, // Only run the query if slug is available
  });
};