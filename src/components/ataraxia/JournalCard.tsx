import CTAButton from "./CTAButton";
import Image from "./Image";

type JournalCardProps = {
  image: string;
  alt: string;
  title: string;
  price: string;
  description: string;
  who?: string;
};

const JournalCard = ({ image, alt, title, price, description, who }: JournalCardProps) => {
  return (
    <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl overflow-hidden">
      <div className="relative h-72 rounded-t-xl overflow-hidden">
        <Image
          src={image}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          alt={alt}
        />
      </div>
      <div className="p-5">
        <h3 className="text-[#F5F0E8] text-xl">{title}</h3>
        <p className="text-[#D4AF37] mt-1">{price}</p>
        <p className="text-[#A09880] mt-3">{description}</p>
        {who && <p className="text-[#F5F0E8] italic mt-3">{who}</p>}
        <div className="mt-5">
          <CTAButton>▶  Shop Individual Journals</CTAButton>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
