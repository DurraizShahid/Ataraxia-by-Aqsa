import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain, // Using Brain for Brain Rewiring
  Heart, // Using Heart for Emotional Healing
  Users, // Using Users for Hypnotherapy/NLP/TLT
  Zap, // Using Zap for Behavior Modification
  BookOpen, // Using BookOpen for NLP/TLT/Hypnotherapy
  Lightbulb, // Using Lightbulb for NLP/TLT/Hypnotherapy
  PenTool, // New icon for Journaling
  Briefcase, // New icon for Corporate Trainings
  Award, // New icon for Upcoming Course
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: <Lightbulb />, title: "1:1 Breakthrough Coaching", description: "Personalized NLP coaching for emotional overwhelm, inner conflicts, confidence, and trauma release.", link: "/services" },
  { icon: <Brain />, title: "Time Line Therapy™ Sessions", description: "Go to the root cause of past traumas, phobias, and unresolved emotions without reliving them.", link: "/services" },
  { icon: <Heart />, title: "Hypnotherapy", description: "Deep relaxation and subconscious communication for anxiety, sleep issues, confidence, and self-worth.", link: "/services" },
  { icon: <PenTool />, title: "Journaling & Creative Therapy", description: "Guided methods to identify emotional patterns, reprogram thoughts, and express stuck feelings.", link: "/services" },
  { icon: <Users />, title: "Group Healing Circles", description: "Intimate online or in-person sessions for shared support, breathwork, and emotional reconnection.", link: "/services" },
  { icon: <Briefcase />, title: "Corporate Trainings & Workshops", description: "Customized programs for employee well-being, resilience building, and mental clarity.", link: "/services" },
  { icon: <Award />, title: "4X Boost to Personal Mastery", description: "A guided 21-day course for complete emotional reset and mind-body reprogramming.", link: "/services" },
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
            <p className="text-muted-foreground mt-2">{service.description}</p>
            <Button variant="link" className="p-0 mt-2 text-primary text-xs" asChild>
              <Link to={service.link}>READ MORE <ArrowRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;