import { Helmet } from "react-helmet-async";
import { BundleTable, CTAButton, GoldDivider, JournalCard, SectionLabel } from "@/components/ataraxia";

const Journals = () => {
  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8] max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-16">
      <Helmet>
        <title>Therapeutic Healing Journals for Emotional Recovery | Shop Ataraxia</title>
        <meta name="description" content="inner child healing journal, addiction recovery journal, therapeutic journaling workbook." />
      </Helmet>
      <h1 className="text-5xl">Healing You Can Hold.</h1>
      <p className="mt-6 text-[#A09880] leading-8">Before a session. After a breakthrough. In the quiet hours when the work continues on its own.<br /><br />Each journal in the Ataraxia collection is a standalone transformation tool — built around the principles of the 4X System, crafted by a certified practitioner who has done this work herself. These are not notebooks. They are structured processes that begin the moment you open them.</p>
      <GoldDivider />
      <SectionLabel>INDIVIDUAL JOURNAL TITLES</SectionLabel>
      <div className="grid md:grid-cols-2 gap-6">
        <JournalCard image="/images/img_journal_inner_child.png" alt="Inner Child Healing Journal by Ataraxia — $65" title="Inner Child Healing Journal" price="$65" description="The most profound healing often leads back to the child who learned to survive rather than thrive. This journal creates a structured, compassionate container for that return — working through the emotional residue of early experience with precision, tenderness, and real methodological depth." who="Anyone ready to meet their younger self with tools, not just intention." />
        <JournalCard image="/images/img_journal_addiction.png" alt="Addiction Recovery Guided Journal by Ataraxia — $75" title="Addiction Recovery Journal" price="$75" description="Recovery is not the absence of the substance. It is the presence of a different self. This journal supports the full arc of that transition — from the root emotional drivers through to identity reconstruction and new pattern installation." who="Those in recovery, supporting someone through it, or navigating any compulsive pattern." />
        <JournalCard image="/images/img_journal_meditation.png" alt="Meditation & Inner Peace Journal by Ataraxia — $30" title="Meditation & Inner Peace Journal" price="$30" description="A daily anchor for those integrating their deeper work. Structured reflection, somatic awareness prompts, and practices drawn directly from the 4X methodology." />
        <JournalCard image="/images/img_journal_self_reflection.png" alt="118 Deep Self Reflection Questions Journal by Ataraxia — $20" title="118 Deep Reflection Questions" price="$20" description="Not surface questions. Questions that reach the places polite conversation never does. 118 prompts designed to surface subconscious beliefs, identity patterns, and emotional truths most people have never been asked about." />
      </div>
      <GoldDivider />
      <SectionLabel>JOURNAL BUNDLES — PRICING & VALUE</SectionLabel>
      <h2 className="text-4xl">The Collections. Curated to Take You Further.</h2>
      <p className="mt-4 text-[#A09880]">Every journal in the Ataraxia collection is complete on its own. Together, they form a full-system healing library. The bundles below are designed so that the deeper you go, the more you save — because the work compounds when the tools work together.</p>
      <BundleTable />
      <p className="mt-8 text-[#A09880]">The Inner Circle Bundle — our most popular — pairs all four journals with a complimentary Private Discovery Call with Aqsa, giving you not just the tools but the guidance to use them at the deepest level.</p>
      <div className="mt-6 flex gap-3 flex-wrap">
        <CTAButton>▶  Shop Individual Journals</CTAButton>
        <CTAButton>▶  Claim the Inner Circle Bundle</CTAButton>
        <CTAButton>▶  Gift a Collection</CTAButton>
      </div>
      <p className="mt-6 text-[#A09880] text-sm">All journals are beautifully presented and available as a curated gift. Contact us for gifting enquiries.</p>
    </div>
  );
};
export default Journals;