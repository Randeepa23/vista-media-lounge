import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Camera } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/announcements", label: "Announcements" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/team", label: "Team" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-[8deg]">
            <Camera className="h-4 w-4" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg">Good Shepherd</span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Media Club
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((item) => {
            const active = path === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm transition-colors ink-link ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {active && (
                  <span className="ml-1.5 inline-block h-1 w-1 rounded-full bg-gold align-middle" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/contact" className="btn-gold !py-2 !px-5 text-xs">
            Join the Club
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <nav className="container-page flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="py-3 text-base text-foreground/90 border-b border-border/40 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-gold mt-4 self-start">
              Join the Club
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
