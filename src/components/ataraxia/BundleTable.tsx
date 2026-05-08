const rows = [
  ["The Clarity Starter", "$50", "$15 off", "Meditation Journal + 118 Questions"],
  ["The Healing Journey", "$120", "$25 off", "Inner Child + Addiction Recovery"],
  ["The Full Library ★ BEST VALUE", "$155", "$35 off", "All 4 Journals — Complete System"],
  ["The Inner Circle Bundle ★ MOST POPULAR", "$175", "$45 off", "All 4 Journals + Private Discovery Call"],
];

const BundleTable = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-8">
      {rows.map((row) => (
        <div key={row[0]} className="bg-[#111111] border border-[#D4AF37]/40 rounded-xl p-5">
          <h3 className="text-[#F5F0E8]">{row[0]}</h3>
          <p className="text-[#D4AF37] mt-2 text-xl">{row[1]}</p>
          <p className="text-[#A09880] text-sm mt-1">You Save: {row[2]}</p>
          <p className="text-[#A09880] text-sm mt-3">{row[3]}</p>
        </div>
      ))}
    </div>
  );
};

export default BundleTable;
