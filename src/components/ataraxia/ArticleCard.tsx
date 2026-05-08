type ArticleCardProps = {
  title: string;
};

const ArticleCard = ({ title }: ArticleCardProps) => {
  return (
    <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#D4AF37]/70 transition-colors">
      <div className="h-32 bg-[#0A0A0A] border border-[#2A2A2A] rounded-md mb-4" />
      <p className="text-[#F5F0E8] hover:text-[#D4AF37] transition-colors">{title}</p>
    </div>
  );
};

export default ArticleCard;
