import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Notice from "./components/Notice";

const siteUrl = "https://thoddoosunskyinn.com";
const siteTitle = "Thoddoo Sun Sky Inn | Boutique Hotel in Thoddoo, Maldives";
const siteDescription = "A warm boutique guesthouse in Thoddoo, Maldives with comfortable rooms, breakfast, island experiences and direct booking.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Thoddoo Sun Sky Inn Hotel",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Thoddoo Sun Sky Inn",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/og.png", alt: "Thoddoo Sun Sky Inn in Thoddoo, Maldives" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
  },
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><Notice/><Header/><main>{children}</main><Footer/></body></html>;
}
