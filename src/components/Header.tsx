import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import CartDrawer from "@/components/CartDrawer";

const leftNavLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
];

const rightNavLinks = [
  { to: "/workshops", label: "Workshop" },
  { to: "/journals", label: "Journals" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const allNavLinks = [...leftNavLinks, ...rightNavLinks];

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navLinkClasses = (isActive: boolean) =>
    cn(
      "uppercase text-xs font-semibold tracking-widest transition-colors flex items-center gap-2",
      isActive ? "text-[#F5F0E8]" : "text-[#A09880] hover:text-[#F5F0E8]"
    );

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[#2A2A2A] ${
        isScrolled ? "backdrop-blur-md bg-[#0A0A0A]/90" : "bg-[#0A0A0A]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="relative flex items-center justify-between lg:justify-center py-5">
          {/* Desktop: left side CTA */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex">
            <Link
              to="/book-call"
              className="text-xs uppercase font-semibold tracking-widest flex items-center gap-2 group text-[#D4AF37] hover:text-[#F5F0E8] transition-colors"
            >
              <span>Book a Call</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>

          {/* Mobile: left side logo */}
          <div className="lg:hidden">
            <Link to="/" className="flex items-center" aria-label="Ataraxia home">
              <img src="/favicon.svg" alt="" className="h-10 w-10 shrink-0" aria-hidden="true" />
            </Link>
          </div>

          {/* Desktop: center nav + logo + nav */}
          <div className="hidden lg:flex items-center gap-12">
            <nav className="flex items-center space-x-8">
              {leftNavLinks.map(({ to, label }) => (
                <NavLink key={to} to={to}>
                  {({ isActive }) => (
                    <span className={navLinkClasses(isActive)}>
                      {isActive && <span className="w-1.5 h-1.5 bg-current rounded-full" />}
                      {label}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            <Link
              to="/"
              className="flex items-center shrink-0"
              aria-label="Ataraxia home"
            >
              <img src="/favicon.svg" alt="" className="h-12 w-12 shrink-0" aria-hidden="true" />
            </Link>

            <nav className="flex items-center space-x-8">
              {rightNavLinks.map(({ to, label }) => (
                <NavLink key={to} to={to}>
                  {({ isActive }) => (
                    <span className={navLinkClasses(isActive)}>
                      {isActive && <span className="w-1.5 h-1.5 bg-current rounded-full" />}
                      {label}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Desktop & Mobile: Cart */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <CartDrawer />
          </div>

          {/* Mobile: right side menu */}
          <div className="lg:hidden mr-12">
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#F5F0E8] hover:bg-transparent focus:bg-transparent"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm">
                <div className="flex justify-between items-center p-4 border-b -m-6 mb-6">
                  <Link to="/" onClick={closeMenu} className="flex items-center gap-3 text-[#0A0A0A]">
                    <img src="/favicon.svg" alt="" className="h-8 w-8" aria-hidden="true" />
                  </Link>
                  <Button variant="ghost" size="icon" onClick={closeMenu}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4 mt-8">
                  {allNavLinks.map(({ to, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `text-lg font-medium transition-colors hover:text-primary ${
                          isActive ? "text-primary" : "text-foreground"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  ))}
                </nav>
                <Button asChild className="w-full mt-8" onClick={closeMenu}>
                  <Link to="/book-call">Book a Call</Link>
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;