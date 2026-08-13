import Link from "next/link";
import { bookingTransitionPath } from "../lib/booking";

export default function Footer() {
  return (
    <footer>
      <div className="shell footer-grid">
        <div>
          <img
            className="footer-logo"
            src="/images/logo.png"
            alt="Thoddoo Sun Sky Inn logo"
            width={150}
            height={150}
            loading="lazy"
            decoding="async"
          />
          <p>
            Thoddoo Sun Sky Inn
            <br />
            Thoddoo Island, Maldives
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link href="/stay">Stay</Link>
          <Link href="/experiences">Experiences</Link>
          <Link href="/packages">Packages</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/discover">Discover</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h4>Book Direct</h4>
          <a href={bookingTransitionPath}>Secure booking</a>
          <a href="https://wa.me/9609910136">WhatsApp: +960 991 0136</a>
          <a href="mailto:reservation@thoddoosunskyinn.com">reservation@thoddoosunskyinn.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Thoddoo Sun Sky Inn</span>
        <a href="https://thoddoomaldives.com">Designed &amp; powered by iThoddoo Maldives</a>
      </div>
    </footer>
  );
}
