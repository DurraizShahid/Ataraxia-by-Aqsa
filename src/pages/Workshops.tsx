import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { WorkshopWaitlistForm } from "@/components/workshops/WorkshopWaitlistForm";
import { Sparkles, CalendarClock, ShieldCheck, Users } from "lucide-react";

const Workshops = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            Coming Soon
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Workshops</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Live, guided sessions designed to create real change—more support, more structure, more momentum.
            Join early access to shape what launches first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Card>
            <CardContent className="p-6 flex gap-4">
              <div className="mt-0.5 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Practical + transformative</p>
                <p className="text-sm text-muted-foreground">
                  Clear frameworks, guided exercises, and take-home tools—built for real life.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <div className="mt-0.5 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Community energy</p>
                <p className="text-sm text-muted-foreground">
                  Learn with others, stay accountable, and move faster with shared momentum.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <div className="mt-0.5 text-primary">
                <CalendarClock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Flexible formats</p>
                <p className="text-sm text-muted-foreground">
                  Online and in-person options—plus time windows that work with your schedule.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <div className="mt-0.5 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Respectful + safe</p>
                <p className="text-sm text-muted-foreground">
                  Consent-led, inclusive facilitation. Your pace, your boundaries.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-3">Get early access</h2>
            <p className="text-muted-foreground mb-4">
              Tell us what you want most. You’ll get first invitation when workshops open.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Early-bird priority + updates</li>
              <li>• Vote on topics and formats</li>
              <li>• No spam—only relevant launches</li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <WorkshopWaitlistForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshops;

