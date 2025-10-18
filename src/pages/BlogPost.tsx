import { useParams, Link } from "react-router-dom";
import { getBlogBySlug } from "@/lib/localData";
import DOMPurify from 'dompurify';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogBySlug(slug || "");

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
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-auto object-cover rounded-lg mb-8"
          />
        )}
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">{post.title}</h1>
        <p className="text-sm text-muted-foreground mb-4">Published on {postDate} by {post.author}</p>
        <div className="flex gap-2 flex-wrap mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className="prose prose-lg max-w-none text-foreground"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
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