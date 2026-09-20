"use client";

import Logo from "@/components/Logo";
import { Reveal } from "@/components/UIHelpers";
import { useLanguage } from "@/components/ClientLayout";
import { profileData } from "@/data/profile";

export default function HomePage() {
  const { lang } = useLanguage();

  return (
    <main className="mx-auto flex min-h-[calc(100vh-71px)] max-w-[1440px] flex-col justify-end px-6 pb-6 sm:px-[55px]">
      <Reveal className="mb-6">
        <p className="text-[16px] leading-[26.4px] text-ink">
          {profileData.taglines.tagline1[lang]}
        </p>
        <p className="text-[16px] leading-[26.4px] text-ink">
          {profileData.taglines.tagline2[lang]}
        </p>
      </Reveal>
      <Reveal delay={120}>
        <Logo />
      </Reveal>
    </main>
  );
}
