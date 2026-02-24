import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { sora, inter, instrumentSerif } from "@/lib/fonts";
import { CursorProvider } from "@/context/CursorContext";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import NoiseOverlay from "@/components/NoiseOverlay";
import ScrollNav from "@/components/ScrollNav";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://minimal-motion-gray.vercel.app"),
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
  authors: [{ name: "Ryan Calacsan" }],
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
      className={`${sora.variable} ${inter.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CursorProvider>
            <NoiseOverlay />
            <a
              href="#main-content"
              className="fixed top-4 left-4 z-10000 -translate-y-20 rounded-md px-4 py-2 font-inter text-sm font-medium transition-transform focus:translate-y-0"
              style={{
                backgroundColor: "var(--color-text)",
                color: "var(--color-bg)",
              }}
            >
              Skip to content
            </a>
            <ScrollProgressBar />
            <CustomCursor />
            <ScrollNav />
            <SmoothScroll>{children}</SmoothScroll>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
