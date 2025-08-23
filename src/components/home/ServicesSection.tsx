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
  { icon: <Lightbulb />, title: "1 - 1 Live Coaching", description: "1:1 Coaching including NLP, Time Line Therapy, Hypnosis and Somatic Healing to remove mental blocks and improve emotional wellness", link: "/services" },
  { icon: <Brain />, title: "Time Line Therapy", description: "Time Line Therapy™ to release negative emotions and unlock your future", link: "/services" },
  { icon: <Heart />, title: "Hypnosis", description: "Hypnotherapy for deep subconscious transformation", link: "/services" },
  { icon: <PenTool />, title: "Journals", description: "Guided Journaling & Creative Therapy for self-reflection and growth", link: "/journals" },
  { icon: <Users />, title: "Group Sessions", description: "Group Sessions that foster collective healing and support", link: "/services" },
  { icon: <Briefcase />, title: "Training Sessions", description: "Corporate Training Sessions to empower teams and boost their performance", link: "/services" },
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