import { Megaphone } from "lucide-react";

const items = [
  "🏆 Inter-school Debate — 1st Place at St. Joseph's Cup",
  "📷 Annual Photo Walk this Saturday, 8 AM",
  "🎬 Submissions open for the Short Film Festival",
  "📰 New issue of The Shepherd Gazette out now",
  "🎤 Open Mic Night — Auditorium, Friday 5 PM",
  "🥇 Sports Day coverage team — sign-ups close Thursday",
];

export function Ticker() {
  const row = [...items, ...items];
  return (
    <div className="border-y border-border/70 bg-primary text-primary-foreground">
      <div className="flex items-center gap-6 py-3 overflow-hidden">
        <span className="ml-5 flex shrink-0 items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold">
          <Megaphone className="h-3.5 w-3.5" /> Live
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div
            className="flex gap-12 whitespace-nowrap text-sm"
            style={{ animation: "var(--animate-marquee)" }}
          >
            {row.map((t, i) => (
              <span key={i} className="text-primary-foreground/90">
                <span className="mr-12 text-gold">✦</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
