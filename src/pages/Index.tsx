import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Heart,
  ClipboardList,
  Feather,
  MessageCircle,
  Users,
  Repeat,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="bg-[#F8F5F3]">
      <HeroCarousel />
      <QuoteSection />
      <BlogPreview />
      <PartnersSection />
      <ServicesSection />
      <CtaSection />
      <ContactFormSection />
      <InstagramCarousel />
      <TestimonialSection />
      <ContactInfoBar />
    </div>
  );
};

const HeroCarousel = () => (
  <section className="relative">
    <Carousel>
      <CarouselContent>
        {[1, 2, 3].map((i) => (
          <CarouselItem key={i}>
            <div
              className="w-full h-[80vh] bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(/placeholder.svg)` }}
            >
              <div className="container mx-auto px-4 text-left text-primary">
                <p className="text-sm uppercase tracking-[0.2em] mb-4">Psychotherapy</p>
                <h1 className="text-5xl md:text-7xl font-serif max-w-2xl">
                  Connect with all parts of yourself & start new life
                </h1>
                <div className="mt-8 flex gap-4">
                  <Button size="lg" asChild>
                    <Link to="/book-call">Book a Session</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-8 h-12 w-12 bg-white/50 hover:bg-white border-none text-primary" />
      <CarouselNext className="absolute right-8 h-12 w-12 bg-white/50 hover:bg-white border-none text-primary" />
    </Carousel>
  </section>
);

const QuoteSection = () => (
  <section className="py-24 text-center">
    <div className="container mx-auto px-4">
      <p className="text-3xl font-serif text-primary max-w-3xl mx-auto">
        “I cannot teach anybody anything. I can only make them think.”
      </p>
      <p className="mt-4 text-sm uppercase tracking-widest text-muted-foreground">Socrates</p>
    </div>
  </section>
);

const BlogPreview = () => (
  <section className="py-24">
    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Read and Learn</p>
        <h2 className="text-5xl font-serif text-primary">New texts about everyday issues of a modern man.</h2>
        <p className="mt-4 text-muted-foreground">
          Our goal is to guide you through a transformative journey towards emotional well-being and personal mastery.
        </p>
        <Button variant="link" className="p-0 mt-4 text-primary" asChild>
          <Link to="/blog">Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
      <div>
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {["Anxiety symptoms", "Communication issues", "Online sessions", "Teenage challenges"].map((title, i) => (
              <CarouselItem key={i} className="md:basis-1/2">
                <Card className="border-none shadow-none bg-transparent">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img src="/placeholder.svg" alt={title} className="w-full aspect-[3/4] object-cover" />
                      <div className="absolute top-4 left-4 bg-white/80 px-2 py-1 text-xs font-semibold">NOV 17</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">Aqsa Khan | ONLINE</p>
                    <h3 className="text-2xl font-serif mt-2 text-primary">{title}</h3>
                    <Button variant="link" className="p-0 mt-2 text-primary text-xs" asChild>
                      <Link to="/blog">READ MORE <ArrowRight className="ml-1 h-3 w-3" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-end gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </div>
  </section>
);

const PartnersSection = () => (
  <section className="py-12 bg-primary text-primary-foreground">
    <div className="container mx-auto px-4">
      <div className="flex justify-around items-center flex-wrap gap-8">
        {["Mental Health", "ABCD", "Mind Consulting", "GEST", "SelfCare"].map(name => (
          <span key={name} className="font-serif text-2xl opacity-70">{name}</span>
        ))}
      </div>
    </div>
  </section>
);

const services = [
  { icon: <Heart />, title: "Love Issues", link: "/services" },
  { icon: <ClipboardList />, title: "Organization", link: "/services" },
  { icon: <Feather />, title: "Creativity", link: "/services" },
  { icon: <MessageCircle />, title: "Communication", link: "/services" },
  { icon: <Users />, title: "Relationships", link: "/services" },
  { icon: <Repeat />, title: "Patterns", link: "/services" },
];

const ServicesSection = () => (
  <section className="py-24 text-center">
    <div className="container mx-auto px-4">
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Services</p>
      <h2 className="text-5xl font-serif text-primary">How can I help you?</h2>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
        {services.map(service => (
          <div key={service.title} className="text-center">
            <div className="inline-block p-4 rounded-full bg-secondary text-primary mb-4">{service.icon}</div>
            <h3 className="text-2xl font-serif text-primary">{service.title}</h3>
            <p className="text-muted-foreground mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Button variant="link" className="p-0 mt-2 text-primary text-xs" asChild>
              <Link to={service.link}>READ MORE <ArrowRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CtaSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
      <img src="/placeholder.svg" alt="Therapy session" className="w-full h-auto object-cover" />
      <div className="text-left">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Therapy</p>
        <h2 className="text-5xl font-serif text-primary">Emotional Healing</h2>
        <p className="mt-4 text-muted-foreground">
          Process and release past trauma to find inner peace and resilience. We provide a safe space for you to explore your feelings and develop coping mechanisms.
        </p>
        <Button className="mt-8" asChild>
          <Link to="/book-call">Book a Session</Link>
        </Button>
      </div>
    </div>
  </section>
);

const ContactFormSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Read & Learn</p>
        <h2 className="text-5xl font-serif text-primary">Feel free to contact us and ask us anything.</h2>
        <p className="mt-4 text-muted-foreground">
          Sign up for our newsletter to receive updates, resources, and insights on your healing journey.
        </p>
      </div>
      <form className="space-y-4">
        <Input placeholder="Your name" className="bg-white" />
        <Input type="email" placeholder="Your e-mail" className="bg-white" />
        <Button type="submit" className="w-full bg-[#E6DCD5] text-primary hover:bg-[#d9c9c0]">Subscribe</Button>
      </form>
    </div>
  </section>
);

const InstagramCarousel = () => (
  <section className="py-24 text-center">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl text-primary">_ataraxia</h2>
      <Carousel className="mt-8" opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {[...Array(8)].map((_, i) => (
            <CarouselItem key={i} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
              <img src="/placeholder.svg" alt={`Instagram post ${i+1}`} className="w-full aspect-square object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <p className="mt-4 text-sm text-muted-foreground">***Follow @ataraxiafoundation for everyday notes about mental health.</p>
    </div>
  </section>
);

const TestimonialSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
      <div className="text-left">
        <p className="text-6xl font-serif text-primary">”</p>
        <h2 className="text-4xl font-serif text-primary mt-4">Healing is a priority</h2>
        <p className="mt-4 text-muted-foreground">
          "Working with Aqsa was life-changing. I feel more in control and at peace than ever before. The techniques are powerful and the support is genuine."
        </p>
        <p className="mt-4 font-semibold text-primary">Jessica M.</p>
      </div>
      <img src="/placeholder.svg" alt="Client testimonial" className="w-full h-auto object-cover" />
    </div>
  </section>
);

const ContactInfoBar = () => (
  <section className="py-12 border-t border-b">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center text-center md:space-x-12 space-y-4 md:space-y-0">
      <p className="text-sm text-muted-foreground">info@ataraxiafoundation.com</p>
      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
      <p className="text-sm text-muted-foreground">Online & In-Person Sessions</p>
    </div>
  </section>
);

export default Index;