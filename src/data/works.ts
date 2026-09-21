import { Lang } from "./profile";

export interface ProjectMetadata {
  period?: Record<Lang, string> | string;
  role?: Record<Lang, string>;
  collaboration?: Record<Lang, string>;
  affiliation?: Record<Lang, string>;
}

export interface ProjectContext {
  structure: Record<Lang, string>;
  objective: Record<Lang, string>;
  role: Record<Lang, string>;
}

export interface ProjectFeature {
  number: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
}

export interface ProjectTechItem {
  category: Record<Lang, string>;
  items: string;
}

export interface ProjectLearning {
  number: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
}

export interface ProjectDetails {
  metadata?: ProjectMetadata;
  context?: ProjectContext;
  features?: ProjectFeature[];
  technologies?: ProjectTechItem[];
  learnings?: ProjectLearning[];
}

export interface ProjectImage {
  light: string;
  dark: string;
}

export interface WorkEvent {
  title: string;
  venue?: string;
  location?: string;
  category?: string;
  result?: string;
  resultFr?: string;
  github?: string;
  demo?: string;
  thumbnail?: ProjectImage;
  hero?: ProjectImage;
  details?: ProjectDetails;
}

export interface YearRow {
  year: string;
  events: WorkEvent[];
}

export interface WorkEntry {
  year: string;
  event: WorkEvent;
  slug?: string;
}

