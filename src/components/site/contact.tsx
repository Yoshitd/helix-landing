"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    const next: Errors = {};
    if (!name) next.name = "Please tell us your name.";
    if (!email) next.email = "We need an email to reply.";
    else if (!emailRe.test(email)) next.email = "That email looks off.";
    if (!message || message.length < 10)
      next.message = "A sentence or two helps us prepare.";

    setErrors(next);
    if (Object.keys(next).length) return;

    // No backend yet — simulate a send, then show the success state.
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSent(true);
  }

  return (
    <section id="contact" className="px-6 pb-28 md:pb-36">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-brand px-6 py-16 md:px-14 md:py-20">
        <div
          aria-hidden
          className="bg-dotgrid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]"
        />
        <div className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* intro */}
          <div>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Have something worth building?
            </h2>
            <p className="text-balance mt-5 max-w-md text-lg text-white/80">
              Tell us where you&rsquo;re stuck. We&rsquo;ll come back within two
              business days with a plan — no slide deck required.
            </p>
            <p className="mt-6 text-sm text-white/70">
              Prefer email?{" "}
              <a href="mailto:hello@helix.dev" className="font-medium text-white underline underline-offset-4">
                hello@helix.dev
              </a>
            </p>
          </div>

          {/* form card */}
          <div className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-brand" fill="none" aria-hidden>
                      <path d="m5 13 4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">Message sent</h3>
                  <p className="mt-2 text-sm text-foreground/60">
                    Thanks — we&rsquo;ll be in touch within two business days.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="space-y-4"
                >
                  <Field id="name" label="Name" error={errors.name}>
                    <Input id="name" name="name" placeholder="Ada Lovelace" autoComplete="name" />
                  </Field>
                  <Field id="email" label="Work email" error={errors.email}>
                    <Input id="email" name="email" type="email" placeholder="ada@company.com" autoComplete="email" />
                  </Field>
                  <Field id="company" label="Company" hint="optional">
                    <Input id="company" name="company" placeholder="Acme Inc." autoComplete="organization" />
                  </Field>
                  <Field id="message" label="What are you building?" error={errors.message}>
                    <Textarea id="message" name="message" rows={4} placeholder="A few sentences on the problem and timeline…" />
                  </Field>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-11 w-full rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
                  >
                    {submitting ? "Sending…" : "Send message"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <Label htmlFor={id} className="text-sm">
          {label}
        </Label>
        {hint && <span className="text-xs text-foreground/40">{hint}</span>}
      </div>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
