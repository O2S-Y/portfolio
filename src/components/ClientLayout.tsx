"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Lang } from "@/data/profile";
import Header, { StickyThemeToggle } from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export type Theme = "light" | "dark";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
});

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

export const useLanguage = () => useContext(LanguageContext);
export const useTheme = () => useContext(ThemeContext);

function getStoredLang(): Lang | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const saved = window.localStorage.getItem("oy_lang");
      if (saved === "en" || saved === "fr") return saved;
    }
  } catch {
    // Ignore Storage access denial in private browsing or embedded webviews
  }
  return null;
}

function setStoredLang(lang: Lang) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("oy_lang", lang);
    }
  } catch {
    // Ignore write failures
  }
}

function getStoredTheme(): Theme | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const saved = window.localStorage.getItem("oy_theme");
      if (saved === "light" || saved === "dark") return saved;
    }
  } catch {
    // Ignore Storage access denial
  }
  return null;
}

function setStoredTheme(theme: Theme) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("oy_theme", theme);
    }
  } catch {
    // Ignore write failures
  }
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const savedLang = getStoredLang();
    if (savedLang) {
      setLang(savedLang);
    }

    const isHtmlDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
    const savedTheme = getStoredTheme();
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (isHtmlDark) {
      setTheme("dark");
    } else if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const handleSetLang = (newLang: Lang) => {
    setLang(newLang);
    setStoredLang(newLang);
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setStoredTheme(newTheme);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      document.documentElement.setAttribute("data-theme", newTheme);
      document.documentElement.style.colorScheme = newTheme;
    }
  };

  const toggleTheme = () => {
    handleSetTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, toggleTheme }}>
      <LanguageContext.Provider value={{ lang, setLang: handleSetLang }}>
        <div className="min-h-screen bg-paper text-ink flex flex-col justify-between transition-colors duration-200">
          <Header
            lang={lang}
            setLang={handleSetLang}
            theme={theme}
            setTheme={handleSetTheme}
          />
          <div className="flex-1">{children}</div>
          {!isHome && <Footer lang={lang} />}
          <StickyThemeToggle theme={theme} setTheme={handleSetTheme} />
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
