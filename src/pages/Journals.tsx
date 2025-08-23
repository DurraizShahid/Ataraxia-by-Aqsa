import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Download, MessageCircle, Heart, BookOpen, Brain, Leaf, Lightbulb, Sparkles, Package, ArrowRight } from "lucide-react";

const individualJournals = [
  {
    title: "Addiction Recovery Journal",
    price: "$75",
    description: "Break free from destructive cycles with guided emotional releases, inner rewiring prompts, and transformational exercises. Comes with a free 30-minute private session with me to guide your healing path.",
    callToAction: "Get Your Journal",
    link: "/book-call",
    icon: <Brain className="h-6 w-6" />,
    tagline: "For those ready to reclaim control and rebuild from within.",
  },
  {
    title: "Meditation Journal",
    price: "$30",
    description: "Build your daily practice of stillness and grounding. This journal includes free guided audio to help calm your nervous system and bring mental clarity.",
    callToAction: "Get Your Journal",
    link: "/book-call",
    icon: <Leaf className="h-6 w-6" />,
    tagline: "Ideal for burnout, anxiety, or those new to mindfulness.",
  },
  {
    title: "Healing the Inner Child Journal",
    price: "$65",
    description: "Heal wounds from the past, release shame, and reparent yourself with powerful therapeutic prompts. This journal is your space to feel safe, heard, and whole.",
    callToAction: "Get Your Journal",
    link: "/book-call",
    icon: <Heart className="h-6 w-6" />,
    tagline: "One of the most transformative tools I’ve created.",
  },
  {
    title: "118 Self-Reflective Questions Journal",
    price: "$20",
    description: "Challenge your thoughts, discover hidden beliefs, and explore your true desires with these powerful questions.",
    callToAction: "Get Your Journal",
    link: "/book-call",
    icon: <Lightbulb className="h-6 w-6" />,
    tagline: "Ideal for daily journaling or emotional check-ins.",
  },
];

const journalBundles = [
  {
    title: "Healing Journey Pack",
    price: "$85",
    originalPrice: "$140",
    save: "$55",
    description: "Includes Addiction Recovery + Inner Child Journals. Complete emotional reset — from inner wounds to recovery and resilience.",
    callToAction: "Get Your Bundle",
    link: "/book-call",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    title: "Peace Pack",
    price: "$45",
    originalPrice: "$65",
    save: "$20",
    description: "Includes Meditation + Reflective Questions Journals. Perfect for everyday calm, clarity, and emotional flow.",
    callToAction: "Get Your Bundle",
    link: "/book-call",
    icon: <Leaf className="h-6 w-6" />,
  },
  {
    title: "All 4 Bundle – The Full Experience",
    price: "$120",
    originalPrice: "$160",
    save: "$45",
    description: "Includes all four journals. Your complete blueprint for emotional healing, mindset shift, and inner power.",
    callToAction: "Get Your Bundle",
    link: "/book-call",
    icon: <Package className="h-6 w-6" />,
  },
];

const Journals = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Healing Journals</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Designed with Intention. Backed by Psychology. Guided by Heart.
        </p>
        <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
          Each journal in this collection was painstakingly crafted over months — with real emotional labor, tested techniques, and a deep desire to create a safe space for your healing and transformation. They’re not just pages — they’re your private coaching tools, integrating NLP, Hypnosis, Emotional Processing, and self-reflective interventions that work.
        </p>
      </div>

      {/* Individual Journals Section */}
      <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-12">🌿 Individual Journals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {individualJournals.map((journal, index) => (
          <Card key={index} className="flex flex-col p-6 text-center">
            <CardHeader className="flex flex-col items-center p-0 mb-4">
              <div className="p-3 rounded-full bg-secondary text-primary mb-4">
                {journal.icon}
              </div>
              <CardTitle className="text-2xl font-serif mb-2">{journal.title}</CardTitle>
              <CardDescription className="text-3xl font-bold text-primary">{journal.price}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-0">
              <p className="text-muted-foreground text-sm mb-4">{journal.description}</p>
              <p className="text-primary font-semibold text-sm mb-6">{journal.tagline}</p>
              <Button asChild className="w-full">
                <Link to={journal.link}>{journal.callToAction} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Journal Bundles Section */}
      <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-12">💝 Journal Bundles – Because You Deserve More for Less</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {journalBundles.map((bundle, index) => (
          <Card key={index} className="flex flex-col p-6 text-center bg-brand-pink/20 border-brand-pink">
            <CardHeader className="flex flex-col items-center p-0 mb-4">
              <div className="p-3 rounded-full bg-brand-pink text-primary mb-4">
                {bundle.icon}
              </div>
              <CardTitle className="text-2xl font-serif mb-2">{bundle.title}</CardTitle>
              <CardDescription className="text-3xl font-bold text-primary">
                {bundle.price} <span className="line-through text-muted-foreground text-lg ml-2">{bundle.originalPrice}</span>
              </CardDescription>
              <p className="text-sm text-muted-foreground mt-1">Save {bundle.save}</p>
            </CardHeader>
            <CardContent className="flex-grow p-0">
              <p className="text-muted-foreground text-sm mb-6">{bundle.description}</p>
              <Button asChild className="w-full bg-brand-pink hover:bg-brand-pink-darker text-primary-foreground">
                <Link to={bundle.link}>{bundle.callToAction} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Text */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex justify-center space-x-8 mb-8 text-primary">
          <div className="flex flex-col items-center">
            <Download className="h-6 w-6 mb-2" />
            <span className="text-sm font-semibold">Instant Download</span>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle className="h-6 w-6 mb-2" />
            <span className="text-sm font-semibold">Personal Support</span>
          </div>
          <div className="flex flex-col items-center">
            <Heart className="h-6 w-6 mb-2" />
            <span className="text-sm font-semibold">Built With Intention</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-6">
          These journals took me months of heart work, research, and lived experience. I didn’t just create them — I breathed life into them. They’ve helped many, and I promise, they’ll help you too.
        </p>
        <p className="text-lg font-semibold text-primary">
          👉 Want help choosing your journal?{" "}
          <Link to="/book-call" className="underline hover:text-primary/80">Contact me</Link> — I’ll personally guide you.
        </p>
      </div>
    </div>
  );
};
export default Journals;