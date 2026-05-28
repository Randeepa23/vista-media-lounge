import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { X, Play } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Good Shepherd Media Club" },
      { name: "description", content: "Photos, films and event coverage by the Media Club, organized by event and category." },
      { property: "og:title", content: "Gallery — Good Shepherd Media Club" },
      { property: "og:description", content: "A visual archive of school life." },
    ],
  }),
  component: GalleryPage,
});

type Cat = "All" | "Events" | "Sports" | "Culture" | "Editorial" | "Films";
const cats: Cat[] = ["All", "Events", "Sports", "Culture", "Editorial", "Films"];

const items = [
  { src: g1, cat: "Events" as const, title: "Annual Day Trophy", video: false },
  { src: g3, cat: "Sports" as const, title: "Sports Day Sprint", video: false },
  { src: g4, cat: "Culture" as const, title: "Cultural Showcase", video: false },
  { src: g2, cat: "Events" as const, title: "Podium · Founders Speech", video: true },
  { src: g5, cat: "Editorial" as const, title: "Editorial Desk", video: false },
  { src: hero, cat: "Films" as const, title: "Behind The Scenes", video: true },
  { src: about, cat: "Events" as const, title: "Campus at Golden Hour", video: false },
  { src: g3, cat: "Sports" as const, title: "Track & Field Heats", video: false },
  { src: g4, cat: "Culture" as const, title: "Dance Recital · Encore", video: false },
];

function GalleryPage() {
  const [cat, setCat] = useState<Cat>("All");
  const [open, setOpen] = useState<number | null>(null);

  const filtered = useMemo(() => items.filter((i) => cat === "All" || i.cat === cat), [cat]);

  return (
    <>
      <PageHeader
        eyebrow="The archive"
        title={<>Through <em className="italic text-muted-foreground">our</em> lens</>}
        description="A growing visual record of school life — every event, every season, every face."
      />

      <section className="container-page py-12">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-xs transition ${
                cat === c
                  ? "bg-foreground text-background border-foreground"
                  : "border-border hover:border-foreground/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry via CSS columns */}
        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {filtered.map((it, i) => (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className="mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl group relative text-left"
            >
              <img
                src={it.src} alt={it.title} loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-primary-foreground">
                <span className="text-[10px] uppercase tracking-[0.22em] text-gold">{it.cat}</span>
                <span className="mt-1 font-display text-xl">{it.title}</span>
              </div>
              {it.video && (
                <span className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-gold-foreground">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {open !== null && (
        <div
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur p-4"
        >
          <button
            aria-label="Close"
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
          <img
            src={filtered[open].src}
            alt={filtered[open].title}
            className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain"
          />
        </div>
      )}
    </>
  );
}
