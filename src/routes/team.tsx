import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — Good Shepherd Media Club" },
      { name: "description", content: "Meet the students, coordinators and teachers behind the Good Shepherd Media Club." },
      { property: "og:title", content: "Team — Good Shepherd Media Club" },
      { property: "og:description", content: "The students and faculty who make the Media Club." },
    ],
  }),
  component: TeamPage,
});

type M = { name: string; role: string; bio: string; initials: string; accent?: boolean };

const leadership: M[] = [
  { name: "Ananya Rao", role: "Club President", bio: "Class XII · leads editorial and oversees publications.", initials: "AR", accent: true },
  { name: "Kabir Mehta", role: "Vice President", bio: "Class XII · runs the photography vertical and gallery.", initials: "KM" },
  { name: "Mrs. D'Souza", role: "Faculty Advisor", bio: "Teacher of English · founding mentor of the club.", initials: "DS" },
  { name: "Mr. Patel", role: "Faculty Advisor", bio: "Teacher of Computer Science · audio-visual lead.", initials: "MP" },
];

const committee: M[] = [
  { name: "Sara Khan", role: "Editor-in-Chief", bio: "The Shepherd Gazette · long-form and opinion.", initials: "SK" },
  { name: "Rohan Iyer", role: "Photo Editor", bio: "Heads photo walks, archives and submissions.", initials: "RI" },
  { name: "Maya Singh", role: "Video Lead", bio: "Short films, reels and the YouTube channel.", initials: "MS" },
  { name: "Aarav Joshi", role: "Audio & Podcast", bio: "Hosts 'Corridor Talk', the weekly podcast.", initials: "AJ" },
  { name: "Priya Nair", role: "Design Lead", bio: "Visual identity, posters and social-media kits.", initials: "PN" },
  { name: "Ishaan Roy", role: "Social Media", bio: "Instagram, captions and community.", initials: "IR" },
  { name: "Tara Verma", role: "Events Coordinator", bio: "Plans coverage rosters for every event.", initials: "TV" },
  { name: "Dev Sharma", role: "Web Coordinator", bio: "Maintains this site and the archive.", initials: "DS" },
];

function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="The people"
        title={<>Meet the <em className="italic text-muted-foreground">team</em></>}
        description="A close-knit group of students and teachers who make the Media Club run, week after week."
      />

      <section className="container-page py-12">
        <span className="eyebrow">Leadership</span>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {leadership.map((m) => <Card key={m.name} m={m} />)}
        </div>
      </section>

      <section className="container-page py-12">
        <span className="eyebrow">Committee &amp; Coordinators</span>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {committee.map((m) => <Card key={m.name} m={m} />)}
        </div>
      </section>
    </>
  );
}

function Card({ m }: { m: M }) {
  return (
    <article className={`bento-card p-6 flex flex-col ${m.accent ? "bg-primary text-primary-foreground" : ""}`}>
      <div className={`flex h-20 w-20 items-center justify-center rounded-2xl font-display text-3xl ${
        m.accent ? "bg-gold text-gold-foreground" : "bg-secondary text-secondary-foreground"
      }`}>
        {m.initials}
      </div>
      <h3 className="mt-5 font-display text-2xl">{m.name}</h3>
      <p className={`text-xs uppercase tracking-[0.22em] mt-1 ${m.accent ? "text-gold" : "text-muted-foreground"}`}>
        {m.role}
      </p>
      <p className={`mt-3 text-sm flex-1 ${m.accent ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
        {m.bio}
      </p>
      <div className={`mt-5 pt-5 border-t flex gap-2 ${m.accent ? "border-primary-foreground/20" : "border-border/60"}`}>
        {[Instagram, Linkedin, Mail].map((Icon, i) => (
          <a key={i} href="#" aria-label="social"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
              m.accent
                ? "border-primary-foreground/25 hover:bg-gold hover:text-gold-foreground hover:border-gold"
                : "border-border hover:bg-foreground hover:text-background hover:border-foreground"
            }`}>
            <Icon className="h-3.5 w-3.5" />
          </a>
        ))}
      </div>
    </article>
  );
}
