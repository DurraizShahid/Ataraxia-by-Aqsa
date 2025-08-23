import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, ArrowRight, ExternalLink } from "lucide-react";
import ContactCtaSection from "@/components/ContactCtaSection"; // Import the new component

const About = () => {
  return (
    <div className="bg-[#F8F5F3]">
      {/* Welcome to Ataraxia Section */}
      <section className="py-20 md:py-32 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Welcome</p>
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-6">Welcome to Ataraxia by Aqsa</h1>
          <p className="text-lg text-muted-foreground mb-6">
            At Ataraxia by Aqsa, we guide you to transform your life by healing the root causes of emotional blockages and mental fog. Our internationally certified team uses proven techniques in NLP, Hypnosis, and emotional release strategies to help you release emotional baggage, clear mental fog, and realign with your true self.
          </p>
          <p className="text-lg text-muted-foreground">
            Our approach is designed to achieve faster and long-lasting results by changing the foundation of your mindset and emotional well-being. When you let go of limiting beliefs, blocked emotions, and unresolved traumas, you unlock sharper clarity, inner peace, and experience up to 4x more productivity in your personal and professional life.
          </p>
        </div>
      </section>

      {/* Why Choose Ataraxia? Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif text-primary text-center mb-12">Why Choose Ataraxia by Aqsa?</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Because true transformation begins within — and that’s exactly where we start.
            Ataraxia by Aqsa is more than a coaching space. It's a sanctuary where healing meets science, and your personal evolution becomes inevitable. Unlike surface-level solutions, we work at the root cause of emotional struggles and mental blocks — using a powerful blend of Neuro-Linguistic Programming (NLP), Hypnotherapy, Time Line Therapy™, and Emotional Release techniques.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-center">
            <div className="flex flex-col items-center text-muted-foreground text-lg font-semibold">
              <img src="https://via.placeholder.com/100x50/E6DCD5/5C4B4B?text=ABNLP" alt="ABNLP Coaching Division Graphic" className="h-12 object-contain mb-2" />
              Certified NLP Coach via the American Board of Neuro-Linguistic Programming (ABNLP) Coaching Division
            </div>
            <div className="flex flex-col items-center text-muted-foreground text-lg font-semibold">
              <img src="https://via.placeholder.com/100x50/E6DCD5/5C4B4B?text=TLTA" alt="TLTA Graphic" className="h-12 object-contain mb-2" />
              Certified Practitioner of Time Line Therapy™ via the Time Line Therapy Association (TLTA)
            </div>
            <div className="flex flex-col items-center text-muted-foreground text-lg font-semibold">
              <img src="https://via.placeholder.com/100x50/E6DCD5/5C4B4B?text=ABH" alt="ABH Graphic" className="h-12 object-contain mb-2" />
              Certified Hypnotist via the American Board of Hypnotherapy (ABH)
            </div>
            <div className="flex flex-col items-center text-muted-foreground text-lg font-semibold">
              <img src="https://via.placeholder.com/100x50/E6DCD5/5C4B4B?text=ABNLP" alt="ABNLP Graphic" className="h-12 object-contain mb-2" />
              Certified NLP Practitioner via the American Board of Neuro-Linguistic Programming (ABNLP)
            </div>
            <div className="flex flex-col items-center text-muted-foreground text-lg font-semibold">
              <img src="https://via.placeholder.com/100x50/E6DCD5/5C4B4B?text=UoY" alt="University of York Graphic" className="h-12 object-contain mb-2" />
              Introduction to Behavioural Activation for Depression, University of York
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 md:py-32 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            We empower you to heal from within, realign your emotional and mental state, and step confidently into your highest potential. Ataraxia by Aqsa’s mission is to provide compassionate, science-backed coaching that helps you live a life full of purpose, balance, and clarity.
          </p>
        </div>
      </section>

      {/* What Our Clients Say Section */}
      <section className="py-20 md:py-32 bg-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground">
            (Add client testimonial screenshots here for authentic social proof.)
          </p>
          {/* Placeholder for testimonials - you can add a carousel or grid here later */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary p-8 rounded-lg shadow-sm">
              <p className="italic text-muted-foreground">"Working with Ataraxia by Aqsa has been truly transformative. I feel a profound sense of peace and clarity I haven't experienced in years."</p>
              <p className="font-semibold text-primary mt-4">- Client Name</p>
            </div>
            <div className="bg-secondary p-8 rounded-lg shadow-sm">
              <p className="italic text-muted-foreground">"The integrated approach helped me address deep-rooted issues quickly and effectively. Highly recommend!"</p>
              <p className="font-semibold text-primary mt-4">- Another Client</p>
            </div>
          </div>
        </div>
      </section>

      {/* Begin Your Journey with Ataraxia Section (now using ContactCtaSection) */}
      <ContactCtaSection />
    </div>
  );
};

export default About;