"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const [ok, setOk] = useState(false);
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-semibold">Request a Security Review</h1>
      {ok ? (
        <p className="text-green-400">Thanks. We’ll get back within 1 business day.</p>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setOk(true); }}
          className="space-y-6 rounded-3xl border border-primary/20 bg-[color:var(--secondary)] p-6"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" required />
          </div>
          <div>
            <Label htmlFor="email">Work Email</Label>
            <Input id="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="message">Environment Summary</Label>
            <Textarea id="message" className="min-h-32" required />
          </div>
          <button className="rounded-2xl border px-6 py-3 bg-primary/20 border-primary/40 text-primary hover:bg-primary/30 transition-colors">
            Submit
          </button>
        </form>
      )}
    </main>
  );
}
