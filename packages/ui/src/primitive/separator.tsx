"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@repo/lib";
import type * as React from "react";

const Separator = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentPropsWithRef<typeof SeparatorPrimitive.Root>) => (
  <SeparatorPrimitive.Root
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className,
    )}
    decorative={decorative}
    orientation={orientation}
    {...props}
  />
);

export { Separator };
