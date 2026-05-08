const domains = [
  ["MONEY", "Financial identity & abundance"],
  ["RELATIONSHIPS", "Depth, trust & connection"],
  ["MINDSET", "Beliefs & inner architecture"],
  ["HEALTH", "Body, energy & somatic peace"],
  ["SPIRITUALITY", "Inner alignment & purpose"],
  ["CAREER", "Expression & professional rise"],
  ["PURPOSE", "Your reason. Your direction."],
  ["LIFESTYLE", "The life you actually design"],
];

const DomainGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {domains.map(([title, description]) => (
        <div key={title} className="bg-[#111111] border border-[#D4AF37]/45 p-5 rounded-xl">
          <p className="text-[#D4AF37] tracking-wide">{title}</p>
          <p className="text-[#A09880] italic text-sm mt-2">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default DomainGrid;
