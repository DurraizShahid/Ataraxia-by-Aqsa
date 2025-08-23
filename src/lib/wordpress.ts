import { QueryClient, useQuery } from "@tanstack/react-query";

const WORDPRESS_API_BASE_URL = "https://www.ataraxiabyaqsa.com/wp-json/wp/v2";

export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  link: string;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export async function getPosts(): Promise<WordPressPost[]> {
  const response = await fetch(`${WORDPRESS_API_BASE_URL}/posts?_embed=wp:featuredmedia`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const response = await fetch(`${WORDPRESS_API_BASE_URL}/posts?slug=${slug}&_embed=wp:featuredmedia`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post with slug: ${slug}`);
  }
  const posts: WordPressPost[] = await response.json();
  return posts.length > 0 ? posts[0] : null;
}

export const usePosts = () => {
  return useQuery<WordPressPost[], Error>({
    queryKey: ["wordpressPosts"],
    queryFn: getPosts,
  });
};

export const usePost = (slug: string) => {
  return useQuery<WordPressPost | null, Error>({
    queryKey: ["wordpressPost", slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug, // Only run the query if slug is available
  });
};