import { useParams, Link } from "react-router-dom";
import { usePost } from "@/lib/wordpress";
import DOMPurify from 'dompurify';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError, error } = usePost(slug || "");

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <p className="mt-4 text-lg text-muted-foreground">Loading post...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-16 px-4 text-center text-destructive">
        <p className="mt-4 text-lg">Error loading post: {error?.message}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-lg text-muted-foreground">The blog post you are looking for does not exist.</p>
        <Button asChild className="mt-8">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  const postDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto py-16 px-4">
      <article className="max-w-3xl mx-auto">
        {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
          <img
            src={post._embedded["wp:featuredmedia"][0].source_url}
            alt={post._embedded["wp:featuredmedia"][0].alt_text || post.title.rendered}
            className="w-full h-auto object-cover rounded-lg mb-8"
          />
        )}
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.title.rendered) }} />
        <p className="text-sm text-muted-foreground mb-8">Published on {postDate}</p>
        <div
          className="prose prose-lg max-w-none text-foreground"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.rendered) }}
        />
        <Button asChild variant="outline" className="mt-12">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
      </article>
    </div>
  );
};

export default BlogPost;