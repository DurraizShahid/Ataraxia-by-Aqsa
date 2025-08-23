import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain, // Using Brain for Brain Rewiring
  Heart, // Using Heart for Emotional Healing
  Users, // Using Users for Hypnotherapy/NLP/TLT
  Zap, // Using Zap for Behavior Modification
  BookOpen, // Using BookOpen for NLP/TLT/Hypnotherapy
  Lightbulb, // Using Lightbulb for NLP/TLT/Hypnotherapy
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: <Lightbulb />, title: "1:1 NLP Coaching", description: "Personalized sessions using Neuro-Linguistic Programming to remove limiting beliefs and achieve emotional freedom.", link: "/services" },
  { icon: <Brain />, title: "Time Line Therapy™", description: "Advanced techniques to clear mental fog and release past traumas for lasting emotional healing.", link: "/services" },
  { icon: <Heart />, title: "Hypnosis Therapy Online", description: "Guided hypnosis sessions to address emotional blockages and foster deep relaxation and transformation.", link: "/services" },
  { icon: <Zap />, title: "Emotional Release Techniques", description: "Learn powerful methods to process and release suppressed emotions, leading to greater inner peace.", link: "/services" },
  { icon: <BookOpen />, title: "Personal Mastery Programs", description: "Comprehensive programs designed for life transformation coaching and increasing productivity with mindset coaching.", link: "/courses" },
  { icon: <Users />, title: "Group Sessions for Emotional Healing", description: "Connect with a supportive community in group sessions focused on collective emotional healing and growth.", link: "/courses" },
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