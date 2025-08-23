import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const Courses = () => {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
        Our comprehensive courses are hosted on our dedicated learning platform. Click the button below to explore our full catalog and begin your learning journey.
      </p>
      <Button asChild className="mt-8" size="lg">
        <a href="https://www.ataraxiabyaqsa.com/courses/" target="_blank" rel="noopener noreferrer">
          View All Courses <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
      <p className="mt-8 text-sm text-muted-foreground">
        You will be redirected to our main website to access the course content.
      </p>
    </div>
  );
};

export default Courses;