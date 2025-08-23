import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { User, BookOpen, Calendar, Users } from "lucide-react";

const services = [
  {
    icon: <User className="w-10 h-10 text-primary" />,
    title: "1:1 Coaching",
    description: "Personalized sessions to address your unique challenges and goals. Book a direct call to start your journey.",
    cta: "Book a Session",
    link: "/book-call",
  },
  {
    icon: <BookOpen className="w-10 h-10 text-primary" />,
    title: "Personal Mastery Program",
    description: "A comprehensive program designed to help you master your mind, emotions, and life.",
    cta: "Learn More",
    link: "/courses",
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "Healing Workshops",
    description: "Join our live online workshops. New transformational topics every month, such as inner child healing and emotional resilience.",
    cta: "Reserve Your Spot",
    link: "/courses",
  },
  {
    icon: <Calendar className="w-10 h-10 text-primary" />,
    title: "Digital Journals",
    description: "Downloadable journals for self-awareness, healing, and mindset rewiring.",
    cta: "Explore Journals",
    link: "/journals",
  },
];

const Services = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-secondary py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Our Services</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
            Tailored pathways to healing and transformation.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="flex flex-col">
                <CardHeader className="items-center text-center">
                  {service.icon}
                  <CardTitle className="mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button asChild>
                    <Link to={service.link}>{service.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Details Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Transformational Workshops</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            We host two new live online workshops every month, with themes like inner child healing, identity shifting, and emotional resilience. All workshops include replays, and we occasionally offer free webinars for our community.
          </p>
          <Button className="mt-8" size="lg" asChild>
            <Link to="/courses">View Workshop Calendar</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;