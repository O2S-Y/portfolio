"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Lang } from "@/data/profile";
import { translations } from "@/data/translations";
import { Theme } from "./ClientLayout";

interface LangToggleProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  className?: string;
}

function LangToggle({ lang, setLang, className = "" }: LangToggleProps) {
  return (
    <div
      className={`flex items-center gap-1 text-[16px] font-medium touch-manipulation select-none ${className}`}
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-2 py-2 min-h-[44px] min-w-[36px] flex items-center justify-center transition-colors cursor-pointer touch-manipulation ${
          lang === "en" ? "text-ink font-semibold" : "text-muted hover:text-ink"
        }`}
      >
        EN
      </button>
      <span className="text-muted select-none pointer-events-none">|</span>
      <button
        type="button"
        onClick={() => setLang("fr")}
        aria-pressed={lang === "fr"}
        className={`px-2 py-2 min-h-[44px] min-w-[36px] flex items-center justify-center transition-colors cursor-pointer touch-manipulation ${
          lang === "fr" ? "text-ink font-semibold" : "text-muted hover:text-ink"
        }`}
      >
        FR
      </button>
    </div>
  );
}

interface ThemeToggleProps {
  theme?: Theme;
  setTheme?: (t: Theme) => void;
  className?: string;
}

function LampIcon({ isOn, className = "", size = 20 }: { isOn: boolean; className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-all duration-200 ${className}`}
      aria-hidden="true"
    >
      {/* Edison glass bulb outer contour */}
      <path
        d="M9 16C7.2 14.7 6 12.5 6 10C6 6.68629 8.68629 4 12 4C15.3137 4 18 6.68629 18 10C18 12.5 16.8 14.7 15 16"
        fill={isOn ? "currentColor" : "none"}
        fillOpacity={isOn ? "0.15" : "0"}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* Edison filament */}
      <path
        d="M10 12L11 8L13 8L14 12"
        stroke="currentColor"
        strokeWidth={isOn ? "1.4" : "1.1"}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={isOn ? "1" : "0.5"}
      />
      {/* Screw base threads */}
      <path
        d="M9.5 16H14.5M9.5 18H14.5M10.5 20H13.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* Filament glow aura & rays when lit */}
      {isOn && (
        <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.9">
          <line x1="12" y1="1.5" x2="12" y2="2.5" />
          <line x1="4" y1="4.5" x2="4.8" y2="5.3" />
          <line x1="20" y1="4.5" x2="19.2" y2="5.3" />
          <line x1="2.5" y1="10" x2="3.5" y2="10" />
          <line x1="21.5" y1="10" x2="20.5" y2="10" />
        </g>
      )}
    </svg>
  );
}

export function ThemeToggle({ theme = "light", setTheme, className = "" }: ThemeToggleProps) {
  if (!setTheme) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex items-center justify-center min-h-[44px] min-w-[36px] px-1 text-muted hover:text-ink transition-colors cursor-pointer touch-manipulation select-none ${className}`}
    >
      <LampIcon isOn={isDark} />
      <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
    </button>
  );
}

export function StickyThemeToggle({ theme = "light", setTheme }: ThemeToggleProps) {
  if (!setTheme) return null;

  const isDark = theme === "dark";

  return (
    <div
      className="fixed z-50 pointer-events-auto"
      style={{
        bottom: "max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem))",
        right: "max(1.5rem, calc(env(safe-area-inset-right, 0px) + 1.25rem))",
      }}
    >
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        onTouchEnd={(e) => {
          e.preventDefault();
          setTheme(isDark ? "light" : "dark");
        }}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-hair bg-paper text-muted hover:text-ink transition-colors cursor-pointer touch-manipulation select-none active:scale-95"
      >
        <LampIcon isOn={isDark} size={18} />
        <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
      </button>
    </div>
  );
}

export default function Header({
  lang,
  setLang,
  theme,
  setTheme,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme?: Theme;
  setTheme?: (t: Theme) => void;
}) {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;

    const updateScroll = () => {
      const currentY = typeof window !== "undefined" ? (window.scrollY || document.documentElement.scrollTop || 0) : 0;

      // When near top (or negative due to iOS bounce), always show
      if (currentY <= 15) {
        setHidden(false);
        lastY = Math.max(0, currentY);
        ticking = false;
        return;
      }

      // Check for bottom rubber band bounce
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (currentY + windowHeight >= docHeight - 20) {
        ticking = false;
        return;
      }

      const diff = currentY - lastY;
      // Require at least a 10px scroll difference to avoid mobile jitter/chrome resize triggering hide
      if (Math.abs(diff) >= 10) {
        if (diff > 0 && currentY > 70) {
          setHidden(true);
        } else if (diff < 0) {
          setHidden(false);
        }
        lastY = currentY;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      setHidden(false); // Never hide header while menu is open
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isHome = pathname === "/";
  const isWorks = pathname.startsWith("/works");
  const isCv = pathname.startsWith("/cv");
  const isContact = pathname.startsWith("/contact");

  const navItems = [
    { href: "/works", label: translations[lang].works, active: isWorks },
    { href: "/cv", label: translations[lang].cv, active: isCv },
    { href: "/contact", label: translations[lang].contact, active: isContact },
  ];

  return (
    <header
      className={`sticky top-0 z-30 bg-paper/85 backdrop-blur-sm transition-transform duration-300 ease-out ${
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-[71px] max-w-[1440px] items-center justify-between px-6 sm:px-[55px]">
        <Link
          href="/"
          aria-label="Oussama Yinssi"
          className={`block w-[130px] transition-opacity hover:opacity-70 sm:w-[159px] text-ink dark:text-white ${
            isHome ? "sm:invisible" : ""
          }`}
        >
          <Logo />
        </Link>

        {/* Desktop nav: Language toggle, then nav items */}
        <nav className="hidden items-center gap-8 sm:flex sm:gap-10">
          <LangToggle lang={lang} setLang={setLang} />
          <ul className="flex items-center gap-6 text-[16px] font-medium leading-[20.8px]">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition-colors ${
                    item.active ? "text-ink" : "link-underline text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile top action bar: Hamburger */}
        <div className="flex items-center sm:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative z-30 flex h-11 w-11 items-center justify-center cursor-pointer touch-manipulation -mr-2"
          >
            <div className="flex flex-col items-center justify-center gap-[6px] w-6">
              <span
                className={`block h-px w-6 bg-ink transition-transform duration-300 pointer-events-none ${
                  menuOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-ink transition-transform duration-300 pointer-events-none ${
                  menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden border-hair bg-paper transition-[max-height,opacity] duration-300 ease-out sm:hidden ${
          menuOpen
            ? "max-h-[80vh] border-t opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-2 px-6 py-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`py-2 text-left text-[32px] font-medium uppercase leading-[1.1] tracking-[0.01em] transition-colors touch-manipulation ${
                item.active ? "text-ink" : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 border-t border-hair pt-6 flex items-center justify-between">
            <LangToggle lang={lang} setLang={setLang} />
          </div>
        </nav>
      </div>
    </header>
  );
}
