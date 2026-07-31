import Link from "next/link";

const links = [
  ["Stay", "/stay"], ["Experiences", "/experiences"], ["Packages", "/packages"],
  ["Gallery", "/gallery"], ["Discover", "/discover"], ["Contact", "/contact"]
];
export default function Header() {
  return <header className="site-header"><div className="shell nav-wrap">
    <Link href="/" className="brand"><img src="/images/logo.png" alt="Thoddoo Sun Sky Inn" width={135} height={135} loading="eager" decoding="async" /></Link>
    <nav>{links.map(([l,h]) => <Link key={h} href={h}>{l}</Link>)}</nav>
    <a className="btn btn-gold nav-book" href="https://book.thoddoosunskyinn.com">Book direct</a>
  </div></header>;
}
