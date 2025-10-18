import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Download, MessageCircle, Heart, BookOpen, Brain, Leaf, Lightbulb, Package, ArrowRight } from "lucide-react";
import { getJournals } from "@/lib/supabaseData";
import { getSiteContent } from "@/lib/supabaseSiteContent";
import type { Journal } from "@/lib/supabaseData";
import type { SiteContent } from "@/lib/siteContent";

const Journals = () => {
  const [products, setProducts] = useState<Journal[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [journalsData, contentData] = await Promise.all([
        getJournals(),
        getSiteContent()
      ]);
      setProducts(journalsData);
      setContent(contentData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading || !content) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <p className="text-muted-foreground">Loading journals...</p>
      </div>
    );
  }

  // Filter products into individual and bundles
  const individualProducts = products.filter(p => !p.isBundle);
  const productBundles = products.filter(p => p.isBundle);

  // Helper to get an icon based on product name
  const getProductIcon = (productName: string) => {
    const lowerCaseName = productName.toLowerCase();
    if (lowerCaseName.includes("addiction") || lowerCaseName.includes("recovery")) return <Brain className="h-6 w-6" />;
    if (lowerCaseName.includes("meditation") || lowerCaseName.includes("mindfulness")) return <Leaf className="h-6 w-6" />;
    if (lowerCaseName.includes("inner child")) return <Heart className="h-6 w-6" />;
    if (lowerCaseName.includes("reflective") || lowerCaseName.includes("questions")) return <Lightbulb className="h-6 w-6" />;
    if (lowerCaseName.includes("bundle") || lowerCaseName.includes("pack")) return <Package className="h-6 w-6" />;
    return <BookOpen className="h-6 w-6" />;
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">{content.journals.hero.title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {content.journals.hero.subtitle}
        </p>
        <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
          {content.journals.hero.description}
        </p>
      </div>

      {/* Individual Journals Section */}
      {individualProducts.length > 0 && (
        <>
          <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-12">{content.journals.individualTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {individualProducts.map((product) => (
              <Card key={product.id} className="flex flex-col p-6 text-center">
                <CardHeader className="flex flex-col items-center p-0 mb-4">
                  <div className="p-3 rounded-full bg-secondary text-primary mb-4">
                    {getProductIcon(product.name)}
                  </div>
                  <CardTitle className="text-2xl font-serif mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-primary">
                    ${product.price}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    {product.shortDescription}
                  </p>
                  <Button asChild className="w-full">
                    <Link to={`/journals/${product.slug}`}>{content.common.viewDetails} <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
          <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-12">{content.journals.bundleTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {productBundles.map((product) => (
              <Card key={product.id} className="flex flex-col p-6 text-center bg-brand-pink/20 border-brand-pink">
                <CardHeader className="flex flex-col items-center p-0 mb-4">
                  <div className="p-3 rounded-full bg-brand-pink text-primary mb-4">
                    {getProductIcon(product.name)}
                  </div>
                  <CardTitle className="text-2xl font-serif mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-primary">
                    {product.onSale && product.salePrice ? (
                      <>
                        <span>${product.salePrice}</span>
                        <span className="line-through text-muted-foreground text-lg ml-2">
                          ${product.regularPrice}
                        </span>
                      </>
                    ) : (
                      <span>${product.price}</span>
                    )}
                  </CardDescription>
                  {product.onSale && product.salePrice && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Save ${(product.regularPrice - product.salePrice).toFixed(2)}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex-grow p-0">
                  <p className="text-muted-foreground text-sm mb-6">
                    {product.shortDescription}
                  </p>
                  <Button asChild className="w-full bg-brand-pink hover:bg-brand-pink-darker text-primary-foreground">
                    <Link to={`/journals/${product.slug}`}>{content.common.viewDetails} <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
            <span className="text-sm font-semibold">{content.journals.footer.instantDownload}</span>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle className="h-6 w-6 mb-2" />
            <span className="text-sm font-semibold">{content.journals.footer.personalSupport}</span>
          </div>
          <div className="flex flex-col items-center">
            <Heart className="h-6 w-6 mb-2" />
            <span className="text-sm font-semibold">{content.journals.footer.builtWithIntention}</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-6">
          {content.journals.footer.closingText}
        </p>
        <p className="text-lg font-semibold text-primary">
          {content.journals.footer.ctaText.split('Contact me')[0]}
          <Link to="/book-call" className="underline hover:text-primary/80">Contact me</Link>
          {content.journals.footer.ctaText.split('Contact me')[1]}
        </p>
      </div>
    </div>
  );
};
export default Journals;