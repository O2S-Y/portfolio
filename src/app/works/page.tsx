"use client";

import Link from "next/link";
import PageLogo from "@/components/PageLogo";
import { Reveal } from "@/components/UIHelpers";
import { useLanguage } from "@/components/ClientLayout";
import { worksData, localizeCategory, localizeResult } from "@/data/works";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function WorksPage() {
  const { lang } = useLanguage();

  const entries = worksData.flatMap((row) =>
    row.events.map((event) => ({ year: row.year, event, slug: slugify(event.title) }))
  );

  return (
    <main className="mx-auto flex max-w-[1440px] flex-col gap-24 px-6 pb-6 pt-40 sm:gap-32 sm:px-[55px] sm:pt-[300px]">
      {/* Intro Logo */}
      <section className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_540px] lg:items-start">
        <Reveal>
          <PageLogo type="works" lang={lang} />
        </Reveal>
      </section>

      {/* Works Listing */}
      <section className="mx-auto flex w-full max-w-[1327px] flex-col gap-10 sm:gap-14">
        <Reveal>
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
                  <Link
                    href={`/works/${entry.slug}`}
                    className="relative h-[104px] w-[152px] shrink-0 overflow-hidden rounded-[2px] border border-hair transition-opacity hover:opacity-85 sm:mr-8"
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
                  </Link>
                ) : null}
                <div className="flex flex-1 flex-col gap-[6px] pr-0 sm:pr-8">
                  <Link
                    href={`/works/${entry.slug}`}
                    className="link-underline self-start text-left text-[16px] font-medium uppercase leading-[20.8px] tracking-[0.02em] text-ink transition-opacity hover:opacity-70"
                  >
                    {entry.event.title}
                  </Link>
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
        </Reveal>
      </section>
    </main>
  );
}
