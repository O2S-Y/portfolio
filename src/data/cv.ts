import { YearRow } from "./works";
import { Lang } from "./profile";

export interface LocalizedEvent {
  title: string;
  titleFr?: string;
  venue?: string;
  venueFr?: string;
  location?: string;
  locationFr?: string;
}

export interface LocalizedYearRow {
  year: string;
  yearFr?: string;
  events: LocalizedEvent[];
}

export const awardsData: LocalizedYearRow[] = [];

export const experienceData: LocalizedYearRow[] = [
  {
    year: "April – June 2026",
    yearFr: "Avril – Juin 2026",
    events: [
      {
        title: "Graduation Project Intern, Full-Stack Developer — Built NewDEV RH",
        titleFr: "Stagiaire PFE, Développeur Full-Stack — Conception et développement de NewDEV RH",
        venue: "NewDEV Maroc",
        venueFr: "NewDEV Maroc",
        location: "Fez, Morocco",
        locationFr: "Fès, Maroc",
      },
    ],
  },
  {
    year: "Sept 2024 – Present",
    yearFr: "Sept 2024 – Présent",
    events: [
      {
        title: "Vice President",
        titleFr: "Vice-Président",
        venue: "LUCS Club, Faculty of Sciences and Technologies of Fez",
        venueFr: "Club LUCS, Faculté des Sciences et Techniques de Fès",
        location: "Fez, Morocco",
        locationFr: "Fès, Maroc",
      },
    ],
  },
];

export const educationData: LocalizedYearRow[] = [
  {
    year: "Sept 2026 – Present",
    yearFr: "Sept 2026 – Présent",
    events: [
      {
        title: "Master's, Data Science & Intelligent Systems (DSIS)",
        titleFr: "Master en Sciences de Données et Systèmes Intelligents (SDSI)",
        venue: "Faculty of Sciences and Technologies of Fez",
        venueFr: "Faculté des Sciences et Techniques de Fès",
        location: "Fez, Morocco",
        locationFr: "Fès, Maroc",
      },
    ],
  },
  {
    year: "Sept 2025 – June 2026",
    yearFr: "Sept 2025 – Juin 2026",
    events: [
      {
        title: "Bachelor’s Degree in Science and Technology, specialising in Computer Engineering",
        titleFr: "Licence en Sciences et Techniques, Spécialité Génie Informatique (LST)",
        venue: "Faculty of Sciences and Technologies of Fez",
        venueFr: "Faculté des Sciences et Techniques de Fès",
        location: "Fez, Morocco",
        locationFr: "Fès, Maroc",
      },
    ],
  },
  {
    year: "Sept 2023 – June 2025",
    yearFr: "Sept 2023 – Juin 2025",
    events: [
      {
        title: "University Diploma in Mathematics, Computer Science and Physics",
        titleFr: "DEUST en Mathématiques, Informatique et Physique (MIP)",
        venue: "Faculty of Sciences and Technologies of Fez",
        venueFr: "Faculté des Sciences et Techniques de Fès",
        location: "Fez, Morocco",
        locationFr: "Fès, Maroc",
      },
    ],
  },
  {
    year: "Sept 2022 – June 2023",
    yearFr: "Sept 2022 – Juin 2023",
    events: [
      {
        title: "Baccalaureate in Physical Sciences (French Track)",
        titleFr: "Baccalauréat en Sciences Physiques (Option Français)",
        venue: "Omar Al Khayam High School",
        venueFr: "Lycée Omar Al Khayam",
        location: "Taza, Morocco",
        locationFr: "Taza, Maroc",
      },
    ],
  },
];

export const skillsData: LocalizedYearRow[] = [
  {
    year: "Programming Languages",
    yearFr: "Langages de programmation",
    events: [
      { title: "Python, Java/J2EE, C, C++, JavaScript, SQL, NoSQL, PHP, HTML5/CSS3" },
    ],
  },
  {
    year: "Web Frameworks",
    yearFr: "Frameworks Web",
    events: [
      { title: "React, Spring Boot 3, Next.js, Node.js, TypeScript" },
    ],
  },
  {
    year: "Networks & Systems",
    yearFr: "Réseaux & Systèmes",
    events: [
      { title: "TCP/IP, Network Administration, Linux/Unix" },
    ],
  },
  {
    year: "Design",
    yearFr: "Design & Conception",
    events: [
      { title: "UML, Merise, Figma (UI/UX)" },
    ],
  },
  {
    year: "Databases",
    yearFr: "Bases de données",
    events: [
      { title: "MySQL, MongoDB" },
    ],
  },
  {
    year: "Tools",
    yearFr: "Outils",
    events: [
      { title: "Git, GitHub, VS Code, IntelliJ IDEA,Docker" },
    ],
  },
  {
    year: "Languages",
    yearFr: "Langues",
    events: [
      { title: "Arabic, French, English", titleFr: "Arabe, Français, Anglais" },
    ],
  },
];

