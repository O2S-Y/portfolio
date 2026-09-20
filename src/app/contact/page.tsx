"use client";

import { useState, useEffect } from "react";
import PageLogo from "@/components/PageLogo";
import { Reveal } from "@/components/UIHelpers";
import { useLanguage } from "@/components/ClientLayout";
import { profileData } from "@/data/profile";
import { translations } from "@/data/translations";

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

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
      setFormError(t.fixErrors);
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
        setServerError(data?.error || t.errorMessage);
      }
    } catch {
      setStatus("error");
      setServerError(t.errorMessage);
    }
  };

  const contactRows = [
    {
      label: t.emailLabel,
      value: profileData.email,
      href: `mailto:${profileData.email}`,
    },
    {
      label: t.phoneLabel,
      value: profileData.phone,
      href: `tel:${profileData.phone.replace(/\s+/g, "")}`,
    },
    {
      label: t.locationLabel,
      value: profileData.location[lang],
    },
    {
      label: "LinkedIn",
      value: "/in/oussama-yinssi-328396228",
      href: profileData.socials.linkedin,
      external: true,
    },
    {
      label: "GitHub",
      value: "/O2S-Y",
      href: profileData.socials.github,
      external: true,
    },
  ];

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col gap-10 px-6 pb-6 pt-40 sm:gap-14 sm:px-[55px] sm:pt-[300px]">
      {/* Title */}
      <Reveal>
        <PageLogo type="contact" />
      </Reveal>

      {/* Content Grid: Paragraph on left, Headings 1 & 2 on right aligned at same level */}
      <section className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_540px] lg:items-start">
        {/* Left Column: Paragraphs with no empty line between the two lines */}
        <Reveal delay={60}>
          <div className="flex flex-col text-[16px] leading-[26.4px] text-ink max-w-[500px]">
            <p>{t.contactLead}</p>
            <p>{t.contactSpam}</p>
          </div>
        </Reveal>

        {/* Right Column: Headings 1 & 2 aligned at the same level as the paragraph */}
        <Reveal delay={120} className="flex flex-col gap-16">
          {/* (1) Personal Info Block */}
          <div className="flex flex-col gap-6">
            <h2 className="font-medium uppercase leading-none tracking-[0.02em] text-ink text-[clamp(20px,2.2vw,28px)]">
              {t.contactInfoHeading}
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
              {t.contactFormHeading}
            </h2>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-[13px] uppercase tracking-[0.05em] text-muted"
                >
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border-b border-hair bg-transparent py-2 text-[16px] text-ink outline-none transition-colors focus:border-ink"
                />
                {touched.name && !isNameValid && (
                  <span className="text-[13px] text-muted">
                    {t.nameRequired}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-[13px] uppercase tracking-[0.05em] text-muted"
                >
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border-b border-hair bg-transparent py-2 text-[16px] text-ink outline-none transition-colors focus:border-ink"
                />
                {touched.email && !formState.email.trim() && (
                  <span className="text-[13px] text-muted">
                    {t.emailRequired}
                  </span>
                )}
                {touched.email && formState.email.trim().length > 0 && !isEmailValid && (
                  <span className="text-[13px] text-muted">
                    {t.emailInvalid}
                  </span>
                )}
              </div>

              {/* Message Field with Character Counter */}
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <label
                    htmlFor="message"
                    className="text-[13px] uppercase tracking-[0.05em] text-muted"
                  >
                    {t.messageLabel}
                  </label>
                  <span className="text-[12px] text-muted tracking-[0.04em]">
                    {formState.message.length} / 1000
                  </span>
                </div>
                <textarea
                  id="message"
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
                    {t.messageRequired}
                  </span>
                )}
                {touched.message &&
                  formState.message.trim().length > 0 &&
                  formState.message.trim().length < 10 && (
                    <span className="text-[13px] text-muted">
                      {t.messageMin}
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
                    ? t.sendingLabel
                    : cooldown > 0
                    ? `${lang === "fr" ? "VEUILLEZ PATIENTER" : "PLEASE WAIT"} (${cooldown}S)`
                    : t.submitLabel}
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
                    {t.successMessage}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-[14px] leading-relaxed text-muted">
                    {serverError || t.errorMessage}
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
