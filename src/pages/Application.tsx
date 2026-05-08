import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { showError, showSuccess } from "@/utils/toast";
import { createApplicationLead } from "@/lib/supabaseData";

const programs = ["4X Reset Experience", "1:1 Intensive", "Corporate / Team Training", "Not sure yet"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Name too short"),
  email: z.string().trim().email("Invalid email"),
  phone: z.string().trim().optional().or(z.literal("")),
  program: z.enum(programs),
  goals: z.string().trim().min(10, "Add a little more detail (10+ chars)"),
  consent: z.boolean().refine((v) => v, "Consent required"),
});

type FormValues = z.infer<typeof schema>;

const AQSA_EMAIL = "aqsakhan.growth@gmail.com";

function buildMailto(values: FormValues) {
  const subject = `Ataraxia Application — ${values.name}`;
  const body = [
    "New application submission",
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `WhatsApp/Phone: ${values.phone || "-"}`,
    `Program: ${values.program}`,
    "",
    "Goals / context:",
    values.goals,
    "",
    "— Sent from ataraxiabyaqsa.com",
  ].join("\n");

  return `mailto:${AQSA_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const Application = () => {
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: "",
      email: "",
      phone: "",
      program: "4X Reset Experience",
      goals: "",
      consent: false,
    }),
    []
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = async (values: FormValues) => {
    const saved = await createApplicationLead({
      name: values.name,
      email: values.email,
      phone: values.phone || undefined,
      program: values.program,
      goals: values.goals,
      sourcePath: location.pathname,
      utm: {},
    });

    if (!saved) {
      showError("Could not submit right now. Try again in a minute.");
      return;
    }

    try {
      const url = buildMailto(values);
      window.location.href = url;
      setSubmitted(true);
      showSuccess("Saved. Email draft opened.");
      form.reset({ ...defaultValues, consent: false });
    } catch {
      setSubmitted(true);
      showSuccess("Saved. Email app not opened — you can email manually.");
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-[#F5F0E8] max-w-[1280px] mx-auto px-6 md:px-16 lg:px-24 py-16">
      <Helmet>
        <title>Application | Ataraxia</title>
      </Helmet>

      <h1 className="text-5xl">Submit Application</h1>
      <p className="text-[#A09880] mt-6 leading-8 max-w-3xl">
        Fill quick form. Then your email app opens with everything pre-filled. Hit send.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr] items-start">
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                      <FormLabel>WhatsApp / Phone (optional)</FormLabel>
                      <FormControl>
                        <Input autoComplete="tel" inputMode="tel" placeholder="+92..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="program"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interested in</FormLabel>
                      <FormControl>
                        <select
                          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value as FormValues["program"])}
                          aria-label="Program"
                        >
                          {programs.map((p) => (
                            <option key={p} value={p}>
                              {p}
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
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What you want to change</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell Aqsa where you are now + what outcome you want."
                        rows={6}
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
                        <FormLabel className="cursor-pointer">I agree to be contacted about my application.</FormLabel>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  This form opens your email app. If you do not send email, application not received.
                </p>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Opening..." : "Open email draft"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold">Email contact</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Prefer manual email? Send to:
          </p>
          <a className="mt-3 inline-block text-[#D4AF37] hover:underline" href={`mailto:${AQSA_EMAIL}`}>
            {AQSA_EMAIL}
          </a>

          {submitted ? (
            <div className="mt-6 rounded-md border p-4">
              <p className="font-medium">Draft opened.</p>
              <p className="text-sm text-muted-foreground mt-1">Hit send in your email app to finish.</p>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
};

export default Application;