export const worksData: YearRow[] = [
  {
    year: "2026",
    events: [
      {
        title: "NewDEV RH",
        category: "Internship / Graduation Project (PFE)",
        result: "Full-stack HR management platform built during a final-year internship — from requirements to production.",
        resultFr: "Plateforme de gestion RH full-stack conçue lors d'un stage de fin d'études — de l'analyse des besoins à la mise en production.",
        github: "https://github.com/O2S-Y/HR-Managment-System-PFE-",
        thumbnail: {
          light: "/images/projects/project-01-mini-light.png",
          dark: "/images/projects/project-01-mini-dark.png",
        },
        hero: {
          light: "/images/projects/project-01-hero-light.png",
          dark: "/images/projects/project-01-hero-dark.png",
        },
        details: {
          metadata: {
            period: {
              en: "April – June 2026",
              fr: "Avril – Juin 2026",
            },
            role: {
              en: "Full-Stack Developer",
              fr: "Développeur Full-Stack",
            },
            collaboration: {
              en: "Solo (final-year internship)",
              fr: "Solo (stage de fin d'études)",
            },
            affiliation: {
              en: "NewDEV Maroc, Fez",
              fr: "NewDEV Maroc, Fès",
            },
          },
          context: {
            structure: {
              en: "Final-year internship (PFE), doubling as graduation project, completed at NewDEV Maroc.",
              fr: "Stage de fin d'études (PFE), servant également de projet de diplomation, réalisé chez NewDEV Maroc.",
            },
            objective: {
              en: "Design and build a complete HR management web application, from requirements analysis to a production-ready system.",
              fr: "Concevoir et développer une application web complète de gestion RH, de l'analyse des besoins jusqu'au système prêt pour la production.",
            },
            role: {
              en: "Sole developer — backend, frontend, database design, and full UML modeling.",
              fr: "Développeur unique — backend, frontend, modélisation de base de données et conception UML complète.",
            },
          },
          features: [
            {
              number: "01",
              title: {
                en: "Secure REST API Authentication with JWT",
                fr: "Authentification API REST Sécurisée par JWT",
              },
              description: {
                en: "Secure REST API authentication with JWT tokens.",
                fr: "Authentification de l'API REST sécurisée par jetons JWT.",
              },
            },
            {
              number: "02",
              title: {
                en: "Employee Management & Role-Based Access",
                fr: "Gestion des Employés & Contrôle d'Accès par Rôles",
              },
              description: {
                en: "Employee management and role-based access control.",
                fr: "Gestion des employés et contrôle d'accès basé sur les rôles.",
              },
            },
            {
              number: "03",
              title: {
                en: "HR Workflow Automation",
                fr: "Automatisation des Processus RH",
              },
              description: {
                en: "Automation of routine human resources workflows and administrative approvals.",
                fr: "Automatisation des flux de travail et approbations administratives RH.",
              },
            },
            {
              number: "04",
              title: {
                en: "Responsive React/Vite Front-End",
                fr: "Front-End Réactif React/Vite",
              },
              description: {
                en: "Responsive React/Vite front-end built for speed and seamless UX.",
                fr: "Interface front-end réactive développée avec React et Vite.",
              },
            },
            {
              number: "05",
              title: {
                en: "MySQL Relational Database, Fully UML-Modeled",
                fr: "Base de Données MySQL Entièrement Modélisée en UML",
              },
              description: {
                en: "MySQL relational database, fully modeled using UML domain diagrams.",
                fr: "Base de données relationnelle MySQL, entièrement modélisée en UML.",
              },
            },
            {
              number: "06",
              title: {
                en: "Production-Ready Deployment Structure",
                fr: "Structure de Déploiement Prête pour la Production",
              },
              description: {
                en: "Production-ready deployment structure with clean layered services.",
                fr: "Structure de déploiement et architecture prêtes pour la production.",
              },
            },
          ],
          technologies: [
            {
              category: { en: "Backend & Security", fr: "Backend & Sécurité" },
              items: "Spring Boot 3, JWT",
            },
            {
              category: { en: "Frontend", fr: "Frontend" },
              items: "React, Vite",
            },
            {
              category: { en: "Database & Modeling", fr: "Base de données & Modélisation" },
              items: "MySQL, UML",
            },
          ],
          learnings: [
            {
              number: "01",
              title: {
                en: "Full Production System Defense",
                fr: "Défense d'un Système de Production de Bout en Bout",
              },
              description: {
                en: "Designing and defending a full production system end-to-end, from requirements gathering to a live jury defense.",
                fr: "Concevoir et soutenir un système de production complet de bout en bout, du recueil des besoins jusqu'à la soutenance devant jury.",
              },
            },
            {
              number: "02",
              title: {
                en: "Production-Scale REST API Architecture",
                fr: "Architecture d'API REST en Production",
              },
              description: {
                en: "Structuring a REST API with proper authentication and role management at production scale.",
                fr: "Structurer une API REST avec une authentification et une gestion des rôles appropriées à l'échelle de production.",
              },
            },
            {
              number: "03",
              title: {
                en: "Full-Cycle UML to Relational Database",
                fr: "Modélisation UML vers Base Relationnelle",
              },
              description: {
                en: "Full-cycle UML modeling translated directly into a working relational database.",
                fr: "Traduire directement une modélisation UML complète en une base de données relationnelle opérationnelle.",
              },
            },
          ],
        },
      },
      {
        title: "Scienfisto",
        category: "Hackathon",
        result: "A 24-hour hackathon build turning a scientific hypothesis into a fully budgeted, ready-to-run lab experiment plan.",
        resultFr: "Projet de hackathon de 24h transformant une hypothèse scientifique en un plan d'expérience de laboratoire chiffré et prêt à l'exécution.",
        github: "https://github.com/NabilDa/scienfisto",
        demo: "https://scienfisto.vercel.app",
        thumbnail: {
          light: "/images/projects/project-02-mini-light.png",
          dark: "/images/projects/project-02-mini-dark.png",
        },
        hero: {
          light: "/images/projects/project-02-hero-light.png",
          dark: "/images/projects/project-02-hero-dark.png",
        },
        details: {
          metadata: {
            period: {
              en: "~April 2026 (24-hour sprint)",
              fr: "~Avril 2026 (sprint de 24h)",
            },
            role: {
              en: "UI/UX & Architecture",
              fr: "UI/UX & Architecture",
            },
            collaboration: {
              en: "Team of 3 (with Othmane Zaitoune and Nabil — credited as contributor on the team's repository)",
              fr: "Équipe de 3 (avec Othmane Zaitoune et Nabil — crédité comme contributeur sur le dépôt de l'équipe)",
            },
            affiliation: {
              en: "5th Global AI Hackathon — Hack-Nation, in collaboration with MIT Clubs of Northern California and Germany. 115+ countries, 600+ universities, 13 global hubs. Built for the \"AI Scientist OS\" challenge, sponsored by Fulcrum.",
              fr: "5e Global AI Hackathon — Hack-Nation, en collaboration avec les clubs MIT de Californie du Nord et d'Allemagne. 115+ pays, 600+ universités, 13 hubs mondiaux. Conçu pour le défi \"AI Scientist OS\", sponsorisé par Fulcrum.",
            },
          },
          context: {
            structure: {
              en: "Global hackathon, team of 3, built in under 24 hours.",
              fr: "Hackathon mondial, équipe de 3, développé en moins de 24 heures.",
            },
            objective: {
              en: "Compress weeks of manual scientific planning into an AI-generated, fully grounded experiment plan — protocol, budget, timeline, and validation criteria — from a plain-English hypothesis.",
              fr: "Compresser des semaines de planification scientifique manuelle en un plan d'expérience généré par IA et entièrement vérifié — protocole, budget, calendrier et critères de validation — à partir d'une hypothèse formulée en langage clair.",
            },
            role: {
              en: "Focused on UI/UX design and system architecture — designing the user flow (hypothesis input → literature check → generated plan → feedback loop) and the overall application structure, while teammates handled the AI/LLM orchestration logic.",
              fr: "Focalisé sur le design UI/UX et l'architecture système — conception du flux utilisateur (saisie d'hypothèse → vérification bibliographique → plan généré → boucle de retour) et de la structure globale de l'application, tandis que les coéquipiers géraient la logique d'orchestration IA/LLM.",
            },
          },
          features: [
            {
              number: "01",
              title: {
                en: "Literature Novelty Check",
                fr: "Vérification Bibliographique de Nouveauté",
              },
              description: {
                en: "Literature novelty check grounded in real search results.",
                fr: "Vérification de la nouveauté de la littérature scientifique ancrée dans des résultats de recherche réels.",
              },
            },
            {
              number: "02",
              title: {
                en: "Step-by-Step Experimental Protocol Generation",
                fr: "Génération de Protocoles Expérimentaux par Étapes",
              },
              description: {
                en: "Step-by-step experimental protocol generation.",
                fr: "Génération étape par étape de protocoles expérimentaux détaillés.",
              },
            },
            {
              number: "03",
              title: {
                en: "Itemized Budget with Real Catalog Numbers",
                fr: "Budget Détaillé avec Références Catalogues",
              },
              description: {
                en: "Itemized budget with real catalog numbers and pricing.",
                fr: "Budget détaillé avec numéros de catalogue et prix réels.",
              },
            },
            {
              number: "04",
              title: {
                en: "Phased Project Timeline",
                fr: "Calendrier de Projet par Phases",
              },
              description: {
                en: "Phased project timeline with dependencies.",
                fr: "Calendrier de projet structuré en phases avec dépendances des étapes.",
              },
            },
            {
              number: "05",
              title: {
                en: "Validation Criteria & Failure-Mode Analysis",
                fr: "Critères de Validation & Analyse des Défaillances",
              },
              description: {
                en: "Validation criteria and failure-mode analysis.",
                fr: "Critères de validation scientifique et analyse des modes de défaillance.",
              },
            },
            {
              number: "06",
              title: {
                en: "Adaptive Feedback Loop",
                fr: "Boucle de Rétroaction Continue",
              },
              description: {
                en: "Feedback loop that improves future plan generations.",
                fr: "Boucle de rétroaction améliorant la précision des futures générations de plans.",
              },
            },
          ],
          technologies: [
            {
              category: { en: "Frontend & Interface", fr: "Frontend & Interface" },
              items: "Next.js 16, React 19, Tailwind CSS v4, TypeScript",
            },
            {
              category: { en: "AI & Search Grounding", fr: "IA & Recherche Documentaire" },
              items: "Google Gemini, Tavily",
            },
            {
              category: { en: "Storage & Platform", fr: "Stockage & Déploiement" },
              items: "Vercel KV",
            },
          ],
          learnings: [
            {
              number: "01",
              title: {
                en: "Complex Multi-Step UI Under Time Pressure",
                fr: "Interface Multi-Étapes sous Pression Temporelle",
              },
              description: {
                en: "Designing a clear, multi-step UI for a complex AI-generated output under extreme time pressure.",
                fr: "Concevoir une interface utilisateur claire et multi-étapes pour des sorties IA complexes sous une forte contrainte de temps.",
              },
            },
            {
              number: "02",
              title: {
                en: "Multi-Stage AI Pipeline Architecture",
                fr: "Architecture de Pipelines IA Multi-Phases",
              },
              description: {
                en: "Structuring application architecture to support a multi-stage AI pipeline (grounding, generation, feedback loop).",
                fr: "Structurer l'architecture applicative pour supporter un pipeline IA multi-étapes (ancrage, génération, boucle de retour).",
              },
            },
            {
              number: "03",
              title: {
                en: "Rapid 24-Hour Team Collaboration",
                fr: "Collaboration Rapide d'Équipe en 24 Heures",
              },
              description: {
                en: "Collaborating effectively in a fast-paced, high-stakes team environment against a hard 24-hour deadline.",
                fr: "Collaborer efficacement dans un environnement d'équipe rapide et exigeant face à une date butoir stricte de 24 heures.",
              },
            },
          ],
        },
      },
      {
        title: "SGCD",
        category: "University Project",
        result: "Team-built clinic management system with role-based access and full UML modeling.",
        resultFr: "Système de gestion de clinique dentaire développé en équipe avec contrôle d'accès par rôles et modélisation UML complète.",
        github: "https://github.com/O2S-Y/Management-System-for-a-Dental-Practice",
        thumbnail: {
          light: "/images/projects/project-03-mini-light.png",
          dark: "/images/projects/project-03-mini-dark.png",
        },
        hero: {
          light: "/images/projects/project-03-hero-light.png",
          dark: "/images/projects/project-03-hero-dark.png",
        },
        details: {
          metadata: {
            period: {
              en: "February 2026",
              fr: "Février 2026",
            },
            role: {
              en: "Full-Stack Contributor",
              fr: "Contributeur Full-Stack",
            },
            collaboration: {
              en: "Team project — FST Fez coursework",
              fr: "Projet d'équipe — Cursus FST Fès",
            },
            affiliation: {
              en: "Faculty of Sciences and Technologies of Fez",
              fr: "Faculté des Sciences et Techniques de Fès",
            },
          },
          context: {
            structure: {
              en: "University coursework project, built with a team.",
              fr: "Projet académique universitaire, réalisé en équipe.",
            },
            objective: {
              en: "Digitize dental clinic operations — patient records, appointments, and staff roles.",
              fr: "Numériser les opérations d'un cabinet dentaire — dossiers patients, rendez-vous et rôles du personnel.",
            },
            role: {
              en: "Contributed across the full stack — system design, backend development, and feature implementation alongside the team.",
              fr: "Contribution sur l'ensemble de la pile — conception système, développement backend et implémentation de fonctionnalités aux côtés de l'équipe.",
            },
          },
          features: [
            {
              number: "01",
              title: {
                en: "Full System Design and Modeling Using UML",
                fr: "Conception Complète et Modélisation en UML",
              },
              description: {
                en: "Full system design and modeling using UML.",
                fr: "Conception complète du système et modélisation en UML.",
              },
            },
            {
              number: "02",
              title: {
                en: "Authentication with Role Management",
                fr: "Authentification avec Gestion des Rôles",
              },
              description: {
                en: "Authentication with role management (admin, dentist, assistant).",
                fr: "Authentification sécurisée avec gestion des rôles (administrateur, dentiste, assistant).",
              },
            },
            {
              number: "03",
              title: {
                en: "Patient Management Module",
                fr: "Module de Gestion des Patients",
              },
              description: {
                en: "Patient management module.",
                fr: "Module complet de gestion des dossiers patients.",
              },
            },
            {
              number: "04",
              title: {
                en: "Appointment Scheduling",
                fr: "Planification des Rendez-vous",
              },
              description: {
                en: "Appointment scheduling.",
                fr: "Planification et suivi des rendez-vous des patients.",
              },
            },
            {
              number: "05",
              title: {
                en: "Medical Record Tracking with Data Validation",
                fr: "Suivi des Dossiers Médicaux avec Validation",
              },
              description: {
                en: "Medical record tracking with data validation.",
                fr: "Suivi rigoureux des dossiers médicaux avec validation des données.",
              },
            },
          ],
          technologies: [
            {
              category: { en: "Backend", fr: "Backend" },
              items: "Java EE",
            },
            {
              category: { en: "Database", fr: "Base de données" },
              items: "MySQL",
            },
            {
              category: { en: "System Modeling", fr: "Modélisation Système" },
              items: "UML",
            },
          ],
          learnings: [
            {
              number: "01",
              title: {
                en: "Structured UML-First Team Development",
                fr: "Développement Structuré Axé sur l'UML en Équipe",
              },
              description: {
                en: "Working within a structured UML-first development process as part of a team.",
                fr: "Travailler au sein d'un processus de développement structuré orienté UML en équipe.",
              },
            },
            {
              number: "02",
              title: {
                en: "Role-Based Access Control in Java EE",
                fr: "Contrôle d'Accès Basé sur les Rôles en Java EE",
              },
              description: {
                en: "Implementing role-based access control in a Java EE application.",
                fr: "Mettre en œuvre un contrôle d'accès basé sur les rôles dans une application Java EE.",
              },
            },
            {
              number: "03",
              title: {
                en: "Multi-Contributor Codebase Coordination",
                fr: "Coordination de Codebase Multi-Contributeurs",
              },
              description: {
                en: "Coordinating feature development across multiple contributors on a shared codebase.",
                fr: "Coordonner le développement de fonctionnalités entre plusieurs contributeurs sur une base de code partagée.",
              },
            },
          ],
        },
      },
    ],
  },
  {
    year: "2025",
    events: [
      {
        title: "Nepal Tourism Web Platform",
        category: "University Project",
        result: "A documentary-style website exploring Nepal, with live map and weather data.",
        resultFr: "Un site web documentaire explorant le Népal, avec données cartographiques et météo en direct.",
        github: "https://github.com/O2S-Y/Nepal_Web_Project",
        thumbnail: {
          light: "/images/projects/project-04-mini-light.png",
          dark: "/images/projects/project-04-mini-dark.png",
        },
        hero: {
          light: "/images/projects/project-04-hero-light.png",
          dark: "/images/projects/project-04-hero-dark.png",
        },
        details: {
          metadata: {
            period: {
              en: "December 2025",
              fr: "Décembre 2025",
            },
            role: {
              en: "Full-Stack Contributor",
              fr: "Contributeur Full-Stack",
            },
            collaboration: {
              en: "Team project (2-person team, with Saad Machkour)",
              fr: "Projet en binôme (avec Saad Machkour)",
            },
            affiliation: {
              en: "Faculty of Sciences and Technologies of Fez",
              fr: "Faculté des Sciences et Techniques de Fès",
            },
          },
          context: {
            structure: {
              en: "University coursework project, built with one teammate.",
              fr: "Projet académique universitaire, réalisé en binôme.",
            },
            objective: {
              en: "Build an informative, documentary-style website about Nepal, combining static content with live data.",
              fr: "Concevoir un site web documentaire et informatif sur le Népal, combinant récits éditoriaux et données en direct.",
            },
            role: {
              en: "Contributed across the full stack — front-end interface, backend logic, and external API integration.",
              fr: "Contribution sur l'ensemble de la pile — interface front-end, logique backend et intégration des API externes.",
            },
          },
          features: [
            {
              number: "01",
              title: {
                en: "Dynamic Content Pages Built with PHP/MySQL",
                fr: "Pages Dynamiques Développées en PHP/MySQL",
              },
              description: {
                en: "Dynamic content pages built with PHP/MySQL.",
                fr: "Pages de contenu dynamiques conçues avec PHP et MySQL.",
              },
            },
            {
              number: "02",
              title: {
                en: "Live Map Integration",
                fr: "Intégration d'une Carte Interactive en Direct",
              },
              description: {
                en: "Live map integration.",
                fr: "Intégration cartographique en direct mettant en valeur les étapes clés.",
              },
            },
            {
              number: "03",
              title: {
                en: "Live Weather Data via External API",
                fr: "Données Météorologiques via API Externe",
              },
              description: {
                en: "Live weather data via external API.",
                fr: "Récupération en temps réel des données météo via une API externe.",
              },
            },
            {
              number: "04",
              title: {
                en: "JavaScript-Powered Interface Animations",
                fr: "Animations d'Interface en JavaScript",
              },
              description: {
                en: "JavaScript-powered interface animations.",
                fr: "Transitions et animations interactives animées par JavaScript.",
              },
            },
            {
              number: "05",
              title: {
                en: "Full CRUD Admin Panel for Content Management",
                fr: "Panneau d'Administration CRUD Complet",
              },
              description: {
                en: "Full CRUD admin panel for content management.",
                fr: "Panneau d'administration CRUD complet pour la gestion de contenu.",
              },
            },
          ],
          technologies: [
            {
              category: { en: "Backend & Database", fr: "Backend & Base de données" },
              items: "PHP, MySQL",
            },
            {
              category: { en: "Frontend & Scripting", fr: "Frontend & Scripting" },
              items: "JavaScript, HTML/CSS",
            },
            {
              category: { en: "APIs & Services", fr: "APIs & Services" },
              items: "Map API, Weather API",
            },
          ],
          learnings: [
            {
              number: "01",
              title: {
                en: "Third-Party API Integration",
                fr: "Intégration d'APIs Tierces",
              },
              description: {
                en: "Integrating multiple third-party APIs (maps and weather) into a cohesive user experience.",
                fr: "Intégrer plusieurs APIs tierces (cartes et météo) au sein d'une expérience utilisateur cohérente.",
              },
            },
            {
              number: "02",
              title: {
                en: "Building a Dynamic Content System from Scratch",
                fr: "Création d'un CMS Dynamique from Scratch",
              },
              description: {
                en: "Building a dynamic PHP/MySQL content system from scratch.",
                fr: "Développer un système de contenu dynamique en PHP/MySQL à partir de zéro.",
              },
            },
            {
              number: "03",
              title: {
                en: "Balancing Editorial & Live Data",
                fr: "Équilibre entre Contenu Éditorial et Données en Direct",
              },
              description: {
                en: "Balancing static \"documentary\" content with live, changing data.",
                fr: "Équilibrer un contenu de style documentaire statique avec des données dynamiques en direct.",
              },
            },
          ],
        },
      },
      {
        title: "o2s",
        category: "Personal Project",
        result: "A personal terminal-first productivity CLI — custom commands, task management, and dev tooling, without leaving the terminal.",
        resultFr: "Un outil CLI de productivité centré terminal — commandes personnalisées, gestion de tâches et outils dev sans quitter le terminal.",
        github: "https://github.com/O2S-Y/o2s",
        thumbnail: {
          light: "/images/projects/project-05-mini-light.png",
          dark: "/images/projects/project-05-mini-dark.png",
        },
        hero: {
          light: "/images/projects/project-05-hero-light.png",
          dark: "/images/projects/project-05-hero-dark.png",
        },
        details: {
          metadata: {
            period: {
              en: "~May 2026 (ongoing)",
              fr: "~Mai 2026 (en cours)",
            },
            role: {
              en: "Solo",
              fr: "Solo",
            },
            collaboration: {
              en: "Personal / independent project",
              fr: "Projet personnel / indépendant",
            },
            affiliation: {
              en: "—",
              fr: "—",
            },
          },
          context: {
            structure: {
              en: "Independent personal project.",
              fr: "Projet personnel indépendant.",
            },
            objective: {
              en: "Build a terminal-native productivity tool so daily workflows (tasks, focus sessions, system checks, dev commands) never require leaving the terminal.",
              fr: "Créer un outil de productivité natif pour le terminal afin que les flux de travail quotidiens (tâches, sessions de concentration, diagnostics système, commandes dev) ne nécessitent jamais de quitter le terminal.",
            },
            role: {
              en: "Sole developer and designer of the CLI's command structure.",
              fr: "Concepteur et développeur unique de l'architecture et des commandes du CLI.",
            },
          },
          features: [
            {
              number: "01",
              title: {
                en: "Custom Command System for Everyday Workflows",
                fr: "Système de Commandes Personnalisées pour le Quotidien",
              },
              description: {
                en: "Custom command system for everyday workflows.",
                fr: "Système de commandes personnalisées pour les routines quotidiennes de développement.",
              },
            },
            {
              number: "02",
              title: {
                en: "Built-In To-Do List Management",
                fr: "Gestion Intégrée de Listes de Tâches",
              },
              description: {
                en: "Built-in to-do list management.",
                fr: "Gestion de liste de tâches directement dans le terminal.",
              },
            },
            {
              number: "03",
              title: {
                en: "Pomodoro Timer in Terminal",
                fr: "Minuteur Pomodoro en Terminal",
              },
              description: {
                en: "Pomodoro timer, directly in the terminal.",
                fr: "Minuteur Pomodoro utilisable directement dans le terminal.",
              },
            },
            {
              number: "04",
              title: {
                en: "Laptop & System Health Check Diagnostics",
                fr: "Diagnostics de Santé Système et Machine",
              },
              description: {
                en: "Laptop/system health check commands.",
                fr: "Commandes de vérification de santé du système et de l'ordinateur portable.",
              },
            },
            {
              number: "05",
              title: {
                en: "Developer Tooling Shortcuts & Utilities",
                fr: "Raccourcis et Utilitaires pour Développeur",
              },
              description: {
                en: "Developer tooling shortcuts and utility commands.",
                fr: "Raccourcis d'outils et commandes utilitaires pour développeur.",
              },
            },
            {
              number: "06",
              title: {
                en: "Zero Context Switching",
                fr: "Zéro Changement de Contexte",
              },
              description: {
                en: "Fully terminal-based — no context switching required.",
                fr: "Entièrement basé sur le terminal — aucun changement de contexte requis.",
              },
            },
          ],
          technologies: [
            {
              category: { en: "Language", fr: "Langage" },
              items: "Go",
            },
            {
              category: { en: "Architecture", fr: "Architecture" },
              items: "CLI, Terminal I/O, POSIX",
            },
          ],
          learnings: [
            {
              number: "01",
              title: {
                en: "Designing Clean Extensible CLI Structures",
                fr: "Conception d'une Structure CLI Propre et Extensible",
              },
              description: {
                en: "Designing a clean, extensible command structure for a CLI tool.",
                fr: "Concevoir une structure de commandes propre et extensible pour un outil CLI.",
              },
            },
            {
              number: "02",
              title: {
                en: "Terminal-Native Intuitive UX",
                fr: "Expérience Utilisateur Native en Terminal",
              },
              description: {
                en: "Building terminal-native UX (no GUI) that still feels intuitive.",
                fr: "Bâtir une expérience utilisateur native en terminal (sans interface graphique) qui reste intuitive.",
              },
            },
            {
              number: "03",
              title: {
                en: "Lightweight Fast Applications with Go",
                fr: "Applications Rapides et Légères avec Go",
              },
              description: {
                en: "Working with Go for a lightweight, fast command-line application.",
                fr: "Travailler avec Go pour concevoir une application en ligne de commande légère et rapide.",
              },
            },
          ],
        },
      },
    ],
  },
];

