import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { syne, inter, instrumentSerif } from "@/lib/fonts";
import { CursorProvider } from "@/context/CursorContext";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://minimal-motion.vercel.app"),
  title: "Minimal Motion — Typography in Motion",
  description:
    "A typography-focused portfolio showcase demonstrating restraint, CSS mastery, and sophisticated micro-interactions. Built with Next.js, Motion, and Tailwind CSS v4.",
  keywords: [
    "typography",
    "motion design",
    "portfolio",
    "Next.js",
    "Tailwind CSS",
    "animation",
    "micro-interactions",
  ],
  authors: [{ name: "Minimal Motion" }],
  openGraph: {
    title: "Minimal Motion — Typography in Motion",
    description:
      "Where typography meets interaction. A showcase of restraint, CSS mastery, and sophisticated micro-interactions.",
    type: "website",
    locale: "en_US",
    siteName: "Minimal Motion",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minimal Motion — Typography in Motion",
    description:
      "Where typography meets interaction. A showcase of restraint, CSS mastery, and sophisticated micro-interactions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${inter.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CursorProvider>
            <CustomCursor />
            <SmoothScroll>{children}</SmoothScroll>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
