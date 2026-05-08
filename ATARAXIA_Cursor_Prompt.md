# ATARAXIA WEBSITE — CURSOR AI BUILD PROMPT

---

## ROLE & MISSION

You are building the complete website for **Ataraxia**, a premium transformational coaching brand founded by Aqsa Khan. The website must feel like a **luxury private members' institution** — not a wellness blog, not a coaching directory. Every design decision should communicate: exclusive, precise, psychologically intelligent, and built for people who take their inner life seriously enough to invest in it at the highest level.

**Tech stack:** Next.js 14 (App Router) + Tailwind CSS + Framer Motion. Use TypeScript throughout.

**Do not change, paraphrase, shorten, or rewrite any copy.** Every word below is final. Your job is to build the UI around it — not edit it.

---

## BRAND IDENTITY

| | |
|---|---|
| **Brand name** | Ataraxia |
| **Tagline** | Tranquillity in Transformation |
| **Founder** | Aqsa Khan |
| **Tone** | Premium, precise, literary, emotionally intelligent |
| **Audience** | High-achieving women, executives, leaders |

### Colour Palette
```
Background:       #0A0A0A  (near black)
Surface/Card:     #111111  (dark surface)
Gold primary:     #D4AF37  (rich gold)
Gold muted:       #B8962E  (secondary gold, headings)
Gold light:       #F0D060  (hover/accent states)
Text primary:     #F5F0E8  (warm off-white)
Text secondary:   #A09880  (muted warm grey)
Divider:          #2A2A2A  (subtle border)
```

### Typography
- **Display / Hero headings:** `Palatino Linotype` or `EB Garamond` — large, elegant, high tracking
- **Section labels / overlines:** `Courier New` or similar monospace — spaced, gold, uppercase, small
- **Body copy:** `Georgia` or `Lora` — warm, readable serif
- **CTAs / UI labels:** Clean sans-serif (Inter or system-ui)
- **Line height:** Generous — 1.7–1.9 for body, 1.2–1.3 for display
- **Letter spacing:** Generous uppercase tracking (0.15–0.25em) on all section labels

### Global Design Rules
- **Full dark background throughout** — `#0A0A0A` base, no white sections
- All section label overlines use Courier New, gold colour, uppercase, wide letter-spacing, small size (11–13px)
- Gold horizontal rule dividers (`────────────`) between sections — use a thin `<hr>` styled with gold colour
- CTAs: ghost button style with gold border + gold text; hover fills gold with dark text
- Subtle scroll-triggered fade-in animations on all sections (Framer Motion)
- No stock-photo wellness clichés — use the supplied images only
- Page max-width: 1280px, generous padding (px-6 md:px-16 lg:px-24)

---

## SITE STRUCTURE

Build 7 pages + global nav/footer:

1. `/` — Home
2. `/about` — About
3. `/services` — Services
4. `/courses` — Courses
5. `/journals` — Journals (Shop)
6. `/blog` — Blog
7. `/contact` — Contact

---

## GLOBAL NAVIGATION

**Left:** `ATARAXIA` wordmark in Palatino, gold, letter-spaced
**Right links:** Home · About · Services · Courses · Journals · Blog · Contact
**Far right CTA button:** `Book a Discovery Call` — gold ghost button

Sticky, dark background with a subtle bottom border in `#2A2A2A`. On scroll, add a slight backdrop blur.

---

## GLOBAL FOOTER

**Left column:**
```
ATARAXIA
Tranquillity in Transformation
```

**Centre column links:**
```
Home · About · Services · Courses · Journals · Blog · Contact
```

**Right column:**
```
Instagram · WhatsApp
© 2025 Ataraxia by Aqsa Khan. All rights reserved.
```

Thin gold divider line above footer. Dark background. Text in muted warm grey.

---

## PAGE 01 — HOME (`/`)

**SEO meta title:** `Emotional Transformation & Subconscious Reprogramming | Ataraxia by Aqsa`

---

### SECTION 1 — HERO

**Layout:** Full-viewport height. Background: the hero image (woman silhouette walking toward a golden light through storm clouds). Dark overlay `rgba(0,0,0,0.55)` over the image. Content centred vertically.

**Overline label:**
```
ATARAXIA — MOVEMENT EDITION
```

**H1 (display, large, Palatino):**
```
You Were Not Born Blocked.
You Were Built That Way.
```

**Subheading (italic, Georgia, muted gold):**
```
And what was built — can be rebuilt.
```

**Body paragraph:**
```
The mind does not hold pain the way we hold a memory. It holds it in the body, in the breath, in the patterns that repeat without invitation. In the version of yourself that keeps almost arriving.

Ataraxia exists for the moment you decide that almost is no longer enough.

This is the 4X System — a proprietary methodology integrating the deepest tools of subconscious transformation into one coherent, precision framework. Not a programme. Not a practice. A complete architecture for who you are becoming.
```

**Three CTA buttons (stacked or inline, gold ghost style):**
```
▶  Begin Your 4X Reset
▶  Apply for 1:1 Intensive
▶  Explore The System
```

---

### SECTION 2 — THE 4X FRAMEWORK

**Overline:**
```
THE 4X FRAMEWORK — VISUAL ELEMENT
```

**Heading:**
```
The System. In Four Movements.
```

**Visual component — 4X Flow Bar:**
Build a horizontal flow component showing 4 stages connected by arrows. Each stage is a dark card with a gold border:

| Stage | Subtitle |
|---|---|
| **RELEASE** | *Dissolve the root* |
| **→** | |
| **REWIRE** | *Rebuild the mind* |
| **→** | |
| **RISE** | *Embody the shift* |
| **→** | |
| **LIVE 4X** | *Operate at full power* |

