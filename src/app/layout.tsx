import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Unseen Cat Studio — Indie Game Dev from Italy",
  description:
    "Unseen Cat Studio is a three-person indie game development studio from Italy, crafting atmospheric horror games and unforgettable experiences. Wishlist Bedtime Nightmare on Steam.",
  keywords: [
    "indie games",
    "horror games",
    "Bedtime Nightmare",
    "Unseen Cat Studio",
    "game development",
    "Italy",
  ],
  openGraph: {
    title: "Unseen Cat Studio — Indie Game Dev from Italy",
    description:
      "Crafting nightmares you can't look away from. Wishlist Bedtime Nightmare on Steam.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unseen Cat Studio",
    description: "Crafting nightmares you can't look away from.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} h-full antialiased`}>
      <body className="noise-overlay min-h-full">{children}</body>
    </html>
  );
}
