type CredentialCardProps = {
  text: string;
};

const CredentialCard = ({ text }: CredentialCardProps) => {
  return <div className="border-l-2 border-[#D4AF37] pl-4 py-2 text-[#A09880]">{text}</div>;
};

export default CredentialCard;