**Below the `<FourXFlowBar />` component, render the cycle diagram:**
```jsx
<img
  src="/images/ataraxia_4x_cycle_framework.svg"
  alt="The Ataraxia 4X Transformation Cycle — Release, Rewire, Rise, Live 4X"
  className="mx-auto max-w-2xl w-full mt-12 opacity-90"
/>
```

**Body text below:**
```
Each stage is a complete world of work. Each one prepares the ground for the next. Together, they form the only kind of transformation that is permanent — because it changes not what you do, but who you are at the level where decisions are actually made.
```

---

### SECTION 3 — WHY PEOPLE STAY STUCK

**Overline:**
```
WHY PEOPLE STAY STUCK
```

**Heading:**
```
The Invisible Architecture of Staying Small
```

**Body:**
```
Most people who feel limited are not lacking ambition, intelligence, or effort. They are operating against an invisible internal structure — subconscious conditioning, unresolved emotional memory, and an identity that was shaped in the absence of real tools.

The body carries what the mind refuses to process. The patterns run what the willpower cannot override. The identity performs what the deepest belief about yourself has already decided.
```

**Pull quote (large, italic, gold, centred):**
```
"Until you make the unconscious conscious, it will direct your life and you will call it fate."

— Carl Jung
```

**Body continued:**
```
The 4X System is the process of making that unconscious architecture visible, accessible, and changeable — at the root. Not at the symptom.
```

After the body paragraph above, render:
```jsx
<img
  src="/images/ataraxia_layers_depth.svg"
  alt="The invisible layers of the subconscious — the architecture Ataraxia works at"
  className="w-full rounded-xl border border-[#D4AF37]/30 mt-10"
/>
```

---

### SECTION 4 — BRAND POSITIONING

**Overline:**
```
BRAND POSITIONING
```

**Heading:**
```
Ataraxia Is Not a Coaching Service. It Is a System.
```

**Body:**
```
There is a profound difference between support and transformation. Between managing your life and fundamentally redesigning it from the inside.

Ataraxia operates at the level of identity — the deepest layer of the self, where all of your outcomes are already determined before a single conscious decision is made. The work here is root-cause, evidence-informed, and built for those who take themselves seriously enough to go all the way.

This is where the highest version of your life is waiting. Not as a promise. As a system.
```

**Three CTA buttons:**
```
▶  Apply for The 4X Reset Experience
▶  Book a Private Clarity Call
▶  Explore Journals & Tools
```

---

## PAGE 02 — ABOUT (`/about`)

**SEO meta title:** `Aqsa Khan | Certified NLP Coach, Hypnotherapist & Time Line Therapy™ Practitioner`

---

### SECTION 1 — PAGE HEADER

**Heading (H1):**
```
Built From the Inside. Backed by Mastery.
```

**Opening arc (italic body, below heading):**
```
Before the certifications. Before the framework. Before Ataraxia.

There was a woman learning, very slowly, how to come home to herself.
```

After the opening arc paragraphs above, render:
```jsx
<div className="relative rounded-xl overflow-hidden my-12">
  <img
    src="/images/ataraxia_journey_path.svg"
    alt="The path of transformation — Ataraxia by Aqsa Khan"
    className="w-full"
  />
  <div className="absolute inset-0 bg-black/20" />
</div>
```

---

### SECTION 2 — ORIGIN STORY

**Overline:**
```
AQSA'S ORIGIN STORY
```

**Heading:**
```
The Origin of Ataraxia
```

**Full story body — use exactly this copy, every word:**
```
Aqsa Khan's path to this work did not begin with a calling. It began with survival.

Growing up through a childhood marked by pain she had no language for, she developed what so many high-functioning people develop: the ability to appear whole while quietly fragmenting inside. She was capable. She was accomplished. She was also completely disconnected from herself.

For years, she operated on autopilot — achieving externally, disappearing internally. The surface held. What was underneath did not.
```

**Bold paragraph (pull moment, slightly larger):**
```
And then, something shifted.
```

**Story continues:**
```
Not immediately. Not dramatically. But in the slow, unglamorous work of beginning to actually look inward, Aqsa started to connect with herself for the first time.

She began to understand her own strength — not the performance of it, but the real, embodied kind that lives beneath the need to prove. She started to see the patterns that had been running her life. She went into what was underneath: the grief she had never fully touched, the beliefs installed so early she had mistaken them for truth, the version of herself that had been waiting, quietly, for someone to come back for her.

She did the work of forgiving herself. For the years she spent not knowing. For the choices made from wounds she hadn't yet healed. For the distance she had kept from her own life.

And in that process of releasing, rewiring, and rising — she discovered that what had transformed her was not any single tool. It was the integration of all of them. NLP for the structure of thought. Time Line Therapy™ for the emotional past. Clinical Hypnotherapy for the subconscious. Somatic work for the body's held memory. Together, they had created something she had never felt before: clarity that lived in the body, not just the mind.
```

**Pull quote (centred, large, italic, gold):**
```
"All unexpressed emotions come out in uglier forms."

— Carl Jung
```

**Story concludes:**
```
She had lived that truth. And she had found the path through it.

Ataraxia was built from that path. Not as a brand, but as a movement — a conviction that the most profound transformation available to a human being is not the kind that improves your life. It's the kind that changes who is living it.

Today, Aqsa is an internationally certified NLP Coach, Time Line Therapy™ Practitioner, and Clinical Hypnotherapist. She works with high-achieving women, executives, and leaders who sense that something far deeper is available to them — and are ready to do the real work of accessing it.
```

