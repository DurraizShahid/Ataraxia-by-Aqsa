import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-primary mb-4">
              <img src="/logo.svg" alt="Ataraxia Logo" className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-primary">Ataraxia</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering you with tools for transformation and healing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary">Courses</Link></li>
              <li><Link to="/journals" className="text-muted-foreground hover:text-primary">Journals</Link></li>
              <li><Link to="/book-call" className="text-muted-foreground hover:text-primary">Book a Call</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="text-muted-foreground hover:text-primary">Terms of Use</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Sign up for updates and healing resources.
            </p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="flex-grow" />
              <Button type="submit">Sign Up</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Ataraxia Foundation. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></a>
            <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={20} /></a>
            <a href="#" className="text-muted-foreground hover:text-primary"><MessageSquare size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;