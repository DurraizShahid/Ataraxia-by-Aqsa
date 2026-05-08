import { useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createWorkshopWaitlistLead } from "@/lib/supabaseData";

const topics = [
  "Emotional healing",
  "Anxiety & regulation",
  "Confidence & identity",
  "Trauma release",
  "Relationships",
  "Productivity & focus",
] as const;

const formats = ["Online", "In-person", "Hybrid"] as const;
const timePrefs = ["Weekdays", "Weekends", "Evenings"] as const;
const urgencyOptions = ["ASAP", "Next month", "Next 3 months", "Just exploring"] as const;
const budgetOptions = ["Under $50", "$50–$150", "$150–$300", "$300+", "Not sure"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Name too short"),
  email: z.string().trim().email("Invalid email"),
  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
  professionalBackground: z.string().trim().min(2, "Tell us a bit about your background"),
  workshopTopics: z.array(z.string()).min(1, "Pick at least one topic"),
  formatPreference: z.enum(formats).optional(),
  timePreference: z.enum(timePrefs).optional(),
  primaryGoal: z.string().trim().min(10, "Add a little more detail (10+ chars)"),
  urgency: z.enum(urgencyOptions).optional(),
  budgetRange: z.enum(budgetOptions).optional(),
  consent: z.boolean().refine((v) => v, "Consent required"),
  sourcePath: z.string().optional(),
  interestSlug: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export const WorkshopWaitlistForm = () => {
  const location = useLocation();
  const params = useParams<{ slug: string }>();
  const [submitted, setSubmitted] = useState(false);

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: "",
      email: "",
      phone: "",
      professionalBackground: "",
      workshopTopics: [],
      formatPreference: undefined,
      timePreference: undefined,
      primaryGoal: "",
      urgency: undefined,
      budgetRange: undefined,
      consent: false,
      sourcePath: location.pathname,
      interestSlug: params.slug,
    }),
    [location.pathname, params.slug]
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = async (values: FormValues) => {
    const result = await createWorkshopWaitlistLead({
      name: values.name,
      email: values.email,
      phone: values.phone || undefined,
      professionalBackground: values.professionalBackground,
      workshopPreferences: values.workshopTopics,
      intent: {
        formatPreference: values.formatPreference,
        timePreference: values.timePreference,
        primaryGoal: values.primaryGoal,
        urgency: values.urgency,
        budgetRange: values.budgetRange,
        interestSlug: values.interestSlug,
      },
      sourcePath: values.sourcePath,
      utm: {},
    });

    if (!result) {
      form.setError("root", { message: "Could not join right now. Try again in a minute." });
      return;
    }

    setSubmitted(true);
    form.reset({ ...defaultValues, consent: false, workshopTopics: [] });
  };

  if (submitted) {
    return (
      <Card className="p-6">
        <h3 className="text-xl font-bold">You’re on list.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We’ll email you when early access opens. You can also submit another response to vote on more topics.
        </p>
        <Button className="mt-6" onClick={() => setSubmitted(false)}>
          Submit another response
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h3 className="text-xl font-bold">Join waitlist</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Short form. High signal. Fast.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="name" placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input autoComplete="email" inputMode="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (optional)</FormLabel>
                  <FormControl>
                    <Input autoComplete="tel" inputMode="tel" placeholder="+92..." {...field} />
                  </FormControl>
                  <FormDescription>Helps for time-sensitive invites.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="professionalBackground"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional background</FormLabel>
                  <FormControl>
                    <Input placeholder="Role / industry (e.g., Designer in fintech)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="workshopTopics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workshop preferences</FormLabel>
                <FormDescription>Pick what you’d actually show up for.</FormDescription>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {topics.map((t) => {
                    const checked = field.value.includes(t);
                    return (
                      <label
                        key={t}
                        className="flex items-start gap-3 rounded-md border p-3 cursor-pointer hover:bg-muted/30"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(v) => {
                            const next = v
                              ? [...field.value, t]
                              : field.value.filter((x) => x !== t);
                            field.onChange(next);
                          }}
                          aria-label={t}
                        />
                        <span className="text-sm font-medium leading-none">{t}</span>
                      </label>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="formatPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Format (optional)</FormLabel>
                  <FormControl>
                    <select
                      className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value || undefined)}
                      aria-label="Format preference"
                    >
                      <option value="">No preference</option>
                      {formats.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timePreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time (optional)</FormLabel>
                  <FormControl>
                    <select
                      className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value || undefined)}
                      aria-label="Time preference"
                    >
                      <option value="">No preference</option>
                      {timePrefs.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When do you want this?</FormLabel>
                  <FormControl>
                    <select
                      className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value || undefined)}
                      aria-label="Urgency"
                    >
                      <option value="">Choose</option>
                      {urgencyOptions.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="budgetRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget range (optional)</FormLabel>
                <FormControl>
                  <select
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value || undefined)}
                    aria-label="Budget range"
                  >
                    <option value="">Prefer not to say</option>
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="primaryGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What outcome do you want most?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Example: I want to reduce anxiety spikes and build a stable daily routine."
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(!!v)} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer">I agree to be contacted about workshops.</FormLabel>
                    <FormDescription>
                      You can opt out anytime.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {params.slug ? (
                <>
                  This signup is linked to interest: <span className="font-medium text-foreground">{params.slug}</span>
                </>
              ) : (
                "We use this to prioritize what to launch first."
              )}
            </p>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Joining..." : "Join waitlist"}
            </Button>
          </div>
          {form.formState.errors.root?.message ? (
            <p className="text-sm font-medium text-destructive" role="alert">
              {form.formState.errors.root.message}
            </p>
          ) : null}
        </form>
      </Form>
    </Card>
  );
};