After the final story paragraph above, render:
```jsx
<Image
  src="/images/img_group_session.png"
  alt="Aqsa Khan facilitating an Ataraxia group transformation session"
  width={1200}
  height={800}
  className="w-full rounded-xl my-14 object-cover"
/>
```

---

### SECTION 3 — CREDENTIALS

**Overline:**
```
CREDENTIALS
```

**Heading:**
```
Certifications & Training
```

**List (render as styled credential cards or a clean vertical list with gold left-border accent):**
```
· Internationally Certified NLP Coach (ABNLP)
· Certified Time Line Therapy™ Practitioner (TLTA)
· Certified Clinical Hypnotherapist
· Specialisation in Somatic Emotional Release
· Mental Health Advocate & Practitioner
```

**Two CTA buttons:**
```
▶  Read Aqsa's Full Story
▶  Book a Private Clarity Call
```

---

## PAGE 03 — SERVICES (`/services`)

**SEO meta title:** `NLP Coaching, Hypnotherapy & Subconscious Reprogramming | Ataraxia by Aqsa`

---

### SECTION 1 — PAGE INTRODUCTION

**H1:**
```
The Work. For Those Who Are Ready.
```

**Body:**
```
Every service within Ataraxia is designed around the 4X System — operating at the intersection of emotional release, subconscious rewiring, identity expansion, and internal alignment. Each offering addresses a different depth of access and a different stage of readiness.
```

Place the **4X Flow Bar** component here (same as homepage — RELEASE → REWIRE → RISE → LIVE 4X).

After the `<FourXFlowBar />` component, render:
```jsx
<img
  src="/images/ataraxia_triad_integration.svg"
  alt="The Ataraxia triad: Emotional Release, Subconscious Rewiring, Identity Integration"
  className="mx-auto max-w-2xl w-full mt-12 mb-4"
/>
```

---

### SECTION 2 — SERVICE 01: SIGNATURE OFFERING

**Tag/label:** `SERVICE 01 — SIGNATURE OFFERING`

**Service title (H2):**
```
The 4X Reset Experience — 3-Day Intensive
```

**Subheading:**
```
The deepest access available within Ataraxia.
```

**Body:**
```
A three-day immersive built to achieve, in seventy-two hours, the internal transformation that most people spend years approaching. This is not a retreat. It is precision work — structured, intentional, and designed to leave you fundamentally different from the person who arrived.
```

**Three-day breakdown (render as 3 horizontal or stacked day cards):**

**Day 1: Release**
```
Locate and neutralise the emotional charge at the origin. Using Time Line Therapy™ and somatic-based techniques, we dissolve the root — not the story around it, the charge beneath it.
```

**Day 2: Rewire**
```
Install the subconscious architecture of your next identity. NLP and clinical hypnotherapy work at the level below conscious thought, replacing patterns that were never chosen with ones that are.
```

**Day 3: Rise**
```
Embody the shift. Anchor it. Move forward as the identity you've built — not as a hope, but as a lived reality.
```

**Tier heading:**
```
Three tiers. One transformation.
```

**Tiers (render as a 3-column pricing row):**
```
· Access — The complete 3-day experience
· Deep Work — Extended integration and personalised daily sessions
· Inner Circle — Includes a private session with Aqsa
```

**CTA:**
```
▶  Apply for The 4X Reset
```

After the "▶  Apply for The 4X Reset" CTA, render:
```jsx
<Image
  src="/images/img_5_modalities.png"
  alt="The five transformation modalities used in the Ataraxia 4X Reset: Emotional Release, NLP Rewiring, Hypnosis, Somatic Healing, Timeline Therapy"
  width={1400}
  height={933}
  className="w-full rounded-xl mt-12"
/>
```

---

### SECTION 3 — SERVICE 02: 1:1 PREMIUM

**Tag:** `SERVICE 02 — 1:1 PREMIUM`

**Title (H2):**
```
Private Clarity & Transformation Sessions
```

**Body:**
```
For those who require deep, sustained private work. Available as a 3-month or 5-month container, this is not a weekly check-in. It is a complete internal overhaul — addressing the full spectrum of what is keeping you from operating at the level you know you're capable of.
```

**List:**
```
· Somatic-based emotional release
· NLP subconscious reprogramming
· Time Line Therapy™ for past emotional clearing
· WhatsApp accountability between sessions
```

**CTA:**
```
▶  Book a Private Discovery Call
```

---

### SECTION 4 — SERVICE 03: EMERGENCY SUPPORT

**Tag:** `SERVICE 03 — EMERGENCY SUPPORT`

**Title (H2):**
```
Emergency & High-Stress Sessions
```

**Overline label (styled as a special callout/card with gold border):**
```
DEDICATED CRISIS SUPPORT
```

**Body:**
```
When life doesn't wait, you won't be alone in it.

A dedicated, trained professional is assigned to you — available for acute emotional processing, grounding, nervous system regulation, and focused subconscious intervention when the pressure is highest. This is not a chatbot, a helpline, or a waiting list. It is a human, trained specifically in the Ataraxia methodology, present for you in real time.
```

**List:**
```
▶  WhatsApp accountability between sessions
▶  Available to existing Ataraxia clients and selected new applicants
▶  Sessions available remotely, across time zones
```

**CTA:**
```
▶  Enquire About Crisis Support
```

---

### SECTION 5 — SERVICE 04: GROUP & COLLECTIVE

**Tag:** `SERVICE 04 — GROUP & COLLECTIVE`

