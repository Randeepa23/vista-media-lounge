import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook, Plus, Minus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Good Shepherd Media Club" },
      { name: "description", content: "Get in touch with the Good Shepherd Media Club. Contact form, FAQs and our school location." },
      { property: "og:title", content: "Contact — Good Shepherd Media Club" },
      { property: "og:description", content: "Reach out to pitch a story, join the club, or partner with us." },
    ],
  }),
  component: ContactPage,
});

const faqs = [
  { q: "Who can join the Media Club?", a: "Any student of Good Shepherd from Class IX upward. We hold open inductions every August and a smaller mid-year intake in January." },
  { q: "Do I need a camera or my own gear?", a: "No. The club has DSLRs, mics and laptops available for member use. Bring your curiosity — we'll handle the gear." },
  { q: "How much time does it take?", a: "Roughly 3–5 hours a week including the weekly meeting. Event weeks (Sports Day, Annual Day) are heavier." },
  { q: "Can I contribute without joining?", a: "Absolutely. Submit photos, op-eds or letters via the form on this page and our editors will be in touch." },
  { q: "How do I pitch a story?", a: "Use the form below with subject 'Story Pitch'. Include a one-line summary and why it matters now." },
];

function ContactPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Say hello"
        title={<>Let's <em className="italic text-muted-foreground">talk.</em></>}
        description="Pitch a story, ask a question, or tell us about an event we should cover."
      />

      <section className="container-page py-12 grid gap-10 lg:grid-cols-12">
        {/* Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="bento-card p-7 md:p-10 grid gap-5"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Your name" name="name" placeholder="Ananya Rao" />
              <Field label="Email" name="email" type="email" placeholder="you@school.edu" />
            </div>
            <Field label="Subject" name="subject" placeholder="Story pitch · Join the club · Press" />
            <div>
              <label className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Message</label>
              <textarea
                required rows={6}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                placeholder="Tell us what's on your mind..."
              />
            </div>
            <button type="submit" className="btn-gold w-fit">
              {sent ? "Sent — thank you ✦" : "Send message"}
            </button>
          </form>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-5 space-y-5">
          <InfoCard icon={Mail} label="Email" value="media@goodshepherd.edu" />
          <InfoCard icon={Phone} label="Phone" value="+91 22 1234 5678" />
          <InfoCard icon={MapPin} label="Visit us" value="Media Lab B, Block A · Good Shepherd Convent" />
          <div className="bento-card p-6">
            <p className="eyebrow">Follow</p>
            <div className="mt-4 flex gap-3">
              {[Instagram, Youtube, Facebook].map((I, i) => (
                <a key={i} href="#" aria-label="social"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border hover:bg-foreground hover:text-background transition">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* Map */}
      <section className="container-page py-6">
        <div className="overflow-hidden rounded-3xl border border-border">
          <iframe
            title="School location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=72.82%2C18.92%2C72.86%2C18.96&layer=mapnik"
            className="w-full h-[420px] grayscale-[20%]"
            loading="lazy"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-16">
        <span className="eyebrow">FAQ</span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl max-w-2xl">
          Common questions, answered.
        </h2>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left py-6 flex items-start gap-6"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border">
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-2xl">{f.q}</h3>
                  {isOpen && (
                    <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</label>
      <input
        id={name} name={name} type={type} required placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
      />
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="bento-card p-6 flex items-start gap-4">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-gold-foreground shrink-0">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-xl">{value}</p>
      </div>
    </div>
  );
}
