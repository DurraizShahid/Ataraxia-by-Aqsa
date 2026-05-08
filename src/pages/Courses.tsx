import { Helmet } from "react-helmet-async";
import { CTAButton, DomainGrid, GoldDivider, Image, SectionLabel } from "@/components/ataraxia";

const Courses = () => {
  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8] max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-16">
      <Helmet>
        <title>21-Day Subconscious Reprogramming &amp; Emotional Healing Course | Ataraxia</title>
        <meta name="description" content="21-day subconscious reprogramming programme online." />
      </Helmet>
      <h1 className="text-5xl">4X Boost to Personal Mastery</h1>
      <p className="italic text-[#B8962E] mt-4">21 Days. 8 Domains. One Complete Internal Shift.</p>
      <p className="mt-6 text-[#A09880] leading-8">Most approaches to personal growth address one dimension of life at a time. The career. The relationship. The money pattern. The anxiety. One at a time, in sequence, while the others quietly wait.<br /><br />The 4X Boost to Personal Mastery was designed for a different kind of human — one who understands that all eight domains of life are connected by a single internal source, and that when you transform the source, everything changes simultaneously.<br /><br />Over 21 guided days, you move through the 4X System across every domain of your existence. Not serially. Not theoretically. In the real, felt, embodied way that creates change that stays.</p>
      <GoldDivider />
      <SectionLabel>THE 8 DOMAINS — VISUAL GRID</SectionLabel>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
        <DomainGrid />
        <Image
          src="/images/img_4x_mastery_wheel.png"
          alt="The 4X Mastery Wheel — 8 domains of life transformed through the Ataraxia system: Money, Relationships, Mindset, Health, Spirituality, Career, Purpose, Lifestyle"
          width={560}
          height={560}
          className="rounded-full drop-shadow-[0_0_40px_rgba(212,175,55,0.3)] mx-auto"
        />
      </div>
      <p className="text-[#A09880] mt-8">Every area of your life is a reflection of your internal architecture. The 4X System transforms the architecture — and the reflection takes care of itself.</p>
      <GoldDivider />
      <SectionLabel>WHAT THIS 21 DAYS ACTUALLY IS</SectionLabel>
      <p className="text-[#A09880] leading-8">This is not a course of daily videos and journaling prompts. It is a structured, methodologically grounded programme that applies NLP techniques, Time Line Therapy™ principles, and hypnotherapy-informed practices across all eight domains — progressively building the internal identity of someone who operates at the highest level of their life.<br /><br />By day 21, you will not just have learned something. You will be someone different.</p>
      <img
        src="/images/ataraxia_four_pillars.svg"
        alt="The four pillars of the Ataraxia 4X Boost to Personal Mastery programme"
        className="w-full rounded-xl my-12"
      />
      <div className="flex gap-3 flex-wrap">
        <CTAButton>▶  Claim Your Pre-Launch Founding Price</CTAButton>
        <CTAButton>▶  Join the Waitlist — Limited Founding Seats</CTAButton>
      </div>
    </div>
  );
};

export default Courses;