export const projectsData: LocalizedYearRow[] = [
  {
    year: "2026",
    events: [
      {
        title: "NewDEV RH — Full-Stack HR Management Platform (Spring Boot 3, React, Vite, MySQL)",
        titleFr: "NewDEV RH — Plateforme de Gestion RH Full-Stack (Spring Boot 3, React, Vite, MySQL)",
        venue: "NewDEV Maroc",
        venueFr: "NewDEV Maroc",
        location: "Fez, Morocco",
        locationFr: "Fès, Maroc",
      },
      {
        title: "SGCD — Dental Practice Clinic Management System (Java EE, MySQL, UML)",
        titleFr: "SGCD — Système de Gestion de Cabinet Dentaire (Java EE, MySQL, UML)",
        venue: "Faculty of Sciences and Technologies of Fez",
        venueFr: "Faculté des Sciences et Techniques de Fès",
        location: "Fez, Morocco",
        locationFr: "Fès, Maroc",
      },
      {
        title: "o2s — Terminal-Native Productivity CLI (Go, POSIX)",
        titleFr: "o2s — Outil CLI de Productivité Centré Terminal (Go, POSIX)",
      },
      {
        title: "Scienfisto — AI-Powered Scientific Experiment Planning Platform (Next.js, Gemini, Vercel KV)",
        titleFr: "Scienfisto — Plateforme de Planification Scientifique par IA (Next.js, Gemini, Vercel KV)",
        venue: "5th Global AI Hackathon (Hack-Nation & MIT Clubs)",
        venueFr: "5e Global AI Hackathon (Hack-Nation & Clubs MIT)",
      },
    ],
  },
  {
    year: "2025",
    events: [
      {
        title: "Nepal Tourism Web Platform — Documentary & Live Map Website (PHP, MySQL, External APIs)",
        titleFr: "Plateforme Web Touristique du Népal — Site Documentaire & Carte en Direct (PHP, MySQL, APIs)",
        venue: "Faculty of Sciences and Technologies of Fez",
        venueFr: "Faculté des Sciences et Techniques de Fès",
        location: "Fez, Morocco",
        locationFr: "Fès, Maroc",
      },
    ],
  },
];

export const interestsData: LocalizedYearRow[] = [
  {
    year: "Systems & Architecture",
    yearFr: "Systèmes & Architecture",
    events: [
      {
        title: "Distributed systems, fault tolerance, scalability, and microservices architecture",
        titleFr: "Systèmes distribués, tolérance aux pannes, évolutivité et architecture de microservices",
      },
    ],
  },
  {
    year: "Artificial Intelligence",
    yearFr: "Intelligence Artificielle",
    events: [
      {
        title: "Intelligent systems, agentic workflows, LLM orchestration, and machine learning pipelines",
        titleFr: "Systèmes intelligents, workflows agentiques, orchestration de LLM et pipelines de machine learning",
      },
    ],
  },
  {
    year: "Systems Programming",
    yearFr: "Programmation Système",
    events: [
      {
        title: "Go, C/C++, POSIX terminal tooling, runtime internals, and high-performance computing",
        titleFr: "Go, C/C++, outils terminal POSIX, mécanismes internes d'exécution et calcul haute performance",
      },
    ],
  },
  {
    year: "Cybersecurity",
    yearFr: "Cybersécurité",
    events: [
      {
        title: "Security fundamentals, vulnerability analysis, reverse engineering, and secure system design",
        titleFr: "Fondamentaux de sécurité, analyse de vulnérabilités, rétro-ingénierie et conception de systèmes sécurisés",
      },
    ],
  },
  {
    year: "Design & UI/UX",
    yearFr: "Design & UI/UX",
    events: [
      {
        title: "Interface design in Figma, typography, human-computer interaction, and Swiss minimalist design",
        titleFr: "Conception d'interfaces sur Figma, typographie, interaction humain-machine et design minimaliste suisse",
      },
    ],
  },
  {
    year: "Sciences & Mathematics",
    yearFr: "Sciences & Mathématiques",
    events: [
      {
        title: "Physics, applied mathematics, complex systems, and foundational scientific principles",
        titleFr: "Physique, mathématiques appliquées, systèmes complexes et principes fondamentaux de la science",
      },
    ],
  },
];

export function getLocalizedCvRows(rows: LocalizedYearRow[], lang: Lang): YearRow[] {
  return rows.map((row) => ({
    year: lang === "fr" ? (row.yearFr ?? row.year) : row.year,
    events: row.events.map((e) => ({
      title: lang === "fr" ? (e.titleFr ?? e.title) : e.title,
      venue: lang === "fr" ? (e.venueFr ?? e.venue) : e.venue,
      location: lang === "fr" ? (e.locationFr ?? e.location) : e.location,
    })),
  }));
}

// Backwards-compatibility aliases
export const soloExhibitionsData = experienceData;
export const groupExhibitionsData = educationData;
