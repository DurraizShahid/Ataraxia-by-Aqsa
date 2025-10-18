import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, BookOpen, Calendar, Users, Check, Brain, Heart, Zap, Lightbulb, ExternalLink } from "lucide-react";
import { getSiteContent } from "@/lib/supabaseSiteContent";
import type { SiteContent } from "@/lib/siteContent";

const Services = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    <div>
      {/* Page Header */}
      <section className="bg-secondary py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold">{content.services.hero.title}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
            {content.services.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Introduction to Healing Services */}
      <section className="py-16 md:py-24 bg-background text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-lg text-muted-foreground mb-6">
            {content.services.description}
          </p>
          <p className="text-xl font-semibold text-primary">
            ✨ Experience more clarity, more control, and more peace — from the inside out.
          </p>
        </div>
      </section>

      {/* 1:1 Breakthrough Coaching Sessions */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">💠 1:1 Breakthrough Coaching Sessions</h2>
            <p className="text-lg text-muted-foreground mb-4">
              <span className="font-semibold">Perfect for:</span> Emotional Overwhelm, Inner Conflicts, Confidence, Purpose, Trauma Release
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              <span className="font-semibold">Techniques Used:</span> NLP, Time Line Therapy™, Hypnosis, Inner Child Work
            </p>
            <p className="text-muted-foreground mb-4">
              Our signature private coaching is custom-designed for deep inner work to boost your success and wellness by 4x. In these sessions, we help you:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Release limiting beliefs and subconscious fears</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Clear emotional baggage from past experiences</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Rewire your internal dialogue for self-love and success</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Step into the most powerful version of yourself</li>
            </ul>
            <p className="text-primary font-semibold mb-4">
              🔥 Clients report 3-4x better focus, decision-making, and inner peace within weeks.
            </p>
            <p className="text-muted-foreground mb-8">
              📅 Book a free discovery call today to begin your healing journey.
            </p>
            <Button asChild size="lg">
              <Link to="/book-call">Book a Session Now</Link>
            </Button>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="https://images.pexels.com/photos/3828944/pexels-photo-3828944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="1:1 Breakthrough Coaching Session"
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Time Line Therapy™ Sessions */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <img
              src="https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Time Line Therapy Session"
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="text-left order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">🌀 Time Line Therapy™ Sessions</h2>
            <p className="text-lg text-muted-foreground mb-4">
              <span className="font-semibold">Perfect for:</span> Past Traumas, Phobias, Unresolved Anger, Sadness, Grief
            </p>
            <p className="text-muted-foreground mb-4">
              Go to the root cause of emotional suffering without reliving it. Time Line Therapy™ helps you:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Eliminate unwanted emotions at the subconscious level</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Disconnect old triggers from past events</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Feel lighter, free, and emotionally reset</li>
            </ul>
            <p className="text-primary font-semibold mb-8">
              🧠 “It felt like my nervous system finally exhaled.” – Client Testimonial
            </p>
            <Button asChild size="lg">
              <Link to="/book-call">Pre-book your session today – Limited slots available</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Hypnotherapy */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">🔮 Hypnotherapy</h2>
            <p className="text-lg text-muted-foreground mb-4">
              <span className="font-semibold">Perfect for:</span> Anxiety, Sleep Issues, Confidence, Motivation, Self-worth
            </p>
            <p className="text-muted-foreground mb-4">
              Using deep relaxation and subconscious communication, hypnotherapy allows your mind to:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Let go of stuck patterns</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Heal past imprints</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Install new beliefs and goals effortlessly</li>
            </ul>
            <p className="text-primary font-semibold mb-4">
              🌙 Sessions are safe, science-backed, and deeply relaxing.
            </p>
            <p className="text-muted-foreground mb-8">
              📩 Contact us now for a consultation.
            </p>
            <Button asChild size="lg">
              <Link to="/book-call">Connect Now to Pre-Book</Link>
            </Button>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Hypnotherapy Session"
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Journaling & Creative Therapy */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <img
              src="https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Journaling & Creative Therapy"
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="text-left order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">✍️ Journaling & Creative Therapy</h2>
            <p className="text-lg text-muted-foreground mb-4">
              <span className="font-semibold">Perfect for:</span> Self-reflection, Inner Clarity, Emotional Expression
            </p>
            <p className="text-muted-foreground mb-4">
              Aqsa’s guided journaling method has helped 100+ clients:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Identify emotional patterns</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Reprogram daily thoughts</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Express and release stuck feelings</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Turn self-doubt into self-discovery</li>
            </ul>
            <p className="text-muted-foreground mb-8">
              🛒 Explore our guided journals, writing prompts, and emotional expression tools.
            </p>
            <Button asChild size="lg">
              <Link to="/journals">Shop the Journals Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Group Healing Circles */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">🤝 Group Healing Circles</h2>
            <p className="text-lg text-muted-foreground mb-4">
              <span className="font-semibold">Perfect for:</span> Shared Support, Collective Energy, Emotional Reconnection
            </p>
            <p className="text-muted-foreground mb-4">
              Held online or in-person, these sessions are an intimate space for:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Emotional healing</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Breathwork, anchoring & visualization</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Support from a safe and aligned community</li>
            </ul>
            <p className="text-primary font-semibold mb-8">
              🎤 Led personally by Aqsa Khan — NLP Coach & Trauma-Informed Healer
            </p>
            <Button asChild size="lg">
              <Link to="/book-call">Join the Waitlist</Link>
            </Button>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="https://images.pexels.com/photos/5428833/pexels-photo-5428833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Group Healing Circles"
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Corporate Trainings & Wellness Workshops */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <img
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Corporate Trainings & Wellness Workshops"
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="text-left order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">🧘 Corporate Trainings & Wellness Workshops</h2>
            <p className="text-lg text-muted-foreground mb-4">
              <span className="font-semibold">Perfect for:</span> Employee Well-being, Resilience Building, Mental Clarity
            </p>
            <p className="text-muted-foreground mb-4">
              Give your team the mental clarity and emotional tools they need to thrive. Our customized workplace programs include:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Emotional Regulation Techniques</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Reframing for Performance</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Communication and NLP Patterns</li>
              <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Stress to Strength Transformation</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              🧩 Ideal for educators, startups, NGOs, and forward-thinking organizations.
            </p>
            <p className="text-muted-foreground mb-8">
              📩 Contact for Bookings & Proposals.
            </p>
            <Button asChild size="lg">
              <Link to="/book-call">Contact Us for Corporate Training</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Course: 4X Boost to Personal Mastery */}
      <section className="py-16 md:py-24 bg-secondary text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">⚡️Upcoming Course: 4X Boost to Personal Mastery</h2>
          <p className="text-lg text-muted-foreground mb-4">
            A guided 21-day experience for complete emotional reset and mind-body reprogramming.
          </p>
          <ul className="space-y-2 text-muted-foreground mb-6 text-left inline-block">
            <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Expect rapid breakthroughs in self-discipline, confidence, and clarity — guided personally by NLP Coach Aqsa Khan.</li>
            <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Daily guided protocols</li>
            <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Full emotional support & accountability</li>
            <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Tools for rewiring subconscious beliefs</li>
            <li className="flex items-start"><Check className="h-5 w-5 text-primary mr-2 mt-1 shrink-0" /> Designed for high-performers, empaths, and anyone ready for massive life shifts</li>
          </ul>
          <p className="text-muted-foreground mb-8">
            💌 Pre-booking is now open — limited seats only. Contact now to claim your exclusive early-bird discount and step into a new era of mastery.
          </p>
          <Button asChild size="lg">
            <Link to="/courses">Pre-book Your Course Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;