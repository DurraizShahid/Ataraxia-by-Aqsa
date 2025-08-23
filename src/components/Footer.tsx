import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react"; // Removed Facebook, Twitter, Youtube

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo-black.svg" alt="Ataraxia Logo" className="h-10 w-10" style={{ filter: 'brightness(0) invert(1)' }} />
            </Link>
            <p className="text-sm text-primary-foreground/70 mb-6">
              Empowering you with tools for transformation and healing.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/ataraxiafoundation" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground"><Instagram size={16} /></a>
              <a href="https://www.linkedin.com/company/ataraxiafoundation" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground"><Linkedin size={16} /></a>
              {/* Add WhatsApp if needed */}
            </div>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground">Home</Link></li>
              <li><Link to="/courses" className="text-primary-foreground/70 hover:text-primary-foreground">Courses</Link></li>
              <li><Link to="/journals" className="text-primary-foreground/70 hover:text-primary-foreground">Journals</Link></li>
              <li><Link to="/book-call" className="text-primary-foreground/70 hover:text-primary-foreground">Book a Call</Link></li>
              <li><Link to="/blog" className="text-primary-foreground/70 hover:text-primary-foreground">Blog</Link></li>
              <li><Link to="/privacy-policy" className="text-primary-foreground/70 hover:text-primary-foreground">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="text-primary-foreground/70 hover:text-primary-foreground">Terms of Use</Link></li>
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