import { Helmet } from "react-helmet-async";
import { CTAButton, SectionLabel } from "@/components/ataraxia";

const Contact = () => {
  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8] max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-16">
      <Helmet>
        <title>Contact | Ataraxia</title>
      </Helmet>
      <h1 className="text-5xl">Let's Begin Your Rise.</h1>
      <p className="text-[#A09880] mt-6 leading-8">Every significant transformation begins with a single, intentional decision. This is yours.
        <br /><br />
        Ataraxia accepts a limited number of new clients each month — not as a tactic, but because the depth of this work requires full presence and precision. Each person who enters this space receives exactly that.
        <br /><br />
        If something in you already knows — trust it.
      </p>
      <hr className="border-[#D4AF37] opacity-40 my-16" />
      <SectionLabel>HOW TO BEGIN</SectionLabel>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="border border-[#D4AF37]/40 p-6 rounded-xl">
          <p className="text-[#D4AF37]">01</p>
          <h3 className="mt-3">Book a Free Discovery Call</h3>
          <p className="text-[#A09880] mt-2">30 minutes to understand where you are and what is possible</p>
        </div>
        <div className="border border-[#D4AF37]/40 p-6 rounded-xl">
          <p className="text-[#D4AF37]">02</p>
          <h3 className="mt-3">Apply for the 4X Reset Experience</h3>
          <p className="text-[#A09880] mt-2">By application only, limited intake</p>
        </div>
        <div className="border border-[#D4AF37]/40 p-6 rounded-xl">
          <p className="text-[#D4AF37]">03</p>
          <h3 className="mt-3">Corporate Enquiries</h3>
          <p className="text-[#A09880] mt-2">For team and organisational training</p>
        </div>
      </div>
      <div className="mt-8 flex gap-3 flex-wrap">
        <CTAButton>▶  Book Your Free Discovery Call</CTAButton>
        <CTAButton>▶  Submit an Application</CTAButton>
      </div>
      <p className="text-[#A09880] text-sm mt-6">WhatsApp enquiries welcome. Response within 24 hours.</p>
    </div>
  );
};

export default Contact;
