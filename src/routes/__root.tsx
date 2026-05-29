import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow justify-center">Lost in the archive</p>
        <h1 className="mt-4 font-display text-7xl">404</h1>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for has been moved or never existed.
        </p>
        <Link to="/" className="btn-gold mt-8">Back to Home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page didn't load. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-gold"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost-ink">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Good Shepherd Convent Media Club" },
      { name: "description", content: "Official digital home of the Good Shepherd Convent Media Club — announcements, events, gallery and student journalism." },
      { property: "og:title", content: "Good Shepherd Convent Media Club" },
      { property: "og:description", content: "Official digital home of the Good Shepherd Convent Media Club — announcements, events, gallery and student journalism." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Good Shepherd Convent Media Club" },
      { name: "twitter:description", content: "Official digital home of the Good Shepherd Convent Media Club — announcements, events, gallery and student journalism." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f5efa2bc-48c2-4aec-a05a-c2a5d65e7f35/id-preview-1e306c41--fa2afad7-9efc-4158-88be-8cfd48857460.lovable.app-1779975709077.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f5efa2bc-48c2-4aec-a05a-c2a5d65e7f35/id-preview-1e306c41--fa2afad7-9efc-4158-88be-8cfd48857460.lovable.app-1779975709077.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
