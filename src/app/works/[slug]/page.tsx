"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Reveal } from "@/components/UIHelpers";
import { useLanguage } from "@/components/ClientLayout";
import { worksData, localizeResult, getProjectDetails } from "@/data/works";
import { translations } from "@/data/translations";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function ProjectPage() {
  const { lang } = useLanguage();
  const params = useParams();
  const slug = params?.slug as string;

  const entries = worksData.flatMap((row) =>
    row.events.map((event) => ({ year: row.year, event, slug: slugify(event.title) }))
  );

  const currentIndex = entries.findIndex((e) => e.slug === slug);

  if (currentIndex === -1) {
    return notFound();
  }

  const entry = entries[currentIndex];
  const prevEntry = currentIndex > 0 ? entries[currentIndex - 1] : null;
  const nextEntry = currentIndex < entries.length - 1 ? entries[currentIndex + 1] : null;

  const t = translations[lang];
  const details = getProjectDetails(entry.event, entry.year, lang);

  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-20 px-6 pb-12 pt-36 sm:gap-24 sm:px-[55px] sm:pt-[240px]">
      {/* Top Back to Projects Link */}
      <Reveal>
        <Link
          href="/works"
          className="group inline-flex items-center gap-2 text-[14px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink -mb-10 sm:-mb-14"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
          <span>{t.backToProjects}</span>
        </Link>
      </Reveal>

      {/* Header Block */}
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_540px] lg:items-start">
        <Reveal>
          <p className="mb-3 text-[14px] uppercase leading-[16px] tracking-[0.14px] text-muted">
            {t.project} · {entry.year}
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
                {t.github}
              </a>
            )}
            {entry.event.demo && (
              <a
                href={entry.event.demo}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-ink hover:text-muted transition-colors"
              >
                {t.demo}
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
              {t.periodLabel}
            </span>
            <span className="mt-2 block text-[16px] leading-[22px] text-ink">
              {typeof details.metadata.period === "string"
                ? details.metadata.period
                : details.metadata.period?.[lang]}
            </span>
          </div>
          <div>
            <span className="block text-[13px] uppercase tracking-[0.08em] text-muted">
              {t.roleLabel}
            </span>
            <span className="mt-2 block text-[16px] leading-[22px] text-ink">
              {details.metadata.role[lang]}
            </span>
          </div>
          <div>
            <span className="block text-[13px] uppercase tracking-[0.08em] text-muted">
              {t.collaborationLabel}
            </span>
            <span className="mt-2 block text-[16px] leading-[22px] text-ink">
              {details.metadata.collaboration[lang]}
            </span>
          </div>
          <div>
            <span className="block text-[13px] uppercase tracking-[0.08em] text-muted">
              {t.affiliationLabel}
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
            {t.contextSection}
          </h2>
        </Reveal>
        <Reveal delay={80} className="w-full">
          <div className="grid grid-cols-1 gap-8 border-t border-hair pt-8 md:grid-cols-3 md:gap-12">
            <div>
              <span className="block text-[13px] uppercase tracking-[0.08em] text-muted">
                {t.structureLabel}
              </span>
              <p className="mt-2 text-[16px] leading-[24px] text-ink">
                {details.context.structure[lang]}
              </p>
            </div>
            <div>
              <span className="block text-[13px] uppercase tracking-[0.08em] text-muted">
                {t.objectiveLabel}
              </span>
              <p className="mt-2 text-[16px] leading-[24px] text-ink">
                {details.context.objective[lang]}
              </p>
            </div>
            <div>
              <span className="block text-[13px] uppercase tracking-[0.08em] text-muted">
                {t.roleLabel}
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
            {t.featuresSection}
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
            {t.technologiesSection}
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
            {t.whatILearnedSection}
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

      {/* Bottom Navigation */}
      <Reveal delay={120} className="w-full">
        <nav
          aria-label="Project pagination"
          className="grid grid-cols-1 items-center gap-6 border-t border-hair pt-10 sm:grid-cols-3"
        >
          {/* Previous project on the left */}
          <div className="flex justify-start">
            {prevEntry ? (
              <Link
                href={`/works/${prevEntry.slug}`}
                className="link-underline text-[15px] font-medium leading-[20px] text-muted hover:text-ink transition-colors text-left"
              >
                ← {t.prevProject}: {prevEntry.event.title}
              </Link>
            ) : (
              <span className="invisible text-[15px]">Placeholder</span>
            )}
          </div>

          {/* All Projects in the middle */}
          <div className="flex justify-center text-center">
            <Link
              href="/works"
              className="link-underline text-[15px] font-medium uppercase tracking-[0.06em] text-ink hover:text-muted transition-colors"
            >
              {t.allProjects}
            </Link>
          </div>

          {/* Next project on the right */}
          <div className="flex justify-end text-right">
            {nextEntry ? (
              <Link
                href={`/works/${nextEntry.slug}`}
                className="link-underline text-[15px] font-medium leading-[20px] text-ink hover:text-muted transition-colors text-right"
              >
                {t.nextProject}: {nextEntry.event.title} →
              </Link>
            ) : (
              <span className="invisible text-[15px]">Placeholder</span>
            )}
          </div>
        </nav>
      </Reveal>
    </main>
  );
}
