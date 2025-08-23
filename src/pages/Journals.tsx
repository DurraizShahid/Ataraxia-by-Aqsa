import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Download, MessageCircle, Heart, BookOpen, Brain, Leaf, Lightbulb, Sparkles, Package, ArrowRight, ShoppingCart } from "lucide-react";
import { useProducts } from "@/lib/woocommerce";
import DOMPurify from 'dompurify';

const Journals = () => {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl font-bold font-serif mb-6">Healing Journals</h1>
        <p className="mt-4 text-lg text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-16 px-4 text-center text-destructive">
        <h1 className="text-4xl font-bold font-serif mb-6">Healing Journals</h1>
        <p className="mt-4 text-lg">Error loading products: {error?.message}</p>
        <p className="mt-2 text-sm text-muted-foreground">Please ensure your WooCommerce API is accessible and credentials are correct.</p>
      </div>
    );
  }

  // Filter products into individual and bundles based on categories or meta_data if available
  // For simplicity, let's assume products with "bundle" in their name are bundles for now,
  // or you can add a specific category in WooCommerce for bundles.
  const individualProducts = products?.filter(p => !p.name.toLowerCase().includes("bundle")) || [];
  const productBundles = products?.filter(p => p.name.toLowerCase().includes("bundle")) || [];

  // Helper to get an icon based on product name or category
  const getProductIcon = (productName: string) => {
    const lowerCaseName = productName.toLowerCase();
    if (lowerCaseName.includes("addiction")) return <Brain className="h-6 w-6" />;
    if (lowerCaseName.includes("meditation")) return <Leaf className="h-6 w-6" />;
    if (lowerCaseName.includes("inner child")) return <Heart className="h-6 w-6" />;
    if (lowerCaseName.includes("reflective questions")) return <Lightbulb className="h-6 w-6" />;
    if (lowerCaseName.includes("pack") || lowerCaseName.includes("bundle")) return <Package className="h-6 w-6" />;
    return <BookOpen className="h-6 w-6" />; // Default icon
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Healing Journals</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Designed with Intention. Backed by Psychology. Guided by Heart.
        </p>
        <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
          Each journal in this collection was painstakingly crafted over months — with real emotional labor, tested techniques, and a deep desire to create a safe space for your healing and transformation. They’re not just pages — they’re your private coaching tools, integrating NLP, Hypnosis, Emotional Processing, and self-reflective interventions that work.
        </p>
      </div>

      {/* Individual Journals Section */}
      {individualProducts.length > 0 && (
        <>
          <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-12">🌿 Individual Journals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {individualProducts.map((product) => (
              <Card key={product.id} className="flex flex-col p-6 text-center">
                <CardHeader className="flex flex-col items-center p-0 mb-4">
                  <div className="p-3 rounded-full bg-secondary text-primary mb-4">
                    {getProductIcon(product.name)}
                  </div>
                  <CardTitle className="text-2xl font-serif mb-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.name) }} />
                  <CardDescription className="text-3xl font-bold text-primary" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.price_html || `$${product.price}`) }} />
                </CardHeader>
                <CardContent className="flex-grow p-0">
                  <p className="text-muted-foreground text-sm mb-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.short_description || product.description) }} />
                  {/* You might need to add a custom field in WooCommerce for a tagline */}
                  {/* <p className="text-primary font-semibold text-sm mb-6">{journal.tagline}</p> */}
                  <Button asChild className="w-full">
                    <Link to={`/journals/${product.slug}`}>View Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Journal Bundles Section */}
      {productBundles.length > 0 && (
        <>
          <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-12">💝 Journal Bundles – Because You Deserve More for Less</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {productBundles.map((product) => (
              <Card key={product.id} className="flex flex-col p-6 text-center bg-brand-pink/20 border-brand-pink">
                <CardHeader className="flex flex-col items-center p-0 mb-4">
                  <div className="p-3 rounded-full bg-brand-pink text-primary mb-4">
                    {getProductIcon(product.name)}
                  </div>
                  <CardTitle className="text-2xl font-serif mb-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.name) }} />
                  <CardDescription className="text-3xl font-bold text-primary">
                    {product.on_sale ? (
                      <>
                        <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.sale_price ? `$${product.sale_price}` : product.price_html) }} />
                        <span className="line-through text-muted-foreground text-lg ml-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`$${product.regular_price}`) }} />
                      </>
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.price_html || `$${product.price}`) }} />
                    )}
                  </CardDescription>
                  {product.on_sale && product.regular_price && product.sale_price && (
                    <p className="text-sm text-muted-foreground mt-1">Save ${parseFloat(product.regular_price) - parseFloat(product.sale_price)}</p>
                  )}
                </CardHeader>
                <CardContent className="flex-grow p-0">
                  <p className="text-muted-foreground text-sm mb-6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.short_description || product.description) }} />
                  <Button asChild className="w-full bg-brand-pink hover:bg-brand-pink-darker text-primary-foreground">
                    <Link to={`/journals/${product.slug}`}>View Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Footer Text */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex justify-center space-x-8 mb-8 text-primary">
          <div className="flex flex-col items-center">
            <Download className="h-6 w-6 mb-2" />
            <span className="text-sm font-semibold">Instant Download</span>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle className="h-6 w-6 mb-2" />
            <span className="text-sm font-semibold">Personal Support</span>
          </div>
          <div className="flex flex-col items-center">
            <Heart className="h-6 w-6 mb-2" />
            <span className="text-sm font-semibold">Built With Intention</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-6">
          These journals took me months of heart work, research, and lived experience. I didn’t just create them — I breathed life into them. They’ve helped many, and I promise, they’ll help you too.
        </p>
        <p className="text-lg font-semibold text-primary">
          👉 Want help choosing your journal?{" "}
          <Link to="/book-call" className="underline hover:text-primary/80">Contact me</Link> — I’ll personally guide you.
        </p>
      </div>
    </div>
  );
};
export default Journals;