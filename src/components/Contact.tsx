"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import AnimateOnScroll from "./AnimateOnScroll";
import { siteConfig } from "@/lib/data";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/web3forms";

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const botcheck = String(data.get("botcheck") ?? "");

    if (!WEB3FORMS_ACCESS_KEY) {
      setError("Contact form is not configured. Please email us directly.");
      setLoading(false);
      return;
    }

    if (botcheck) {
      setLoading(false);
      return;
    }

    if (
      name.length < 2 ||
      name.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      !EMAIL_PATTERN.test(email) ||
      message.length < 10 ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      setError("Please check your details and keep the message concise.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email,
          message,
          botcheck,
          subject: `Unseen Cat Studio - message from ${name}`,
        }),
      });
      const payload = (await res.json()) as { success?: boolean; message?: string };

      if (!res.ok || payload.success !== true) {
        setError(
          payload.message?.trim() ||
            "Something went wrong. Try again or email us directly.",
        );
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError("Network error. Check your connection or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-2">
          <AnimateOnScroll>
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-accent">
              Get in Touch
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
              Contact Us
            </h2>
            <p className="mt-4 text-secondary">
              Got a question, a collab idea, or just want to say hi? Drop us a
              message. We read everything.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-sm text-secondary transition-colors hover:text-foreground"
              >
                <MailIcon />
                {siteConfig.email}
              </a>

              <div className="flex flex-wrap gap-3 pt-2">
                {siteConfig.socials.twitter && (
                  <SocialLink href={siteConfig.socials.twitter} label="Twitter">
                    <TwitterIcon />
                  </SocialLink>
                )}
                {siteConfig.socials.instagram && (
                  <SocialLink href={siteConfig.socials.instagram} label="Instagram">
                    <InstagramIcon />
                  </SocialLink>
                )}
                {siteConfig.socials.tiktok && (
                  <SocialLink href={siteConfig.socials.tiktok} label="TikTok">
                    <TikTokIcon />
                  </SocialLink>
                )}
                {siteConfig.socials.bluesky && (
                  <SocialLink href={siteConfig.socials.bluesky} label="Bluesky">
                    <BlueskyIcon />
                  </SocialLink>
                )}
                {siteConfig.socials.youtube && (
                  <SocialLink href={siteConfig.socials.youtube} label="YouTube">
                    <YouTubeIcon />
                  </SocialLink>
                )}
                {siteConfig.socials.linkedin && (
                  <SocialLink href={siteConfig.socials.linkedin} label="LinkedIn">
                    <LinkedInIcon />
                  </SocialLink>
                )}
                {siteConfig.socials.steam && (
                  <SocialLink href={siteConfig.socials.steam} label="Steam">
                    <SteamSmallIcon />
                  </SocialLink>
                )}
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.15}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-border bg-surface p-8"
              >
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                    <CheckIcon />
                  </div>
                  <h3 className="font-display text-xl font-bold">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-sm text-secondary">
                    We&apos;ll get back to you as soon as we can.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl border border-border bg-surface p-6 md:p-8"
              >
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={MAX_NAME_LENGTH}
                    autoComplete="name"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={MAX_EMAIL_LENGTH}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                  />
                </div>
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={MAX_MESSAGE_LENGTH}
                    rows={5}
                    placeholder="What's on your mind?"
                    className="w-full resize-none rounded-xl border border-border bg-elevated px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                  />
                </div>
                {error ? (
                  <p className="text-sm text-red-400" role="alert">
                    {error}{" "}
                    <a href={`mailto:${siteConfig.email}`} className="underline hover:text-foreground">
                      {siteConfig.email}
                    </a>
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-accent-light hover:shadow-[0_0_30px_rgba(192,57,43,0.3)] disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="pressable flex h-10 w-10 items-center justify-center rounded-lg border border-border text-secondary transition-all duration-300 hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function BlueskyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SteamSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
