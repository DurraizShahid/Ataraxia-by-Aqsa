import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const TransformationIntroSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background text-center">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Stuck -> Empowered Flow */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-16">
          <Card className="p-6 md:p-8 shadow-lg border-none bg-white/70 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="text-4xl md:text-5xl font-serif text-primary font-bold">Stuck</div>
            </CardContent>
          </Card>
          <ArrowRight className="h-16 w-16 text-brand-pink animate-pulse shrink-0" />
          <Card className="p-6 md:p-8 shadow-lg border-none bg-white/70 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="text-4xl md:text-5xl font-serif text-primary font-bold">Empowered</div>
            </CardContent>
          </Card>
        </div>

        {/* Body Text */}
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground mb-6">
            Experience up to 4x more productivity through mind, body, soul alignment.
            Our signature approach heals the mind, soothes the body, and frees the soul — creating a ripple of success in every area of your life. Our transformational coaching services are designed to rewire your subconscious mind, bringing clarity, confidence, and inner peace.
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            Experience the power of emotional healing coaching that boosts your productivity up to 4x by freeing your mind and body from emotional baggage. Whether through personalized 1:1 coaching, Time Line Therapy™, somatic healing, hypnotherapy sessions, or supportive group sessions, Ataraxia provides the tools you need for lasting change.
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            Our unique approach combines proven methods in life transformation coaching with compassionate support, empowering you to live with purpose, balance, and mental clarity. Start your journey to emotional freedom and discover how to remove limiting beliefs that hold you back.
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/book-call">Book a Free 1:1 Discovery Call <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
            <Link to="/services">Explore Our Healing Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/journals">Get Started with a Journal <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TransformationIntroSection;