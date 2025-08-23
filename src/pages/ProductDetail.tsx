import { useParams, Link } from "react-router-dom";
import { useProduct } from "@/lib/woocommerce";
import DOMPurify from 'dompurify';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Import useCart hook

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError, error } = useProduct(slug || "");
  const { addToCart } = useCart(); // Use the addToCart function

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <p className="mt-4 text-lg text-muted-foreground">Loading product details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-16 px-4 text-center text-destructive">
        <p className="mt-4 text-lg">Error loading product: {error?.message}</p>
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
    addToCart(product);
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <article className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="flex justify-center">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0].src}
              alt={product.images[0].alt || product.name}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.name) }} />
          <p className="text-3xl font-bold text-primary mb-6">
            {product.on_sale ? (
              <>
                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.sale_price ? `$${product.sale_price}` : product.price_html) }} />
                <span className="line-through text-muted-foreground text-lg ml-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`$${product.regular_price}`) }} />
              </>
            ) : (
              <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.price_html || `$${product.price}`) }} />
            )}
          </p>
          <div
            className="prose prose-lg max-w-none text-foreground mb-8"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full md:w-auto">
              <a href={product.permalink} target="_blank" rel="noopener noreferrer">
                View on Store
              </a>
            </Button>
          </div>
          <Button asChild variant="link" className="mt-4 w-full md:w-auto p-0 justify-start">
            <Link to="/journals">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Journals
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
};

export default ProductDetail;