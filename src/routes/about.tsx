import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Mic, Newspaper, Film, Target, Award, Heart } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import about from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Good Shepherd Media Club" },
      { name: "description", content: "Our history, mission, vision, and the values that guide the Good Shepherd Convent Media Club." },
      { property: "og:title", content: "About — Good Shepherd Media Club" },
      { property: "og:description", content: "Twelve years of student journalism." },
    ],
  }),
  component: AboutPage,
});

const verticals = [
  { i: Camera, t: "Photography", d: "Photo walks, event coverage, portrait projects." },
  { i: Film, t: "Film & Video", d: "Short films, reels, documentaries, live streams." },
  { i: Newspaper, t: "Editorial", d: "The Shepherd Gazette and the digital edition." },
  { i: Mic, t: "Audio & Podcast", d: "Corridor Talk, our weekly student podcast." },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title={<>Twelve years of <em className="italic text-muted-foreground">student journalism.</em></>}
        description="What started as a notice-board newsletter in 2014 is today a full-fledged multimedia newsroom run by students."
      />

      <section className="container-page py-16 grid gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6">
          <img src={about} alt="Good Shepherd Convent at golden hour"
            loading="lazy"
            className="rounded-3xl w-full aspect-[16/10] object-cover" />
        </div>
        <div className="lg:col-span-6">
          <span className="eyebrow">Mission</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            To tell the truth of school life — beautifully, fairly, and in our own voice.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            We believe every student has a story worth telling, and that learning to
            tell it well is a craft worth practicing. The Media Club exists to give
            students the tools, mentorship and platforms to do exactly that.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { i: Target, t: "Vision", d: "Be the most trusted student voice in our community — known for craft, integrity and warmth." },
            { i: Award, t: "Values", d: "Curiosity. Accuracy. Kindness. We hold ourselves to the standards of a professional newsroom." },
            { i: Heart, t: "Why join", d: "Find your craft, find your people, leave school with a portfolio you're proud of." },
          ].map((c) => (
            <div key={c.t} className="bento-card p-7">
              <c.i className="h-6 w-6 text-gold" />
              <h3 className="mt-5 font-display text-2xl">{c.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <span className="eyebrow">What we do</span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">Four verticals, one newsroom.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {verticals.map((v) => (
            <div key={v.t} className="bento-card p-6">
              <v.i className="h-7 w-7 text-gold" />
              <h3 className="mt-5 font-display text-xl">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <span className="eyebrow">Milestones</span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">Selected achievements</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            { y: "2024", t: "National Youth Media Award", d: "Best School Publication — The Shepherd Gazette." },
            { y: "2023", t: "St. Joseph's Debate Cup", d: "1st place, team of four." },
            { y: "2022", t: "Inter-school Film Festival", d: "Three official selections, one Audience Award." },
            { y: "2021", t: "Digital Edition Launched", d: "Live coverage during the year of remote learning." },
          ].map((m) => (
            <div key={m.t} className="bento-card p-6 flex gap-5">
              <div className="font-display text-4xl text-gold w-20">{m.y}</div>
              <div>
                <h3 className="font-display text-2xl">{m.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-10 md:p-14 text-center">
          <span className="eyebrow justify-center !text-gold">Good Shepherd Convent</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl max-w-3xl mx-auto">
            "Lead well, write true, photograph kindly."
          </h2>
          <p className="mt-4 text-primary-foreground/70">— The club motto, since 2014.</p>
          <Link to="/contact" className="btn-gold mt-8">Become a member</Link>
        </div>
      </section>
    </>
  );
}
