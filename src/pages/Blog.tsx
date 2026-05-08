import { Helmet } from "react-helmet-async";
import { ArticleCard, GoldDivider, SectionLabel } from "@/components/ataraxia";

const Blog = () => {
  const titles = [
    "What Is Time Line Therapy™ — and Why It Goes Where Other Methods Cannot",
    "The Real Reason High Achievers Feel Empty (It Is Not What You Think)",
    "How NLP Rewires Limiting Beliefs at the Subconscious Level",
    "What Carl Jung Knew About Unprocessed Emotion — and What That Means for Your Life Now",
    "Hypnotherapy Is Not What You Think It Is — Here Is What Actually Happens",
    "Signs You Are Carrying Unresolved Emotional Trauma (Even If Life Looks Fine)",
    "What to Expect in Your First Session with Ataraxia",
    "Inner Child Work: What It Is, Why It Matters, and How to Begin",
    "The Invisible Layer Beneath Team Performance — What Corporate Training Misses",
  ];

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8] max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-16">
      <Helmet>
        <title>Emotional Healing, NLP &amp; Subconscious Reprogramming Insights | Ataraxia</title>
      </Helmet>
      <h1 className="text-5xl">Inside You.</h1>
      <p className="italic text-[#B8962E] mt-4">The intellectual home of the Ataraxia movement.</p>
      <p className="mt-6 text-[#A09880]">The Inside You series is the written expression of everything the 4X System is built on — educational, psychologically grounded, and written with the depth that the most intelligent readers deserve. This is not wellness content. It is the real architecture of the human mind, made readable.</p>
      <GoldDivider />
      <SectionLabel>CONTENT PILLARS</SectionLabel>
      <div className="flex flex-wrap gap-3 text-[#A09880]">
        <span className="border border-[#2A2A2A] rounded-full px-4 py-2">· Emotional Mastery — the mechanics of what you feel and why</span>
        <span className="border border-[#2A2A2A] rounded-full px-4 py-2">· Subconscious Rewiring — the science and practice of identity-level change</span>
        <span className="border border-[#2A2A2A] rounded-full px-4 py-2">· Healing — root-cause approaches, not surface relief</span>
        <span className="border border-[#2A2A2A] rounded-full px-4 py-2">· NLP & The Mind — how the brain builds and sustains reality</span>
        <span className="border border-[#2A2A2A] rounded-full px-4 py-2">· Relationships — the patterns beneath the patterns</span>
        <span className="border border-[#2A2A2A] rounded-full px-4 py-2">· Mindset & Performance — for those who operate at the highest level</span>
      </div>
      <GoldDivider />
      <SectionLabel>LAUNCH ARTICLES — CORNERSTONE SEO CONTENT</SectionLabel>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {titles.map((title) => (
          <ArticleCard key={title} title={title} />
        ))}
      </div>
    </div>
  );
};

export default Blog;