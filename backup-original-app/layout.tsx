import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400","500","600"], style: ["normal","italic"] });
const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400","500","600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://thoddoosunskyinn.com"),
  title: "Thoddoo Sun Sky Inn | Your Island Home in the Maldives",
  description: "A warm, intimate guesthouse on Thoddoo Island. Beautiful rooms, local experiences, and genuine Maldivian hospitality.",
  openGraph: {
    title: "Thoddoo Sun Sky Inn",
    description: "Your island story starts here.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Thoddoo Sun Sky Inn on a tropical Maldivian island" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thoddoo Sun Sky Inn",
    description: "Your island story starts here.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
