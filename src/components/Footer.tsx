import Link from "next/link";
import Logo from "./Logo";
import { Reveal } from "./UIHelpers";
import { Lang, profileData } from "@/data/profile";
import { translations } from "@/data/translations";

export default function Footer({ lang }: { lang: Lang }) {
  const t = translations[lang];

  return (
    <footer className="mx-auto flex w-full max-w-[1440px] flex-col gap-20 px-6 pt-10 pb-6 sm:gap-28 sm:px-[55px] sm:pt-14 sm:pb-10">
      <div className="grid grid-cols-2 items-start gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-8">
        {/* Column 1: HOME */}
        <div>
          <Link
            href="/"
            className="link-underline text-[16px] font-medium leading-[20.8px] text-muted transition-colors hover:text-ink"
          >
            {t.home}
          </Link>
        </div>

        {/* Column 2: Navigation Links */}
        <div>
          <ul className="flex flex-col gap-[13px] text-[16px] font-medium leading-[20.8px]">
            <li>
              <Link
                href="/works"
                className="link-underline text-muted transition-colors hover:text-ink"
              >
                {t.works}
              </Link>
            </li>
            <li>
              <Link
                href="/cv"
                className="link-underline text-muted transition-colors hover:text-ink"
              >
                {t.cv}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="link-underline text-muted transition-colors hover:text-ink"
              >
                {t.contact}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Links */}
        <div>
          <ul className="flex flex-col gap-[13px] text-[16px] font-medium leading-[20.8px]">
            <li>
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-muted transition-colors hover:text-ink"
              >
                GITHUB
              </a>
            </li>
            <li>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-muted transition-colors hover:text-ink"
              >
                LINKEDIN
              </a>
            </li>
            <li>
              <a
                href={profileData.socials.x}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-muted transition-colors hover:text-ink"
              >
                X
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Copyright */}
        <div className="col-span-2 text-[15px] font-medium tracking-[0.04em] text-ink sm:col-span-1 sm:text-right">
          © 2026 {profileData.name}
        </div>
      </div>

      {/* Massive Brand Wordmark */}
      <Reveal className="w-full overflow-hidden">
        <Logo className="w-full text-ink dark:text-white transition-colors duration-200" />
      </Reveal>
    </footer>
  );
}
