import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Notice from "./components/Notice";
import JsonLd from "./components/JsonLd";
import {
  businessEmail,
  businessLocation,
  businessPhone,
  createPageMetadata,
  siteName,
  siteUrl,
} from "./lib/seo";

const siteTitle = "Thoddoo Sun Sky Inn | Guesthouse on Thoddoo Island, Maldives";
const siteDescription =
  "A warm boutique guesthouse on Thoddoo Island, Maldives with comfortable rooms, island experiences, and direct booking support.";
const rootSeo = createPageMetadata({
  title: siteTitle,
  description: siteDescription,
  path: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Thoddoo Sun Sky Inn",
  },
  description: siteDescription,
  alternates: rootSeo.alternates,
  openGraph: rootSeo.openGraph,
  twitter: rootSeo.twitter,
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><JsonLd data={[{"@context":"https://schema.org","@type":"Hotel","name":siteName,"url":siteUrl,"image":[`${siteUrl}/og.png`],"description":siteDescription,"email":businessEmail,"telephone":businessPhone,"address":{"@type":"PostalAddress","addressLocality":"Thoddoo Island","addressCountry":"MV"}},{"@context":"https://schema.org","@type":"WebSite","name":siteName,"url":siteUrl,"description":`Official website of ${siteName} in ${businessLocation}.`}]} /><Notice/><Header/><main>{children}</main><Footer/></body></html>;
}
