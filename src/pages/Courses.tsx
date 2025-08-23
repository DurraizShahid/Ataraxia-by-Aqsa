import { useCourses } from "@/lib/tutorlms";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import DOMPurify from 'dompurify';

const Courses = () => {
  const { data: courses, isLoading, isError, error } = useCourses();

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl font-bold">Our Courses</h1>
        <p className="mt-4 text-lg text-muted-foreground">Loading courses...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-16 px-4 text-center text-destructive">
        <h1 className="text-4xl font-bold">Our Courses</h1>
        <p className="mt-4 text-lg">Error loading courses: {error?.message}</p>
        <p className="mt-2 text-sm text-muted-foreground">Please ensure your Tutor LMS API is accessible and configured correctly.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Our Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses?.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader className="p-0">
              {course.featured_image_url && (
                <img
                  src={course.featured_image_url}
                  alt={course.title.rendered}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <CardTitle className="text-2xl font-serif mb-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.title.rendered) }} />
              <CardDescription
                className="text-muted-foreground text-sm"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.excerpt.rendered) }}
              />
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button variant="link" className="p-0 text-primary text-xs" asChild>
                {/* Link directly to the WordPress course page for enrollment */}
                <a href={course.link} target="_blank" rel="noopener noreferrer">
                  LEARN MORE <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;