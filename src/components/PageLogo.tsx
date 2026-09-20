"use client";

import { Lang } from "@/data/profile";
import { useLanguage, useTheme } from "./ClientLayout";
import {
  ProjectsEnLogo,
  ProjectsFrLogo,
  CurriculumVitaeLogo,
  ContactLogo,
} from "./TitleSVGs";

type LogoType = "works" | "projects" | "cv" | "contact";

interface PageLogoProps {
  type: LogoType;
  lang?: Lang;
  className?: string;
}

export default function PageLogo({ type, lang: propLang, className = "" }: PageLogoProps) {
  let contextLang: Lang = "en";
  try {
    const ctx = useLanguage();
    if (ctx && ctx.lang) {
      contextLang = ctx.lang;
    }
  } catch {
    // Fallback if rendered outside ClientLayout
  }

  let isDark = false;
  try {
    const themeCtx = useTheme();
    if (themeCtx && themeCtx.theme === "dark") {
      isDark = true;
    }
  } catch {
    // Fallback if rendered outside ThemeContext
  }

  const lang = propLang ?? contextLang;

  const renderLogo = () => {
    if (type === "works" || type === "projects") {
      return lang === "fr" ? (
        <ProjectsFrLogo className="h-full w-auto max-w-full" />
      ) : (
        <ProjectsEnLogo className="h-full w-auto max-w-full" />
      );
    }
    if (type === "cv") {
      return <CurriculumVitaeLogo className="h-full w-auto max-w-full" />;
    }
    if (type === "contact") {
      return <ContactLogo className="h-full w-auto max-w-full" />;
    }
    return null;
  };

  return (
    <div
      className={`relative flex items-center max-w-full title-svg-logo transition-colors duration-200 ${
        isDark ? "text-white" : "text-ink"
      } dark:text-white ${className}`}
      style={{
        height: "clamp(36px, 5.2vw, 58px)",
        color: isDark ? "#ffffff" : "#1a1a1a",
      }}
    >
      {renderLogo()}
    </div>
  );
}
