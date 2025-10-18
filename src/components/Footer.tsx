import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo-black.svg" alt="Ataraxia by Aqsa Logo" className="h-10 w-10" style={{ filter: 'brightness(0) invert(1)' }} />
            </Link>
            <p className="text-sm text-primary-foreground/70 mb-6">
              Empowering you with tools for transformation and healing.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/ataraxiabyaqsa?igsh=MWtydjNldTFremszZQ==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Instagram - @ataraxiabyaqsa"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61562241750398&mibextid=LQQJ4d" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/ataraxia-by-aqsa/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn - Company"
              >
                <Linkedin size={20} />
              </a>
            </div>
            <div className="mt-4 space-y-1 text-xs text-primary-foreground/70">
              <p>Journals: <a href="https://www.instagram.com/ataraxiabyaqsajournals" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground">@ataraxiabyaqsajournals</a></p>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground">Home</Link></li>
              <li><Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground">About</Link></li>
              <li><Link to="/services" className="text-primary-foreground/70 hover:text-primary-foreground">Services</Link></li>
              <li><Link to="/courses" className="text-primary-foreground/70 hover:text-primary-foreground">Courses</Link></li>
              <li><Link to="/journals" className="text-primary-foreground/70 hover:text-primary-foreground">Journals</Link></li>
              <li><Link to="/blog" className="text-primary-foreground/70 hover:text-primary-foreground">Blog</Link></li>
              <li><Link to="/book-call" className="text-primary-foreground/70 hover:text-primary-foreground">Book a Call</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/privacy-policy" className="hover:text-primary-foreground">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="hover:text-primary-foreground">Terms of Use</Link></li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/aqsa-khan-811267250/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary-foreground"
                >
                  Trainer LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>📍 Online & In-Person Sessions</li>
              <li>
                📞 <a href="tel:+923338566992" className="hover:text-primary-foreground">+92 333 8566992</a>
              </li>
              <li>
                ✉️ <a href="mailto:ataraxiaaqsa@gmail.com" className="hover:text-primary-foreground">ataraxiaaqsa@gmail.com</a>
              </li>
              <li>
                ✉️ <a href="mailto:aqsakhan.growth@gmail.com" className="hover:text-primary-foreground">aqsakhan.growth@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/70">&copy; {new Date().getFullYear()} Ataraxia by Aqsa. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;