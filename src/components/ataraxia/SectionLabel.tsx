type SectionLabelProps = {
  children: string;
};

const SectionLabel = ({ children }: SectionLabelProps) => {
  return (
    <p className="font-mono text-xs tracking-[0.22em] uppercase text-[#D4AF37] mb-5">
      {children}
    </p>
  );
};

export default SectionLabel;
