import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] mt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24">
        <hr className="border-[#D4AF37] opacity-40" />
        <div className="py-12 grid gap-8 md:grid-cols-3 text-[#A09880]">
          <div>
            <p className="text-[#D4AF37] tracking-[0.2em]" style={{ fontFamily: "Palatino Linotype, serif" }}>
              ATARAXIA
            </p>
            <p className="mt-2">Tranquillity in Transformation</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/">Home</Link>·<Link to="/about">About</Link>·<Link to="/services">Services</Link>·
            <Link to="/courses">Courses</Link>·<Link to="/journals">Journals</Link>·<Link to="/blog">Blog</Link>·
            <Link to="/contact">Contact</Link>
          </div>
          <div className="md:text-right">
            <p>Instagram · WhatsApp</p>
            <p className="mt-2">© 2025 Ataraxia by Aqsa Khan. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;