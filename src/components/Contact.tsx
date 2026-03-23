"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import AnimateOnScroll from "./AnimateOnScroll";
import { siteConfig } from "@/lib/data";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Connect to your preferred form service (Formspree, Web3Forms, etc.)
    // Example with Formspree:
    // const form = e.currentTarget;
    // await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //   method: "POST",
    //   body: new FormData(form),
    //   headers: { Accept: "application/json" },
    // });

    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-2">
          <AnimateOnScroll>
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-accent">
              Get in Touch
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
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

              <div className="flex gap-3 pt-2">
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
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="What's on your mind?"
                    className="w-full resize-none rounded-xl border border-border bg-elevated px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                  />
                </div>
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
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-secondary transition-all duration-300 hover:border-accent hover:text-accent"
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