**Title (H2):**
```
Group Experiences & Themed Workshops
```

**Body:**
```
Collective transformation carries its own intelligence. Ataraxia's group experiences are intimate, facilitated, and designed to create the conditions for genuine emotional release and identity shift within a shared container.
```

**List:**
```
· Monthly emotional release circles
· Belief rewiring workshops
· Identity shift intensives
· Curated collaborative events with partner practitioners — yoga, arts, exclusive Islamabad experiences
```

**CTA:**
```
▶  Join the Next Group Session
```

After the "▶  Join the Next Group Session" CTA, render:
```jsx
<img
  src="/images/ataraxia_energy_frequency.svg"
  alt="Energy and frequency alignment — Ataraxia group transformation"
  className="w-full rounded-xl border border-[#D4AF37]/25 mt-10 mb-2"
/>
```

---

### SECTION 6 — SERVICE 05: CORPORATE

**Tag:** `SERVICE 05 — CORPORATE`

**Title (H2):**
```
Corporate & Organisational Training
```

**Body:**
```
Performance at the highest level is not a skills problem. It is an inner architecture problem. Ataraxia's corporate training addresses the invisible layer beneath team performance: the emotional intelligence, communication patterns, and subconscious dynamics that shape every outcome.
```

**List:**
```
· Emotional intelligence for leadership
· Communication patterns and team dynamics
· Resilience and stress regulation under pressure
· Mindset performance for high-stakes environments
```

**CTA:**
```
▶  Enquire About Corporate Training
```

---

## PAGE 04 — COURSES (`/courses`)

**SEO meta title:** `21-Day Subconscious Reprogramming & Emotional Healing Course | Ataraxia`

---

### SECTION 1 — COURSE HERO

**H1:**
```
4X Boost to Personal Mastery
```

**Subheading (italic):**
```
21 Days. 8 Domains. One Complete Internal Shift.
```

**Body:**
```
Most approaches to personal growth address one dimension of life at a time. The career. The relationship. The money pattern. The anxiety. One at a time, in sequence, while the others quietly wait.

The 4X Boost to Personal Mastery was designed for a different kind of human — one who understands that all eight domains of life are connected by a single internal source, and that when you transform the source, everything changes simultaneously.

Over 21 guided days, you move through the 4X System across every domain of your existence. Not serially. Not theoretically. In the real, felt, embodied way that creates change that stays.
```

---

### SECTION 2 — THE 8 DOMAINS GRID

**Overline:**
```
THE 8 DOMAINS — VISUAL GRID
```

**Build a 4×2 grid of domain cards** (dark cards, gold icon/accent, thin gold border):

| Domain | Description |
|---|---|
| **MONEY** | *Financial identity & abundance* |
| **RELATIONSHIPS** | *Depth, trust & connection* |
| **MINDSET** | *Beliefs & inner architecture* |
| **HEALTH** | *Body, energy & somatic peace* |
| **SPIRITUALITY** | *Inner alignment & purpose* |
| **CAREER** | *Expression & professional rise* |
| **PURPOSE** | *Your reason. Your direction.* |
| **LIFESTYLE** | *The life you actually design* |

**Build a 2-column layout on desktop, stacked on mobile:**
```jsx
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
```

**Body below grid:**
```
Every area of your life is a reflection of your internal architecture. The 4X System transforms the architecture — and the reflection takes care of itself.
```

---

### SECTION 3 — WHAT THIS 21 DAYS IS

**Overline:**
```
WHAT THIS 21 DAYS ACTUALLY IS
```

**Body:**
```
This is not a course of daily videos and journaling prompts. It is a structured, methodologically grounded programme that applies NLP techniques, Time Line Therapy™ principles, and hypnotherapy-informed practices across all eight domains — progressively building the internal identity of someone who operates at the highest level of their life.

By day 21, you will not just have learned something. You will be someone different.
```

After the "You will be someone different." paragraph, render:
```jsx
<img
  src="/images/ataraxia_four_pillars.svg"
  alt="The four pillars of the Ataraxia 4X Boost to Personal Mastery programme"
  className="w-full rounded-xl my-12"
/>
```

**Two CTA buttons:**
```
▶  Claim Your Pre-Launch Founding Price
▶  Join the Waitlist — Limited Founding Seats
```

---

## PAGE 05 — JOURNALS (`/journals`)

**SEO meta title:** `Therapeutic Healing Journals for Emotional Recovery | Shop Ataraxia`

---

### SECTION 1 — PAGE HEADER

**H1:**
```
Healing You Can Hold.
```

**Body:**
```
Before a session. After a breakthrough. In the quiet hours when the work continues on its own.

Each journal in the Ataraxia collection is a standalone transformation tool — built around the principles of the 4X System, crafted by a certified practitioner who has done this work herself. These are not notebooks. They are structured processes that begin the moment you open them.
```

---

### SECTION 2 — INDIVIDUAL JOURNALS

**Overline:**
```
INDIVIDUAL JOURNAL TITLES
```

Build **4 journal product cards** in a 2×2 grid (or 4-column row on desktop). Each card has: journal cover image, title, price, description, "Who it's for" note, and a CTA button.

---

**Journal 1:**
- **Image (top of card):**
```jsx
<div className="relative h-72 rounded-t-xl overflow-hidden">
  <Image
    src="/images/img_journal_inner_child.png"
    fill
    className="object-cover hover:scale-105 transition-transform duration-500"
    alt="Inner Child Healing Journal by Ataraxia — $65"
  />
</div>
```
- **Title:** `Inner Child Healing Journal`
- **Price:** `$65`
- **Description:**
```
The most profound healing often leads back to the child who learned to survive rather than thrive. This journal creates a structured, compassionate container for that return — working through the emotional residue of early experience with precision, tenderness, and real methodological depth.
```
- **Who it's for:**
```
Anyone ready to meet their younger self with tools, not just intention.
```

