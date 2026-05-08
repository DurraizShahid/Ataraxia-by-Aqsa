import { Helmet } from "react-helmet-async";
import { CTAButton, FadeInSection, FourXFlowBar, GoldDivider, PullQuote, SectionLabel } from "@/components/ataraxia";

const Index = () => {
  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8]">
      <Helmet>
        <title>Emotional Transformation &amp; Subconscious Reprogramming | Ataraxia by Aqsa</title>
        <meta name="description" content="subconscious reprogramming coach, NLP coach for emotional transformation, emotional release coaching online." />
      </Helmet>

      <section className="relative min-h-screen flex items-center">
        <img src="/images/img_hero_woman_light.png" alt="A woman walks toward a golden light through storm clouds — Ataraxia" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-28">
          <SectionLabel>ATARAXIA — MOVEMENT EDITION</SectionLabel>
          <h1 className="text-5xl md:text-7xl leading-[1.2]" style={{ fontFamily: "Palatino Linotype, serif" }}>
            You Were Not Born Blocked.
            <br />
            You Were Built That Way.
          </h1>
          <p className="mt-6 italic text-[#B8962E] text-xl">And what was built — can be rebuilt.</p>
          <p className="mt-8 text-[#A09880] max-w-3xl leading-8">
            The mind does not hold pain the way we hold a memory. It holds it in the body, in the breath, in the patterns that repeat without invitation. In the version of yourself that keeps almost arriving.
            <br /><br />
            Ataraxia exists for the moment you decide that almost is no longer enough.
            <br /><br />
            This is the 4X System — a proprietary methodology integrating the deepest tools of subconscious transformation into one coherent, precision framework. Not a programme. Not a practice. A complete architecture for who you are becoming.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton>▶  Begin Your 4X Reset</CTAButton>
            <CTAButton>▶  Apply for 1:1 Intensive</CTAButton>
            <CTAButton>▶  Explore The System</CTAButton>
          </div>
        </div>
      </section>

      <main className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24">
        <FadeInSection className="py-20">
          <SectionLabel>THE 4X FRAMEWORK — VISUAL ELEMENT</SectionLabel>
          <h2 className="text-4xl" style={{ fontFamily: "Palatino Linotype, serif" }}>The System. In Four Movements.</h2>
          <FourXFlowBar />
          <img
            src="/images/ataraxia_4x_cycle_framework.svg"
            alt="The Ataraxia 4X Transformation Cycle — Release, Rewire, Rise, Live 4X"
            className="mx-auto max-w-2xl w-full mt-12 opacity-90"
          />
          <p className="mt-8 text-[#A09880] leading-8">Each stage is a complete world of work. Each one prepares the ground for the next. Together, they form the only kind of transformation that is permanent — because it changes not what you do, but who you are at the level where decisions are actually made.</p>
          <GoldDivider />
        </FadeInSection>

        <FadeInSection>
          <SectionLabel>WHY PEOPLE STAY STUCK</SectionLabel>
          <h2 className="text-4xl" style={{ fontFamily: "Palatino Linotype, serif" }}>The Invisible Architecture of Staying Small</h2>
          <p className="mt-6 text-[#A09880] leading-8">
            Most people who feel limited are not lacking ambition, intelligence, or effort. They are operating against an invisible internal structure — subconscious conditioning, unresolved emotional memory, and an identity that was shaped in the absence of real tools.
            <br /><br />
            The body carries what the mind refuses to process. The patterns run what the willpower cannot override. The identity performs what the deepest belief about yourself has already decided.
          </p>
          <PullQuote quote="Until you make the unconscious conscious, it will direct your life and you will call it fate." author="Carl Jung" />
          <p className="text-[#A09880] leading-8">The 4X System is the process of making that unconscious architecture visible, accessible, and changeable — at the root. Not at the symptom.</p>
          <img
            src="/images/ataraxia_layers_depth.svg"
            alt="The invisible layers of the subconscious — the architecture Ataraxia works at"
            className="w-full rounded-xl border border-[#D4AF37]/30 mt-10"
          />
          <GoldDivider />
        </FadeInSection>

        <FadeInSection className="pb-20">
          <SectionLabel>BRAND POSITIONING</SectionLabel>
          <h2 className="text-4xl" style={{ fontFamily: "Palatino Linotype, serif" }}>Ataraxia Is Not a Coaching Service. It Is a System.</h2>
          <p className="mt-6 text-[#A09880] leading-8">
            There is a profound difference between support and transformation. Between managing your life and fundamentally redesigning it from the inside.
            <br /><br />
            Ataraxia operates at the level of identity — the deepest layer of the self, where all of your outcomes are already determined before a single conscious decision is made. The work here is root-cause, evidence-informed, and built for those who take themselves seriously enough to go all the way.
            <br /><br />
            This is where the highest version of your life is waiting. Not as a promise. As a system.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton>▶  Apply for The 4X Reset Experience</CTAButton>
            <CTAButton>▶  Book a Private Clarity Call</CTAButton>
            <CTAButton>▶  Explore Journals & Tools</CTAButton>
          </div>
        </FadeInSection>
      </main>
    </div>
  );
};

export default Index;
