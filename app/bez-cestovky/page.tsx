import type { Metadata } from "next";
import PartnerLanding from "./PartnerLanding";

export const metadata: Metadata = {
  title: { absolute: "Ceny s kódom BEZCESTOVKY | Thoddoo Sun Sky Inn" },
  description: "Partnerské ceny, kalkulácia pobytu a praktické informácie pre slovenských hostí odporučených Martinou.",
  alternates: { canonical: "https://thoddoosunskyinn.com/bez-cestovky" },
  robots: { index: false, follow: false },
};

export default function BezCestovky() {
  return <PartnerLanding/>;
}
