import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Heart, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-secondary py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold">About Ataraxia</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
            Our journey is one of passion, expertise, and a deep-seated belief in the human capacity for change.
          </p>
        </div>
      </section>

      {/* Founder Bio Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Aqsa Khan" 
              className="rounded-lg shadow-lg w-full h-auto object-cover aspect-square"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Meet Our Founder, Aqsa Khan</h2>
            <p className="mt-4 text-muted-foreground">
              [Placeholder for a short bio of Aqsa Khan. This section will detail her journey, her passion for healing, and what led her to create the Ataraxia Foundation. It will highlight her dedication to empowering individuals to overcome their limitations and achieve personal mastery.]
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Certifications</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>International NLP Certification</li>
                <li>Time Line Therapy® (TLT) Certification</li>
                <li>Certified Hypnotherapist</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Our Vision & Mission</h2>
            <p className="mt-4 text-muted-foreground">
              <strong>Vision:</strong> To create a world where every individual has the tools to achieve mental and emotional tranquility, transforming their lives from within.
            </p>
            <p className="mt-4 text-muted-foreground">
              <strong>Mission:</strong> To provide accessible, effective, and compassionate therapeutic resources that empower individuals to heal from their past, master their present, and design their future.
            </p>
          </div>
          <div>
             <img 
              src="https://images.pexels.com/photos/1528640/pexels-photo-1528640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Vision and Mission" 
              className="rounded-lg shadow-lg w-full h-auto object-cover aspect-video"
            />
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            These principles guide every aspect of our work and interaction.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard icon={<Heart size={32} className="text-primary" />} title="Empathy" description="We approach every individual with compassion, understanding, and a non-judgmental perspective." />
            <ValueCard icon={<Lightbulb size={32} className="text-primary" />} title="Transformation" description="We are committed to facilitating profound, lasting change that empowers you to live your best life." />
            <ValueCard icon={<Award size={32} className="text-primary" />} title="Resilience" description="We believe in nurturing the inner strength that allows you to navigate life's challenges with grace." />
          </div>
        </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card>
    <CardHeader className="items-center">
      <div className="mb-4">{icon}</div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default About;