---

**Journal 2:**
- **Image (top of card):**
```jsx
<div className="relative h-72 rounded-t-xl overflow-hidden">
  <Image
    src="/images/img_journal_addiction.png"
    fill
    className="object-cover hover:scale-105 transition-transform duration-500"
    alt="Addiction Recovery Guided Journal by Ataraxia — $75"
  />
</div>
```
- **Title:** `Addiction Recovery Journal`
- **Price:** `$75`
- **Description:**
```
Recovery is not the absence of the substance. It is the presence of a different self. This journal supports the full arc of that transition — from the root emotional drivers through to identity reconstruction and new pattern installation.
```
- **Who it's for:**
```
Those in recovery, supporting someone through it, or navigating any compulsive pattern.
```

---

**Journal 3:**
- **Image (top of card):**
```jsx
<div className="relative h-72 rounded-t-xl overflow-hidden">
  <Image
    src="/images/img_journal_meditation.png"
    fill
    className="object-cover hover:scale-105 transition-transform duration-500"
    alt="Meditation & Inner Peace Journal by Ataraxia — $30"
  />
</div>
```
- **Title:** `Meditation & Inner Peace Journal`
- **Price:** `$30`
- **Description:**
```
A daily anchor for those integrating their deeper work. Structured reflection, somatic awareness prompts, and practices drawn directly from the 4X methodology.
```

---

**Journal 4:**
- **Image (top of card):**
```jsx
<div className="relative h-72 rounded-t-xl overflow-hidden">
  <Image
    src="/images/img_journal_self_reflection.png"
    fill
    className="object-cover hover:scale-105 transition-transform duration-500"
    alt="118 Deep Self Reflection Questions Journal by Ataraxia — $20"
  />
</div>
```
- **Title:** `118 Deep Reflection Questions`
- **Price:** `$20`
- **Description:**
```
Not surface questions. Questions that reach the places polite conversation never does. 118 prompts designed to surface subconscious beliefs, identity patterns, and emotional truths most people have never been asked about.
```

---

### SECTION 3 — JOURNAL BUNDLES

**Overline:**
```
JOURNAL BUNDLES — PRICING & VALUE
```

**Heading:**
```
The Collections. Curated to Take You Further.
```

**Body:**
```
Every journal in the Ataraxia collection is complete on its own. Together, they form a full-system healing library. The bundles below are designed so that the deeper you go, the more you save — because the work compounds when the tools work together.
```

**Pricing table — render as 4 bundle cards** (highlight "Full Library" and "Inner Circle" as featured):

| Bundle | Price | You Save | What's Inside |
|---|---|---|---|
| **The Clarity Starter** | **$50** | $15 off | Meditation Journal + 118 Questions |
| **The Healing Journey** | **$120** | $25 off | Inner Child + Addiction Recovery |
| **The Full Library** ★ BEST VALUE | **$155** | **$35 off** | All 4 Journals — Complete System |
| **The Inner Circle Bundle** ★ MOST POPULAR | **$175** | **$45 off** | All 4 Journals + Private Discovery Call |

**Body below table:**
```
The Inner Circle Bundle — our most popular — pairs all four journals with a complimentary Private Discovery Call with Aqsa, giving you not just the tools but the guidance to use them at the deepest level.
```

**Three CTA buttons:**
```
▶  Shop Individual Journals
▶  Claim the Inner Circle Bundle
▶  Gift a Collection
```

**Small print:**
```
All journals are beautifully presented and available as a curated gift. Contact us for gifting enquiries.
```

---

## PAGE 06 — BLOG (`/blog`)

**SEO meta title:** `Emotional Healing, NLP & Subconscious Reprogramming Insights | Ataraxia`

---

### SECTION 1 — BLOG HEADER

**H1:**
```
Inside You.
```

**Subheading (italic):**
```
The intellectual home of the Ataraxia movement.
```

**Body:**
```
The Inside You series is the written expression of everything the 4X System is built on — educational, psychologically grounded, and written with the depth that the most intelligent readers deserve. This is not wellness content. It is the real architecture of the human mind, made readable.
```

---

### SECTION 2 — CONTENT PILLARS

**Overline:**
```
CONTENT PILLARS
```

**Render as 6 pill/tag cards in a wrap row:**
```
· Emotional Mastery — the mechanics of what you feel and why
· Subconscious Rewiring — the science and practice of identity-level change
· Healing — root-cause approaches, not surface relief
· NLP & The Mind — how the brain builds and sustains reality
· Relationships — the patterns beneath the patterns
· Mindset & Performance — for those who operate at the highest level
```

---

### SECTION 3 — LAUNCH ARTICLES

**Overline:**
```
LAUNCH ARTICLES — CORNERSTONE SEO CONTENT
```

**Render as a grid of 9 article cards** (dark card, gold title on hover, placeholder thumbnail). Each card is a future blog post stub — link to `/blog/[slug]`. Use these exact titles:

