// app/routes/__root.tsx
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../styles/app.css?url";
import { getThemeServerFn } from "@/lib/theme";
import { ProviderDOM } from "@/providers";
import { Navbar } from "@/components/Navbar";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToasterSonner } from "@repo/ui/primitive/sonner";
import { useTheme } from "@/providers/theme";

export async function rootLoader() {
  const theme = await getThemeServerFn();
  return { theme };
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TanStack Start Starter" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
  loader: rootLoader,
});

function RootComponent() {
  const loaded = Route.useLoaderData();
  return (
    <ProviderDOM loaded={loaded}>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ProviderDOM>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { theme } = useTheme();
  return (
    <html lang="en" className={theme}>
      <head>
        <HeadContent />
      </head>
      <body>
        <Navbar />
        <main className="flex flex-col">{children}</main>

        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <ToasterSonner />
        <Scripts />
      </body>
    </html>
  );
}
