import { usePosts } from "@/lib/wordpress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import DOMPurify from 'dompurify';

const Blog = () => {
  const { data: posts, isLoading, isError, error } = usePosts();

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl font-bold">Blog & Resources</h1>
        <p className="mt-4 text-lg text-muted-foreground">Loading posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-16 px-4 text-center text-destructive">
        <h1 className="text-4xl font-bold">Blog & Resources</h1>
        <p className="mt-4 text-lg">Error loading posts: {error?.message}</p>
        <p className="mt-2 text-sm text-muted-foreground">Please ensure your WordPress API is accessible.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Blog & Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post) => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader className="p-0">
              {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                <img
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={post._embedded["wp:featuredmedia"][0].alt_text || post.title.rendered}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <CardTitle className="text-2xl font-serif mb-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.title.rendered) }} />
              <CardDescription
                className="text-muted-foreground text-sm"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt.rendered) }}
              />
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button variant="link" className="p-0 text-primary text-xs" asChild>
                <Link to={`/blog/${post.slug}`}>
                  READ MORE <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;