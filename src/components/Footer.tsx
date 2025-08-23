import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="Ataraxia Logo" className="h-10 w-10" style={{ filter: 'brightness(0) invert(1)' }} />
            </Link>
            <p className="text-sm text-primary-foreground/70 mb-6">
              Empowering you with tools for transformation and healing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground"><Facebook size={16} /></a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground"><Instagram size={16} /></a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground"><Twitter size={16} /></a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground"><Youtube size={16} /></a>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground">About Us</Link></li>
              <li><Link to="/services" className="text-primary-foreground/70 hover:text-primary-foreground">Services</Link></li>
              <li><Link to="/courses" className="text-primary-foreground/70 hover:text-primary-foreground">Courses</Link></li>
              <li><Link to="/blog" className="text-primary-foreground/70 hover:text-primary-foreground">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-4">Workshops</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Inner Child Healing</li>
              <li>Emotional Resilience</li>
              <li>Identity Shifting</li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>A: Online & In-Person</li>
              <li>T: +1 (555) 123-4567</li>
              <li>E: info@ataraxiafoundation.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/70">&copy; {new Date().getFullYear()} Ataraxia Foundation, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;