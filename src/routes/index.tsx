import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight, Camera, Calendar, Trophy, Users, Newspaper,
  Sparkles, Play, Quote, ChevronRight,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import { Ticker } from "@/components/Ticker";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Good Shepherd Convent Media Club — Home" },
      { name: "description", content: "Announcements, events, achievements and student media from the official Good Shepherd Convent Media Club." },
      { property: "og:title", content: "Good Shepherd Convent Media Club" },
      { property: "og:description", content: "The voice and lens of Good Shepherd Convent." },
    ],
  }),
  component: Home,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{n.toLocaleString()}{suffix}</span>;
}

const announcements = [
  { tag: "Urgent", title: "Annual Day rehearsals begin Monday 4 PM", date: "2 hrs ago" },
  { tag: "Event", title: "Photo Walk to Old Town — open to all members", date: "Yesterday" },
  { tag: "Competition", title: "Short Film Festival — submissions open", date: "2 days ago" },
];

const events = [
  { date: "Nov 28", title: "Inter-house Debate Finals", place: "Auditorium" },
  { date: "Dec 04", title: "Annual Photo Walk — Heritage Quarter", place: "City Center" },
  { date: "Dec 12", title: "Short Film Festival Premiere", place: "Block A Theatre" },
];

const testimonials = [
  { quote: "Joining the Media Club gave me a voice I didn't know I had.", name: "Aanya R.", role: "Class XI, Editor" },
  { quote: "Our students cover events with the discipline of working journalists.", name: "Mrs. D'Souza", role: "Faculty Advisor" },
  { quote: "The club is where I learned to tell stories with a camera.", name: "Rahul M.", role: "Alumnus '23" },
];

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-page pt-10 md:pt-16 pb-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-7" style={{ animation: "var(--animate-fade-up)" }}>
              <span className="eyebrow">Est. 2014 · Volume XII</span>
              <h1 className="mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-tight">
                The voice<br />
                <em className="italic text-muted-foreground">and lens</em> of<br />
                <span className="shimmer-text">Good Shepherd.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
                We are students documenting school life as it happens — every match,
                every performance, every quiet moment in the corridor. Welcome to our
                official media platform.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-gold">
                  Join the Club <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link to="/announcements" className="btn-ghost-ink">
                  Read Announcements
                </Link>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { n: 86, s: "+", l: "Members" },
                  { n: 240, s: "+", l: "Events covered" },
                  { n: 31, s: "", l: "Awards won" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-3xl md:text-4xl text-foreground">
                      <Counter to={s.n} suffix={s.s} />
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bento-card">
                <img
                  src={heroImg}
                  alt="Media Club students working with a camera and editing software"
                  width={1600}
                  height={1100}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-primary-foreground">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-gold">Featured</p>
                    <p className="mt-2 font-display text-2xl leading-tight">
                      Behind the scenes of Annual Day '25
                    </p>
                  </div>
                  <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground transition-transform hover:scale-110">
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                </div>
              </div>
              <div className="absolute -left-6 -top-6 hidden md:flex h-24 w-24 items-center justify-center rounded-full bg-gold text-gold-foreground rotate-[-12deg] shadow-[var(--shadow-gold)]">
                <div className="text-center font-display leading-tight">
                  <div className="text-2xl">12</div>
                  <div className="text-[9px] uppercase tracking-widest">years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* BENTO — announcements + events + stats */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <span className="eyebrow">This week</span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">In the newsroom</h2>
          </div>
          <Link to="/announcements" className="ink-link text-sm text-muted-foreground hover:text-foreground">
            View all announcements →
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-6 md:grid-rows-[auto_auto] auto-rows-fr">
          {/* Big feature */}
          <article className="bento-card md:col-span-3 md:row-span-2 p-7 flex flex-col justify-between min-h-[420px] bg-primary text-primary-foreground">
            <div>
              <span className="chip !border-gold/60 !bg-gold/15 !text-gold">Pinned</span>
              <h3 className="mt-6 font-display text-4xl md:text-5xl leading-tight">
                The Shepherd Gazette — Winter Issue is live.
              </h3>
              <p className="mt-5 text-primary-foreground/75 leading-relaxed max-w-md">
                48 pages on sports, culture, opinion and a special photo-essay
                from the heritage walk. Written, shot and laid out entirely by students.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <Link to="/announcements" className="btn-gold !py-2 !px-5 text-xs">
                Read online
              </Link>
              <span className="text-xs uppercase tracking-widest text-primary-foreground/60">
                Issue Nº 24 · Nov 2025
              </span>
            </div>
          </article>

          {/* Announcements stack */}
          {announcements.map((a) => (
            <article key={a.title} className="bento-card md:col-span-3 p-6">
              <div className="flex items-center justify-between">
                <span className="chip">{a.tag}</span>
                <span className="text-xs text-muted-foreground">{a.date}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl leading-snug">{a.title}</h3>
              <Link to="/announcements" className="mt-4 inline-flex items-center gap-1 text-sm text-foreground/80 ink-link">
                Read more <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>

        {/* Events bento row */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {events.map((e) => (
            <article key={e.title} className="bento-card p-6 group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">{e.date}</p>
                  <h3 className="mt-3 font-display text-2xl">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{e.place}</p>
                </div>
                <Calendar className="h-5 w-5 text-muted-foreground transition-transform group-hover:rotate-6 group-hover:text-gold" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="bg-secondary/50 border-y border-border/60">
        <div className="container-page py-20">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <span className="eyebrow">Through our lens</span>
              <h2 className="mt-4 font-display text-4xl md:text-6xl">Recent frames</h2>
            </div>
            <Link to="/gallery" className="btn-ghost-ink !py-2.5 text-xs">
              Open Gallery
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-2 md:auto-rows-[200px]">
            {[
              { src: g1, alt: "Students with trophy", cls: "md:col-span-5 md:row-span-2" },
              { src: g3, alt: "Sports meet", cls: "md:col-span-4" },
              { src: g2, alt: "Microphone on podium", cls: "md:col-span-3 md:row-span-2" },
              { src: g4, alt: "Cultural performance", cls: "md:col-span-2" },
              { src: g5, alt: "Editorial desk", cls: "md:col-span-2" },
            ].map((img) => (
              <div key={img.alt} className={`relative overflow-hidden rounded-2xl group ${img.cls}`}>
                <img
                  src={img.src} alt={img.alt} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS bento */}
      <section className="container-page py-20">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            { icon: Users, n: 86, s: "+", l: "Active members", note: "Across 8 verticals" },
            { icon: Calendar, n: 240, s: "+", l: "Events covered", note: "Since 2014" },
            { icon: Trophy, n: 31, s: "", l: "Awards & honors", note: "Inter-school + national" },
            { icon: Newspaper, n: 1280, s: "+", l: "Media posts", note: "Stories, photos, films" },
          ].map((s) => (
            <div key={s.l} className="bento-card p-7">
              <s.icon className="h-6 w-6 text-gold" />
              <div className="mt-6 font-display text-5xl">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <p className="mt-2 text-sm font-medium">{s.l}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-page py-20">
        <span className="eyebrow">In their words</span>
        <h2 className="mt-4 font-display text-4xl md:text-6xl max-w-3xl">
          From the people who make us, <em className="italic text-muted-foreground">us.</em>
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="bento-card p-7 flex flex-col">
              <Quote className="h-7 w-7 text-gold" />
              <blockquote className="mt-5 font-display text-2xl leading-snug flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border/60">
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-10 md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Sparkles className="h-6 w-6 text-gold" />
              <h2 className="mt-5 font-display text-4xl md:text-6xl leading-tight">
                Got a story to tell? <br />
                <em className="italic text-primary-foreground/70">We're listening.</em>
              </h2>
            </div>
            <div className="md:col-span-4 flex md:justify-end flex-wrap gap-3">
              <Link to="/contact" className="btn-gold">
                Join the Club <Camera className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-ghost-ink !border-primary-foreground/40 !text-primary-foreground hover:!bg-primary-foreground hover:!text-primary">
                Pitch a Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
