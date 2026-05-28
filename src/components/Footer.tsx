import { Link } from "@tanstack/react-router";
import { Camera, Instagram, Youtube, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-gold-foreground">
                <Camera className="h-4 w-4" />
              </span>
              <span className="font-display text-2xl">Good Shepherd Convent Media Club</span>
            </div>
            <p className="mt-5 max-w-md text-sm text-primary-foreground/70 leading-relaxed">
              Telling our school's story in pictures, words and sound — the official
              media platform of Good Shepherd Convent.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Youtube, Facebook, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 hover:border-gold hover:text-gold transition-colors"
                  aria-label="social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.22em] text-gold">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { to: "/announcements", l: "Announcements" },
                { to: "/events", l: "Events" },
                { to: "/gallery", l: "Gallery" },
                { to: "/team", l: "Our Team" },
              ].map((i) => (
                <li key={i.to}>
                  <Link to={i.to} className="text-primary-foreground/80 hover:text-gold ink-link">
                    {i.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.22em] text-gold">Newsletter</h4>
            <p className="mt-5 text-sm text-primary-foreground/70">
              Get the weekly digest of campus news, events and featured stories.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex overflow-hidden rounded-full border border-primary-foreground/25 bg-primary-foreground/5"
            >
              <input
                type="email"
                required
                placeholder="you@school.edu"
                className="flex-1 bg-transparent px-4 py-3 text-sm placeholder:text-primary-foreground/40 focus:outline-none"
              />
              <button className="bg-gold px-5 text-sm font-medium text-gold-foreground hover:brightness-105">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-primary-foreground/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} Good Shepherd Convent Media Club. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/60">
            Crafted with care by students, for the school community.
          </p>
        </div>
      </div>
    </footer>
  );
}
