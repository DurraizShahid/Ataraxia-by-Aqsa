import { Link } from "react-router-dom";

type CTAButtonProps = {
  children: string;
  to?: string;
};

const CTAButton = ({ children, to = "/contact" }: CTAButtonProps) => {
  return (
    <Link
      to={to}
      className="inline-block border border-[#D4AF37] text-[#D4AF37] px-6 py-3 text-sm tracking-wide transition-all hover:bg-[#D4AF37] hover:text-[#0A0A0A] hover:shadow-[0_0_22px_rgba(212,175,55,0.4)]"
    >
      {children}
    </Link>
  );
};

export default CTAButton;
