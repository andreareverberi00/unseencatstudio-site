"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimateOnScroll from "./AnimateOnScroll";
import { team, siteConfig, type TeamMember } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <AnimateOnScroll>
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-accent">
            The Team
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
            About Us
          </h2>
          <p className="mt-4 max-w-xl text-secondary">
            Three people, one shared obsession: making games that stick with you
            long after you close them. Based in {siteConfig.location}, powered by
            passion (and way too much coffee).
          </p>
        </AnimateOnScroll>

        <div className="mt-14 flex flex-wrap justify-center gap-8">
          {team.map((member, i) => (
            <AnimateOnScroll
              key={member.name}
              delay={i * 0.12}
              className="w-full sm:w-72 lg:w-80"
            >
              <MemberCard member={member} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

const memberCardClassName =
  "group block rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:border-border-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function MemberCard({ member }: { member: TeamMember }) {
  const inner = (
    <>
      {/* Avatar */}
      <div className="flex justify-center">
        <motion.div
          whileHover={{ scale: 1.16, rotate: 3 }}
          transition={{ duration: 0.4 }}
          className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-border"
        >
          {member.avatarImage?.src ? (
            <Image
              src={member.avatarImage.src}
              alt={member.avatarImage.alt}
              fill
              sizes="96px"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 to-elevated">
              <span className="font-display text-2xl font-bold text-accent">
                {member.initials}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      <div className="mt-5 text-center">
        <h3 className="font-display text-lg font-bold">{member.name}</h3>
        <p className="mt-1 text-sm font-medium text-accent">{member.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-secondary">
          {member.bio}
        </p>
      </div>
    </>
  );

  if (member.websiteUrl) {
    return (
      <a
        href={member.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={memberCardClassName}
        aria-label={`${member.name} — open portfolio (opens in new tab)`}
      >
        {inner}
      </a>
    );
  }

  return <div className={memberCardClassName}>{inner}</div>;
}
