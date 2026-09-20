export type Lang = "en" | "fr";

export interface ProfileData {
  name: string;
  subtitle: Record<Lang, string>;
  introParagraphs: Record<Lang, string[]>;
  cvPdfUrl: Record<Lang, string>;
  email: string;
  phone: string;
  location: Record<Lang, string>;
  socials: {
    github: string;
    instagram?: string;
    linkedin: string;
    x: string;
  };
  taglines: {
    tagline1: Record<Lang, string>;
    tagline2: Record<Lang, string>;
  };
}

export const profileData: ProfileData = {
  name: "Oussama Yinssi",
  subtitle: {
    en: "Data Science & AI",
    fr: "Science des Données & IA",
  },
  cvPdfUrl: {
    en: "/Cv_Master_EN.pdf",
    fr: "/Cv_Master_FR.pdf",
  },
  email: "oussamayinssi@gmail.com",
  phone: "+212 (0)6 20 10 60 02",
  location: {
    en: "Fez, Morocco",
    fr: "Fès, Maroc",
  },
  socials: {
    github: "https://github.com/O2S-Y",
    instagram: "https://www.instagram.com/ou2sama_yinssi/",
    linkedin: "https://www.linkedin.com/in/oussama-yinssi-328396228/",
    x: "https://x.com/YinssiOussama",
  },
  taglines: {
    tagline1: {
      en: "Designing robust distributed systems and modern web architectures.",
      fr: "Conception de systèmes distribués robustes et d'architectures web modernes.",
    },
    tagline2: {
      en: "Software craftsmanship centered on scalability and performance.",
      fr: "Artisanat logiciel centré sur l'évolutivité et la performance.",
    },
  },
  introParagraphs: {
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
  },
};
