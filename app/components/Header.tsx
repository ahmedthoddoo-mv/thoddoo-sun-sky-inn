"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const desktopLinks = [
  ["Stay", "/stay"], ["Experiences", "/experiences"], ["Packages", "/packages"],
  ["Gallery", "/gallery"], ["Discover", "/discover"], ["Contact", "/contact"]
];

const mobileLinks = [
  ["Home", "/"], ...desktopLinks, ["Partner", "/partner"]
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const toggleButton = toggleRef.current;
    document.body.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() => firstLinkRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;

      const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !toggleRef.current?.contains(target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      toggleButton?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return <header className="site-header">
    <div className="shell nav-wrap">
      <Link href="/" className="brand" onClick={closeMenu}><img src="/images/logo.png" alt="Thoddoo Sun Sky Inn" width={135} height={135} loading="eager" decoding="async" /></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{desktopLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <a className="btn btn-gold nav-book desktop-book" href="https://book.thoddoosunskyinn.com">Book direct</a>
      <button
        ref={toggleRef}
        type="button"
        className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen(open => !open)}
      >
        <span aria-hidden="true"/><span aria-hidden="true"/><span aria-hidden="true"/>
      </button>
    </div>
    <div className={`mobile-menu-backdrop ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
      <nav ref={menuRef} id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
        <span className="eyebrow light">Explore Sun Sky Inn</span>
        {mobileLinks.map(([label, href], index) => <Link ref={index === 0 ? firstLinkRef : undefined} key={href} href={href} onClick={closeMenu}>{label}</Link>)}
        <a className="btn btn-gold mobile-book" href="https://book.thoddoosunskyinn.com" onClick={closeMenu}>Book Direct</a>
      </nav>
    </div>
  </header>;
}
