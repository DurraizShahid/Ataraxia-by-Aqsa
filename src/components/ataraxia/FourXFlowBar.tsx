const FourXFlowBar = () => {
  const stages = [
    { title: "RELEASE", subtitle: "Dissolve the root" },
    { title: "REWIRE", subtitle: "Rebuild the mind" },
    { title: "RISE", subtitle: "Embody the shift" },
    { title: "LIVE 4X", subtitle: "Operate at full power" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
      {stages.map((stage, index) => (
        <div key={stage.title} className="flex items-center gap-3">
          <div className="bg-[#111111] border border-[#D4AF37]/50 px-5 py-4 min-w-40">
            <p className="text-[#D4AF37] tracking-wide text-sm">{stage.title}</p>
            <p className="text-[#A09880] text-sm italic mt-1">{stage.subtitle}</p>
          </div>
          {index < stages.length - 1 && <span className="text-[#D4AF37] text-xl">→</span>}
        </div>
      ))}
    </div>
  );
};

export default FourXFlowBar;
