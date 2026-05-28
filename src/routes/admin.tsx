import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard, Megaphone, Calendar, Image as ImageIcon, Users,
  BarChart3, Settings, Bell, Search, Plus, TrendingUp, Eye, Heart, MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Good Shepherd Media Club" },
      { name: "description", content: "Concept admin dashboard for managing announcements, events, gallery and members." },
    ],
  }),
  component: AdminPage,
});

const sidebar = [
  { i: LayoutDashboard, l: "Overview", active: true },
  { i: Megaphone, l: "Announcements" },
  { i: Calendar, l: "Events" },
  { i: ImageIcon, l: "Gallery" },
  { i: Users, l: "Members" },
  { i: BarChart3, l: "Analytics" },
  { i: Settings, l: "Settings" },
];

const activity = [
  { who: "Ananya R.", what: "published 'Winter Issue is live'", when: "2m ago" },
  { who: "Kabir M.", what: "uploaded 14 photos to Sports Day", when: "1h ago" },
  { who: "Maya S.", what: "scheduled 'Short Film Premiere'", when: "3h ago" },
  { who: "Rohan I.", what: "approved 3 photo submissions", when: "Yesterday" },
  { who: "Sara K.", what: "edited 'Heritage Walk' draft", when: "Yesterday" },
];

function AdminPage() {
  return (
    <div className="min-h-screen bg-secondary/40">
      <div className="container-page py-10">
        <div className="mb-6 flex items-center justify-between">
          <p className="eyebrow">Concept · Internal</p>
          <Link to="/" className="text-xs text-muted-foreground ink-link">← Back to site</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bento-card p-5 sticky top-24">
              <div className="px-2 pb-4 mb-2 border-b border-border/60">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Admin</p>
                <p className="mt-1 font-display text-xl">Media Newsroom</p>
              </div>
              <nav className="space-y-1">
                {sidebar.map((s) => (
                  <a key={s.l} href="#"
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      s.active
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/80 hover:bg-secondary"
                    }`}>
                    <s.i className="h-4 w-4" /> {s.l}
                  </a>
                ))}
              </nav>
              <div className="mt-6 rounded-xl bg-gold/10 border border-gold/30 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-gold">Storage</p>
                <p className="mt-2 font-display text-lg">12.4 / 50 GB</p>
                <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-gold" style={{ width: "25%" }} />
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="lg:col-span-9 space-y-6">
            {/* Topbar */}
            <div className="bento-card p-4 flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input placeholder="Search posts, events, members..."
                  className="w-full rounded-full bg-secondary pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40" />
              </div>
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-secondary">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
              </button>
              <button className="btn-gold !py-2 !px-4 text-xs"><Plus className="h-3.5 w-3.5" /> New post</button>
            </div>

            {/* KPI tiles */}
            <div className="grid gap-5 md:grid-cols-4">
              {[
                { i: Eye, l: "Page views", v: "48.2k", d: "+12.4%", up: true },
                { i: Heart, l: "Engagement", v: "9,310", d: "+4.1%", up: true },
                { i: Megaphone, l: "Posts this month", v: "32", d: "+8", up: true },
                { i: MessageSquare, l: "Inbox", v: "14", d: "3 unread" },
              ].map((k) => (
                <div key={k.l} className="bento-card p-5">
                  <div className="flex items-center justify-between">
                    <k.i className="h-5 w-5 text-gold" />
                    <span className={`text-[10px] uppercase tracking-widest ${k.up ? "text-green-600" : "text-muted-foreground"}`}>
                      {k.d}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-3xl">{k.v}</p>
                  <p className="text-xs text-muted-foreground mt-1">{k.l}</p>
                </div>
              ))}
            </div>

            {/* Chart + Notifications */}
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="bento-card p-6 lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="eyebrow">Last 7 days</p>
                    <h3 className="mt-2 font-display text-2xl">Engagement overview</h3>
                  </div>
                  <span className="chip"><TrendingUp className="h-3 w-3" /> +12%</span>
                </div>
                <BarChart />
              </div>

              <div className="bento-card p-6">
                <p className="eyebrow">Notifications</p>
                <ul className="mt-5 space-y-4">
                  {[
                    "Photo submission from Aarav awaiting approval",
                    "3 new newsletter subscriptions today",
                    "Event 'Open Mic' published successfully",
                    "Storage at 25% — plenty of room",
                  ].map((n, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                      <span className="text-foreground/85">{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Activity */}
            <div className="bento-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl">Recent activity</h3>
                <a href="#" className="text-xs ink-link text-muted-foreground">View all</a>
              </div>
              <ul className="mt-5 divide-y divide-border">
                {activity.map((a, i) => (
                  <li key={i} className="flex items-center justify-between gap-4 py-3.5 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-display text-sm">
                        {a.who.split(" ").map(w => w[0]).join("")}
                      </span>
                      <span><span className="font-medium">{a.who}</span> <span className="text-muted-foreground">{a.what}</span></span>
                    </div>
                    <span className="text-xs text-muted-foreground">{a.when}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BarChart() {
  const bars = [42, 65, 38, 80, 56, 92, 70];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div>
      <div className="flex items-end gap-3 h-48">
        {bars.map((b, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full rounded-t-lg bg-gradient-to-t from-primary to-gold transition-all hover:opacity-90"
              style={{ height: `${b}%` }} />
            <span className="text-[10px] text-muted-foreground">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
