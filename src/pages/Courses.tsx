import { useState, useEffect } from "react";
import { getCourses } from "@/lib/localData";
import { getSiteContent } from "@/lib/siteContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, BookOpen, BarChart } from "lucide-react";

const Courses = () => {
  const [courses, setCourses] = useState(getCourses());
  const content = getSiteContent();

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.courses.hero.title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {content.courses.hero.subtitle}
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{content.courses.emptyState}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardHeader className="p-0">
                {course.featuredImage && (
                  <img
                    src={course.featuredImage}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <CardTitle className="text-2xl font-serif mb-2">{course.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-sm mb-4">
                  {course.shortDescription}
                </CardDescription>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart className="h-4 w-4" />
                    <span>{course.level}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap mb-4">
                  {course.onSale && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      On Sale
                    </span>
                  )}
                  {course.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-2xl font-bold text-primary mb-4">
                  {course.onSale && course.salePrice ? (
                    <>
                      <span>${course.salePrice}</span>
                      <span className="line-through text-muted-foreground text-lg ml-2">
                        ${course.regularPrice}
                      </span>
                    </>
                  ) : (
                    <span>${course.price}</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link to={`/courses/${course.slug}`}>
                    {content.common.viewDetails} <ArrowRight className="ml-2 h-4 w-4" />
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

export default Courses;