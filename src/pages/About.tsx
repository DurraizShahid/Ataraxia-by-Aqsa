import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, ArrowRight, ExternalLink, X } from "lucide-react";
import ContactCtaSection from "@/components/ContactCtaSection";
import { getSiteContent } from "@/lib/supabaseSiteContent";
import type { SiteContent } from "@/lib/siteContent";
import { useSiteImages } from "@/context/SiteImagesContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const About = () => {
  const { images } = useSiteImages();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      const data = await getSiteContent();
      setContent(data);
      setIsLoading(false);
    };
    fetchContent();
  }, []);

  if (isLoading || !content) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="bg-[#F8F5F3]">
      {/* Welcome to Ataraxia Section */}
      <section className="py-20 md:py-32 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Welcome</p>
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-6">{content.about.hero.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">
            {content.about.hero.subtitle}
          </p>
          <p className="text-lg text-muted-foreground">
            Our approach is designed to achieve faster and long-lasting results by changing the foundation of your mindset and emotional well-being. When you let go of limiting beliefs, blocked emotions, and unresolved traumas, you unlock sharper clarity, inner peace, and experience up to 4x more productivity in your personal and professional life.
          </p>
        </div>
      </section>

      {/* Why Choose Ataraxia? Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif text-primary text-center mb-12">{content.about.approach.title}</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            {content.about.approach.description} Unlike surface-level solutions, we work at the root cause of emotional struggles and mental blocks — using a powerful blend of Neuro-Linguistic Programming (NLP), Hypnotherapy, Time Line Therapy™, and Emotional Release techniques.
          </p>
          <h3 className="text-2xl font-serif text-primary mb-8 text-center">✨ Here’s What Makes Ataraxia by Aqsa Different:</h3>
          <ul className="space-y-8 text-left">
            <li className="flex items-start gap-4">
              <span className="text-primary text-2xl font-bold">●</span>
              <div>
                <h4 className="text-xl font-semibold text-primary">Integrated Healing Approach</h4>
                <p className="text-muted-foreground mt-1">
                  We don’t believe in one-size-fits-all. Every journey is unique, so we blend modern psychology, subconscious work, and emotional release to help you achieve deep, lasting change.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-primary text-2xl font-bold">●</span>
              <div>
                <h4 className="text-xl font-semibold text-primary">Certified & Experienced Coaching</h4>
                <p className="text-muted-foreground mt-1">
                  Led by internationally certified NLP Coach and Hypnotherapist Aqsa Khan, who has helped hundreds of individuals achieve emotional clarity, career breakthroughs, and personal empowerment.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-primary text-2xl font-bold">●</span>
              <div>
                <h4 className="text-xl font-semibold text-primary">Results That Last</h4>
                <p className="text-muted-foreground mt-1">
                  Clients report up to 4x increase in productivity, greater self-awareness, and long-term emotional freedom after just a few sessions. Why? Because we work with your unconscious patterns, not just surface behaviors.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-primary text-2xl font-bold">●</span>
              <div>
                <h4 className="text-xl font-semibold text-primary">Safe & Non-Judgmental Space</h4>
                <p className="text-muted-foreground mt-1">
                  Whether you're navigating anxiety, burnout, childhood trauma, or self-doubt — you’re safe here. Ataraxia by Aqsa is a trauma-informed space designed to support your healing with compassion and care.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-primary text-2xl font-bold">●</span>
              <div>
                <h4 className="text-xl font-semibold text-primary">Proven Techniques, Real-Life Results</h4>
                <p className="text-muted-foreground mt-1">
                  Our methods are backed by neuroscience and lived experience. From emotional unblocking to mindset rewiring — we guide you step by step toward clarity, peace, and confidence.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Aqsa's Story Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif text-primary text-center mb-12">Aqsa's Story</h2>
          <div className="relative pl-8 md:pl-16 border-l-2 border-brand-pink space-y-12">
            <div className="absolute left-0 top-0 w-4 h-4 bg-brand-pink rounded-full -translate-x-1/2"></div>
            <div className="relative">
              <h3 className="text-2xl font-serif text-primary mb-2">From Stuck...</h3>
              <p className="text-muted-foreground">
                I know how it feels to smile on the outside while silently breaking on the inside. I’ve felt the ache of carrying emotions I couldn’t name — the weight of a childhood wound, the pressure to be strong, the fear of being misunderstood. I was functioning, yes… but not truly living.
              </p>
              <p className="text-muted-foreground mt-4">
                I used to believe that success meant pushing through. I tried journaling, therapy, meditation — all of it helped a little, but the deeper pain kept resurfacing. Something within me whispered, “This isn’t healing. This is coping.”
              </p>
            </div>
            <div className="absolute left-0 w-4 h-4 bg-brand-pink rounded-full -translate-x-1/2"></div>
            <div className="relative">
              <h3 className="text-2xl font-serif text-primary mb-2">...to Healing...</h3>
              <p className="text-muted-foreground">
                What I found was a path that went deeper than mindset. A path that transformed my subconscious. When I discovered Neuro-Linguistic Programming (NLP), Time Line Therapy™, and Hypnotherapy, everything changed. I didn’t just heal — I was rewired. The fog began to lift. Emotions I had buried started to release. And for the first time in years, I felt free.
              </p>
            </div>
            <div className="absolute left-0 w-4 h-4 bg-brand-pink rounded-full -translate-x-1/2"></div>
            <div className="relative">
              <h3 className="text-2xl font-serif text-primary mb-2">...to Coach...</h3>
              <p className="text-muted-foreground">
                But it wasn’t just one method that helped — it was the combination of tools that truly transformed me. That's why I now use an integrated approach. At Ataraxia by Aqsa, I combine the most effective techniques — from subconscious work and emotional release to inner child healing and mindset restructuring — to guide others through their own breakthroughs.
              </p>
            </div>
            <div className="absolute left-0 w-4 h-4 bg-brand-pink rounded-full -translate-x-1/2"></div>
            <div className="relative">
              <h3 className="text-2xl font-serif text-primary mb-2">...to Ataraxia by Aqsa</h3>
              <p className="text-muted-foreground">
                Because I’ve been where you are. And if you're here reading this, maybe you're carrying something heavy too — something that no longer fits who you’re becoming. It’s time to release it.
              </p>
              <p className="text-muted-foreground mt-4">
                I created Ataraxia by Aqsa not just as a brand, but as a sacred space — where healing goes beyond the surface, where you get to feel light again, where you realign with your true self and unlock your highest potential.
              </p>
              <p className="text-muted-foreground mt-4">
                You don’t have to keep surviving. You were made to thrive — emotionally, mentally, spiritually.
              </p>
              <Button asChild className="mt-8 bg-brand-pink hover:bg-brand-pink-darker text-primary-foreground">
                <Link to="/book-call">Book Your Free Discovery Call Now</Link>
              </Button>
            </div>
          </div>
          <p className="text-center text-3xl font-serif text-primary mt-16">
            "I didn’t just survive the storm — I learned to speak its language and taught the waves to carry me home."
          </p>
          <p className="text-center text-sm uppercase tracking-widest text-muted-foreground mt-4">— Aqsa Khan</p>
        </div>
      </section>

      {/* Licenses & Certifications Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-12">Licenses & Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start justify-center max-w-6xl mx-auto">
            <div className="flex flex-col items-center">
              <img
                src={images.cert_nlp_coach}
                alt="Certified NLP Coach - American Board of Neuro-Linguistic Programming"
                className="w-full max-w-[250px] h-auto object-contain mb-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedImage({ src: images.cert_nlp_coach, alt: "Certified NLP Coach - American Board of Neuro-Linguistic Programming" })}
              />
              <p className="text-sm text-muted-foreground">
                Certified NLP Coach via the American Board of Neuro-Linguistic Programming (ABNLP)
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={images.cert_timeline_therapy}
                alt="Certified Practitioner of Time Line Therapy"
                className="w-full max-w-[250px] h-auto object-contain mb-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedImage({ src: images.cert_timeline_therapy, alt: "Certified Practitioner of Time Line Therapy" })}
              />
              <p className="text-sm text-muted-foreground">
                Certified Practitioner of Time Line Therapy™ via the Time Line Therapy Association (TLTA)
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={images.cert_hypnotist}
                alt="Certified Hypnotist - American Board of Hypnotherapy"
                className="w-full max-w-[250px] h-auto object-contain mb-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedImage({ src: images.cert_hypnotist, alt: "Certified Hypnotist - American Board of Hypnotherapy" })}
              />
              <p className="text-sm text-muted-foreground">
                Certified Hypnotist via the American Board of Hypnotherapy (ABH)
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={images.cert_nlp_practitioner}
                alt="Certified NLP Practitioner - American Board of Neuro-Linguistic Programming"
                className="w-full max-w-[250px] h-auto object-contain mb-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedImage({ src: images.cert_nlp_practitioner, alt: "Certified NLP Practitioner - American Board of Neuro-Linguistic Programming" })}
              />
              <p className="text-sm text-muted-foreground">
                Certified NLP Practitioner via the American Board of Neuro-Linguistic Programming (ABNLP)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Preview Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.alt}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className="w-full h-auto object-contain max-h-[80vh] rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Our Mission Section */}
      <section className="py-20 md:py-32 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">{content.about.mission.title}</h2>
          <p className="text-lg text-muted-foreground">
            {content.about.mission.description}
          </p>
        </div>
      </section>

      {/* What Our Clients Say Section */}
      <section className="py-20 md:py-32 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-12">What Our Clients Say</h2>
          <div className="max-w-6xl mx-auto">
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {([
                  images.testimonial_1,
                  images.testimonial_2,
                  images.testimonial_3,
                  images.testimonial_4,
                  images.testimonial_5,
                  images.testimonial_6,
                  images.testimonial_7,
                  images.testimonial_8,
                  images.testimonial_9,
                  images.testimonial_10,
                  images.testimonial_11,
                  images.testimonial_12,
                  images.testimonial_13,
                  images.testimonial_14,
                ] as string[]).map((src, i) => (
                  <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <img
                        src={src}
                        alt={`Client Testimonial ${i + 1}`}
                        className="w-full h-auto object-cover rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={() => setSelectedImage({ src, alt: `Client Testimonial ${i + 1}` })}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-8 flex justify-center gap-2">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Begin Your Journey with Ataraxia Section (now using ContactCtaSection) */}
      <ContactCtaSection />
    </div>
  );
};

export default About;