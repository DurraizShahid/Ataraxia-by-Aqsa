import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getJournalBySlug } from "@/lib/supabaseData";
import DOMPurify from 'dompurify';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, CheckCircle2, Download } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Journal } from "@/lib/supabaseData";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Journal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const data = await getJournalBySlug(slug || "");
      setProduct(data);
      setIsLoading(false);
    };
    fetchProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <p className="text-muted-foreground">Loading journal...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-lg text-muted-foreground">The product you are looking for does not exist.</p>
        <Button asChild className="mt-8">
          <Link to="/journals">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Journals
          </Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Convert journal to cart item format
    const cartItem: any = {
      id: parseInt(product.id),
      name: product.name,
      price: product.price.toString(),
      quantity: 1,
    };
    addToCart(cartItem);
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <article className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            {product.featuredImage && (
              <img
                src={product.featuredImage}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            )}
            <div className="mt-6 p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Download className="h-5 w-5" />
                <span className="font-semibold">Instant Download</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {product.pageCount} pages • {product.format} format
              </p>
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">{product.name}</h1>
            
            <p className="text-lg text-muted-foreground mb-6">
              {product.shortDescription}
            </p>

            <div className="flex gap-2 flex-wrap mb-6">
              {product.isBundle && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  Bundle
                </span>
              )}
              {product.onSale && (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                  On Sale
                </span>
              )}
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mb-6">
              <div className="text-4xl font-bold text-primary mb-2">
                {product.onSale && product.salePrice ? (
                  <>
                    <span>${product.salePrice}</span>
                    <span className="line-through text-muted-foreground text-2xl ml-3">
                      ${product.regularPrice}
                    </span>
                  </>
                ) : (
                  <span>${product.price}</span>
                )}
              </div>
              {product.onSale && product.salePrice && (
                <p className="text-sm text-green-600">
                  Save ${(product.regularPrice - product.salePrice).toFixed(2)}
                </p>
              )}
            </div>

            <Button size="lg" className="w-full mb-4" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>

            <Button asChild size="lg" variant="outline" className="w-full">
              <Link to="/journals">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Journals
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>About This Journal</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-lg max-w-none text-foreground"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
                />
              </CardContent>
            </Card>
          </div>

          <div>
            {product.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProductDetail;