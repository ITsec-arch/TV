"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type EnquiryTopic = "consulting" | "packages" | "academy" | "general";

const TOPICS: { value: EnquiryTopic; label: string }[] = [
  { value: "consulting", label: "Enterprise consulting" },
  { value: "packages", label: "SMB package" },
  { value: "academy", label: "Academy and training" },
  { value: "general", label: "Something else" },
];

export function ContactForm({ defaultTopic = "general" }: { defaultTopic?: EnquiryTopic }) {
  const [topic, setTopic] = useState<EnquiryTopic>(defaultTopic);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    const payload = {
      topic,
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""), // honeypot, stays empty for real users
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(
          res.status === 429
            ? "Too many attempts. Please wait a minute, then try again."
            : "Something went wrong. Please email info@threatvet.com.",
        );
      } else {
        setStatus("ok");
        formEl.reset();
        setTopic(defaultTopic);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Could not reach the server. Please email info@threatvet.com.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <fieldset>
        <legend className="text-sm font-medium text-fg">What is this about?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <label
              key={t.value}
              className={cn(
                "cursor-pointer rounded-md border px-3 py-2 text-sm transition-colors focus-within:ring-2 focus-within:ring-ring",
                topic === t.value
                  ? "border-red bg-red/10 text-fg"
                  : "border-line text-fg-muted hover:border-line-strong",
              )}
            >
              <input
                type="radio"
                name="topic"
                value={t.value}
                checked={topic === t.value}
                onChange={() => setTopic(t.value)}
                className="sr-only"
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" autoComplete="organization" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">What do you need?</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="What are you shipping, and where is it exposed?"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Sending" : "Send enquiry"}
        </Button>
        <p aria-live="polite" className="text-sm">
          {status === "ok" ? (
            <span className="text-fg-muted">Thanks. We will reply within one business day.</span>
          ) : null}
          {status === "error" ? <span className="text-red-bright">{errorMsg}</span> : null}
        </p>
      </div>

      {/* Honeypot: hidden from people, tempting to bots. Must stay empty. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
