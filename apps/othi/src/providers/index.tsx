import type { rootLoader } from "@/routes/__root";
import { ToasterSonner } from "@repo/ui/primitive/sonner";
import { TooltipProvider } from "@repo/ui/primitive/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Provider as JotaiProvider } from "jotai";
import type { PropsWithChildren, ReactNode } from "react";
import { TANSTACK_OPTIONS } from "./query";
import { ThemeProvider } from "./theme";

export const queryClient = new QueryClient(TANSTACK_OPTIONS());

export function ProviderNoDOM({ children }: { children: Readonly<ReactNode> }) {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}

export function ProviderDOM({
  children,
  loaded,
}: PropsWithChildren<{
  loaded: Awaited<ReturnType<typeof rootLoader>>;
}>) {
  const { theme } = loaded;
  return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>;
}
