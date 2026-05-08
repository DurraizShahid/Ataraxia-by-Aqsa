import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/courses", label: "Courses" },
  { to: "/journals", label: "Journals" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[#2A2A2A] ${
        isScrolled ? "backdrop-blur-md bg-[#0A0A0A]/90" : "bg-[#0A0A0A]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-5 flex items-center justify-between gap-8">
        <Link
          to="/"
          className="flex items-center gap-3 text-[#F5F0E8] tracking-[0.2em] text-xl"
          style={{ fontFamily: "Palatino Linotype, serif" }}
          aria-label="Ataraxia home"
        >
          <img
            src="/favicon.svg"
            alt=""
            className="h-12 w-12 shrink-0"
            aria-hidden="true"
          />
          <span className="text-[#D4AF37]">ATARAXIA</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-5">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm ${isActive ? "text-[#F5F0E8]" : "text-[#A09880]"} hover:text-[#F5F0E8]`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/contact"
          className="border border-[#D4AF37] text-[#D4AF37] px-4 py-2 text-sm hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors"
        >
          Book a Discovery Call
        </Link>
      </div>
    </header>
  );
};

export default Header;