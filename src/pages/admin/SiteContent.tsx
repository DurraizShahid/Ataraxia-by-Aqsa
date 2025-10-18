import { useState, useEffect } from 'react';
import { getSiteContent, updateSiteContent, resetSiteContent } from '@/lib/supabaseSiteContent';
import type { SiteContent } from '@/lib/siteContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { RotateCcw, Save } from 'lucide-react';

const AdminSiteContent = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      const data = await getSiteContent();
      setContent(data);
      setIsLoading(false);
    };
    fetchContent();
  }, []);

  const handleSave = async () => {
    if (!content) return;
    
    setIsSaving(true);
    const success = await updateSiteContent(content);
    setIsSaving(false);
    
    if (success) {
      toast({
        title: 'Success',
        description: 'Site content updated successfully',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to update site content',
        variant: 'destructive',
      });
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all content to default? This cannot be undone.')) {
      const success = await resetSiteContent();
      if (success) {
        const data = await getSiteContent();
        setContent(data);
        toast({
          title: 'Success',
          description: 'Site content reset to defaults',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to reset content',
          variant: 'destructive',
        });
      }
    }
  };

  const updateNestedContent = (path: string[], value: string) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      let current: any = newContent;
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      return newContent;
    });
  };

  if (isLoading || !content) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading site content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Site Content</h1>
          <p className="text-muted-foreground mt-1">Edit all text content across your website</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} disabled={isSaving}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset to Default
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="home" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="journals">Journals</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="cart">Cart</TabsTrigger>
          <TabsTrigger value="checkout">Checkout</TabsTrigger>
          <TabsTrigger value="common">Common</TabsTrigger>
        </TabsList>

        {/* Home Page */}
        <TabsContent value="home" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Main banner on the homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={content.home.hero.title}
                  onChange={(e) => updateNestedContent(['home', 'hero', 'title'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  value={content.home.hero.subtitle}
                  onChange={(e) => updateNestedContent(['home', 'hero', 'subtitle'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Call to Action Button</Label>
                <Input
                  value={content.home.hero.cta}
                  onChange={(e) => updateNestedContent(['home', 'hero', 'cta'], e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={content.home.services.title}
                  onChange={(e) => updateNestedContent(['home', 'services', 'title'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  value={content.home.services.subtitle}
                  onChange={(e) => updateNestedContent(['home', 'services', 'subtitle'], e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transformation Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={content.home.transformation.title}
                  onChange={(e) => updateNestedContent(['home', 'transformation', 'title'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  value={content.home.transformation.subtitle}
                  onChange={(e) => updateNestedContent(['home', 'transformation', 'subtitle'], e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Page */}
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={content.about.hero.title}
                  onChange={(e) => updateNestedContent(['about', 'hero', 'title'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  value={content.about.hero.subtitle}
                  onChange={(e) => updateNestedContent(['about', 'hero', 'subtitle'], e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mission Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={content.about.mission.title}
                  onChange={(e) => updateNestedContent(['about', 'mission', 'title'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={content.about.mission.description}
                  onChange={(e) => updateNestedContent(['about', 'mission', 'description'], e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Approach Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={content.about.approach.title}
                  onChange={(e) => updateNestedContent(['about', 'approach', 'title'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={content.about.approach.description}
                  onChange={(e) => updateNestedContent(['about', 'approach', 'description'], e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Page */}
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Services Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={content.services.hero.title}
                  onChange={(e) => updateNestedContent(['services', 'hero', 'title'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  value={content.services.hero.subtitle}
                  onChange={(e) => updateNestedContent(['services', 'hero', 'subtitle'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={content.services.description}
                  onChange={(e) => updateNestedContent(['services', 'description'], e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Courses Page */}
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Courses Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={content.courses.hero.title}
                  onChange={(e) => updateNestedContent(['courses', 'hero', 'title'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Textarea
                  value={content.courses.hero.subtitle}
                  onChange={(e) => updateNestedContent(['courses', 'hero', 'subtitle'], e.target.value)}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Empty State Message</Label>
                <Input
                  value={content.courses.emptyState}
                  onChange={(e) => updateNestedContent(['courses', 'emptyState'], e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Journals Page */}
        <TabsContent value="journals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={content.journals.hero.title}
                  onChange={(e) => updateNestedContent(['journals', 'hero', 'title'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  value={content.journals.hero.subtitle}
                  onChange={(e) => updateNestedContent(['journals', 'hero', 'subtitle'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={content.journals.hero.description}
                  onChange={(e) => updateNestedContent(['journals', 'hero', 'description'], e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Section Titles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Individual Journals Title</Label>
                <Input
                  value={content.journals.individualTitle}
                  onChange={(e) => updateNestedContent(['journals', 'individualTitle'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Bundle Title</Label>
                <Input
                  value={content.journals.bundleTitle}
                  onChange={(e) => updateNestedContent(['journals', 'bundleTitle'], e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Footer Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Instant Download</Label>
                <Input
                  value={content.journals.footer.instantDownload}
                  onChange={(e) => updateNestedContent(['journals', 'footer', 'instantDownload'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Personal Support</Label>
                <Input
                  value={content.journals.footer.personalSupport}
                  onChange={(e) => updateNestedContent(['journals', 'footer', 'personalSupport'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Built With Intention</Label>
                <Input
                  value={content.journals.footer.builtWithIntention}
                  onChange={(e) => updateNestedContent(['journals', 'footer', 'builtWithIntention'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Closing Text</Label>
                <Textarea
                  value={content.journals.footer.closingText}
                  onChange={(e) => updateNestedContent(['journals', 'footer', 'closingText'], e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>CTA Text</Label>
                <Input
                  value={content.journals.footer.ctaText}
                  onChange={(e) => updateNestedContent(['journals', 'footer', 'ctaText'], e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blog Page */}
        <TabsContent value="blog" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blog Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Page Title</Label>
                <Input
                  value={content.blog.hero.title}
                  onChange={(e) => updateNestedContent(['blog', 'hero', 'title'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Empty State Message</Label>
                <Input
                  value={content.blog.emptyState}
                  onChange={(e) => updateNestedContent(['blog', 'emptyState'], e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cart Page */}
        <TabsContent value="cart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cart Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Page Title</Label>
                <Input
                  value={content.cart.title}
                  onChange={(e) => updateNestedContent(['cart', 'title'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Empty State</Label>
                <Input
                  value={content.cart.emptyState}
                  onChange={(e) => updateNestedContent(['cart', 'emptyState'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Continue Shopping Button</Label>
                <Input
                  value={content.cart.continueButton}
                  onChange={(e) => updateNestedContent(['cart', 'continueButton'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Clear Cart Button</Label>
                <Input
                  value={content.cart.clearButton}
                  onChange={(e) => updateNestedContent(['cart', 'clearButton'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Summary Title</Label>
                <Input
                  value={content.cart.summaryTitle}
                  onChange={(e) => updateNestedContent(['cart', 'summaryTitle'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Total Label</Label>
                <Input
                  value={content.cart.totalLabel}
                  onChange={(e) => updateNestedContent(['cart', 'totalLabel'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Checkout Button</Label>
                <Input
                  value={content.cart.checkoutButton}
                  onChange={(e) => updateNestedContent(['cart', 'checkoutButton'], e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Checkout Note</Label>
                <Input
                  value={content.cart.checkoutNote}
                  onChange={(e) => updateNestedContent(['cart', 'checkoutNote'], e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Checkout Page */}
        <TabsContent value="checkout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Checkout Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    value={content.checkout.title}
                    onChange={(e) => updateNestedContent(['checkout', 'title'], e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Section</Label>
                  <Input
                    value={content.checkout.contactSection}
                    onChange={(e) => updateNestedContent(['checkout', 'contactSection'], e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Payment Section</Label>
                  <Input
                    value={content.checkout.paymentSection}
                    onChange={(e) => updateNestedContent(['checkout', 'paymentSection'], e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Order Summary</Label>
                  <Input
                    value={content.checkout.orderSummary}
                    onChange={(e) => updateNestedContent(['checkout', 'orderSummary'], e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Success Title</Label>
                  <Input
                    value={content.checkout.successTitle}
                    onChange={(e) => updateNestedContent(['checkout', 'successTitle'], e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Success Subtitle</Label>
                  <Input
                    value={content.checkout.successSubtitle}
                    onChange={(e) => updateNestedContent(['checkout', 'successSubtitle'], e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Common */}
        <TabsContent value="common" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Text Elements</CardTitle>
              <CardDescription>Text used across multiple pages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Read More</Label>
                  <Input
                    value={content.common.readMore}
                    onChange={(e) => updateNestedContent(['common', 'readMore'], e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>View Details</Label>
                  <Input
                    value={content.common.viewDetails}
                    onChange={(e) => updateNestedContent(['common', 'viewDetails'], e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Add to Cart</Label>
                  <Input
                    value={content.common.addToCart}
                    onChange={(e) => updateNestedContent(['common', 'addToCart'], e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Back To</Label>
                  <Input
                    value={content.common.backTo}
                    onChange={(e) => updateNestedContent(['common', 'backTo'], e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Published On</Label>
                  <Input
                    value={content.common.publishedOn}
                    onChange={(e) => updateNestedContent(['common', 'publishedOn'], e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>By (author)</Label>
                  <Input
                    value={content.common.by}
                    onChange={(e) => updateNestedContent(['common', 'by'], e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sticky Save Button */}
      <div className="fixed bottom-8 right-8 flex gap-2">
        <Button size="lg" onClick={handleSave} className="shadow-lg" disabled={isSaving}>
          <Save className="mr-2 h-5 w-5" /> {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
    </div>
  );
};

export default AdminSiteContent;