```
1. What Is Time Line Therapy™ — and Why It Goes Where Other Methods Cannot
2. The Real Reason High Achievers Feel Empty (It Is Not What You Think)
3. How NLP Rewires Limiting Beliefs at the Subconscious Level
4. What Carl Jung Knew About Unprocessed Emotion — and What That Means for Your Life Now
5. Hypnotherapy Is Not What You Think It Is — Here Is What Actually Happens
6. Signs You Are Carrying Unresolved Emotional Trauma (Even If Life Looks Fine)
7. What to Expect in Your First Session with Ataraxia
8. Inner Child Work: What It Is, Why It Matters, and How to Begin
9. The Invisible Layer Beneath Team Performance — What Corporate Training Misses
```

---

## PAGE 07 — CONTACT (`/contact`)

---

### SECTION 1 — CONTACT HEADER

**H1:**
```
Let's Begin Your Rise.
```

**Body:**
```
Every significant transformation begins with a single, intentional decision. This is yours.

Ataraxia accepts a limited number of new clients each month — not as a tactic, but because the depth of this work requires full presence and precision. Each person who enters this space receives exactly that.

If something in you already knows — trust it.
```

---

### SECTION 2 — HOW TO BEGIN

**Overline:**
```
HOW TO BEGIN
```

**Render as 3 option cards** (dark, gold-bordered, with a number label):

**Option 1:**
```
Book a Free Discovery Call
30 minutes to understand where you are and what is possible
```

**Option 2:**
```
Apply for the 4X Reset Experience
By application only, limited intake
```

**Option 3:**
```
Corporate Enquiries
For team and organisational training
```

**Two CTA buttons:**
```
▶  Book Your Free Discovery Call
▶  Submit an Application
```

**Small print:**
```
WhatsApp enquiries welcome. Response within 24 hours.
```

---

## IMAGE & SVG ASSETS — COMPLETE PLACEMENT GUIDE

All image and SVG files are already in the `/public/images/` folder. **Do not move, rename, or skip any of them.** Every file has a specific location in the UI described below. Use Next.js `<Image />` for all `.png` files. Render `.svg` files directly as `<img>` tags (not inline SVG) so they scale correctly.

---

### COMPLETE FILE LIST

```
/public/images/
├── img_hero_woman_light.png          ← full-bleed hero background, Home page
├── ataraxia_4x_cycle_framework.svg   ← circular 4X system diagram, Home + Services
├── ataraxia_layers_depth.svg         ← layered depth diagram, Home page
├── ataraxia_triad_integration.svg    ← three-part integration visual, Services page
├── ataraxia_energy_frequency.svg     ← energy/frequency wave diagram, Services page
├── ataraxia_journey_path.svg         ← path/journey arc visual, About page
├── ataraxia_four_pillars.svg         ← four pillars framework, Courses page
├── img_5_modalities.png              ← 5 modality cards visual, Services page
├── img_group_session.png             ← Ataraxia group session photo, About page
├── img_4x_mastery_wheel.png          ← 8-domain circular mastery wheel, Courses page
├── img_journal_inner_child.png       ← Inner Child journal cover photo, Journals page
├── img_journal_addiction.png         ← Addiction Recovery journal cover photo, Journals page
├── img_journal_meditation.png        ← Meditation journal cover photo, Journals page
└── img_journal_self_reflection.png   ← 118 Questions journal cover photo, Journals page
```

---

### PLACEMENT SPECIFICATION — PER PAGE, PER SECTION

Every placement below is mandatory. Do not omit any image or SVG, do not swap them, and do not use placeholder images in place of any of these files.

---

#### HOME PAGE (`/`)

**1. `img_hero_woman_light.png`**
- **Section:** Hero (Section 1)
- **Usage:** Full-viewport background image behind the hero text. Use Next.js `<Image fill objectFit="cover" />` inside a `relative` container that is `100vh` tall. Apply a dark overlay `<div>` with `bg-black/55` (`rgba(0,0,0,0.55)`) on top of the image, below the text content.
- **Alt text:** `"A woman walks toward a golden light through storm clouds — Ataraxia"`

**2. `ataraxia_4x_cycle_framework.svg`**
- **Section:** 4X Framework (Section 2) — directly below the `<FourXFlowBar />` component and the body paragraph
- **Usage:** Centred, `max-width: 720px`, auto height, `mx-auto`. Render with `<img src="/images/ataraxia_4x_cycle_framework.svg" />`. Add `mt-12` spacing above it. Subtle `opacity-90` so it feels embedded, not pasted.
- **Alt text:** `"The Ataraxia 4X Transformation Cycle — Release, Rewire, Rise, Live 4X"`

**3. `ataraxia_layers_depth.svg`**
- **Section:** Why People Stay Stuck (Section 3) — below the body paragraph that ends with "...at the root. Not at the symptom."
- **Usage:** Full content width, `rounded-xl`, a thin `border border-[#D4AF37]/30` gold border, `mt-10`. Use `<img src="/images/ataraxia_layers_depth.svg" className="w-full rounded-xl border border-[#D4AF37]/30" />`.
- **Alt text:** `"The invisible layers of the subconscious — the architecture Ataraxia works at"`

---

#### ABOUT PAGE (`/about`)

**4. `ataraxia_journey_path.svg`**
- **Section:** Page Header (Section 1) — directly below the opening arc paragraphs ("Before the certifications…"), before the gold divider that leads into the Origin Story section
- **Usage:** Full content width, `rounded-xl`, `my-12`. Apply a subtle dark tint overlay using a `relative` wrapper: `<div className="relative rounded-xl overflow-hidden my-12"><img ... className="w-full" /><div className="absolute inset-0 bg-black/20" /></div>`. This gives the path image a slight atmospheric depth.
- **Alt text:** `"The path of transformation — Ataraxia by Aqsa Khan"`

