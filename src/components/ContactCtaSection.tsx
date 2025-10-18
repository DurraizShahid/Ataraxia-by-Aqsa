import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, Instagram, Facebook, Linkedin } from "lucide-react";

const ContactCtaSection = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">📩 Contact Us</h2>
          <h3 className="text-2xl md:text-3xl font-serif text-primary mb-6">Start Your Journey to Emotional Freedom & Personal Transformation</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Are you ready to break free from emotional blocks, release subconscious patterns, and step into your highest self? Whether you're looking for 1:1 NLP coaching, hypnotherapy, group healing, or want to inquire about our upcoming 21-day course, we're here to guide you every step of the way.
          </p>
          <p className="text-lg text-muted-foreground mb-10">
            At Ataraxia, we believe tranquility in transformation begins with a simple step—reaching out.
          </p>
          <Button asChild size="lg">
            <Link to="/book-call">Book Your Free Discovery Call <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left flex-1">
                  <h4 className="font-semibold text-lg mb-2">Email Us</h4>
                  <p className="text-sm text-muted-foreground mb-2">General Inquiries:</p>
                  <a 
                    href="mailto:ataraxiaaqsa@gmail.com" 
                    className="text-primary hover:underline block"
                  >
                    ataraxiaaqsa@gmail.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-3 mb-2">Growth & Coaching:</p>
                  <a 
                    href="mailto:aqsakhan.growth@gmail.com" 
                    className="text-primary hover:underline block"
                  >
                    aqsakhan.growth@gmail.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left flex-1">
                  <h4 className="font-semibold text-lg mb-2">Call Us</h4>
                  <a 
                    href="tel:+923338566992" 
                    className="text-primary hover:underline text-xl font-semibold block"
                  >
                    +92 333 8566992
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Available for consultations and bookings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Section */}
        <div className="mt-12 text-center">
          <h4 className="font-serif text-2xl text-primary mb-6">Connect With Us</h4>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <a 
              href="https://www.instagram.com/ataraxiabyaqsa?igsh=MWtydjNldTFremszZQ==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="font-semibold">@ataraxiabyaqsa</span>
            </a>
            <a 
              href="https://www.instagram.com/ataraxiabyaqsajournals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="font-semibold">@ataraxiabyaqsajournals</span>
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61562241750398&mibextid=LQQJ4d" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="font-semibold">Facebook</span>
            </a>
            <a 
              href="https://www.linkedin.com/company/ataraxia-by-aqsa/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="font-semibold">Company Page</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/aqsa-khan-811267250/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="font-semibold">Aqsa Khan</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCtaSection;