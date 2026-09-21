import { useEffect, useState } from "react";
import {
  ProjectsEnLogo,
  ProjectsFrLogo,
  CurriculumVitaeLogo,
  ContactLogo,
} from "@/components/TitleSVGs";
import Logo from "@/components/Logo";
import { getProjectDetails, worksData, WorkEvent, YearRow as WorksYearRow } from "@/data/works";
import { interestsData, getLocalizedCvRows } from "@/data/cv";

type Lang = "en" | "fr";
type Page = "home" | "cv" | "contact" | "works" | "project";

type Event = WorkEvent & {
  venueFr?: string;
  locationFr?: string;
};

type WorkEntry = { year: string; event: Event };

type YearRow = {
  year: string;
  events: Event[];
};

const introParagraphs: Record<Lang, string[]> = {
  en: [
    "Computer Engineering graduate currently pursuing a Master's in Data Science & Intelligent Systems at Faculty of Sciences and Technologies of Fez; focused on AI, big data, and how intelligent systems are actually built under the hood.",
    "I care less about using a tool and more about understanding why it works: what problem it was built to solve, what breaks it, and what it's quietly trading off. That's what pulls me toward systems and AI over just shipping features that work.",
    "Outside of coursework, I like to explore beyond my main focus; dipping into cybersecurity fundamentals to understand how systems get broken as well as built, designing app and website interfaces in Figma just to see problems from the user's side, and testing out new tools and technologies as they come out, mostly out of curiosity about how they actually work. I'm also a science lover in general, not just computer science — mathematics, physics, whatever pulls me in, I like understanding how things work at their core. Take a look at my projects, or get in touch if you'd like to talk",
  ],
  fr: [
    "Diplômé en Génie Informatique, poursuivant actuellement un Master en Data Science & Systèmes Intelligents à la Faculté des Sciences et Techniques de Fès; orienté vers l'IA, le big data, et la manière dont les systèmes intelligents sont réellement conçus en profondeur.",
    "Ce qui m'intéresse, ce n'est pas simplement d'utiliser un outil, mais de comprendre pourquoi il fonctionne : quel problème il résout réellement, ce qui peut le faire échouer, et quels compromis il fait silencieusement. C'est ce qui m'attire vers les systèmes et l'IA, au-delà de la simple livraison de fonctionnalités qui marchent.",
    "En dehors des cours, j'aime explorer au-delà de mon domaine principal; m'initier aux bases de la cybersécurité pour comprendre comment les systèmes se cassent autant que comment ils se construisent, concevoir des interfaces d'applications et de sites web sur Figma pour voir les problèmes du point de vue de l'utilisateur, et tester de nouveaux outils et technologies dès leur sortie, surtout par curiosité de comprendre comment ils fonctionnent. Je suis aussi passionné de sciences en général, pas seulement d'informatique — mathématiques, physique, tout ce qui m'intéresse, j'aime comprendre le fonctionnement des choses en profondeur. Découvrez mes projets, ou contactez-moi si vous souhaitez échanger.",
  ],
};

const t: Record<Lang, Record<string, string>> = {
  en: {
    subtitle: "Data Science & AI",
    pdf: "PDF DOWNLOAD",
    awards: "Awards",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    solo: "Experience",
    group: "Education",
    works: "PROJECTS",
    projects: "PROJECTS",
    worksLead: "Selected works spanning long-form projects and exhibitions.",
    selectedWorks: "Selected Works",
    project: "PROJECT",
    github: "View on GitHub",
    demo: "Live Demo",
    cv: "CV",
    contact: "CONTACT",
    home: "HOME",
    contactLead: "For project inquiries, media requests, or other messages, please contact me here.",
    contactSpam: "If you do not receive a reply, please check your spam folder.",
    tagline1: "Designing robust distributed systems and modern web architectures.",
    tagline2: "Software craftsmanship centered on scalability and performance.",
    contextSection: "Context",
    featuresSection: "Features",
    technologiesSection: "Technologies",
    whatILearnedSection: "What I Learned",
    periodLabel: "Period",
    roleLabel: "Role",
    collaborationLabel: "Collaboration",
    affiliationLabel: "Affiliation",
    structureLabel: "Structure",
    objectiveLabel: "Objective",
    allProjects: "All Projects",
    prevProject: "Previous",
    nextProject: "Next",
    phoneLabel: "Phone",
    locationLabel: "Location",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    submitLabel: "SEND MESSAGE",
    sendingLabel: "SENDING...",
    successMessage: "Thank you. Your message has been sent.",
    errorMessage: "Something went wrong. Please try again or email directly.",
    nameRequired: "Name is required.",
    emailRequired: "Email is required.",
    emailInvalid: "Please enter a valid email address.",
    messageRequired: "Message is required.",
    messageMin: "Message must be at least 10 characters.",
    messageMax: "Message cannot exceed 1000 characters.",
    fixErrors: "Please fill out all required fields properly.",
    contactInfoHeading: "Contact Information",
    contactFormHeading: "Send a Message",
    backToProjects: "Back to Projects",
    interests: "Interests",
  },
  fr: {
    subtitle: "Science des Données & IA",
    pdf: "TÉLÉCHARGER LE PDF",
    awards: "Prix & Distinctions",
    experience: "Expérience",
    education: "Formation",
    skills: "Compétences",
    solo: "Expérience",
    group: "Formation",
    works: "PROJETS",
    projects: "PROJETS",
    worksLead: "Une sélection de travaux, entre projets au long cours et expositions.",
    selectedWorks: "Travaux choisis",
    project: "PROJET",
    github: "Voir sur GitHub",
    demo: "Démo en ligne",
    cv: "CV",
    contact: "CONTACT",
    home: "ACCUEIL",
    contactLead: "Pour toute demande de projet, sollicitation média ou autre message, contactez-moi ici.",
    contactSpam: "Si vous ne recevez pas de réponse, veuillez vérifier votre dossier spam.",
    tagline1: "Conception de systèmes distribués robustes et d'architectures web modernes.",
    tagline2: "Artisanat logiciel centré sur l'évolutivité et la performance.",
    contextSection: "Contexte",
    featuresSection: "Fonctionnalités",
    technologiesSection: "Technologies",
    whatILearnedSection: "Ce que j'ai appris",
    periodLabel: "Période",
    roleLabel: "Rôle",
    collaborationLabel: "Collaboration",
    affiliationLabel: "Affiliation",
    structureLabel: "Structure",
    objectiveLabel: "Objectif",
    allProjects: "Tous les projets",
    prevProject: "Précédent",
    nextProject: "Suivant",
    phoneLabel: "Téléphone",
    locationLabel: "Localisation",
    nameLabel: "Nom",
    emailLabel: "Email",
    messageLabel: "Message",
    submitLabel: "ENVOYER LE MESSAGE",
    sendingLabel: "ENVOI EN COURS...",
    successMessage: "Merci. Votre message a bien été envoyé.",
    errorMessage: "Une erreur s'est produite. Veuillez réessayer ou envoyer un email directement.",
    nameRequired: "Le nom est requis.",
    emailRequired: "L'adresse email est requise.",
    emailInvalid: "Veuillez entrer une adresse email valide.",
    messageRequired: "Le message est requis.",
    messageMin: "Le message doit comporter au moins 10 caractères.",
    messageMax: "Le message ne peut pas dépasser 1000 caractères.",
    fixErrors: "Veuillez remplir correctement tous les champs requis.",
    contactInfoHeading: "Coordonnées",
    contactFormHeading: "Envoyer un message",
    backToProjects: "Retour aux projets",
    interests: "Centres d'intérêt",
  },
};

function localizeLocation(location: string | undefined, lang: Lang): string | undefined {
  if (!location || lang === "en") return location;
  return location.replace(/Fez, Morocco/g, "Fès, Maroc").replace(/Taza, Morocco/g, "Taza, Maroc");
}

function localizeCategory(category: string | undefined, lang: Lang): string | undefined {
  if (!category || lang === "en") return category;
  if (category === "Internship / Graduation Project (PFE)") return "Stage PFE / Projet de Fin d'Études";
  if (category === "University Project") return "Projet Universitaire";
  if (category === "Personal Project") return "Projet Personnel";
  if (category === "Hackathon") return "Hackathon";
  return category;
}


const awards: YearRow[] = [];

const experience: YearRow[] = [
  {
    year: "April – June 2026",
    events: [
      {
        title: "Graduation Project Intern, Full-Stack Developer — Built NewDEV RH",
        resultFr: "Stagiaire PFE, Développeur Full-Stack — Conception et développement de NewDEV RH",
        venue: "NewDEV Maroc",
        venueFr: "NewDEV Maroc",
        location: "Fez, Morocco",
        locationFr: "Fès, Maroc",
      },
    ],
  },
  {
    year: "Sept 2024 – Present",
    events: [
      {
        title: "Vice President",
        resultFr: "Vice-Président",
        venue: "LUCS Club, Faculty of Sciences and Technologies of Fez",
        venueFr: "Club LUCS, Faculté des Sciences et Techniques de Fès",
        location: "Fez, Morocco",
        locationFr: "Fès, Maroc",
      },
    ],
  },
];

const education: YearRow[] = [
  {
    year: "Sept 2026 – Present",
    events: [
      {
        title: "Master's, Data Science & Intelligent Systems (DSIS)",
        resultFr: "Master en Sciences de Données et Systèmes Intelligents (SDSI)",
        venue: "Faculty of Sciences and Technologies of Fez",
        venueFr: "Faculté des Sciences et Techniques de Fès",
        location: "Fez, Morocco",
        locationFr: "Fès, Maroc",
      },
    ],
  },
  {
    year: "Sept 2025 – June 2026",
    events: [
      {
        title: "Bachelor’s Degree in Science and Technology, specialising in Computer Engineering",
        resultFr: "Licence en Sciences et Techniques, Spécialité Génie Informatique (LST)",
        venue: "Faculty of Sciences and Technologies of Fez",
        venueFr: "Faculté des Sciences et Techniques de Fès",
        location: "Fez, Morocco",
        locationFr: "Fès, Maroc",
      },
    ],
  },
  {
    year: "Sept 2023 – June 2025",
    events: [
      {
        title: "University Diploma in Mathematics, Computer Science and Physics",
        resultFr: "DEUST en Mathématiques, Informatique et Physique (MIP)",
        venue: "Faculty of Sciences and Technologies of Fez",
        venueFr: "Faculté des Sciences et Techniques de Fès",
        location: "Fez, Morocco",
        locationFr: "Fès, Maroc",
      },
    ],
  },
  {
    year: "Sept 2022 – June 2023",
    events: [
      {
        title: "Baccalaureate in Physical Sciences (French Track)",
        resultFr: "Baccalauréat en Sciences Physiques (Option Français)",
        venue: "Omar Al Khayam High School",
        venueFr: "Lycée Omar Al Khayam",
        location: "Taza, Morocco",
        locationFr: "Taza, Maroc",
      },
    ],
  },
];

const skills: YearRow[] = [
  {
    year: "Programming Languages",
    events: [
      { title: "Java/J2EE, C, C++, JavaScript, SQL, NoSQL, PHP, HTML5/CSS3" },
    ],
  },
  {
    year: "Web Frameworks",
    events: [
      { title: "React, Spring Boot 3" },
    ],
  },
  {
    year: "Networks & Systems",
    events: [
      { title: "TCP/IP, Network Administration, Linux/Unix" },
    ],
  },
  {
    year: "Cybersecurity",
    events: [
      {
        title: "OSINT (Google Dorking, Shodan, Sherlock), reconnaissance and security monitoring",
        resultFr: "OSINT (Google Dorking, Shodan, Sherlock), reconnaissance et veille sécurité",
      },
    ],
  },
  {
    year: "Design",
    events: [
      { title: "UML, Merise, Figma (UI/UX)" },
    ],
  },
  {
    year: "Databases",
    events: [
      { title: "MySQL, MongoDB" },
    ],
  },
  {
    year: "Tools",
    events: [
      { title: "Git, GitHub, VS Code, IntelliJ IDEA" },
    ],
  },
  {
    year: "Languages",
    events: [
      { title: "Arabic, French, English", resultFr: "Arabe, Français, Anglais" },
    ],
  },
];

function getAppCvRows(rows: YearRow[], lang: Lang): YearRow[] {
  return rows.map((row) => {
    let year = row.year;
    if (lang === "fr") {
      year = year
        .replace(/April/g, "Avril")
        .replace(/June/g, "Juin")
        .replace(/Sept/g, "Sept")
        .replace(/Present/g, "Présent")
        .replace(/Programming Languages/g, "Langages de programmation")
        .replace(/Web Frameworks/g, "Frameworks Web")
        .replace(/Networks & Systems/g, "Réseaux & Systèmes")
        .replace(/Cybersecurity/g, "Cybersécurité")
        .replace(/Design/g, "Design & Conception")
        .replace(/Databases/g, "Bases de données")
        .replace(/Tools/g, "Outils")
        .replace(/^Languages$/g, "Langues");
    }
    return {
      year,
      events: row.events.map((e) => ({
        ...e,
        title: lang === "fr" && e.resultFr ? e.resultFr : e.title,
        venue: lang === "fr" ? (e.venueFr ?? e.venue) : e.venue,
        location: lang === "fr" ? (e.locationFr ?? e.location?.replace(/Fez, Morocco/g, "Fès, Maroc").replace(/Taza, Morocco/g, "Taza, Maroc")) : e.location,
      })),
    };
  });
}

const soloExhibitions = experience;
const groupExhibitions = education;

const works: YearRow[] = worksData as unknown as YearRow[];

const CV_PDF: Record<Lang, string> = {
  en: "/Cv_Master_EN.pdf",
  fr: "/Cv_Master_FR.pdf",
};

const EMAIL = "oussamayinssi@gmail.com";
const PHONE = "+212 (0)6 20 10 60 02";
const LOCATION: Record<Lang, string> = {
  en: "Fez, Morocco",
  fr: "Fès, Maroc",
};

const GITHUB = "https://github.com/O2S-Y";
const LINKEDIN = "https://www.linkedin.com/in/oussama-yinssi-328396228/";
const X_URL = "https://x.com/YinssiOussama";

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

function PageLogo({
  type,
  lang = "en",
  className = "",
}: {
  type: "works" | "projects" | "cv" | "contact";
  lang?: Lang;
  className?: string;
}) {
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
      className={`relative flex items-center max-w-full title-svg-logo text-ink dark:text-white transition-colors duration-200 ${className}`}
      style={{ height: "clamp(36px, 5.2vw, 58px)" }}
    >
      {renderLogo()}
    </div>
  );
}

type Theme = "light" | "dark";

interface AppLangToggleProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  className?: string;
}

function LangToggle({ lang, setLang, className = "" }: AppLangToggleProps) {
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

interface AppThemeToggleProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
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

function ThemeToggle({ theme, setTheme, className = "" }: AppThemeToggleProps) {
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

function StickyThemeToggle({ theme, setTheme }: AppThemeToggleProps) {
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

function Header({
  lang,
  setLang,
  page,
  setPage,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  page: Page;
  setPage: (p: Page) => void;
}) {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const navItems: { key: Page; label: string; active: boolean }[] = [
    { key: "works", label: t[lang].works, active: page === "works" || page === "project" },
    { key: "cv", label: t[lang].cv, active: page === "cv" },
    { key: "contact", label: t[lang].contact, active: page === "contact" },
  ];

  const go = (p: Page) => {
    setMenuOpen(false);
    setPage(p);
  };

  return (
    <header
      className={`sticky top-0 z-30 bg-paper/85 backdrop-blur-sm transition-transform duration-300 ease-out ${
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-[71px] max-w-[1440px] items-center justify-between px-6 sm:px-[55px]">
        <button
          type="button"
          onClick={() => go("home")}
          aria-label="Oussama Yinssi"
          className={`block w-[130px] transition-opacity hover:opacity-70 sm:w-[159px] cursor-pointer text-ink dark:text-white ${
            page === "home" ? "sm:invisible" : ""
          }`}
        >
          <Logo />
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 sm:flex sm:gap-10">
          <LangToggle lang={lang} setLang={setLang} />
          <ul className="flex items-center gap-6 text-[16px] font-medium leading-[20.8px]">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => go(item.key)}
                  className={`transition-colors cursor-pointer ${item.active ? "text-ink" : "link-underline text-muted hover:text-ink"}`}
                >
                  {item.label}
                </button>
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
            <button
              key={item.key}
              type="button"
              onClick={() => go(item.key)}
              className={`py-2 text-left text-[32px] font-medium uppercase leading-[1.1] tracking-[0.01em] transition-colors touch-manipulation cursor-pointer ${
                item.active ? "text-ink" : "text-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="mt-6 border-t border-hair pt-6 flex items-center justify-between">
            <LangToggle lang={lang} setLang={setLang} />
          </div>
        </nav>
      </div>
    </header>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="font-medium uppercase leading-none tracking-[0.02em] text-ink text-[clamp(22px,2.4vw,30px)]">
      {children}
    </h2>
  );
}

function EventLines({ event, showPlace, lang }: { event: Event; showPlace: boolean; lang: Lang }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <div className="flex-1 pr-0 sm:pr-[81px] text-[16px] leading-[20.8px] text-ink">
        {event.title}
      </div>
      {showPlace && !event.category && (
        <div className="flex flex-col gap-1 text-[16px] leading-[20.8px] text-ink sm:flex-row sm:items-start">
          <div className="w-full pr-6 sm:w-[300px]">{event.venue}</div>
          <div className="w-full sm:w-[210px]">{localizeLocation(event.location, lang)}</div>
        </div>
      )}
      {event.category && (
        <div className="w-full text-[14px] uppercase leading-[20.8px] tracking-[0.06em] text-muted sm:w-[210px]">
          {localizeCategory(event.category, lang)}
        </div>
      )}
    </div>
  );
}

function YearList({ rows, showPlace, lang }: { rows: YearRow[]; showPlace: boolean; lang: Lang }) {
  return (
    <dl className="w-full border-b border-hair">
      {rows.map((row) => (
        <div
          key={row.year + row.events[0].title}
          className="flex flex-col gap-4 border-t border-hair py-[22px] sm:flex-row sm:gap-0"
        >
          <dt className="shrink-0 pr-6 text-[16px] leading-[20.8px] text-ink sm:w-[224px]">
            {row.year}
          </dt>
          <dd className="m-0 flex flex-1 flex-col gap-[22px]">
            {row.events.map((event, i) => (
              <EventLines key={i} event={event} showPlace={showPlace} lang={lang} />
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Section({
  title,
  rows,
  showPlace,
  lang,
}: {
  title: string;
  rows: YearRow[];
  showPlace: boolean;
  lang: Lang;
}) {
  return (
    <section className="mx-auto flex w-full max-w-[1327px] flex-col gap-10 sm:gap-14">
      <Reveal>
        <SectionHeading>{title}</SectionHeading>
      </Reveal>
      <Reveal delay={80}>
        <YearList rows={rows} showPlace={showPlace} lang={lang} />
      </Reveal>
    </section>
  );
}

function HomePage({ lang }: { lang: Lang }) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-71px)] max-w-[1440px] flex-col justify-end px-6 pb-6 sm:px-[55px]">
      <Reveal className="mb-6">
        <p className="text-[16px] leading-[26.4px] text-ink">{t[lang].tagline1}</p>
        <p className="text-[16px] leading-[26.4px] text-ink">{t[lang].tagline2}</p>
      </Reveal>
      <Reveal delay={120}>
        <Logo />
      </Reveal>
    </main>
  );
}

function localizeResult(event: Event | WorkEvent, lang: Lang): string | undefined {
  return lang === "fr" ? event.resultFr ?? event.result : event.result;
}

function WorksList({
  rows,
  lang,
  onOpen,
}: {
  rows: YearRow[];
  lang: Lang;
  onOpen: (entry: WorkEntry) => void;
}) {
  const entries = rows.flatMap((row) => row.events.map((event) => ({ year: row.year, event })));
  return (
    <ul className="w-full border-b border-hair">
      {entries.map((entry, i) => (
        <li
          key={i}
          className="flex flex-col gap-4 border-t border-hair py-[22px] sm:flex-row sm:items-start sm:gap-0"
        >
          <span className="shrink-0 pr-6 text-[16px] leading-[20.8px] text-ink sm:w-[150px]">
            {entry.year}
          </span>
          {entry.event.thumbnail ? (
            <button
              type="button"
              onClick={() => onOpen(entry)}
              className="relative h-[104px] w-[152px] shrink-0 overflow-hidden rounded-[2px] border border-hair transition-opacity hover:opacity-85 sm:mr-8 cursor-pointer text-left"
            >
              <img
                src={entry.event.thumbnail.light}
                alt={entry.event.title}
                className="h-full w-full object-cover block dark:hidden"
              />
              <img
                src={entry.event.thumbnail.dark}
                alt={entry.event.title}
                className="h-full w-full object-cover hidden dark:block"
              />
            </button>
          ) : null}
          <div className="flex flex-1 flex-col gap-[6px] pr-0 sm:pr-8">
            <button
              type="button"
              onClick={() => onOpen(entry)}
              className="link-underline self-start text-left text-[16px] font-medium uppercase leading-[20.8px] tracking-[0.02em] text-ink transition-opacity hover:opacity-70"
            >
              {entry.event.title}
            </button>
            <span className="text-[14px] uppercase leading-[16px] tracking-[0.14px] text-muted">
              {localizeCategory(entry.event.category, lang)}
            </span>
          </div>
          <div className="text-[16px] leading-[20.8px] text-muted sm:w-[300px]">
            {localizeResult(entry.event, lang)}
          </div>
        </li>
      ))}
    </ul>
  );
}

function WorksPage({ lang, onOpen }: { lang: Lang; onOpen: (entry: WorkEntry) => void }) {
  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-24 px-6 pb-6 pt-40 sm:gap-32 sm:px-[55px] sm:pt-[300px]">
      {/* Intro */}
      <section className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_540px] lg:items-start">
        <Reveal>
          <PageLogo type="works" lang={lang} />
        </Reveal>
      </section>

      <section className="mx-auto flex w-full max-w-[1327px] flex-col gap-10 sm:gap-14">
        <Reveal>
          <WorksList rows={works} lang={lang} onOpen={onOpen} />
        </Reveal>
      </section>
    </main>
  );
}

function ProjectPage({
  entry,
  lang,
  onBack,
  onSelectProject,
}: {
  entry: WorkEntry;
  lang: Lang;
  onBack: () => void;
  onSelectProject?: (entry: WorkEntry) => void;
}) {
  const allEntries = works.flatMap((row) =>
    row.events.map((event) => ({ year: row.year, event }))
  );
  const currentIndex = allEntries.findIndex((e) => e.event.title === entry.event.title);
  const prevEntry = currentIndex > 0 ? allEntries[currentIndex - 1] : null;
  const nextEntry = currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null;

  const details = getProjectDetails(entry.event, entry.year, lang);

  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-20 px-6 pb-12 pt-36 sm:gap-24 sm:px-[55px] sm:pt-[240px]">

      {/* Header Block */}
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_540px] lg:items-start">
        <Reveal>
          <p className="mb-3 text-[14px] uppercase leading-[16px] tracking-[0.14px] text-muted">
            {t[lang].project} · {entry.year}
          </p>
          <h1 className="font-medium uppercase leading-[1.05] tracking-[0.01em] text-ink text-[clamp(34px,4.4vw,56px)]">
            {entry.event.title}
          </h1>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-6 lg:mt-[32px]">
          <p className="text-[17px] leading-[28px] text-ink">
            {localizeResult(entry.event, lang)}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-[15px] font-medium leading-[20px] tracking-[0.02em]">
            {entry.event.github && (
              <a
                href={entry.event.github}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-ink hover:text-muted transition-colors"
              >
                {t[lang].github}
              </a>
            )}
            {entry.event.demo && (
              <a
                href={entry.event.demo}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-ink hover:text-muted transition-colors"
              >
                {t[lang].demo}
              </a>
            )}
          </div>
        </Reveal>
      </section>

      {/* 3. Main Hero Image Block */}
      <Reveal delay={80}>
        {entry.event.hero ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2px] border border-hair">
            {entry.event.hero.light === entry.event.hero.dark ? (
              <img
                src={entry.event.hero.light}
                alt={entry.event.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <img
                  src={entry.event.hero.light}
                  alt={entry.event.title}
                  className="h-full w-full object-cover block dark:hidden"
                />
                <img
                  src={entry.event.hero.dark}
                  alt={entry.event.title}
                  className="h-full w-full object-cover hidden dark:block"
                />
              </>
            )}
          </div>
        ) : null}
      </Reveal>

      {/* 4. Project Metadata Row (NEW - Grid-based, side by side with hairline dividers) */}
      <Reveal delay={100} className="w-full">
        <div className="grid grid-cols-2 gap-8 border-y border-hair py-8 md:grid-cols-4 md:gap-10">
          <div>
            <span className="block text-[13px] uppercase tracking-[0.08em] text-muted">
              {t[lang].periodLabel}
            </span>
            <span className="mt-2 block text-[16px] leading-[22px] text-ink">
              {typeof details.metadata.period === "string"
                ? details.metadata.period
                : details.metadata.period?.[lang]}
            </span>
          </div>
          <div>
            <span className="block text-[13px] uppercase tracking-[0.08em] text-muted">
              {t[lang].roleLabel}
            </span>
            <span className="mt-2 block text-[16px] leading-[22px] text-ink">
              {details.metadata.role[lang]}
            </span>
          </div>
          <div>
            <span className="block text-[13px] uppercase tracking-[0.08em] text-muted">
              {t[lang].collaborationLabel}
            </span>
            <span className="mt-2 block text-[16px] leading-[22px] text-ink">
              {details.metadata.collaboration[lang]}
            </span>
          </div>
          <div>
            <span className="block text-[13px] uppercase tracking-[0.08em] text-muted">
              {t[lang].affiliationLabel}
            </span>
            <span className="mt-2 block text-[16px] leading-[22px] text-ink">
              {details.metadata.affiliation[lang]}
            </span>
          </div>
        </div>
      </Reveal>

      {/* 5. Context Section (01 Context) */}
      <section className="mx-auto flex w-full flex-col gap-8">
        <Reveal>
          <h2 className="text-[clamp(20px,2vw,26px)] font-medium uppercase leading-none tracking-[0.02em] text-ink">
            {t[lang].contextSection}
          </h2>
        </Reveal>
        <Reveal delay={80} className="w-full">
          <div className="grid grid-cols-1 gap-8 border-t border-hair pt-8 md:grid-cols-3 md:gap-12">
            <div>
              <span className="block text-[13px] uppercase tracking-[0.08em] text-muted">
                {t[lang].structureLabel}
              </span>
              <p className="mt-2 text-[16px] leading-[24px] text-ink">
                {details.context.structure[lang]}
              </p>
            </div>
            <div>
              <span className="block text-[13px] uppercase tracking-[0.08em] text-muted">
                {t[lang].objectiveLabel}
              </span>
              <p className="mt-2 text-[16px] leading-[24px] text-ink">
                {details.context.objective[lang]}
              </p>
            </div>
            <div>
              <span className="block text-[13px] uppercase tracking-[0.08em] text-muted">
                {t[lang].roleLabel}
              </span>
              <p className="mt-2 text-[16px] leading-[24px] text-ink">
                {details.context.role[lang]}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 6. Features Section (02 Features) */}
      <section className="mx-auto flex w-full flex-col gap-8">
        <Reveal>
          <h2 className="text-[clamp(20px,2vw,26px)] font-medium uppercase leading-none tracking-[0.02em] text-ink">
            {t[lang].featuresSection}
          </h2>
        </Reveal>
        <Reveal delay={80} className="w-full">
          <div className="grid grid-cols-1 gap-x-14 gap-y-8 border-t border-hair pt-8 md:grid-cols-2">
            {details.features.map((feature, i) => (
              <div key={i} className="flex flex-col gap-1 border-b border-hair pb-6">
                <span className="text-[13px] font-medium tracking-[0.08em] text-muted">
                  {feature.number}
                </span>
                <h3 className="text-[17px] font-medium leading-[24px] text-ink">
                  {feature.title[lang]}
                </h3>
                <p className="mt-1 text-[15px] leading-[23px] text-muted">
                  {feature.description[lang]}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 7. Technologies Section (03 Technologies) */}
      <section className="mx-auto flex w-full flex-col gap-8">
        <Reveal>
          <h2 className="text-[clamp(20px,2vw,26px)] font-medium uppercase leading-none tracking-[0.02em] text-ink">
            {t[lang].technologiesSection}
          </h2>
        </Reveal>
        <Reveal delay={80} className="w-full">
          <div
            className={`grid grid-cols-1 gap-6 border-t border-hair pt-8 ${
              details.technologies.length === 3
                ? "sm:grid-cols-3 sm:gap-8"
                : "sm:grid-cols-2 sm:gap-10"
            }`}
          >
            {details.technologies.map((tech, i) => (
              <div key={i} className="flex flex-col gap-1 border-b border-hair pb-5">
                <span className="text-[13px] uppercase tracking-[0.08em] text-muted">
                  {tech.category[lang]}
                </span>
                <p className="text-[16px] leading-[24px] text-ink">
                  {tech.items}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 8. What I Learned Section (04 What I Learned) */}
      <section className="mx-auto flex w-full flex-col gap-8">
        <Reveal>
          <h2 className="text-[clamp(20px,2vw,26px)] font-medium uppercase leading-none tracking-[0.02em] text-ink">
            {t[lang].whatILearnedSection}
          </h2>
        </Reveal>
        <Reveal delay={80} className="w-full">
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 border-t border-hair pt-8 md:grid-cols-3">
            {details.learnings.map((learning, i) => (
              <div key={i} className="flex flex-col gap-1 border-b border-hair pb-6">
                <span className="text-[13px] font-medium tracking-[0.08em] text-muted">
                  {learning.number}
                </span>
                <h3 className="text-[17px] font-medium leading-[24px] text-ink">
                  {learning.title[lang]}
                </h3>
                <p className="mt-1 text-[15px] leading-[23px] text-muted">
                  {learning.description[lang]}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 10. Bottom Navigation (NEW) */}
      <Reveal delay={120} className="w-full">
        <nav
          aria-label="Project pagination"
          className="grid grid-cols-1 items-center gap-6 border-t border-hair pt-10 sm:grid-cols-3"
        >
          {/* Previous project on the left */}
          <div className="flex justify-start">
            {prevEntry && onSelectProject ? (
              <button
                type="button"
                onClick={() => onSelectProject(prevEntry)}
                className="link-underline text-[15px] font-medium leading-[20px] text-muted hover:text-ink transition-colors cursor-pointer text-left"
              >
                ← {t[lang].prevProject}: {prevEntry.event.title}
              </button>
            ) : (
              <span className="invisible text-[15px]">Placeholder</span>
            )}
          </div>

          {/* All Projects in the middle */}
          <div className="flex justify-center text-center">
            <button
              type="button"
              onClick={onBack}
              className="link-underline text-[15px] font-medium uppercase tracking-[0.06em] text-ink hover:text-muted transition-colors cursor-pointer"
            >
              {t[lang].allProjects}
            </button>
          </div>

          {/* Next project on the right */}
          <div className="flex justify-end text-right">
            {nextEntry && onSelectProject ? (
              <button
                type="button"
                onClick={() => onSelectProject(nextEntry)}
                className="link-underline text-[15px] font-medium leading-[20px] text-ink hover:text-muted transition-colors cursor-pointer text-right"
              >
                {t[lang].nextProject}: {nextEntry.event.title} →
              </button>
            ) : (
              <span className="invisible text-[15px]">Placeholder</span>
            )}
          </div>
        </nav>
      </Reveal>
    </main>
  );
}

function CvPage({ lang }: { lang: Lang }) {
  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-24 px-6 pb-6 pt-40 sm:gap-32 sm:px-[55px] sm:pt-[300px]">
      {/* Intro */}
      <section className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_540px] lg:items-start">
        <Reveal>
          <PageLogo type="cv" lang={lang} />
        </Reveal>
        <Reveal delay={120} className="flex flex-col lg:mt-[110px]">
          <h3 className="text-[28px] font-medium leading-[36.4px] text-ink">Oussama Yinssi</h3>
          <p className="text-[16px] leading-[26.4px] text-ink">{t[lang].subtitle}</p>
          <div className="mt-8 flex flex-col gap-8">
            {introParagraphs[lang].map((para, i) => (
               <p key={i} className="text-[16px] leading-[26.4px] text-ink">
                 {para}
               </p>
            ))}
            <a
              href={CV_PDF[lang]}
              target="_blank"
              rel="noreferrer"
              className="text-[16px] font-medium leading-[20.8px] tracking-[0.04em] text-ink underline-offset-4 hover:underline"
            >
              {t[lang].pdf}
            </a>
          </div>
        </Reveal>
      </section>

      {/* CV Sections: EXPERIENCE > EDUCATION > SKILLS > INTERESTS */}
      <Section title={t[lang].experience} rows={getAppCvRows(experience, lang)} showPlace lang={lang} />
      <Section title={t[lang].education} rows={getAppCvRows(education, lang)} showPlace lang={lang} />
      <Section title={t[lang].skills} rows={getAppCvRows(skills, lang)} showPlace={false} lang={lang} />
      <Section title={t[lang].interests} rows={getLocalizedCvRows(interestsData, lang)} showPlace={false} lang={lang} />
    </main>
  );
}

function ContactPage({ lang }: { lang: Lang }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isNameValid = formState.name.trim().length > 0;
  const isEmailValid = emailRegex.test(formState.email.trim());
  const isMessageValid =
    formState.message.trim().length >= 10 && formState.message.length <= 1000;
  const isFormValid = isNameValid && isEmailValid && isMessageValid;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setFormError(null);
    if (status !== "idle" && status !== "sending") {
      setStatus("idle");
      setServerError(null);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isFormValid) {
      setFormError(t[lang].fixErrors);
      return;
    }

    setFormError(null);
    setStatus("sending");
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          message: formState.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setServerError(null);
        setFormError(null);
        setFormState({ name: "", email: "", message: "" });
        setTouched({ name: false, email: false, message: false });
        setCooldown(60);
      } else {
        setStatus("error");
        setServerError(data?.error || t[lang].errorMessage);
      }
    } catch {
      setStatus("error");
      setServerError(t[lang].errorMessage);
    }
  };

  const contactRows = [
    {
      label: t[lang].emailLabel,
      value: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      label: t[lang].phoneLabel,
      value: PHONE,
      href: `tel:${PHONE.replace(/\s+/g, "")}`,
    },
    {
      label: t[lang].locationLabel,
      value: LOCATION[lang],
    },
    {
      label: "LinkedIn",
      value: "/in/oussama-yinssi-328396228",
      href: LINKEDIN,
      external: true,
    },
    {
      label: "GitHub",
      value: "/O2S-Y",
      href: GITHUB,
      external: true,
    },
  ];

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col gap-10 px-6 pb-6 pt-40 sm:gap-14 sm:px-[55px] sm:pt-[300px]">
      {/* Title */}
      <Reveal>
        <PageLogo type="contact" lang={lang} />
      </Reveal>

      {/* Content Grid: Paragraph on left, Headings 1 & 2 on right aligned at same level */}
      <section className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_540px] lg:items-start">
        {/* Left Column: Paragraphs with no empty line between the two lines */}
        <Reveal delay={60}>
          <div className="flex flex-col text-[16px] leading-[26.4px] text-ink max-w-[500px]">
            <p>{t[lang].contactLead}</p>
            <p>{t[lang].contactSpam}</p>
          </div>
        </Reveal>

        {/* Right Column: Headings 1 & 2 aligned at the same level as the paragraph */}
        <Reveal delay={120} className="flex flex-col gap-16">
          {/* (1) Personal Info Block */}
          <div className="flex flex-col gap-6">
            <h2 className="font-medium uppercase leading-none tracking-[0.02em] text-ink text-[clamp(20px,2.2vw,28px)]">
              {t[lang].contactInfoHeading}
            </h2>

            <div className="border-t border-hair">
              {contactRows.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 gap-1 border-b border-hair py-3.5 sm:grid-cols-[130px_1fr] sm:items-baseline sm:gap-4"
                >
                  <span className="text-[13px] uppercase tracking-[0.05em] text-muted">
                    {row.label}
                  </span>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.external ? "_blank" : undefined}
                      rel={row.external ? "noreferrer" : undefined}
                      className="link-underline inline-block w-fit text-[16px] text-ink"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span className="text-[16px] text-ink">{row.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* (2) Contact Form Block */}
          <div className="flex flex-col gap-6">
            <h2 className="font-medium uppercase leading-none tracking-[0.02em] text-ink text-[clamp(20px,2.2vw,28px)]">
              {t[lang].contactFormHeading}
            </h2>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="text-[13px] uppercase tracking-[0.05em] text-muted"
                >
                  {t[lang].nameLabel}
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border-b border-hair bg-transparent py-2 text-[16px] text-ink outline-none transition-colors focus:border-ink"
                />
                {touched.name && !isNameValid && (
                  <span className="text-[13px] text-muted">
                    {t[lang].nameRequired}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  className="text-[13px] uppercase tracking-[0.05em] text-muted"
                >
                  {t[lang].emailLabel}
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border-b border-hair bg-transparent py-2 text-[16px] text-ink outline-none transition-colors focus:border-ink"
                />
                {touched.email && !formState.email.trim() && (
                  <span className="text-[13px] text-muted">
                    {t[lang].emailRequired}
                  </span>
                )}
                {touched.email && formState.email.trim().length > 0 && !isEmailValid && (
                  <span className="text-[13px] text-muted">
                    {t[lang].emailInvalid}
                  </span>
                )}
              </div>

              {/* Message Field with Character Counter */}
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <label
                    htmlFor="contact-message"
                    className="text-[13px] uppercase tracking-[0.05em] text-muted"
                  >
                    {t[lang].messageLabel}
                  </label>
                  <span className="text-[12px] text-muted tracking-[0.04em]">
                    {formState.message.length} / 1000
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  maxLength={1000}
                  value={formState.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full resize-none border-b border-hair bg-transparent py-2 text-[16px] text-ink outline-none transition-colors focus:border-ink"
                />
                {touched.message && !formState.message.trim() && (
                  <span className="text-[13px] text-muted">
                    {t[lang].messageRequired}
                  </span>
                )}
                {touched.message &&
                  formState.message.trim().length > 0 &&
                  formState.message.trim().length < 10 && (
                    <span className="text-[13px] text-muted">
                      {t[lang].messageMin}
                    </span>
                  )}
              </div>

              {/* Actions & Status */}
              <div className="flex flex-col items-start gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending" || cooldown > 0}
                  className="link-underline cursor-pointer text-[14px] font-medium uppercase tracking-[0.08em] text-ink transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {status === "sending"
                    ? t[lang].sendingLabel
                    : cooldown > 0
                    ? `${lang === "fr" ? "VEUILLEZ PATIENTER" : "PLEASE WAIT"} (${cooldown}S)`
                    : t[lang].submitLabel}
                </button>

                {/* Inline error feedback */}
                {formError && (
                  <p className="text-[14px] leading-relaxed text-muted">
                    {formError}
                  </p>
                )}

                {/* Plain typographic confirmation messages */}
                {status === "success" && (
                  <p className="text-[14px] leading-relaxed text-ink">
                    {t[lang].successMessage}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-[14px] leading-relaxed text-muted">
                    {serverError || t[lang].errorMessage}
                  </p>
                )}
              </div>
            </form>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function Footer({ lang, setPage }: { lang: Lang; setPage: (p: Page) => void }) {
  return (
    <footer className="mx-auto flex w-full max-w-[1440px] flex-col gap-20 px-6 pt-10 pb-6 sm:gap-28 sm:px-[55px] sm:pt-14 sm:pb-10">
      <div className="grid grid-cols-2 items-start gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-8">
        <div>
          <button
            type="button"
            onClick={() => setPage("home")}
            className="link-underline text-[16px] font-medium leading-[20.8px] text-muted transition-colors hover:text-ink cursor-pointer"
          >
            {t[lang].home}
          </button>
        </div>

        <div>
          <ul className="flex flex-col gap-[13px] text-[16px] font-medium leading-[20.8px]">
            <li>
              <button
                type="button"
                onClick={() => setPage("works")}
                className="link-underline text-muted transition-colors hover:text-ink cursor-pointer"
              >
                {t[lang].works}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setPage("cv")}
                className="link-underline text-muted transition-colors hover:text-ink cursor-pointer"
              >
                {t[lang].cv}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setPage("contact")}
                className="link-underline text-muted transition-colors hover:text-ink cursor-pointer"
              >
                {t[lang].contact}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <ul className="flex flex-col gap-[13px] text-[16px] font-medium leading-[20.8px]">
            <li>
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-muted transition-colors hover:text-ink"
              >
                GITHUB
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-muted transition-colors hover:text-ink"
              >
                LINKEDIN
              </a>
            </li>
            <li>
              <a
                href={X_URL}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-muted transition-colors hover:text-ink"
              >
                X
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-2 text-[15px] font-medium tracking-[0.04em] text-ink sm:col-span-1 sm:text-right">
          © 2026 Oussama Yinssi
        </div>
      </div>

      <Reveal className="w-full overflow-hidden">
        <Logo className="w-full text-ink dark:text-white transition-colors duration-200" />
      </Reveal>
    </footer>
  );
}

function getAppStoredTheme(): Theme | null {
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

function setAppStoredTheme(theme: Theme) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("oy_theme", theme);
    }
  } catch {
    // Ignore write failures
  }
}

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [page, setPage] = useState<Page>("home");
  const [project, setProject] = useState<WorkEntry | null>(null);

  useEffect(() => {
    const isHtmlDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
    const savedTheme = getAppStoredTheme();
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

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setAppStoredTheme(newTheme);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      document.documentElement.setAttribute("data-theme", newTheme);
      document.documentElement.style.colorScheme = newTheme;
    }
  };

  const goTo = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProject = (entry: WorkEntry) => {
    setProject(entry);
    goTo("project");
  };

  return (
    <div className="min-h-screen bg-paper text-ink transition-colors duration-200">
      <Header
        lang={lang}
        setLang={setLang}
        page={page}
        setPage={goTo}
      />

      {page === "home" && <HomePage lang={lang} />}
      {page === "works" && <WorksPage lang={lang} onOpen={openProject} />}
      {page === "project" && project && (
        <ProjectPage
          entry={project}
          lang={lang}
          onBack={() => goTo("works")}
          onSelectProject={openProject}
        />
      )}
      {page === "cv" && <CvPage lang={lang} />}
      {page === "contact" && <ContactPage lang={lang} />}

      {page !== "home" && <Footer lang={lang} setPage={goTo} />}
      <StickyThemeToggle theme={theme} setTheme={handleSetTheme} />
    </div>
  );
}
