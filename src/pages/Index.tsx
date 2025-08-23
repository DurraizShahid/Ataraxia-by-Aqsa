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
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import ServicesSection from "@/components/home/ServicesSection";
import ContactCtaSection from "@/components/ContactCtaSection";
import TransformationIntroSection from "@/components/home/TransformationIntroSection"; // Updated import

const heroImage = { src: "https://images.pexels.com/photos/7929183/pexels-photo-7929183.jpeg", alt: "Woman meditating in a serene setting, representing emotional healing and transformation" };

const blogPosts = [
    { title: "Anxiety symptoms", image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Person experiencing anxiety symptoms" },
    { title: "Communication issues", image: "https://images.pexels.com/photos/6954162/pexels-photo-6954162.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Couple discussing communication issues" },
    { title: "Online sessions", image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Online therapy session for mental health" },
    { title: "Teenage challenges", image: "https://images.pexels.com/photos/5379710/pexels-photo-5379710.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Teenager facing challenges" },
];

const instagramImages = [
    { src: "https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Inspirational quote on emotional healing" },
    { src: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Mindfulness practice for mental clarity" },
    { src: "https://images.pexels.com/photos/4100670/pexels-photo-4100670.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Person practicing self-care for well-being" },
    { src: "https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Journaling for emotional release techniques" },
    { src: "https://images.pexels.com/photos/4098228/pexels-photo-4098228.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Positive affirmation for mindset coaching" },
    { src: "https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Nature scene for tranquility and peace" },
    { src: "https://images.pexels.com/photos/2253821/pexels-photo-2253821.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Therapy session for life transformation" },
    { src: "https://images.pexels.com/photos/5428833/pexels-photo-5428833.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Group support for emotional healing" },
];

const Index = () => {
  return (
    <div className="bg-[#F8F5F3]">
      <HeroSection />
      <TransformationIntroSection /> {/* Using the new combined component */}
      <QuoteSection />
      <BlogPreview />
      <PartnersSection />
      <ServicesSection />
      <CtaSection />
      <ContactCtaSection />
      <InstagramCarousel />
      <TestimonialSection />
      <ContactInfoBar />
    </div>
  );
};

const HeroSection = () => (
  <section className="relative">
    <div
      className="w-full h-[80vh] bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${heroImage.src})` }}
      aria-label={heroImage.alt}
    >
      <div className="container mx-auto px-4 text-left text-white">
        <p className="text-sm uppercase tracking-[0.2em] mb-4">Psychotherapy</p>
        <h1 className="text-5xl md:text-7xl font-serif max-w-2xl">
          Tranquillity in Transformation
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          Unlock emotional freedom, align your mind, body, and soul, and boost your success by 4x.
        </p>
        <div className="mt-8 flex gap-4">
          <Button size="lg" asChild>
            <Link to="/book-call">Book a Free 1:1 Discovery Call</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
            <Link to="/services">Explore Our Healing Services</Link>
          </Button>
        </div>
      </div>
    </div>
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
          Our goal is to guide you through a transformative journey towards emotional well-being and personal mastery, utilizing effective NLP coaching and emotional release techniques.
        </p>
        <Button variant="link" className="p-0 mt-4 text-primary" asChild>
          <Link to="/blog">Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
      <div>
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {blogPosts.map(({ title, image, alt }, i) => (
              <CarouselItem key={i} className="md:basis-1/2">
                <Card className="border-none shadow-none bg-transparent">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img src={image} alt={alt} className="w-full aspect-[3/4] object-cover" />
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

// ServicesSection is now imported from src/components/home/ServicesSection.tsx

const CtaSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
      <img src="https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Therapy session for emotional healing and life transformation" className="w-full h-auto object-cover" />
      <div className="text-left">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Therapy</p>
        <h2 className="text-5xl font-serif text-primary">Emotional Healing</h2>
        <p className="mt-4 text-muted-foreground">
          Process and release past trauma to find inner peace and resilience. We provide a safe space for you to explore your feelings and develop coping mechanisms through effective emotional release techniques.
        </p>
        <Button className="mt-8" asChild>
          <Link to="/book-call">Start Your Hypnosis Therapy Today</Link>
        </Button>
      </div>
    </div>
  </section>
);

const InstagramCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <section className="py-24 text-center">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl text-primary">_ataraxiabyaqsa</h2>
        <Carousel
          plugins={[plugin.current]}
          className="mt-8"
          opts={{ align: "start", loop: true }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {instagramImages.map((item, i) => (
              <CarouselItem key={i} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                <img src={item.src} alt={item.alt} className="w-full aspect-square object-cover" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <p className="mt-4 text-sm text-muted-foreground">***Follow @ataraxiafoundation for everyday notes about mental health and emotional freedom.</p>
      </div>
    </section>
  );
};

const TestimonialSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
      <div className="text-left">
        <p className="text-6xl font-serif text-primary">”</p>
        <h2 className="text-4xl font-serif text-primary mt-4">Healing is a priority</h2>
        <p className="mt-4 text-muted-foreground">
          "Working with Aqsa was life-changing. I feel more in control and at peace than ever before. The techniques are powerful and the support is genuine, truly helping me remove limiting beliefs and achieve life transformation."
        </p>
        <p className="mt-4 font-semibold text-primary">Jessica M.</p>
      </div>
      <img src="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Client testimonial about emotional healing and NLP coaching" className="w-full h-auto object-cover" />
    </div>
  </section>
);

const ContactInfoBar = () => (
  <section className="py-12 border-t border-b">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center text-center md:space-x-12 space-y-4 md:space-y-0">
      <p className="text-sm text-muted-foreground">info@ataraxiafoundation.com</p>
      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
      <p className="text-sm text-muted-foreground">Online & In-Person Sessions for NLP coaching and emotional healing</p>
    </div>
  </section>
);

export default Index;