**5. `img_group_session.png`**
- **Section:** Origin Story (Section 2) — immediately after the final paragraph of the story that ends with "...and are ready to do the real work of accessing it." — placed before the Credentials section
- **Usage:** Full content width, `rounded-xl`, `my-14`, Next.js `<Image width={1200} height={800} objectFit="cover" />`. The photo shows a real Ataraxia group session — treat it as a social proof moment, not decoration. No overlay needed.
- **Alt text:** `"Aqsa Khan facilitating an Ataraxia group transformation session"`

---

#### SERVICES PAGE (`/services`)

**6. `ataraxia_triad_integration.svg`**
- **Section:** Page Introduction (Section 1) — below the `<FourXFlowBar />` component that appears at the bottom of the intro section, before Service 01 begins
- **Usage:** Centred, `max-width: 680px`, `mx-auto`, `mt-12 mb-4`. `<img src="/images/ataraxia_triad_integration.svg" className="mx-auto max-w-2xl w-full" />`.
- **Alt text:** `"The Ataraxia triad: Emotional Release, Subconscious Rewiring, Identity Integration"`

**7. `img_5_modalities.png`**
- **Section:** Service 01 — 3-Day Intensive (Section 2) — after the "▶ Apply for The 4X Reset" CTA button, before the gold divider that leads into Service 02
- **Usage:** Full content width, `rounded-xl`, `mt-12`. The image shows 5 glass-panel cards labelled: 1 Emotional Release, 2 NLP Rewiring, 3 Hypnosis, 4 Somatic Healing, 5 Timeline Therapy. This visually anchors what the intensive actually uses. Next.js `<Image width={1400} height={933} />`.
- **Alt text:** `"The five transformation modalities used in the Ataraxia 4X Reset: Emotional Release, NLP Rewiring, Hypnosis, Somatic Healing, Timeline Therapy"`

**8. `ataraxia_energy_frequency.svg`**
- **Section:** Service 04 — Group & Collective (Section 5) — after the "▶ Join the Next Group Session" CTA button, before the gold divider that leads into Service 05 Corporate
- **Usage:** Full content width, `rounded-xl`, `border border-[#D4AF37]/25`, `mt-10 mb-2`. `<img src="/images/ataraxia_energy_frequency.svg" className="w-full rounded-xl border border-[#D4AF37]/25" />`.
- **Alt text:** `"Energy and frequency alignment — Ataraxia group transformation"`

---

#### COURSES PAGE (`/courses`)

**9. `img_4x_mastery_wheel.png`**
- **Section:** 8 Domains Grid (Section 2) — placed to the right of the `<DomainGrid />` on desktop (2-column layout: grid on left, wheel on right), and below the grid on mobile (stacked)
- **Usage:** On desktop use `grid grid-cols-2 gap-12 items-center`. Left column: `<DomainGrid />`. Right column: `<Image src="/images/img_4x_mastery_wheel.png" width={560} height={560} />` with `rounded-full` and a subtle `drop-shadow` in gold. On mobile, the image goes below the grid.
- **Alt text:** `"The 4X Mastery Wheel — 8 domains of life transformed through the Ataraxia system: Money, Relationships, Mindset, Health, Spirituality, Career, Purpose, Lifestyle"`

**10. `ataraxia_four_pillars.svg`**
- **Section:** What This 21 Days Is (Section 3) — after the body paragraph ending "...You will be someone different." — placed before the two CTA buttons
- **Usage:** Full content width, `rounded-xl`, `my-12`. `<img src="/images/ataraxia_four_pillars.svg" className="w-full rounded-xl" />`.
- **Alt text:** `"The four pillars of the Ataraxia 4X Boost to Personal Mastery programme"`

---

#### JOURNALS PAGE (`/journals`)

Each journal card in the `<JournalCard />` component must display its cover image in the top half of the card. The image fills the card top, with a slight zoom on hover (`scale-105 transition-transform duration-500`). Use Next.js `<Image objectFit="cover" />` inside a fixed-height container (`h-72` or `h-80`).

**11. `img_journal_inner_child.png`**
- **Card:** Inner Child Healing Journal — $65
- **Usage:** `<Image src="/images/img_journal_inner_child.png" fill objectFit="cover" />` inside `<div className="relative h-72 rounded-t-xl overflow-hidden">`. Portrait orientation — shows the journal cover with geometric warm-toned design.
- **Alt text:** `"Inner Child Healing Journal by Ataraxia — $65"`

**12. `img_journal_addiction.png`**
- **Card:** Addiction Recovery Journal — $75
- **Usage:** Same card structure as above. `src="/images/img_journal_addiction.png"`. Portrait orientation — navy blue journal with "Road to Recovery" design.
- **Alt text:** `"Addiction Recovery Guided Journal by Ataraxia — $75"`

**13. `img_journal_meditation.png`**
- **Card:** Meditation & Inner Peace Journal — $30
- **Usage:** Same card structure. `src="/images/img_journal_meditation.png"`. Portrait orientation — cream/beige journal with mandala design.
- **Alt text:** `"Meditation & Inner Peace Journal by Ataraxia — $30"`

**14. `img_journal_self_reflection.png`**
- **Card:** 118 Deep Reflection Questions — $20
- **Usage:** Same card structure. `src="/images/img_journal_self_reflection.png"`. Portrait orientation — earth-toned journal with collage-style cover.
- **Alt text:** `"118 Deep Self Reflection Questions Journal by Ataraxia — $20"`

---

### SVG RENDERING RULES

