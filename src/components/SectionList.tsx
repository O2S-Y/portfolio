import React from "react";
import { Lang } from "@/data/profile";
import { WorkEvent, YearRow, localizeCategory, localizeLocation } from "@/data/works";
import { Reveal } from "./UIHelpers";

export function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="font-medium uppercase leading-none tracking-[0.02em] text-ink text-[clamp(22px,2.4vw,30px)]">
      {children}
    </h2>
  );
}

export function EventLines({ event, showPlace, lang }: { event: WorkEvent; showPlace: boolean; lang: Lang }) {
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

export function YearList({ rows, showPlace, lang }: { rows: YearRow[]; showPlace: boolean; lang: Lang }) {
  return (
    <dl className="w-full border-b border-hair">
      {rows.map((row, idx) => (
        <div
          key={`${row.year}-${idx}`}
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

export function Section({
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
