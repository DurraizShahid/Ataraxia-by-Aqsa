type PullQuoteProps = {
  quote: string;
  author: string;
};

const PullQuote = ({ quote, author }: PullQuoteProps) => {
  return (
    <div className="text-center my-12">
      <p className="text-2xl md:text-3xl italic text-[#D4AF37] leading-relaxed">"{quote}"</p>
      <p className="mt-4 text-[#A09880]">— {author}</p>
    </div>
  );
};

export default PullQuote;
