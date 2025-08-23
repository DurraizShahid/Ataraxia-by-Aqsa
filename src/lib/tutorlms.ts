import { useQuery } from "@tanstack/react-query";

const TUTOR_LMS_API_BASE_URL = "https://www.ataraxiabyaqsa.com/wp-json/tutor/v1";

export interface TutorLMSCourse {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  link: string; // Link to the course on the WordPress site
  excerpt: {
    rendered: string;
  };
  featured_image_url?: string; // Tutor LMS often provides a direct image URL
  // Add other fields as needed from your Tutor LMS API response
}

export async function getCourses(): Promise<TutorLMSCourse[]> {
  const response = await fetch(`${TUTOR_LMS_API_BASE_URL}/courses`);
  if (!response.ok) {
    throw new Error("Failed to fetch courses from Tutor LMS");
  }
  return response.json();
}

export async function getCourseBySlug(slug: string): Promise<TutorLMSCourse | null> {
  const response = await fetch(`${TUTOR_LMS_API_BASE_URL}/courses?slug=${slug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch course with slug: ${slug}`);
  }
  const courses: TutorLMSCourse[] = await response.json();
  return courses.length > 0 ? courses[0] : null;
}

export const useCourses = () => {
  return useQuery<TutorLMSCourse[], Error>({
    queryKey: ["tutorLMSCourses"],
    queryFn: getCourses,
  });
};

export const useCourse = (slug: string) => {
  return useQuery<TutorLMSCourse | null, Error>({
    queryKey: ["tutorLMSCourse", slug],
    queryFn: () => getCourseBySlug(slug),
    enabled: !!slug, // Only run the query if slug is available
  });
};