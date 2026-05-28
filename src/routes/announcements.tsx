import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Pin, Clock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements — Good Shepherd Media Club" },
      { name: "description", content: "Latest news, notices, competitions and event announcements from the Media Club." },
      { property: "og:title", content: "Announcements — Good Shepherd Media Club" },
      { property: "og:description", content: "Pinned notices, weekly briefings and event call-outs." },
    ],
  }),
  component: AnnouncementsPage,
});

type Cat = "All" | "Events" | "Meetings" | "Competitions" | "Urgent";

const data: { id: number; cat: Exclude<Cat, "All">; title: string; body: string; date: string; pinned?: boolean }[] = [
  { id: 1, cat: "Urgent", title: "Annual Day rehearsals begin Monday", body: "All members of the stage-coverage team report to the auditorium by 4 PM sharp. Cameras and audio kits will be issued.", date: "Today · 09:12", pinned: true },
  { id: 2, cat: "Competitions", title: "Short Film Festival — submissions open", body: "Submit 3–7 minute student films. Theme: 'Voices from the Corridor'. Deadline: Dec 20.", date: "Today · 08:00", pinned: true },
  { id: 3, cat: "Events", title: "Heritage Photo Walk on Saturday", body: "We meet at the East Gate at 7:30 AM. Bring water, your camera and a notebook.", date: "Yesterday" },
  { id: 4, cat: "Meetings", title: "Editorial board meeting — Thursday", body: "Agenda: Winter Gazette wrap-up, Spring Issue roadmap, new member induction.", date: "2 days ago" },
  { id: 5, cat: "Events", title: "Open Mic Night returns", body: "Slots open for poetry, music and stand-up. Sign-up sheet on the club notice board.", date: "3 days ago" },
  { id: 6, cat: "Competitions", title: "Inter-school Debate — team announced", body: "Congratulations to the four debaters representing Good Shepherd at the St. Joseph's Cup.", date: "Last week" },
  { id: 7, cat: "Meetings", title: "Photography vertical sync — weekly", body: "Every Wednesday, 3:30 PM, Media Lab B. New members welcome.", date: "Last week" },
  { id: 8, cat: "Urgent", title: "Library archive access — temporary", body: "The archive corner closes Nov 30 for digitization. Borrow what you need before then.", date: "2 weeks ago" },
];

const cats: Cat[] = ["All", "Events", "Meetings", "Competitions", "Urgent"];
const catTone: Record<Exclude<Cat, "All">, string> = {
  Urgent: "!border-destructive/50 !bg-destructive/10 !text-destructive",
  Events: "!border-gold/50 !bg-gold/15 !text-foreground",
  Meetings: "!border-primary/30 !bg-primary/10",
  Competitions: "!border-foreground/20",
};

function AnnouncementsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Cat>("All");

  const filtered = useMemo(() => {
    return data.filter((a) =>
      (cat === "All" || a.cat === cat) &&
      (q === "" || (a.title + a.body).toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, cat]);

  const pinned = filtered.filter((a) => a.pinned);
  const rest = filtered.filter((a) => !a.pinned);

  return (
    <>
      <PageHeader
        eyebrow="The Newsroom"
        title={<>Announcements <em className="italic text-muted-foreground">& notices</em></>}
        description="Pinned notices, weekly briefings, calls-for-entries and time-sensitive updates from the Media Club desk."
      />

      <section className="container-page py-12">
        {/* Controls */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search announcements..."
              className="w-full rounded-full border border-border bg-card pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                  cat === c
                    ? "bg-foreground text-background border-foreground"
                    : "border-border hover:border-foreground/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {pinned.length > 0 && (
          <div className="mt-10">
            <p className="eyebrow">Pinned</p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {pinned.map((a) => (
                <Card key={a.id} a={a} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <p className="eyebrow">All updates</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => <Card key={a.id} a={a} />)}
          </div>
          {filtered.length === 0 && (
            <p className="mt-12 text-center text-muted-foreground">
              No announcements match your search.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

function Card({ a }: { a: typeof data[number] }) {
  return (
    <article className="bento-card p-6 flex flex-col">
      <div className="flex items-center justify-between gap-3">
        <span className={`chip ${catTone[a.cat]}`}>{a.cat}</span>
        {a.pinned && <Pin className="h-4 w-4 text-gold" />}
      </div>
      <h3 className="mt-4 font-display text-2xl leading-snug">{a.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{a.body}</p>
      <div className="mt-5 pt-4 border-t border-border/60 flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" /> {a.date}
      </div>
    </article>
  );
}
