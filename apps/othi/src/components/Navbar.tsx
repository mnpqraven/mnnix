import { useViewportInfo } from "@/lib/hooks/useViewportInfo";
import { cn } from "@repo/lib";
import { Link } from "@tanstack/react-router";
import type { ComponentPropsWithRef } from "react";
import { ThemeToggle } from "./ThemeToggle";

const routes = ["/", "/sudo", "/whoami", "/blog"] as const;

export function Navbar({ className, ...props }: ComponentPropsWithRef<"div">) {
  const { isScrolled } = useViewportInfo();

  return (
    <div
      className={cn(
        "sticky top-0 z-50 flex items-center justify-between gap-2 border-b px-4 py-1",
        isScrolled ? "bg-background/50 backdrop-blur-md" : "bg-background",
        className,
      )}
      {...props}
    >
      <div className="flex gap-2 font-bold font-mono text-2xl">
        {routes.map((route) => (
          <Link key={route} to={route}>
            {route.toUpperCase()}
          </Link>
        ))}
      </div>
      <ThemeToggle />
    </div>
  );
}