- All `.svg` files must be rendered as `<img>` tags, **not** inlined as `<svg>` — they are complex pre-built visuals and must not be re-styled or decomposed
- Always set `width="100%"` or a Tailwind width class — never leave SVGs at their intrinsic size
- Dark backgrounds in the SVGs are intentional — do not add a white background wrapper around any SVG
- SVGs are responsive by design — they will scale cleanly at any container width

---

### IMAGE RENDERING RULES

- Use Next.js `<Image />` component for all `.png` files (never a plain `<img>` tag for PNGs)
- Always provide `width` and `height` props or use `fill` with a `relative` parent container
- Always provide a descriptive `alt` text as specified per image above
- `priority={true}` on `img_hero_woman_light.png` only — it is above the fold
- All other images use lazy loading (default Next.js behaviour)

---

## SEO — TECHNICAL REQUIREMENTS

Implement via Next.js `generateMetadata()` on each page.

| Page | Meta Title |
|---|---|
| Home | `Emotional Transformation & Subconscious Reprogramming \| Ataraxia by Aqsa` |
| About | `Aqsa Khan \| Certified NLP Coach, Hypnotherapist & Time Line Therapy™ Practitioner` |
| Services | `NLP Coaching, Hypnotherapy & Subconscious Reprogramming \| Ataraxia by Aqsa` |
| Courses | `21-Day Subconscious Reprogramming & Emotional Healing Course \| Ataraxia` |
| Journals | `Therapeutic Healing Journals for Emotional Recovery \| Shop Ataraxia` |
| Blog | `Emotional Healing, NLP & Subconscious Reprogramming Insights \| Ataraxia` |

**Priority keywords to weave into meta descriptions and H1s (do not alter copy — use in meta tags only):**

- Home: `subconscious reprogramming coach`, `NLP coach for emotional transformation`, `emotional release coaching online`
- About: `certified NLP coach hypnotherapist`, `Time Line Therapy practitioner Pakistan`
- Services: `1:1 NLP coaching sessions`, `hypnotherapy for anxiety and trauma online`, `Time Line Therapy for emotional healing`, `corporate mindset coaching emotional intelligence`
- Courses: `21-day subconscious reprogramming programme online`
- Journals: `inner child healing journal`, `addiction recovery journal`, `therapeutic journaling workbook`

**Schema markup (add via JSON-LD in layout or page):**
- `Person` schema — Aqsa Khan, with credentials (ABNLP, TLTA, Clinical Hypnotherapist), social links
- `ProfessionalService` schema — all service pages
- `Product` schema with reviews — all journal pages
- `FAQPage` schema — home page and each service page
- `BreadcrumbList` — sitewide

---

## REUSABLE COMPONENTS TO BUILD

| Component | Description |
|---|---|
| `<FourXFlowBar />` | RELEASE → REWIRE → RISE → LIVE 4X horizontal bar with arrow connectors. Dark cards, gold text, gold arrows. Reused on Home and Services pages. |
| `<SectionLabel />` | Courier New, uppercase, gold, wide letter-spacing overline label |
| `<GoldDivider />` | Thin horizontal rule in gold, `#D4AF37`, `opacity: 0.4` |
| `<PullQuote />` | Centred, large italic quote in Georgia, gold colour, with attribution below |
| `<CTAButton />` | Ghost button — gold border + gold text, hover fills gold with dark text |
| `<JournalCard />` | Dark card with image, title, price badge, description, CTA |
| `<ServiceCard />` | Full-width dark section with tag label, title, body, list, CTA |
| `<DomainGrid />` | 4×2 grid of domain cards for the Courses page |
| `<BundleTable />` | 4-row pricing table with featured row highlighting |
| `<ArticleCard />` | Blog article stub card with title and hover gold accent |
| `<CredentialCard />` | Certification item with gold left border accent |

---

## ANIMATION GUIDELINES (Framer Motion)

- All sections: `fadeInUp` on scroll enter — `opacity: 0 → 1`, `y: 30 → 0`, `duration: 0.7`, `ease: easeOut`
- Staggered children (e.g. credential list, domain grid): `staggerChildren: 0.1`
- Hero text: cascade in line by line with `staggerChildren: 0.15`
- Image reveals: `scale: 1.03 → 1` with `opacity: 0 → 1` on scroll
- CTA buttons: gold glow pulse on hover (`box-shadow` with gold at 40% opacity)
- No aggressive animations — everything should feel intentional and calm, not flashy

---

## IMPORTANT RULES — READ BEFORE WRITING A SINGLE LINE OF CODE

1. **Every word of copy is final.** Do not summarise, rephrase, shorten, or improve any text. It has been written by a professional copywriter. Reproduce it character-for-character.
2. **Dark background everywhere.** No white or light sections anywhere on the site.
3. **Gold is the only accent colour.** No blues, greens, purples, or brand colours from other systems.
4. **No generic wellness imagery.** Only the supplied image files listed in the image guide.
5. **Typography is identity.** Palatino/EB Garamond for display. Georgia/Lora for body. Courier New for labels. This is non-negotiable.
6. **The 4X Flow Bar (`<FourXFlowBar />`) must appear on both the Home page and the Services page.** It is the primary visual proof of the system.
7. **Every CTA uses the `▶` arrow character** as supplied — do not replace with chevrons or icons.
8. **The brand tagline `Tranquillity in Transformation` uses the British spelling** of Tranquillity (double-l). Do not autocorrect.
9. **`Time Line Therapy™`** is always written as two words with the ™ symbol. Never "Timeline Therapy."
10. **All SEO metadata must be implemented** — this is a client deliverable, not a prototype.

---

*ATARAXIA — Tranquillity in Transformation*
*Release → Rewire → Rise → Live 4X*
