import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Search, ArrowUpRight, ShoppingCart } from "lucide-react"; // Added ShoppingCart icon
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext"; // Import useCart hook
import { useSiteImages } from "@/context/SiteImagesContext";
import { useBrandConfig } from "@/context/BrandConfigContext";

const leftNavLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
];

const rightNavLinks = [
  { to: "/courses", label: "Courses" },
  { to: "/journals", label: "Journals" },
  { to: "/blog", label: "Blog" },
];

const allNavLinks = [...leftNavLinks, ...rightNavLinks];

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItemCount } = useCart(); // Get cart item count
  const { images } = useSiteImages();
  const { brandConfig } = useBrandConfig();
  // Use branding logo override if set, otherwise fall back to Image Manager logo
  const logoSrc = brandConfig.logoUrl || images.logo;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navLinkClasses = (isActive: boolean) =>
    cn(
      "uppercase text-xs font-semibold tracking-widest transition-colors flex items-center gap-2",
      // Base color when not scrolled (transparent header)
      !isScrolled && (isActive ? "text-primary" : "text-primary/80 hover:text-primary"),
      // Base color when scrolled (white header)
      isScrolled && (isActive ? "text-primary" : "text-muted-foreground hover:text-primary")
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/70 backdrop-blur-xl border-b" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between lg:justify-center h-24">
          {/* Desktop: Left Side - Appointment */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex">
            <Link
              to="/book-call"
              className={cn(
                "text-xs uppercase font-semibold tracking-widest flex items-center gap-2 group",
                // Always use text-primary for visibility against light background
                "text-primary hover:text-primary/80"
              )}
            >
              <span>Book a Call</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>

          {/* Mobile: Left Side - Logo */}
          <div className="lg:hidden">
            <Link to="/" className="flex items-center gap-2 text-primary">
              <img src={logoSrc} alt="Logo" className="h-10 w-10" />
            </Link>
          </div>

          {/* Desktop: Center Navigation & Logo */}
          <div className="hidden lg:flex items-center gap-12">
            <nav className="flex items-center space-x-8">
              {leftNavLinks.map(({ to, label }) => (
                <NavLink key={to} to={to}>
                  {({ isActive }) => (
                    <span className={navLinkClasses(isActive)}>
                      {isActive && <span className="w-1.5 h-1.5 bg-current rounded-full"></span>}
                      {label}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
            <Link to="/" className="flex items-center gap-2 shrink-0 text-primary">
              <img src={logoSrc} alt="Logo" className="h-12 w-12" />
            </Link>
            <nav className="flex items-center space-x-8">
              {rightNavLinks.map(({ to, label }) => (
                <NavLink key={to} to={to}>
                  {({ isActive }) => (
                    <span className={navLinkClasses(isActive)}>
                      {isActive && <span className="w-1.5 h-1.5 bg-current rounded-full"></span>}
                      {label}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right Side - Icons (Desktop) & Menu (Mobile) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex items-center">
            <div className={cn("flex items-center space-x-2", isScrolled ? "text-primary" : "text-primary")}>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-pink text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center text-xs">
                      {cartItemCount}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile: Right Side - Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className={cn(isScrolled ? "text-primary" : "text-primary", "hover:bg-transparent focus:bg-transparent")}>
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-pink text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn(isScrolled ? "text-primary" : "text-primary", "hover:bg-transparent focus:bg-transparent")}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm">
                <div className="flex justify-between items-center p-4 border-b -m-6 mb-6">
                  <Link to="/" onClick={closeMenu} className="flex items-center gap-2 text-primary">
                    <img src={images.logo} alt="Ataraxia by Aqsa Logo" className="h-8 w-8" />
                    <span className="font-bold text-xl">Ataraxia by Aqsa</span>
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
                <Button asChild className="w-full mt-8">
                  <Link to="/book-call" onClick={closeMenu}>Book a Call</Link>
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