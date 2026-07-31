import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Offer",
  description: "Private partner offer access for guests of Thoddoo Sun Sky Inn.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BezCestovky() {
  return <section className="partner-page"><div className="partner-box"><img src="/images/logo.png" alt="Sun Sky Inn" width={175} height={175} loading="eager" decoding="async"/><span className="eyebrow">Partner access confirmed</span><h1>Your private partner offer is unlocked</h1><p>Speak directly with our team to confirm availability and the benefits included with your invitation.</p><a className="btn btn-gold" href="https://book.thoddoosunskyinn.com">Check availability</a><a className="text-link" href="https://wa.me/9609910136">Contact Sun Sky Inn</a></div></section>;
}
