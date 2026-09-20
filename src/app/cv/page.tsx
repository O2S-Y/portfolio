"use client";

import PageLogo from "@/components/PageLogo";
import { Reveal } from "@/components/UIHelpers";
import { Section } from "@/components/SectionList";
import { useLanguage } from "@/components/ClientLayout";
import { profileData } from "@/data/profile";
import { translations } from "@/data/translations";
import {
  experienceData,
  educationData,
  skillsData,
  interestsData,
  getLocalizedCvRows,
} from "@/data/cv";

export default function CvPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const experienceRows = getLocalizedCvRows(experienceData, lang);
  const educationRows = getLocalizedCvRows(educationData, lang);
  const skillsRows = getLocalizedCvRows(skillsData, lang);
  const interestRows = getLocalizedCvRows(interestsData, lang);

  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-24 px-6 pb-6 pt-40 sm:gap-32 sm:px-[55px] sm:pt-[300px]">
      {/* Intro */}
      <section className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_540px] lg:items-start">
        <Reveal>
          <PageLogo type="cv" lang={lang} />
        </Reveal>
        <Reveal delay={120} className="flex flex-col lg:mt-[110px]">
          <h3 className="text-[28px] font-medium leading-[36.4px] text-ink">{profileData.name}</h3>
          <p className="text-[16px] leading-[26.4px] text-ink">{profileData.subtitle[lang]}</p>
          <div className="mt-8 flex flex-col gap-8">
            {profileData.introParagraphs[lang].map((para, i) => (
              <p key={i} className="text-[16px] leading-[26.4px] text-ink">
                {para}
              </p>
            ))}
            <a
              href={profileData.cvPdfUrl[lang]}
              target="_blank"
              rel="noreferrer"
              className="text-[16px] font-medium leading-[20.8px] tracking-[0.04em] text-ink underline-offset-4 hover:underline"
            >
              {t.pdf}
            </a>
          </div>
        </Reveal>
      </section>

      {/* CV Sections: EXPERIENCE > EDUCATION > SKILLS > INTERESTS */}
      <Section title={t.experience} rows={experienceRows} showPlace lang={lang} />
      <Section title={t.education} rows={educationRows} showPlace lang={lang} />
      <Section title={t.skills} rows={skillsRows} showPlace={false} lang={lang} />
      <Section title={t.interests} rows={interestRows} showPlace={false} lang={lang} />
    </main>
  );
}
