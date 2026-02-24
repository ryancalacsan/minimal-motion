import { Sora, Inter, Instrument_Serif } from "next/font/google"

export const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
})
