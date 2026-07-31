"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const noticeEvent = "sunsky-notice-change";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(noticeEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(noticeEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot() {
  return sessionStorage.getItem("sunsky-notice") !== "seen";
}

function dismissNotice() {
  sessionStorage.setItem("sunsky-notice", "seen");
  window.dispatchEvent(new Event(noticeEvent));
}

export default function Notice() {
  const open = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismissNotice();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  return <div ref={dialogRef} className="notice-backdrop" role="dialog" aria-modal="true" aria-labelledby="guest-notice-title" aria-describedby="guest-notice-description"><div className="notice-card"><button ref={closeButtonRef} aria-label="Close guest notice" className="notice-x" onClick={dismissNotice}>×</button><img src="/images/logo.png" alt="Sun Sky Inn" width={155} height={155} loading="eager" decoding="async"/><span className="eyebrow">Important guest notice</span><h2 id="guest-notice-title">Book through our verified channels</h2><p id="guest-notice-description">For your safety, use only our official website, WhatsApp and email. Never send passwords, card PINs or verification codes through messages.</p><div className="notice-actions"><button className="btn btn-dark" onClick={dismissNotice}>Continue to website</button><a className="btn btn-outline" href="https://wa.me/9609910136">Verify on WhatsApp</a></div></div></div>;
}
