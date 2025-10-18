import { useState, useEffect } from "react";
import { getBlogs } from "@/lib/localData";
import { getSiteContent } from "@/lib/siteContent";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Blog = () => {
  const [posts, setPosts] = useState(getBlogs());
  const content = getSiteContent();

  useEffect(() => {
    // Refresh posts when component mounts
    setPosts(getBlogs());
  }, []);

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">{content.blog.hero.title}</h1>
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{content.blog.emptyState}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardHeader className="p-0">
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <CardTitle className="text-2xl font-serif mb-2">{post.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  {post.excerpt}
                </CardDescription>
                <div className="flex gap-2 flex-wrap mt-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="link" className="p-0 text-primary text-xs" asChild>
                  <Link to={`/blog/${post.slug}`}>
                    {content.common.readMore} <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;