import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ContactCtaSection = () => {
  return (
    <section className="py-20 md:py-32 text-center bg-secondary">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">📩 Contact Us</h2>
        <h3 className="text-2xl md:text-3xl font-serif text-primary mb-6">Start Your Journey to Emotional Freedom & Personal Transformation</h3>
        <p className="text-lg text-muted-foreground mb-8">
          Are you ready to break free from emotional blocks, release subconscious patterns, and step into your highest self? Whether you're looking for 1:1 NLP coaching, hypnotherapy, group healing, or want to inquire about our upcoming 21-day course, we’re here to guide you every step of the way.
        </p>
        <p className="text-lg text-muted-foreground mb-10">
          At Ataraxia, we believe tranquility in transformation begins with a simple step—reaching out.
        </p>
        <Button asChild size="lg">
          <Link to="/book-call">Book Your Free Discovery Call <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  );
};

export default ContactCtaSection;