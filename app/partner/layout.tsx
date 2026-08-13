import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Travel Partner Invitation",
  description:
    "Private travel partner access page for verifying invitation codes with Thoddoo Sun Sky Inn.",
  path: "/partner",
  robots: {
    index: false,
    follow: true,
  },
});

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
