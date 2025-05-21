"use client";

import { Toaster as Sonner } from "sonner";
import { toast } from "sonner";

export type ToastFn = typeof toast;

export { toast };

type ToasterProps = React.ComponentProps<typeof Sonner>;
export function ToasterSonner({ ...props }: ToasterProps) {
  return (
    <Sonner
      // FIXME:
      theme={"system" as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}
