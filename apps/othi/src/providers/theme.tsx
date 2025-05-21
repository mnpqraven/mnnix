import { type Theme, setThemeServerFn } from "@/lib/theme";
import { useRouter } from "@tanstack/react-router";
import { type PropsWithChildren, createContext, use, useState } from "react";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  initialTheme = "system",
}: PropsWithChildren<{ initialTheme?: Theme }>) {
  const [theme, setCurrentTheme] = useState<Theme>(initialTheme);
  const router = useRouter();

  const setTheme = async (theme: Theme) => {
    await setThemeServerFn({ data: theme });
    setCurrentTheme(theme);
    router.invalidate();
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = use(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
