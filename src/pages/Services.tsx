import { Helmet } from "react-helmet-async";
import { CTAButton, FourXFlowBar, GoldDivider, Image, SectionLabel } from "@/components/ataraxia";

const Services = () => {
  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8] max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-16">
      <Helmet>
        <title>NLP Coaching, Hypnotherapy &amp; Subconscious Reprogramming | Ataraxia by Aqsa</title>
        <meta name="description" content="1:1 NLP coaching sessions, hypnotherapy for anxiety and trauma online, Time Line Therapy for emotional healing, corporate mindset coaching emotional intelligence." />
      </Helmet>
      <h1 className="text-5xl" style={{ fontFamily: "Palatino Linotype, serif" }}>The Work. For Those Who Are Ready.</h1>
      <p className="text-[#A09880] mt-6 leading-8">Every service within Ataraxia is designed around the 4X System — operating at the intersection of emotional release, subconscious rewiring, identity expansion, and internal alignment. Each offering addresses a different depth of access and a different stage of readiness.</p>
      <FourXFlowBar />
      <img
        src="/images/ataraxia_triad_integration.svg"
        alt="The Ataraxia triad: Emotional Release, Subconscious Rewiring, Identity Integration"
        className="mx-auto max-w-2xl w-full mt-12 mb-4"
      />
      <GoldDivider />
      <SectionLabel>SERVICE 01 — SIGNATURE OFFERING</SectionLabel>
      <h2 className="text-4xl">The 4X Reset Experience — 3-Day Intensive</h2>
      <p className="italic text-[#B8962E] mt-3">The deepest access available within Ataraxia.</p>
      <p className="text-[#A09880] mt-4">A three-day immersive built to achieve, in seventy-two hours, the internal transformation that most people spend years approaching. This is not a retreat. It is precision work — structured, intentional, and designed to leave you fundamentally different from the person who arrived.</p>
      <p className="mt-4 text-[#A09880]">Day 1: Release — Locate and neutralise the emotional charge at the origin. Using Time Line Therapy™ and somatic-based techniques, we dissolve the root — not the story around it, the charge beneath it.</p>
      <p className="mt-3 text-[#A09880]">Day 2: Rewire — Install the subconscious architecture of your next identity. NLP and clinical hypnotherapy work at the level below conscious thought, replacing patterns that were never chosen with ones that are.</p>
      <p className="mt-3 text-[#A09880]">Day 3: Rise — Embody the shift. Anchor it. Move forward as the identity you've built — not as a hope, but as a lived reality.</p>
      <p className="mt-4">Three tiers. One transformation.</p>
      <p className="text-[#A09880] mt-2">· Access — The complete 3-day experience<br />· Deep Work — Extended integration and personalised daily sessions<br />· Inner Circle — Includes a private session with Aqsa</p>
      <div className="mt-5"><CTAButton to="/apply">▶  Apply for The 4X Reset</CTAButton></div>
      <Image
        src="/images/img_5_modalities.png"
        alt="The five transformation modalities used in the Ataraxia 4X Reset: Emotional Release, NLP Rewiring, Hypnosis, Somatic Healing, Timeline Therapy"
        width={1400}
        height={933}
        className="w-full rounded-xl mt-12"
      />
      <GoldDivider />
      <SectionLabel>SERVICE 02 — 1:1 PREMIUM</SectionLabel>
      <h2 className="text-4xl">Private Clarity & Transformation Sessions</h2>
      <p className="text-[#A09880] mt-4">For those who require deep, sustained private work. Available as a 3-month or 5-month container, this is not a weekly check-in. It is a complete internal overhaul — addressing the full spectrum of what is keeping you from operating at the level you know you're capable of.</p>
      <p className="text-[#A09880] mt-3">· Somatic-based emotional release<br />· NLP subconscious reprogramming<br />· Time Line Therapy™ for past emotional clearing<br />· WhatsApp accountability between sessions</p>
      <div className="mt-5"><CTAButton to="/book-call">▶  Book a Private Discovery Call</CTAButton></div>
      <GoldDivider />
      <SectionLabel>SERVICE 03 — EMERGENCY SUPPORT</SectionLabel>
      <h2 className="text-4xl">Emergency & High-Stress Sessions</h2>
      <div className="border border-[#D4AF37]/50 p-4 mt-4 text-[#D4AF37]">DEDICATED CRISIS SUPPORT</div>
      <p className="text-[#A09880] mt-4">When life doesn't wait, you won't be alone in it.<br /><br />A dedicated, trained professional is assigned to you — available for acute emotional processing, grounding, nervous system regulation, and focused subconscious intervention when the pressure is highest. This is not a chatbot, a helpline, or a waiting list. It is a human, trained specifically in the Ataraxia methodology, present for you in real time.</p>
      <p className="text-[#A09880] mt-3">▶  WhatsApp accountability between sessions<br />▶  Available to existing Ataraxia clients and selected new applicants<br />▶  Sessions available remotely, across time zones</p>
      <div className="mt-5"><CTAButton>▶  Enquire About Crisis Support</CTAButton></div>
      <GoldDivider />
      <SectionLabel>SERVICE 04 — GROUP & COLLECTIVE</SectionLabel>
      <h2 className="text-4xl">Group Experiences & Themed Workshops</h2>
      <p className="mt-4 text-[#A09880]">Collective transformation carries its own intelligence. Ataraxia's group experiences are intimate, facilitated, and designed to create the conditions for genuine emotional release and identity shift within a shared container.</p>
      <p className="text-[#A09880] mt-3">· Monthly emotional release circles<br />· Belief rewiring workshops<br />· Identity shift intensives<br />· Curated collaborative events with partner practitioners — yoga, arts, exclusive Islamabad experiences</p>
      <div className="mt-5"><CTAButton>▶  Join the Next Group Session</CTAButton></div>
      <img
        src="/images/ataraxia_energy_frequency.svg"
        alt="Energy and frequency alignment — Ataraxia group transformation"
        className="w-full rounded-xl border border-[#D4AF37]/25 mt-10 mb-2"
      />
      <GoldDivider />
      <SectionLabel>SERVICE 05 — CORPORATE</SectionLabel>
      <h2 className="text-4xl">Corporate & Organisational Training</h2>
      <p className="text-[#A09880] mt-4">Performance at the highest level is not a skills problem. It is an inner architecture problem. Ataraxia's corporate training addresses the invisible layer beneath team performance: the emotional intelligence, communication patterns, and subconscious dynamics that shape every outcome.</p>
      <p className="text-[#A09880] mt-3">· Emotional intelligence for leadership<br />· Communication patterns and team dynamics<br />· Resilience and stress regulation under pressure<br />· Mindset performance for high-stakes environments</p>
      <div className="mt-5"><CTAButton>▶  Enquire About Corporate Training</CTAButton></div>
    </div>
  );
};

export default Services;