"use client";

import { motion } from "framer-motion";
import { mainGame, siteConfig } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0000] via-[#0a0a0a] to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(192,57,43,0.08)_0%,_transparent_60%)]" />
      <div className="vignette absolute inset-0" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-accent/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="flex relative z-10 mx-auto w-full max-w-5xl flex-col items-center justify-center px-5 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-[10px] font-medium tracking-[0.2em] uppercase text-secondary sm:text-xs sm:tracking-[0.3em] md:text-sm"
        >
          {siteConfig.studioName} presents
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display font-black leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(2rem, 10vw, 9rem)" }}
        >
          <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
            {mainGame.title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-4 max-w-xl text-sm text-secondary sm:mt-6 sm:text-base md:text-lg"
        >
          {mainGame.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:justify-center"
        >
          <a
            href={mainGame.steamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-light hover:shadow-[0_0_30px_rgba(192,57,43,0.3)] sm:gap-2.5 sm:px-7 sm:py-3.5 sm:text-base"
          >
            <SteamIcon />
            {mainGame.ctaText}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mx-auto mt-8 w-full max-w-[646px] sm:mt-12"
        >
          <iframe
            src={`https://store.steampowered.com/widget/${mainGame.steamWidgetId}/`}
            className="w-full rounded-lg border border-border"
            style={{ maxWidth: "100%", height: "190px" }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted">
            Scroll
          </span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-muted to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SteamIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.49 1.013 2.445-.397.957-1.488 1.41-2.445 1.012l.002.003-.016.007zm8.407-8.37c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
    </svg>
  );
}
