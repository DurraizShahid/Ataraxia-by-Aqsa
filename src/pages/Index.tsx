import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import ServicesSection from "@/components/home/ServicesSection";
import ContactCtaSection from "@/components/ContactCtaSection";
import TransformationIntroSection from "@/components/home/TransformationIntroSection";
import { getSiteContent } from "@/lib/supabaseSiteContent";
import type { SiteContent } from "@/lib/siteContent";
import { useSiteImages } from "@/context/SiteImagesContext";

const Index = () => {
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getSiteContent();
      setSiteContent(data);
    };
    fetchContent();
  }, []);

  return (
    <div className="bg-background">
      <HeroSection siteContent={siteContent} />
      <TransformationIntroSection />
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

const HeroSection = ({ siteContent }: { siteContent: SiteContent | null }) => {
  const { images } = useSiteImages();

  return (
    <section className="relative">
      <div
        className="w-full h-[80vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${images.home_hero_bg})` }}
        aria-label="Woman meditating in a serene setting, representing emotional healing and transformation"
      >
        <div className="container mx-auto px-4 text-left text-white">
          <p className="text-sm uppercase tracking-[0.2em] mb-4">Psychotherapy</p>
          <h1 className="text-5xl md:text-7xl font-serif max-w-2xl">
            {siteContent ? siteContent.home.hero.title : 'Tranquillity in Transformation'}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            {siteContent ? siteContent.home.hero.subtitle : ''}
          </p>
          <div className="mt-8 flex gap-4 flex-col sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/book-call">
                {siteContent ? siteContent.home.hero.cta : 'Book a Free 1:1 Discovery Call'}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/services">Explore Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const QuoteSection = () => (
  <section className="py-24 text-center">
    <div className="container mx-auto px-4">
      <p className="text-3xl font-serif text-primary max-w-3xl mx-auto">
        "I cannot teach anybody anything. I can only make them think."
      </p>
      <p className="mt-4 text-sm uppercase tracking-widest text-muted-foreground">Socrates</p>
    </div>
  </section>
);

const BlogPreview = () => {
  const { images } = useSiteImages();

  const blogPosts = [
    { title: "Anxiety symptoms", image: images.home_blog_1, alt: "Person experiencing anxiety symptoms" },
    { title: "Communication issues", image: images.home_blog_2, alt: "Couple discussing communication issues" },
    { title: "Online sessions", image: images.home_blog_3, alt: "Online therapy session for mental health" },
    { title: "Teenage challenges", image: images.home_blog_4, alt: "Teenager facing challenges" },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
                <CarouselItem key={i} className="basis-full md:basis-1/2">
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
};

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

const CtaSection = () => {
  const { images } = useSiteImages();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <img
          src={images.home_cta_image}
          alt="Therapy session for emotional healing and life transformation"
          className="w-full h-auto object-cover"
        />
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
};

const InstagramCarousel = () => {
  const { images } = useSiteImages();
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  const instagramImages = [
    { src: images.home_instagram_1, alt: "Inspirational quote on emotional healing" },
    { src: images.home_instagram_2, alt: "Mindfulness practice for mental clarity" },
    { src: images.home_instagram_3, alt: "Person practicing self-care for well-being" },
    { src: images.home_instagram_4, alt: "Journaling for emotional release techniques" },
    { src: images.home_instagram_5, alt: "Positive affirmation for mindset coaching" },
    { src: images.home_instagram_6, alt: "Nature scene for tranquility and peace" },
    { src: images.home_instagram_7, alt: "Therapy session for life transformation" },
    { src: images.home_instagram_8, alt: "Group support for emotional healing" },
  ];

  return (
    <section className="py-24 text-center">
      <div className="container mx-auto px-4">
        <a
          href="https://www.instagram.com/ataraxiabyaqsa?igsh=MWtydjNldTFremszZQ=="
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif text-3xl text-primary hover:text-primary/80 transition-colors inline-block"
        >
          @ataraxiabyaqsa
        </a>
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
        <p className="mt-4 text-sm text-muted-foreground">
          Follow{' '}
          <a
            href="https://www.instagram.com/ataraxiabyaqsa?igsh=MWtydjNldTFremszZQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold"
          >
            @ataraxiabyaqsa
          </a>{' '}
          for everyday notes about mental health and emotional freedom.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Journals:{' '}
          <a
            href="https://www.instagram.com/ataraxiabyaqsajournals"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold"
          >
            @ataraxiabyaqsajournals
          </a>
        </p>
      </div>
    </section>
  );
};

const TestimonialSection = () => {
  const { images } = useSiteImages();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="text-left">
          <p className="text-6xl font-serif text-primary">"</p>
          <h2 className="text-4xl font-serif text-primary mt-4">Healing is a priority</h2>
          <p className="mt-4 text-muted-foreground">
            "Working with Aqsa was life-changing. I feel more in control and at peace than ever before. The techniques are powerful and the support is genuine, truly helping me remove limiting beliefs and achieve life transformation."
          </p>
          <p className="mt-4 font-semibold text-primary">Jessica M.</p>
        </div>
        <img
          src={images.home_testimonial_image}
          alt="Client testimonial about emotional healing and NLP coaching"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};

const ContactInfoBar = () => (
  <section className="py-12 border-t border-b">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center text-center md:space-x-12 space-y-4 md:space-y-0">
      <p className="text-sm text-muted-foreground">
        <a href="mailto:ataraxiaaqsa@gmail.com" className="hover:text-primary transition-colors">ataraxiaaqsa@gmail.com</a>
      </p>
      <p className="text-sm text-muted-foreground">
        <a href="tel:+923338566992" className="hover:text-primary transition-colors">+92 333 8566992</a>
      </p>
      <p className="text-sm text-muted-foreground">Online & In-Person Sessions for NLP coaching and emotional healing</p>
    </div>
  </section>
);

export default Index;
