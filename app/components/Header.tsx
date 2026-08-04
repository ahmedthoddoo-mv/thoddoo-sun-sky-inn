import Link from "next/link";

const links = [
  ["Stay", "/stay"], ["Experiences", "/experiences"], ["Packages", "/packages"],
  ["Gallery", "/gallery"], ["Discover", "/discover"], ["Contact", "/contact"]
];
export default function Header() {
  return <header className="site-header"><div className="shell nav-wrap">
    <Link href="/" className="brand"><img src="/images/logo.png" alt="Thoddoo Sun Sky Inn" /></Link>
    <nav>{links.map(([l,h]) => <Link key={h} href={h}>{l}</Link>)}</nav>
    <Link className="btn btn-gold nav-book" href="/booking">Book direct</Link>
  </div></header>;
}
