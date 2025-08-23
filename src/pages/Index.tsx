import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, HeartHandshake, Repeat, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground text-center py-20 md:py-32">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Tranquility in Transformation
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-primary-foreground/80">
            Discover profound healing and personal growth through our specialized therapeutic techniques.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/book-call">Book a Session</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services Highlight */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Our Methods</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            We use internationally certified techniques to help you rewire your mind and heal from within.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>NLP</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Neuro-Linguistic Programming to reshape your thoughts and behaviors.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Time Line Therapy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Release negative emotions and limiting beliefs from your past.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Hypnotherapy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Access your subconscious mind to create lasting positive change.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-Actions Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ActionCard title="Explore Our Courses" link="/courses" />
            <ActionCard title="Join This Month’s Workshop" link="/services" />
            <ActionCard title="Book a 1:1 Coaching Call" link="/book-call" />
            <ActionCard title="Download Healing Journals" link="/journals" />
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">How We Can Help</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Our goal is to guide you through a transformative journey towards emotional well-being and personal mastery.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <InfoCard icon={<BrainCircuit size={40} className="text-primary" />} title="Brain Rewiring" description="Change neural pathways to overcome obstacles and build empowering habits." />
            <InfoCard icon={<HeartHandshake size={40} className="text-primary" />} title="Emotional Healing" description="Process and release past trauma to find inner peace and resilience." />
            <InfoCard icon={<Repeat size={40} className="text-primary" />} title="Behavior Modification" description="Understand and alter patterns to align your actions with your true goals." />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard name="Jessica M." quote="Working with Aqsa was life-changing. I feel more in control and at peace than ever before." />
            <TestimonialCard name="David R." quote="The Personal Mastery Program gave me the clarity I needed to pursue my dreams without fear." />
            <TestimonialCard name="Sarah L." quote="I never thought I could overcome my anxiety, but Time Line Therapy made it possible. Truly grateful." />
          </div>
        </div>
      </section>
    </div>
  );
};

const ActionCard = ({ title, link }: { title: string; link: string }) => (
  <Link to={link} className="block">
    <Card className="h-full text-center hover:bg-primary/5 transition-colors">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  </Link>
);

const InfoCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-start gap-4">
      {icon}
      <div>
        <CardTitle>{title}</CardTitle>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
    </CardHeader>
  </Card>
);

const TestimonialCard = ({ name, quote }: { name: string; quote: string }) => (
  <Card className="text-left">
    <CardContent className="pt-6">
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-current" />)}
      </div>
      <p className="italic text-muted-foreground">"{quote}"</p>
      <p className="font-semibold mt-4">- {name}</p>
    </CardContent>
  </Card>
);

export default Index;