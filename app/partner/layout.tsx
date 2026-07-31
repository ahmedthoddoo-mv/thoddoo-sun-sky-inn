import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Partner Invitation",
  description: "Verify your private travel partner invitation and benefits directly with Thoddoo Sun Sky Inn.",
  alternates: {
    canonical: "/partner",
  },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