export function localizeLocation(location: string | undefined, lang: Lang): string | undefined {
  if (!location || lang === "en") return location;
  return location
    .replace(/Fez, Morocco/g, "Fès, Maroc")
    .replace(/Taza, Morocco/g, "Taza, Maroc");
}

export function localizeCategory(category: string | undefined, lang: Lang): string | undefined {
  if (!category || lang === "en") return category;
  if (category === "Internship / Graduation Project (PFE)") return "Stage PFE / Projet de Fin d'Études";
  if (category === "University Project") return "Projet Universitaire";
  if (category === "Personal Project") return "Projet Personnel";
  if (category === "Hackathon") return "Hackathon";
  return category;
}

export function localizeResult(event: WorkEvent, lang: Lang): string | undefined {
  return lang === "fr" ? event.resultFr ?? event.result : event.result;
}

export function getProjectDetails(event: WorkEvent, year: string, lang: Lang): Required<ProjectDetails> {
  if (event.details) {
    return {
      metadata: {
        period: typeof event.details.metadata?.period === "object"
          ? event.details.metadata.period[lang]
          : (event.details.metadata?.period ?? `${year}`),
        role: event.details.metadata?.role ?? {
          en: "Full-Stack Developer",
          fr: "Développeur Full-Stack",
        },
        collaboration: event.details.metadata?.collaboration ?? {
          en: "Solo",
          fr: "Solo",
        },
        affiliation: event.details.metadata?.affiliation ?? {
          en: "—",
          fr: "—",
        },
      },
      context: event.details.context ?? {
        structure: {
          en: "Independent Architecture",
          fr: "Architecture Indépendante",
        },
        objective: {
          en: "Design and implement robust software solutions.",
          fr: "Concevoir et développer des solutions logicielles robustes.",
        },
        role: {
          en: "Full-Stack Development",
          fr: "Développement Full-Stack",
        },
      },
      features: event.details.features ?? [],
      technologies: event.details.technologies ?? [],
      learnings: event.details.learnings ?? [],
    };
  }

  // Fallback defaults
  return {
    metadata: {
      period: `${year}`,
      role: {
        en: "Full-Stack Developer",
        fr: "Développeur Full-Stack",
      },
      collaboration: {
        en: "Solo",
        fr: "Solo",
      },
      affiliation: {
        en: "—",
        fr: "—",
      },
    },
    context: {
      structure: {
        en: "Software Engineering Project",
        fr: "Projet d'Ingénierie Logicielle",
      },
      objective: {
        en: "Architect resilient software systems with clean interfaces.",
        fr: "Concevoir des systèmes logiciels résilients avec des interfaces épurées.",
      },
      role: {
        en: "Full-Stack Development & Architecture",
        fr: "Développement Full-Stack & Architecture",
      },
    },
    features: [],
    technologies: [],
    learnings: [],
  };
}
