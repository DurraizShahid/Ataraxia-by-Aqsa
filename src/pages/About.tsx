import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, ArrowRight, ExternalLink } from "lucide-react"; // Removed Pinterest

const About = () => {
  return (
    <div className="bg-[#F8F5F3]">
      {/* About Me Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">About Me</p>
            <h1 className="text-5xl md:text-6xl font-serif text-primary mb-4">Olivia Forman, Ph.D.</h1>
            <p className="text-lg text-muted-foreground mb-6">Clinical psychiatrist and therapist</p>
            <p className="text-muted-foreground mb-6 max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-muted-foreground mb-2">A: Seestrasse 21, Zurich, Swisse</p>
            <p className="text-muted-foreground mb-6">E: wellmont@qodeinteractive.com</p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center text-primary-foreground hover:bg-brand-pink-darker transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center text-primary-foreground hover:bg-brand-pink-darker transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center text-primary-foreground hover:bg-brand-pink-darker transition-colors">
                <Linkedin size={16} />
              </a>
              {/* Removed Pinterest link */}
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="/images/about-hero.png"
              alt="Olivia Forman, Ph.D."
              className="w-full max-w-md md:max-w-none h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Memberships & Certificates Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Read & Learn</p>
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-12">Memberships & certificates</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-8 items-center justify-center">
            {/* Placeholder Logos - Replace with actual images if available */}
            <div className-="flex flex-col items-center text-muted-foreground text-lg font-semibold">
              <img src="https://via.placeholder.com/80x40/E6DCD5/5C4B4B?text=Logo1" alt="Logo 1" className="h-10 object-contain mb-2" />
              Mental Health
            </div>
            <div className="flex flex-col items-center text-muted-foreground text-lg font-semibold">
              <img src="https://via.placeholder.com/80x40/E6DCD5/5C4B4B?text=Logo2" alt="Logo 2" className="h-10 object-contain mb-2" />
              ABCD
            </div>
            <div className="flex flex-col items-center text-muted-foreground text-lg font-semibold">
              <img src="https://via.placeholder.com/80x40/E6DCD5/5C4B4B?text=Logo3" alt="Logo 3" className="h-10 object-contain mb-2" />
              Mind Consulting
            </div>
            <div className="flex flex-col items-center text-muted-foreground text-lg font-semibold">
              <img src="https://via.placeholder.com/80x40/E6DCD5/5C4B4B?text=Logo4" alt="Logo 4" className="h-10 object-contain mb-2" />
              GEST
            </div>
            <div className="flex flex-col items-center text-muted-foreground text-lg font-semibold">
              <img src="https://via.placeholder.com/80x40/E6DCD5/5C4B4B?text=Logo5" alt="Logo 5" className="h-10 object-contain mb-2" />
              P.S.Y.
            </div>
            <div className="flex flex-col items-center text-muted-foreground text-lg font-semibold">
              <img src="https://via.placeholder.com/80x40/E6DCD5/5C4B4B?text=Logo6" alt="Logo 6" className="h-10 object-contain mb-2" />
              UniPh
            </div>
            <div className="flex flex-col items-center text-muted-foreground text-lg font-semibold">
              <img src="https://via.placeholder.com/80x40/E6DCD5/5C4B4B?text=Logo7" alt="Logo 7" className="h-10 object-contain mb-2" />
              Heal
            </div>
            <div className="flex flex-col items-center text-muted-foreground text-lg font-semibold">
              <img src="https://via.placeholder.com/80x40/E6DCD5/5C4B4B?text=Logo8" alt="Logo 8" className="h-10 object-contain mb-2" />
              IFP
            </div>
            <div className="flex flex-col items-center text-muted-foreground text-lg font-semibold">
              <img src="https://via.placeholder.com/80x40/E6DCD5/5C4B4B?text=Logo9" alt="Logo 9" className="h-10 object-contain mb-2" />
              Therapy Society
            </div>
          </div>
        </div>
      </section>

      {/* Modern Psychology Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 opacity-30">
          {/* Placeholder for the leaf graphic */}
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0ZM100 180C55.8172 180 20 144.183 20 100C20 55.8172 55.8172 20 100 20C144.183 20 180 55.8172 180 100C180 144.183 144.183 180 100 180Z" fill="#E6DCD5"/>
            <path d="M100 20C127.614 20 150 42.3858 150 70C150 97.6142 127.614 120 100 120C72.3858 120 50 97.6142 50 70C50 42.3858 72.3858 20 100 20Z" fill="#E6DCD5"/>
            <path d="M100 120C116.569 120 130 106.569 130 90C130 73.4315 116.569 60 100 60C83.4315 60 70 73.4315 70 90C70 106.569 83.4315 120 100 120Z" fill="#E6DCD5"/>
          </svg>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-start">
            <img
              src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600" // Placeholder for book image
              alt="Modern Psychology Book"
              className="w-full max-w-sm h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Read & Learn</p>
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Modern psychology</h2>
            <p className="text-muted-foreground mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-muted-foreground mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            </p>
            <div className="flex gap-4">
              <Button className="bg-brand-pink hover:bg-brand-pink-darker text-primary-foreground" asChild>
                <Link to="/courses">Buy Now</Link>
              </Button>
              <Button variant="link" className="p-0 text-primary flex items-center group" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Download First Part <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:rotate-45" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Read & Learn</p>
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Sign up for newsletter & be part of the community.</h2>
            <p className="text-muted-foreground max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
          <form className="space-y-4">
            <Input placeholder="Your name" className="bg-background" />
            <Input type="email" placeholder="Your e-mail" className="bg-background" />
            <Button type="submit" className="w-full bg-brand-pink hover:bg-brand-pink-darker text-primary-foreground">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default About;