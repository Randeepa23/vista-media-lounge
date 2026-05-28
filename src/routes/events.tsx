import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Good Shepherd Media Club" },
      { name: "description", content: "Upcoming and past events covered by the Media Club, from photo walks to film premieres." },
      { property: "og:title", content: "Events — Good Shepherd Media Club" },
      { property: "og:description", content: "Photo walks, debates, film premieres and more." },
    ],
  }),
  component: EventsPage,
});

const upcoming = [
  { date: "2025-11-28T17:00:00", title: "Inter-house Debate Finals", place: "Main Auditorium", tag: "Debate" },
  { date: "2025-12-04T07:30:00", title: "Heritage Photo Walk", place: "Old Town · East Gate", tag: "Photography" },
  { date: "2025-12-12T18:00:00", title: "Short Film Festival Premiere", place: "Block A Theatre", tag: "Film" },
  { date: "2025-12-19T16:00:00", title: "Open Mic Night", place: "Quadrangle", tag: "Live" },
];

const past = [
  { d: "Oct 24", title: "Annual Sports Day Coverage", caption: "240 photos, 14 reels, 1 highlight film." },
  { d: "Sep 18", title: "Founder's Day Live Broadcast", caption: "Three-camera live stream to alumni worldwide." },
  { d: "Aug 12", title: "Independence Day Special", caption: "On-ground reporting team of 12 students." },
  { d: "Jul 30", title: "Inter-school Debate — Champions", caption: "1st place at the St. Joseph's Cup." },
];

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const ms = Math.max(0, new Date(target).getTime() - now);
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms / 3600000) % 24);
  const m = Math.floor((ms / 60000) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return { d, h, m, s };
}

function EventsPage() {
  const next = upcoming[0];
  const cd = useCountdown(next.date);

  return (
    <>
      <PageHeader
        eyebrow="On the calendar"
        title={<>Events <em className="italic text-muted-foreground">we're covering</em></>}
        description="Every photo walk, debate, screening and concert the Media Club is reporting on this season."
      />

      {/* Next event countdown */}
      <section className="container-page py-12">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <span className="chip !border-gold/60 !bg-gold/15 !text-gold">Next up</span>
              <h2 className="mt-5 font-display text-4xl md:text-6xl leading-tight">{next.title}</h2>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-gold" /> {new Date(next.date).toLocaleString()}</span>
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> {next.place}</span>
              </div>
              <button className="btn-gold mt-7">Register to attend <ArrowUpRight className="h-4 w-4" /></button>
            </div>
            <div className="md:col-span-5">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { v: cd.d, l: "Days" },
                  { v: cd.h, l: "Hours" },
                  { v: cd.m, l: "Min" },
                  { v: cd.s, l: "Sec" },
                ].map((b) => (
                  <div key={b.l} className="rounded-2xl bg-primary-foreground/8 border border-primary-foreground/15 p-4 text-center backdrop-blur">
                    <div className="font-display text-4xl text-gold tabular-nums">
                      {String(b.v).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-primary-foreground/60">{b.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming list */}
      <section className="container-page py-12">
        <span className="eyebrow">Upcoming</span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">All upcoming events</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {upcoming.map((e) => {
            const d = new Date(e.date);
            return (
              <article key={e.title} className="bento-card p-6 flex gap-5">
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-secondary text-center">
                  <div className="font-display text-2xl leading-none">{d.getDate()}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                    {d.toLocaleString("en", { month: "short" })}
                  </div>
                </div>
                <div className="flex-1">
                  <span className="chip">{e.tag}</span>
                  <h3 className="mt-3 font-display text-2xl">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground inline-flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" /> {e.place}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Past timeline */}
      <section className="container-page py-12">
        <span className="eyebrow">Recently covered</span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">Past events timeline</h2>
        <ol className="relative mt-12 ml-3 border-l border-gold/40 space-y-10">
          {past.map((p, i) => (
            <li key={i} className="pl-8 relative">
              <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-gold ring-4 ring-background" />
              <p className="text-xs uppercase tracking-[0.22em] text-gold">{p.d}</p>
              <h3 className="mt-2 font-display text-2xl md:text-3xl">{p.title}</h3>
              <p className="mt-1 text-muted-foreground">{p.caption}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
