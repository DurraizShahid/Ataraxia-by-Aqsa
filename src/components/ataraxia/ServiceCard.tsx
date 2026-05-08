import CTAButton from "./CTAButton";
import SectionLabel from "./SectionLabel";

type ServiceCardProps = {
  tag: string;
  title: string;
  body: string;
  points?: string[];
  cta: string;
};

const ServiceCard = ({ tag, title, body, points, cta }: ServiceCardProps) => {
  return (
    <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8">
      <SectionLabel>{tag}</SectionLabel>
      <h2 className="text-3xl text-[#F5F0E8]">{title}</h2>
      <p className="text-[#A09880] mt-4 whitespace-pre-line">{body}</p>
      {points && (
        <ul className="mt-5 space-y-2 text-[#A09880]">
          {points.map((point) => (
            <li key={point}>· {point}</li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <CTAButton>{cta}</CTAButton>
      </div>
    </div>
  );
};

export default ServiceCard;
