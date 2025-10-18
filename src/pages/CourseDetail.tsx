import { useParams, Link } from "react-router-dom";
import { getCourseBySlug } from "@/lib/localData";
import DOMPurify from 'dompurify';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, Clock, BookOpen, BarChart, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = getCourseBySlug(slug || "");
  const { addToCart } = useCart();

  if (!course) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
        <p className="text-lg text-muted-foreground">The course you are looking for does not exist.</p>
        <Button asChild className="mt-8">
          <Link to="/courses">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Convert course to cart item format
    const cartItem: any = {
      id: parseInt(course.id),
      name: course.title,
      price: course.price.toString(),
      quantity: 1,
    };
    addToCart(cartItem);
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <article className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            {course.featuredImage && (
              <img
                src={course.featuredImage}
                alt={course.title}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            )}
          </div>
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">{course.title}</h1>
            
            <p className="text-lg text-muted-foreground mb-6">
              {course.shortDescription}
            </p>

            <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>{course.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                <span>{course.level}</span>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap mb-6">
              {course.onSale && (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                  On Sale
                </span>
              )}
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mb-6">
              <div className="text-4xl font-bold text-primary mb-2">
                {course.onSale && course.salePrice ? (
                  <>
                    <span>${course.salePrice}</span>
                    <span className="line-through text-muted-foreground text-2xl ml-3">
                      ${course.regularPrice}
                    </span>
                  </>
                ) : (
                  <span>${course.price}</span>
                )}
              </div>
              {course.onSale && course.salePrice && (
                <p className="text-sm text-green-600">
                  Save ${(course.regularPrice - course.salePrice).toFixed(2)}
                </p>
              )}
            </div>

            <Button size="lg" className="w-full mb-4" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>

            <Button asChild size="lg" variant="outline" className="w-full">
              <Link to="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About This Course</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-lg max-w-none text-foreground"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.description) }}
                />
              </CardContent>
            </Card>

            {course.syllabus.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Course Syllabus</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {course.syllabus.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            {course.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default CourseDetail;

