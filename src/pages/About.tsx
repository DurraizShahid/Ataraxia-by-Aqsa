import { Helmet } from "react-helmet-async";
import { CTAButton, CredentialCard, GoldDivider, Image, PullQuote, SectionLabel } from "@/components/ataraxia";

const About = () => {
  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8] max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-16">
      <Helmet>
        <title>Aqsa Khan | Certified NLP Coach, Hypnotherapist &amp; Time Line Therapy™ Practitioner</title>
        <meta name="description" content="certified NLP coach hypnotherapist, Time Line Therapy practitioner Pakistan." />
      </Helmet>
      <h1 className="text-5xl" style={{ fontFamily: "Palatino Linotype, serif" }}>Built From the Inside. Backed by Mastery.</h1>
      <p className="italic text-[#A09880] mt-8 leading-8">
        Before the certifications. Before the framework. Before Ataraxia.
        <br /><br />
        There was a woman learning, very slowly, how to come home to herself.
      </p>
      <div className="relative rounded-xl overflow-hidden my-12">
        <img
          src="/images/ataraxia_journey_path.svg"
          alt="The path of transformation — Ataraxia by Aqsa Khan"
          className="w-full"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <GoldDivider />

      <SectionLabel>AQSA'S ORIGIN STORY</SectionLabel>
      <h2 className="text-4xl" style={{ fontFamily: "Palatino Linotype, serif" }}>The Origin of Ataraxia</h2>
      <p className="mt-6 text-[#A09880] leading-8 whitespace-pre-line">Aqsa Khan's path to this work did not begin with a calling. It began with survival.

Growing up through a childhood marked by pain she had no language for, she developed what so many high-functioning people develop: the ability to appear whole while quietly fragmenting inside. She was capable. She was accomplished. She was also completely disconnected from herself.

For years, she operated on autopilot — achieving externally, disappearing internally. The surface held. What was underneath did not.</p>
      <p className="text-xl font-semibold mt-6">And then, something shifted.</p>
      <p className="mt-6 text-[#A09880] leading-8 whitespace-pre-line">Not immediately. Not dramatically. But in the slow, unglamorous work of beginning to actually look inward, Aqsa started to connect with herself for the first time.

She began to understand her own strength — not the performance of it, but the real, embodied kind that lives beneath the need to prove. She started to see the patterns that had been running her life. She went into what was underneath: the grief she had never fully touched, the beliefs installed so early she had mistaken them for truth, the version of herself that had been waiting, quietly, for someone to come back for her.

She did the work of forgiving herself. For the years she spent not knowing. For the choices made from wounds she hadn't yet healed. For the distance she had kept from her own life.

And in that process of releasing, rewiring, and rising — she discovered that what had transformed her was not any single tool. It was the integration of all of them. NLP for the structure of thought. Time Line Therapy™ for the emotional past. Clinical Hypnotherapy for the subconscious. Somatic work for the body's held memory. Together, they had created something she had never felt before: clarity that lived in the body, not just the mind.</p>
      <PullQuote quote="All unexpressed emotions come out in uglier forms." author="Carl Jung" />
      <p className="text-[#A09880] leading-8 whitespace-pre-line">She had lived that truth. And she had found the path through it.

Ataraxia was built from that path. Not as a brand, but as a movement — a conviction that the most profound transformation available to a human being is not the kind that improves your life. It's the kind that changes who is living it.

Today, Aqsa is an internationally certified NLP Coach, Time Line Therapy™ Practitioner, and Clinical Hypnotherapist. She works with high-achieving women, executives, and leaders who sense that something far deeper is available to them — and are ready to do the real work of accessing it.</p>
      <Image
        src="/images/img_group_session.png"
        alt="Aqsa Khan facilitating an Ataraxia group transformation session"
        width={1200}
        height={800}
        className="w-full rounded-xl my-14 object-cover"
      />
      <GoldDivider />
      <SectionLabel>CREDENTIALS</SectionLabel>
      <h2 className="text-4xl" style={{ fontFamily: "Palatino Linotype, serif" }}>Certifications & Training</h2>
      <div className="space-y-3 mt-8">
        <CredentialCard text="· Internationally Certified NLP Coach (ABNLP)" />
        <CredentialCard text="· Certified Time Line Therapy™ Practitioner (TLTA)" />
        <CredentialCard text="· Certified Clinical Hypnotherapist" />
        <CredentialCard text="· Specialisation in Somatic Emotional Release" />
        <CredentialCard text="· Mental Health Advocate & Practitioner" />
      </div>
      <div className="mt-8 flex gap-3 flex-wrap">
        <CTAButton>▶  Read Aqsa's Full Story</CTAButton>
        <CTAButton>▶  Book a Private Clarity Call</CTAButton>
      </div>
    </div>
  );
};

export default About;